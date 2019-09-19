import { IConfig } from '@mxcins/tools';

const config: IConfig = {
  esm: 'single',
  cjs: 'single',
  umd: { type: 'single', name: 'lodash' },
};

export default config;
