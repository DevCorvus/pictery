import { HttpException } from './HttpException';

export class FileUploadException extends HttpException {
  constructor() {
    super(500, 'Failed to upload file');
  }
}
