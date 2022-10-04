import { NextFunction, Request, Response } from 'express';

import { GalleryLimitExceededException } from '@exceptions/GalleryLimitExceededException';

import { galleryService } from './gallery.service';

const GALLERIES_LIMIT = 20;

export async function galleryLimiter(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const userId = req.user!.id;

  try {
    const galleryCount = await galleryService.getCount(userId);

    if (galleryCount < GALLERIES_LIMIT) {
      next();
    } else {
      next(new GalleryLimitExceededException());
    }
  } catch (err) {
    next(err);
  }
}
