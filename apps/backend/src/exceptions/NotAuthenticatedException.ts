import { HttpException } from './HttpException';

export class NotAuthenticatedException extends HttpException {
  constructor() {
    super(401, 'You are not authenticated');
  }
}
