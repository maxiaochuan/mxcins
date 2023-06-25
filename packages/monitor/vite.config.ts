import { type ConfigEnv, type UserConfig, defineConfig } from 'vite';

export default ({ mode }: ConfigEnv): UserConfig => {
  if (mode === 'production') {
    return defineConfig({
      build: {
        lib: {
          entry: 'src/index.ts',
          formats: ['es'],
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
