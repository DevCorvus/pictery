import { NextFunction, Request, Response } from 'express';

import { NotAuthenticatedException } from '@exceptions/NotAuthenticatedException';

export async function userIsAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.isAuthenticated()) {
    next();
  } else {
    next(new NotAuthenticatedException());
  }
}
