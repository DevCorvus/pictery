import { NextFunction, Request, Response } from 'express';

import { userIsAuthenticated } from '@auth/middlewares/userIsAuthenticated.middleware';
import { Router } from '@core/router';
import { UserNotFoundException } from '@exceptions/UserNotFoundException';
import { UserWithThatEmailAlreadyExistsException } from '@exceptions/UserWithThatEmailAlreadyExistsException';
import { Controller } from '@interfaces/controller';
import { schemaValidation } from '@middlewares/schemaValidation.middleware';
import { storageLimiter } from '@middlewares/storageLimiter.middleware';
import { pictureService } from '@picture/picture.service';
import { pictureStorageService } from '@picture/picture.storage.service';

import { CreateUserDto } from './user.dto';
import { createUserSchema } from './user.schema';
import { userService } from './user.service';
import { parseUser } from './user.utils';

export class UserController implements Controller {
  public router = new Router('/users');

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    // this.router.setRoute({
    // 	method: 'GET',
    // 	middlewares: [userIsAuthenticated],
    // 	handler: this.getOne,
    // });
    this.router.setRoute({
      method: 'GET',
      middlewares: [userIsAuthenticated],
      handler: this.getEmail,
    });
    this.router.setRoute({
      method: 'POST',
      middlewares: [schemaValidation(createUserSchema)],
      handler: this.create,
    });
    this.router.setRoute({
      method: 'DELETE',
      middlewares: [userIsAuthenticated, storageLimiter],
      handler: this.delete,
    });
  }

  // private getOne = async (req: Request, res: Response, next: NextFunction) => {
  // 	const userId = req.user!.id;

  // 	try {
  // 		const user = await userService.getOne(userId);

  // 		if (user) {
  // 			res.json(parseUser(user));
  // 		} else {
  // 			next(new UserNotFoundException(userId));
  // 		}
  // 	} catch (err) {
  // 		next(err);
  // 	}
  // };

  private getEmail = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const userId = req.user!.id;

    try {
      const email = await userService.getEmailFromOne(userId);

      if (email) {
        res.json(email);
      } else {
        next(new UserNotFoundException(userId));
      }
    } catch (err) {
      next(err);
    }
  };

  private create = async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body as CreateUserDto;

    try {
      const userAlreadyExists = await userService.existsByEmail(data.email);

      if (userAlreadyExists) {
        next(new UserWithThatEmailAlreadyExistsException(data.email));
      } else {
        const newUser = await userService.create(data);
        res.status(201).json(parseUser(newUser));
      }
    } catch (err) {
      next(err);
    }
  };

  private delete = async (req: Request, res: Response, next: NextFunction) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const userId = req.user!.id;

    try {
      const pictures = await pictureService.getKeysFromAll(userId);

      if (pictures.length > 0) {
        pictures.forEach(async (picture) => {
          if (picture.key) {
            await pictureStorageService.delete(picture.key);
          }
        });
      }

      await userService.delete(userId);

      req.logout((err) => {
        if (err) return res.sendStatus(500);
      });
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  };
}
