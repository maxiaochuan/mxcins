import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm-bundler.js',
    },
  },
  build: {
    minify: true,
    lib: {
      entry: 'src/index.ts',
      formats: ['es'],
    },
    rollupOptions: {
      external: [],
      input: {
        app: './examples/index.html',
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
  },
});
