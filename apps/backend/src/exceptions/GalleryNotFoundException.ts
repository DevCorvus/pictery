import { HttpException } from './HttpException';

export class GalleryNotFoundException extends HttpException {
  constructor(galleryId: string) {
    super(404, `Gallery with id ${galleryId} not found`);
  }
}
