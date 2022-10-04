import { NextFunction, Request, Response } from 'express';

import { PictureLimitExceededException } from '@exceptions/PictureLimitExceededException';

import { pictureService } from './picture.service';

const PICTURES_LIMIT = 100;

export async function pictureLimiter(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const userId = req.user!.id;

  try {
    const picturesCount = await pictureService.getCount(userId);

    if (picturesCount < PICTURES_LIMIT) {
      next();
    } else {
      next(new PictureLimitExceededException());
    }
  } catch (err) {
    next(err);
  }
}
