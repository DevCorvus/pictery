import { HttpException } from './HttpException';

export class TooManyRequestsException extends HttpException {
  constructor() {
    super(429, 'Too many requests');
  }
}
