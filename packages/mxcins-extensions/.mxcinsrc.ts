import { IConfig } from '@mxcins/tools';

const config: IConfig = {
  esm: true,
  cjs: true,
  umd: { name: 'extensions', globals: { 'lodash': '_', '@mxcins/pluralize': 'pluralize' } },
};

export default config;
