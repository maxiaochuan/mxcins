/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference types="vitest" />

import { type ConfigEnv, type UserConfig, defineConfig } from 'vite';
import pkg from './package.json';

export default ({ mode }: ConfigEnv): UserConfig => {
  if (mode === 'production') {
    return defineConfig({
      build: {
        lib: {
          entry: 'src/index.ts',
          formats: ['es', 'cjs'],
        },
        rollupOptions: {
          external: [
            ...Object.keys(pkg.dependencies).filter(d => d !== 'nanoid'),
            ...Object.keys(pkg.peerDependencies),
          ],
        },
      },
    }) as UserConfig;
  }
  if (mode === 'test') {
    return defineConfig({
      test: {
        globals: true,
        environment: 'jsdom',
      },
    }) as UserConfig;
  }
  return defineConfig({
    resolve: {
      alias: {
        vue: 'vue/dist/vue.esm-bundler.js',
      },
    },
    publicDir: './examples/public',
  }) as UserConfig;
};
