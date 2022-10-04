import { NextFunction, Request, Response } from 'express';

import { UserNotFoundException } from '@exceptions/UserNotFoundException';
import { userService } from '@user/user.service';

export async function userExists(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { userId } = req.params;
  const userExists = await userService.existsById(userId);

  if (userExists) {
    next();
  } else {
    next(new UserNotFoundException(userId));
  }
}
