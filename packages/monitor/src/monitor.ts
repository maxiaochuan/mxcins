import type { MonitorConfig, EventHandler, EventHandlerConfig } from './types';
import dayjs from 'dayjs';
import {
  ClickHandler,
  ErrorHandler,
  HttpHandler,
  ResourceErrorHandler,
  UnhandleRejectionHandler,
} from './handlers';
import { deviceInfo } from './common';

export default class MonitorCore {
  private readonly conf: MonitorConfig;

  private readonly handlers = new Map<keyof EventHandlerConfig, EventHandler>();

  constructor(conf: MonitorConfig) {
    this.conf = conf;
    this.use(ClickHandler);
    this.use(ErrorHandler);
    this.use(HttpHandler);
    this.use(ResourceErrorHandler);
    this.use(UnhandleRejectionHandler);
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

    const result = {
      type: name,
      device: deviceInfo,
      info: handler.handle(...args),
      at: dayjs().toISOString(),
    };

    console.log('result', result);
  }
}
