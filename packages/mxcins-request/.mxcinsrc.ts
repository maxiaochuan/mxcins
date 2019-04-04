// tslint:disable-next-line:no-implicit-dependencies
import { IConfig } from '@mxcins/tools';

const config: IConfig = {
  esm: 'rollup',
  umd: { type: 'rollup', name: 'request' },
  runtimeHelpers: true,
  outputExports: 'named',
};

export default config;
