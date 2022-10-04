import { HttpException } from './HttpException';

export class PictureNotFoundException extends HttpException {
  constructor(pictureId: string) {
    super(404, `Picture with id ${pictureId} not found`);
  }
}
