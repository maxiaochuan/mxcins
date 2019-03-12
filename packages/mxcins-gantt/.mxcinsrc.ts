import { IConfig } from '@mxcins/tools';

const config: IConfig = {
  umd: {
    type: 'rollup',
    name: 'Gantt',
    globals: { d3: 'd3', moment: 'moment' },
  },
};

export default config;
