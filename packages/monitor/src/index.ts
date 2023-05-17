import { EVENT_TYPE, type WebMonitorOptions } from "./types"
import monitor from "./monitor";

const install = (app: any, options: WebMonitorOptions) => {
  const prev = app.config.errorHandler;
  app.config.errorHandler = (err: Error) => {
    monitor.emit(EVENT_TYPE.ERROR, err);
  }
}

export default {
  install,
}