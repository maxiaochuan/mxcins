import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  build: {
    minify: false,
  },
  plugins: [
    react({
      babel: {
        plugins: [],
      },
    }),
  ],
});
