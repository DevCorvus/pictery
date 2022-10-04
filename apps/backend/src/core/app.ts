import 'reflect-metadata';

import path from 'path';

import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import express, { Application } from 'express';
import expressSession from 'express-session';
import helmet from 'helmet';
import morgan from 'morgan';
import passport from 'passport';

import { initializeGoogleOAuth2Strategy } from '@auth/strategies/googleOAuth2.strategy';
import { initializeLocalCredentialsStrategy } from '@auth/strategies/localCredentials.strategy';
import { initializeUserSerialization } from '@auth/userSerialization';
import { Controller } from '@interfaces/controller';
import { Logger } from '@interfaces/logger';
import { initializeCloudinaryConfig } from '@lib/cloudinary';
import { prisma } from '@lib/prisma';
import { errorHandler } from '@middlewares/errorHandler.middleware';
import { errorLogger } from '@middlewares/errorLogger.middleware';
import { limitRequestsPerIp } from '@middlewares/limitRequestsPerIp.middleware';
import { getEnv } from '@utils/env';

const clientPath = path.join(__dirname, '../../../client');

export class App {
  private app: Application;
  private logger: Logger;
  private controllers: Controller[];

  constructor(controllers: Controller[], logger: Logger = console) {
    this.app = express();
    this.logger = logger;
    this.controllers = controllers;
  }

  public async init() {
    await this.loadLocalEnvIfRequired();
    await this.initializeMiddlewares();
    this.initializeSettings();
    this.initializeControllers();
    this.initializeClient();
    this.initializeErrorHandling();
  }

  public getServer() {
    return this.app;
  }

  private async loadLocalEnvIfRequired() {
    const { NODE_ENV } = getEnv();

    if (NODE_ENV !== 'production') {
      const dotenv = (await import('dotenv')).default;
      dotenv.config();
    }
  }

  private async initializeMiddlewares() {
    const { NODE_ENV, CLIENT_URL, COOKIE_SECRET } = getEnv();

    if (NODE_ENV === 'production') {
      this.app.use(express.static(clientPath));
    }

    if (NODE_ENV !== 'production') {
      const cors = (await import('cors')).default;
      this.app.use(
        cors({
          origin: [CLIENT_URL],
          credentials: true,
        })
      );
    }

    if (NODE_ENV !== 'test') {
      this.app.use(morgan(NODE_ENV !== 'production' ? 'dev' : 'tiny'));
      this.app.use(limitRequestsPerIp);
    }

    this.app.use(
      helmet({
        contentSecurityPolicy: {
          directives: {
            // eslint-disable-next-line quotes
            'img-src': ["'self'", '*.cloudinary.com', 'data:'],
            // eslint-disable-next-line quotes
            'connect-src': ["'self'", '*.cloudinary.com', 'data:'],
          },
        },
        crossOriginResourcePolicy: {
          policy: 'cross-origin',
        },
      })
    );
    this.app.use(express.json());
    this.app.use(
      expressSession({
        secret: COOKIE_SECRET || 'secret',
        saveUninitialized: false,
        rolling: true,
        resave: false,
        store: new PrismaSessionStore(prisma, {
          checkPeriod: 1000 * 60 * 60, // 1 Hour
        }),
        cookie: {
          signed: true,
          httpOnly: true,
          sameSite: true,
          maxAge: 1000 * 60 * 30, // 30 minutes in milliseconds
          secure: NODE_ENV === 'production',
        },
      })
    );

    // Passport authentication middlewares
    this.app.use(passport.initialize());
    this.app.use(passport.session());
    initializeLocalCredentialsStrategy();
    initializeGoogleOAuth2Strategy();
    initializeUserSerialization();
  }

  private initializeSettings() {
    const { NODE_ENV, PORT } = getEnv();

    this.app.set('port', Number(PORT) || 8000);

    if (NODE_ENV === 'production') {
      this.app.set('trust proxy', 1);
    }

    initializeCloudinaryConfig();
  }

  private initializeControllers() {
    this.controllers.forEach((controller) => {
      this.app.use('/api', controller.router.getRoutes());
    });
  }

  private initializeClient() {
    const { NODE_ENV } = getEnv();

    if (NODE_ENV === 'production') {
      this.app.use('*', async (req, res) => {
        res.sendFile('index.html', {
          root: clientPath,
        });
      });
    }
  }

  private initializeErrorHandling() {
    const { NODE_ENV } = getEnv();

    if (NODE_ENV !== 'test') {
      this.app.use(errorLogger);
    }

    this.app.use(errorHandler);
  }

  public listen() {
    const { NODE_ENV } = getEnv();

    return this.app.listen(this.app.get('port'), () => {
      this.logger.log(
        'Server running on port',
        this.app.get('port'),
        `in ${NODE_ENV ? NODE_ENV.toUpperCase() : 'DEFAULT'} mode.`
      );
    });
  }
}
