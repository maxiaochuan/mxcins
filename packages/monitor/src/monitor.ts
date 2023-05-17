import { EVENT_TYPE, Handler, WebMonitorOptions } from "./types";
import { ErrorHandler } from "./handlers";

class WebMonitor {
  private static instance: WebMonitor;

  private options: WebMonitorOptions = {};

  private handlers = new Map<EVENT_TYPE, Handler>();

  private stack = new Set<any>();

  private constructor() {

  }

  public use(handler: Handler) {
    const { name, init } = handler;
    if (!this.handlers.has(name)) {
      init && init();
      this.handlers.set(name, handler);
    }
  }

  public emit(name: EVENT_TYPE, arg: any) {
    const handler = this.handlers.get(name);
    if (!handler) {
      console.error(`no handler for : ${name}`);
      return;
    }
    const result = handler.run(arg);
    // TODO: send
    console.log('result', result);
  }

  public static make() {
    if (!WebMonitor.instance) {
      WebMonitor.instance = new WebMonitor();
    }
    return WebMonitor.instance;
  }
}

const monitor = WebMonitor.make();
monitor.use(ErrorHandler);

export default monitor;