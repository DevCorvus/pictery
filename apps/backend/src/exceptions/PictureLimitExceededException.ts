import { HttpException } from './HttpException';

export class PictureLimitExceededException extends HttpException {
  constructor() {
    super(409, 'You have reached the limit of pictures that you can create');
  }
}
