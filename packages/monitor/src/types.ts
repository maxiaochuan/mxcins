export enum EVENT_TYPE {
  ERROR = 'ERROR'
}

export interface ReporterOptions {
  reportURL: string;
}

export interface WebMonitorOptions extends ReporterOptions {}

export interface Handler<T extends any = any, R extends any = any> {
  name: EVENT_TYPE,
  init?: () => void;
  handle: (arg: T) => R;
}