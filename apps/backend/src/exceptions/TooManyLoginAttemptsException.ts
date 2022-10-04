import { HttpException } from './HttpException';

export class TooManyLoginAttemptsException extends HttpException {
  constructor() {
    super(429, 'Too many login attempts');
  }
}
