import { EVENT_TYPE, type WebMonitorOptions } from './types';
import WebMonitor from './monitor';

const install = (app: any, options: WebMonitorOptions) => {
  const monitor = new WebMonitor(options);
  const prev = app.config.errorHandler;
  app.config.errorHandler = (err: Error, ...args: any[]) => {
    console.log('vue error handler', err);
    monitor.emit(EVENT_TYPE.ERROR, err);
    if (prev) {
      prev.apply(null, [err, ...args]);
    }
  };
};

export default {
  install,
  WebMonitor,
};
