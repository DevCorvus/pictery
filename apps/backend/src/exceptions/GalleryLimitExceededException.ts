import { HttpException } from './HttpException';

export class GalleryLimitExceededException extends HttpException {
  constructor() {
    super(409, 'You have reached the limit of galleries that you can create');
  }
}
