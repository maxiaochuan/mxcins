import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    minify: false,
    lib: {
      name: 'WebMonitor',
      entry: 'src/index.ts',
      fileName: 'index',
      formats: ['es', 'umd'],
    },
    rollupOptions: {
      external: [],
    },
  },
});
