import type UAParser from 'ua-parser-js';
import type MonitorCore from './monitor';

// type RecordToUnion<T extends Record<string, any>> = T[keyof T]
// type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void
//   ? I
//   : never
// type Emits<T extends Record<string, any>> = UnionToIntersection<
// RecordToUnion<{
//   [K in keyof T]: (evt: K, ...args: T[K]) => void;
// }>
// >

export interface ReporterConfig {
  reportURL: string;
}

export interface MonitorConfig extends ReporterConfig {
  maxStackLength?: number;
  recordScreen?: boolean;
}

declare global {
  interface XMLHttpRequest {
    __monitor: HttpEvent;
  }
}

export interface HttpEvent {
  url: string | URL;
  method: string;
  start: number;
  status: number;
  type: 'xhr' | 'fetch';
  end?: number;
  elapsed?: number;
  request?: any;
  response?: any;
}

export interface HttpResult {
  url: string;
  time: string;
  elapsed: number;
  message: string;
  request: {
    type: 'xhr' | 'fetch';
    method: string;
    data: string;
  };
  response: {
    status: number;
    data: string | null;
  };
}

export interface ErrorResult {
  fname: string;
  message: string;
  line: number;
  column: number;
}

export interface ClickResult {
  id: string;
  tagName: string;
  className: string;
}

export interface HistoryResult {
  from: string;
  to: string;
}

export type ResourceErrorEvent = Omit<ErrorEvent, 'target'> & {
  target: HTMLScriptElement | HTMLImageElement;
};

export interface RecordScreenEvent {
  id: string;
  events: any[];
}

type DeviceInfo = UAParser.IResult;

export interface StackResult<T = any> {
  type: keyof EventHandlerConfig;
  device: DeviceInfo;
  info: T;
  at: string;
  stack?: StackResult[];
  cache?: any;
}

export interface HandleResult<T> {
  result: T;
  report: boolean;
  sendOnly?: boolean;
}

interface Conf<I, O> {
  i: I;
  o: HandleResult<O>;
}

export interface EventHandlerConfig {
  screen: Conf<[ev: RecordScreenEvent], { id: string; events: string }>;
  click: Conf<[ev: MouseEvent], ClickResult>;
  history: Conf<[to: string], HistoryResult>;
  http: Conf<[ev: HttpEvent], HttpResult>;
  error: Conf<[error: Error], ErrorResult>;
  resource: Conf<[ev: ResourceErrorEvent], { src: string }>;
  unhandledrejection: Conf<[ev: PromiseRejectionEvent], ErrorResult>;
  [k: string]: Conf<any[], any>;
}

export interface EventHandler<K extends keyof EventHandlerConfig = keyof EventHandlerConfig> {
  name: K;
  init?: (monitor: MonitorCore) => void;
  handle: (...args: EventHandlerConfig[K]['i']) => EventHandlerConfig[K]['o'];
}
