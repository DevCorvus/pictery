import { Request, Response } from 'express';

import { userIsAuthenticated } from '@auth/middlewares/userIsAuthenticated.middleware';
import { Router } from '@core/router';
import { Controller } from '@interfaces/controller';

export class GenericController implements Controller {
  public router = new Router();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.setRoute({
      method: 'GET',
      handler: this.api,
    });
    this.router.setRoute({
      method: 'GET',
      suffix: '/protected',
      middlewares: [userIsAuthenticated],
      handler: this.protected,
    });
  }

  // This one also works as a Health Check
  private api = async (req: Request, res: Response) => {
    res.sendStatus(200);
  };

  private protected = async (req: Request, res: Response) => {
    res.sendStatus(200);
  };
}
