import { HttpException } from './HttpException';

export class FileDeleteException extends HttpException {
  constructor() {
    super(500, 'Failed to delete file');
  }
}
