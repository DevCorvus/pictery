import path from 'path';

import { initializeCloudinaryConfig } from '@lib/cloudinary';

import { pictureStorageService } from './picture.storage.service';

describe('Picture Storage Service', () => {
  beforeAll(() => {
    initializeCloudinaryConfig();
  });

  it('Should upload and delete one', async () => {
    const filePath = path.join(
      process.cwd(),
      '../common/tests/static',
      'pixel-earth.jpg'
    );

    const uploadMetadata = await pictureStorageService.upload(filePath);
    expect(uploadMetadata).toBeTruthy();

    const deleted = await pictureStorageService.delete(uploadMetadata.key);
    expect(deleted).toBeTruthy();
  });
});
