// tslint:disable-next-line:no-implicit-dependencies
import { IConfig } from '@mxcins/tools';

const config: IConfig = {
  esm: 'single',
  cjs: 'single',
  umd: { type: 'single', name: 'request' },
  runtimeHelpers: true,
  outputExports: 'named',
};

export default config;
