import { IConfig } from '@mxcins/tools';

const config: IConfig = {
  entry: 'src',
  cjs: { type: 'babel' },
  browserFiles: ['src/dynamic.ts', 'src/runtime.ts'],
};

export default config;
