// tslint:disable-next-line:no-implicit-dependencies
import { IConfig } from '@mxcins/tools';

const config: IConfig = {
  esm: 'rollup',
  cjs: 'rollup',
  umd: { type: 'rollup', name: 'lodash' },
};

export default config;
