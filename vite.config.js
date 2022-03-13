import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  build: {
    minify: false,
  },
  resolve: {
    alias: {
      '@mxcins/components': `${path.resolve(process.cwd(), 'packages', 'components')}/`,
      '@mxcins/libs': `${path.resolve(process.cwd(), 'packages', 'libs')}/`,
      '@/': `${path.resolve(process.cwd(), 'src')}/`
    },
  },
  plugins: [
    react({
      babel: {
        plugins: [],
      },
    }),
  ],
});
