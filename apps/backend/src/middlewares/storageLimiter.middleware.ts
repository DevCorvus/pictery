import { NextFunction, Request, Response } from 'express';

import { StorageLimitExceededException } from '@exceptions/StorageLimitExceededException';
import { cloudinary } from '@lib/cloudinary';

export async function storageLimiter(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = (await cloudinary.api.usage()) as {
      credits: { usage: number; limit: number };
    };

    const { usage } = result.credits;
    const limit = result.credits.limit - 1;

    if (usage < limit) {
      next();
    } else {
      next(new StorageLimitExceededException());
    }
  } catch (err) {
    next(err);
  }
}
