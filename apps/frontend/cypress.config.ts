import fs from 'fs';
import path from 'path';

import { defineConfig } from 'cypress';
import vitePreprocessor from 'cypress-vite';

export default defineConfig({
  video: false,
  screenshotOnRunFailure: false,
  e2e: {
    viewportWidth: 1024,
    viewportHeight: 768,
    baseUrl: 'http://localhost:3000',
    defaultCommandTimeout: 5000,
    trashAssetsBeforeRuns: false,
    setupNodeEvents(on, config) {
      on(
        'file:preprocessor',
        vitePreprocessor(path.resolve(__dirname, './vite.config.ts'))
      ),
      on('task', {
        readFileAsBase64(fileName: string): string | null {
          const filePath = path.join(
            __dirname,
            '../common/tests/static',
            fileName
          );

          if (fs.existsSync(filePath)) {
            return fs.readFileSync(filePath, { encoding: 'base64' });
          } else {
            return null;
          }
        },
        resolveDownloadedFilePath(fileName: string): string | null {
          const downloadedFilePath = path.join(
            config.downloadsFolder,
            fileName
          );

          return downloadedFilePath;
        },
        deleteDownloadsDir(): boolean {
          const dir = config.downloadsFolder;

          if (fs.existsSync(dir)) {
            fs.rmdirSync(dir, { maxRetries: 10, recursive: true });
            return true;
          } else {
            return false;
          }
        },
      });
    },
  },

  env: {
    API_URL: 'http://localhost:8000/api',
    VITE_API_URL: 'http://localhost:8000/api',
  },

  component: {
    devServer: {
      framework: 'vue',
      bundler: 'vite',
    },
  },
});
