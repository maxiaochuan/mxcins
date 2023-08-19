/// <reference types="vitest" />

import { defineConfig } from 'vite';
import pkg from './package.json';

export default defineConfig(({ mode }) => {
  if (mode === 'production') {
    return {
      build: {
        lib: {
          entry: 'src/index.ts',
          formats: ['es', 'cjs'],
        },
        rollupOptions: {
          external: [...Object.keys(pkg.peerDependencies)],
        },
      },
    };
  }
  if (mode === 'test') {
    return {
      test: {
        globals: true,
        environment: 'jsdom',
      },
    };
  }
  return {};
});
