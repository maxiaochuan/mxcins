// tslint:disable-next-line:no-implicit-dependencies
import { IConfig } from '@mxcins/tools';

const config: IConfig = {
  umd: {
    type: 'single',
    name: 'Gantt',
    globals: { d3: 'd3', moment: 'moment' },
  },
};

export default config;
