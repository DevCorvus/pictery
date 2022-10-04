import { HttpException } from './HttpException';

export class StorageLimitExceededException extends HttpException {
  constructor() {
    super(409, 'You have reached the limit of operations in storage');
  }
}
