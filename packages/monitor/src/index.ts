import type { App } from 'vue';
import Monitor from './monitor';
import type { MonitorConfig } from './types';
import { unzip } from './common';

const install = (app: App<Element>, options: MonitorConfig): void => {
  const monitor = new Monitor(options);
  const prev = app.config.errorHandler;
  app.config.errorHandler = (err, ...args) => {
    monitor.emit('error', err as Error);
    if (prev != null) {
      // eslint-disable-next-line no-useless-call
      prev.apply(null, [err, ...args]);
    }
  };
};

export default {
  install,
  Monitor,
  unzip,
};
