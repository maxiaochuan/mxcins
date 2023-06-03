import type WebMonitor from './monitor';

export enum EVENT_TYPE {
  ERROR = 'ERROR',
  HTTP = 'HTTP',
  CLICK = 'CLICK',
  UNHANDLE_REJECTION = ' UNHANDLE_REJECTION',
  RESOURCE_ERROR = 'RESOURCE_ERROR',
}

export interface ReporterOptions {
  reportURL: string;
}

export interface WebMonitorOptions extends ReporterOptions {}

export interface Handler<T extends any = any, R extends any = any> {
  name: EVENT_TYPE;
  init?: (monitor: WebMonitor) => void;
  handle: (arg: T) => R;
}
