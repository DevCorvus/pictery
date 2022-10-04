import cloudinarySdk from 'cloudinary';

import { getEnv } from '@utils/env';

export const cloudinary = cloudinarySdk.v2;

export function initializeCloudinaryConfig() {
  const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =
    getEnv();

  cloudinary.config({
    // eslint-disable-next-line camelcase
    cloud_name: CLOUDINARY_CLOUD_NAME,
    // eslint-disable-next-line camelcase
    api_key: CLOUDINARY_API_KEY,
    // eslint-disable-next-line camelcase
    api_secret: CLOUDINARY_API_SECRET,
    secure: true,
  });
}
