import { NextFunction, Request, Response } from 'express';
import { RateLimiterMemory } from 'rate-limiter-flexible';

import { TooManyRequestsException } from '@exceptions/TooManyRequestsException';

const rateLimiter = new RateLimiterMemory({
  keyPrefix: 'too_many_requests',
  points: 6,
  duration: 1,
});

export async function limitRequestsPerIp(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    await rateLimiter.consume(req.ip);
    next();
  } catch (err) {
    next(new TooManyRequestsException());
  }
}
