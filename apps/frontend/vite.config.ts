import path from 'path';

import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: '../../dist/client',
  },
  resolve: {
    alias: {
      '@common': path.resolve(__dirname, '../common'),
      '@src': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@components': path.resolve(__dirname, './src/components'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@lib': path.resolve(__dirname, './src/lib'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@schemas': path.resolve(__dirname, './src/schemas'),
      '@services': path.resolve(__dirname, './src/services'),
      '@store': path.resolve(__dirname, './src/store'),
      '@svg': path.resolve(__dirname, './src/components/svg'),
      '@interfaces': path.resolve(__dirname, './src/interfaces'),
      '@utils': path.resolve(__dirname, './src/utils'),
    },
  },
});
