import { defineConfig } from 'vite';
import packageJSON from './package.json';

export default defineConfig({
  build: {
    minify: false,
    lib: {
      entry: 'src/index.ts',
      fileName: 'index',
      formats: ['cjs'],
    },
    rollupOptions: {
      external: ['fs', 'path', ...Object.keys(packageJSON.dependencies)],
    },
  },
});
