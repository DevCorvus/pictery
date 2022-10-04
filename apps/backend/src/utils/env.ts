export function getEnv() {
  return {
    NODE_ENV: process.env.NODE_ENV,
    HOST: process.env.HOST || 'http://localhost:8000',
    CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:3000',
    PORT: process.env.PORT,
    COOKIE_SECRET: process.env.COOKIE_SECRET,
    GOOGLE_OAUTH2_CLIENT_ID: process.env.GOOGLE_OAUTH2_CLIENT_ID,
    GOOGLE_OAUTH2_CLIENT_SECRET: process.env.GOOGLE_OAUTH2_CLIENT_SECRET,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  };
}
