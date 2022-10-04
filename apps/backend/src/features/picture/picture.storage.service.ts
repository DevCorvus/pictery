import { FileDeleteException } from '@exceptions/FileDeleteException';
import { FileUploadException } from '@exceptions/FileUploadException';
import { cloudinary } from '@lib/cloudinary';
import { getEnv } from '@utils/env';

// Based on the output of --detectOpenHandles in Jest, there is a problem with these async methods, which by their nature, I cannot fix.

class PictureStorageService {
  async upload(filePath: string): Promise<{ url: string; key: string }> {
    const { NODE_ENV } = getEnv();

    const uploadResponse = await cloudinary.uploader.upload(filePath, {
      folder: NODE_ENV === 'production' ? 'pictery' : 'test',
    });

    if (uploadResponse) {
      const publicId = uploadResponse.public_id;
      const pictureUrl = uploadResponse.secure_url;

      return { key: publicId, url: pictureUrl };
    } else {
      throw new FileUploadException();
    }
  }

  async delete(key: string): Promise<boolean> {
    const deleteResponse = await cloudinary.uploader.destroy(key);

    if (deleteResponse) {
      return true;
    } else {
      throw new FileDeleteException();
    }
  }
}

export const pictureStorageService = new PictureStorageService();
