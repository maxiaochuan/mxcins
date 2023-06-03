import dayjs from 'dayjs';
import { EVENT_TYPE, Handler, WebMonitorOptions } from './types';
import Reporter from './reporter';
import {
  ClickHandler,
  ClickInput,
  ErrorHandler,
  ErrorInput,
  HttpHandler,
  HttpInput,
  UnhandleRejectionHandler,
  UnhandleRejectionInput,
  ResourceErrorHandler,
  ResourceErrorInput,
} from './handlers';

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
    this.use(ClickHandler);
    this.use(UnhandleRejectionHandler);
    this.use(ResourceErrorHandler);
  }

  public use(handler: Handler) {
    const { name } = handler;
    if (!this.handlers.has(name)) {
      handler.init && handler.init(this);
      this.handlers.set(name, handler);
    }
  }

  public emit(name: EVENT_TYPE.ERROR, arg: ErrorInput): void;
  public emit(name: EVENT_TYPE.HTTP, arg: HttpInput): void;
  public emit(name: EVENT_TYPE.CLICK, arg: ClickInput): void;
  public emit(name: EVENT_TYPE.UNHANDLE_REJECTION, arg: UnhandleRejectionInput): void;
  public emit(name: EVENT_TYPE.RESOURCE_ERROR, arg: ResourceErrorInput): void;
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
    };

    // TODO: send
    console.log('result', result);
    // this.reporter.send(result);
  }
}
