import { IConfig } from '@mxcins/tools';

const config: IConfig = {
  entry: 'src/index.ts',
  esm: { type: 'rollup' },
  // cjs: { type: 'rollup' },
  umd: { type: 'rollup', name: 'request' },
  runtimeHelpers: true,
  outputExports: 'named',
};

export default config;
