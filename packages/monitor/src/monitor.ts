import type { MonitorConfig, EventHandler, EventHandlerConfig, ModifiedResult } from './types';
import dayjs from 'dayjs';
import {
  ClickHandler,
  ErrorHandler,
  HistoryHandler,
  HttpHandler,
  RecordScreenHandler,
  ResourceErrorHandler,
  UnhandleRejectionHandler,
} from './handlers';
import { deviceInfo as device } from './common';
import Reporter from './reporter';

export default class MonitorCore {
  private readonly handlers = new Map<keyof EventHandlerConfig, EventHandler>();

  private readonly reporter: Reporter;

  private readonly stack: ModifiedResult[] = [];

  private readonly hash = new Map<string, boolean>();

  public readonly conf: Required<MonitorConfig>;

  public hasError: boolean = false;

  public readonly cache: Record<string, any> = {};

  constructor(conf: MonitorConfig) {
    this.conf = {
      maxStackLength: 20,
      recordScreen: true,
      deduplicate: false,
      handleResponseStatusCode: ({ status }) => status,
      ...conf,
    };
    this.reporter = new Reporter(this.conf);
    this.use(ClickHandler);
    this.use(ErrorHandler);
    this.use(HistoryHandler);
    this.use(HttpHandler);
    this.use(ResourceErrorHandler);
    this.use(UnhandleRejectionHandler);
    if (this.conf.recordScreen) {
      this.use(RecordScreenHandler);
    }
  }

  public use<T extends keyof EventHandlerConfig>(handler: EventHandler<T>): this {
    const { name, init } = handler;
    if (this.handlers.has(name)) {
      console.warn(`a handler named ${name} already exists and will be overwritten!`);
    }

    if (init != null) {
      init(this);
    }

    this.handlers.set(name, handler);
    return this;
  }

  public emit<K extends keyof EventHandlerConfig>(
    name: K,
    ...args: EventHandlerConfig[K]['i']
  ): void {
    const handler = this.handlers.get(name);
    if (handler == null) {
      console.error(`no handler for : ${name}`);
      return;
    }

    const result = handler.handle(...args);
    if (result == null) {
      return;
    }

    const { info, report, sendOnly } = result;
    const at = dayjs().toISOString();
    const modified: ModifiedResult = { type: name, device, info, at };
    if (report) {
      if (sendOnly === true) {
        this.reporter.send(modified);
      } else {
        this.hasError = true;
        modified.stack = this.stack;
        modified.cache = this.cache;
        if (this.conf.deduplicate) {
          const hash = JSON.stringify(info);
          console.log('hash', hash);
          if (this.hash.get(hash) !== true) {
            this.reporter.send(modified);
            this.hash.set(hash, true);
          }
        } else {
          console.log('else');
          this.reporter.send(modified);
        }
      }
      // TODO: reporter
    } else {
      this.save(modified);
    }
  }

  private save(result: ModifiedResult): void {
    if (this.stack.length >= this.conf.maxStackLength) {
      this.stack.shift();
    }
    this.stack.push(result);
    this.stack.sort((a, b) => a.at.localeCompare(b.at));
  }
}
