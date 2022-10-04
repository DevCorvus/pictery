import { NextFunction, Request, Response } from 'express';

import { HttpException } from '@exceptions/HttpException';

export async function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) {
  let status: number;
  let message: string;

  if (err instanceof HttpException) {
    status = err.status;
    message = err.message;
  } else {
    status = 500;
    message = 'Something went wrong';
  }

  res.status(status).json({ status, message });
}
