import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    minify: true,
    lib: {
      entry: 'src/index.ts',
      formats: ['es'],
    },
    rollupOptions: {
      external: [],
    },
  },
});
