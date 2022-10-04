import { NextFunction, Request, Response } from 'express';

import { logger } from '@utils/logger';

export function errorLogger(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { body } = req;
  if (body.password && typeof req.body.password === 'string') {
    body.password = '*'.repeat(body.password.length);
  }

  logger.log('error', err.message, {
    secure: req.secure,
    method: req.method,
    url: req.url,
    client: {
      ip: req.ip,
      user: req.user?.id,
      agent: req.get('User-Agent'),
    },
    data: {
      query: req.query,
      params: req.params,
      body,
      files: req.file || req.files,
    },
  });

  next(err);
}
