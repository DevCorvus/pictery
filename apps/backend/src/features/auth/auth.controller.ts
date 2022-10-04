import { Request, Response } from 'express';
import passport from 'passport';

import { Router } from '@core/router';
import { Controller } from '@interfaces/controller';
import { getEnv } from '@utils/env';

import { userIsAuthenticated } from './middlewares/userIsAuthenticated.middleware';
import { userIsNotAuthenticated } from './middlewares/userIsNotAuthenticated.middleware';

export class AuthController implements Controller {
  public router = new Router('/auth');

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.setRoute({
      method: 'POST',
      suffix: '/login',
      middlewares: [userIsNotAuthenticated],
      handler: this.localLogin,
    });
    this.router.setRoute({
      method: 'GET',
      suffix: '/google',
      middlewares: [userIsNotAuthenticated],
      handler: this.googleLogin,
    });
    this.router.setRoute({
      method: 'GET',
      suffix: '/google/callback',
      middlewares: [userIsNotAuthenticated],
      handler: this.googleCallback(),
    });
    this.router.setRoute({
      method: 'POST',
      middlewares: [userIsAuthenticated],
      suffix: '/logout',
      handler: this.logout,
    });
  }

  localLogin = [
    passport.authenticate('local'),
    async (req: Request, res: Response) => {
      res.sendStatus(200);
    },
  ];

  googleLogin = passport.authenticate('google', {
    scope: ['profile', 'email'],
  });

  googleCallback = () => {
    const { NODE_ENV, HOST, CLIENT_URL } = getEnv();

    const PREFIX = NODE_ENV === 'production' ? HOST : CLIENT_URL;

    return passport.authenticate('google', {
      successRedirect: `${PREFIX}/dashboard`,
      failureRedirect: `${PREFIX}/login`,
    });
  };

  logout = async (req: Request, res: Response) => {
    req.logout((err) => {
      if (err) return res.sendStatus(500);
    });
    res.sendStatus(204);
  };
}
