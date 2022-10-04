import { NextFunction, Request, Response } from 'express';

import { NotAuthorizedException } from '@exceptions/NotAuthorizedException';

export async function userIsNotAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.isAuthenticated()) {
    next();
  } else {
    next(new NotAuthorizedException());
  }
}
