import { EVENT_TYPE, Handler, WebMonitorOptions } from "./types";
import { ErrorHandler, ErrorResult, HttpHandler, HttpResult } from "./handlers";
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
    this.use(HttpHandler);
  }

  public use(handler: Handler) {
    console.log('use', handler);
    const { name } = handler;
    if (!this.handlers.has(name)) {
      handler.init && handler.init(this);
      this.handlers.set(name, handler);
    }
  }

  public emit(name: EVENT_TYPE.ERROR, arg: ErrorResult): void
  public emit(name: EVENT_TYPE.HTTP, arg: HttpResult): void
  public emit(name: EVENT_TYPE, arg: any): void {
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
    console.log('result', result);
    // this.reporter.send(result);
  }
}
