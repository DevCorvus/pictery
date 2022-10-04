import { HttpException } from './HttpException';

export class BadRequestException extends HttpException {
  constructor() {
    super(400, 'Wrong or missing data provided');
  }
}
