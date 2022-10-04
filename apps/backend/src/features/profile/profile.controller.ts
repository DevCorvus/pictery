import { NextFunction, Request, Response } from 'express';

import { userIsAuthenticated } from '@auth/middlewares/userIsAuthenticated.middleware';
import { Router } from '@core/router';
import { ProfileNotFoundException } from '@exceptions/ProfileNotFoundException';
import { Controller } from '@interfaces/controller';

import { profileService } from './profile.service';

export class ProfileController implements Controller {
  public router = new Router('/profile');

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.setMiddlewares(userIsAuthenticated);

    this.router.setRoute({
      method: 'GET',
      handler: this.getFromUser,
    });
    this.router.setRoute({
      method: 'GET',
      suffix: '/:userId',
      handler: this.getOne,
    });
  }

  private getOne = async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;

    try {
      const profile = await profileService.getOne(userId);

      if (profile) {
        res.json(profile);
      } else {
        next(new ProfileNotFoundException(userId));
      }
    } catch (err) {
      next(err);
    }
  };

  private getFromUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const userId = req.user!.id;
    try {
      const profile = await profileService.getOne(userId);
      res.json(profile);
    } catch (err) {
      next(err);
    }
  };
}
