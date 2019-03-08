import { IConfig } from '@mxcins/tools';

const config: IConfig = {
  entry: 'src/index.ts',
  cjs: { type: 'babel' },
  nodes: ['src/index.ts', 'src/utils.ts'],
};

export default config;
