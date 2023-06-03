import { EVENT_TYPE, Handler, WebMonitorOptions } from "./types";
import { ErrorHandler } from "./handlers";
import Reporter from "./reporter";
import dayjs from "dayjs";

export default class WebMonitor {
  private options: WebMonitorOptions;

  private reporter: Reporter;

  private handlers = new Map<EVENT_TYPE, Handler>();

  private stack = new Set<any>();

  constructor(options: WebMonitorOptions) {
    this.options = options;
    this.reporter = new Reporter({ reportURL: options.reportURL });

    this.use(ErrorHandler);
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

    const result = {
      type: name,
      info: handler.handle(arg),
      timestamp: dayjs().toISOString(),
    }

    // TODO: send
    this.reporter.send(result);
  }
}
