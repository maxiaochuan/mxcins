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

export interface MonitorConfig extends ReporterConfig {}

declare global {
  interface XMLHttpRequest {
    __monitor: HttpEvent;
  }
}

export interface HttpEvent {
  url: string | URL;
  method: string;
  start: number;
  end?: number;
  elapsed?: number;
  request?: { data: any };
  response?: { status: number; data: any };
}

export interface ErrorResult {
  fname: string;
  message: string;
  line: number;
  column: number;
}

export type ResourceErrorEvent = Omit<ErrorEvent, 'target'> & {
  target: HTMLScriptElement | HTMLImageElement;
};

export interface EventHandlerConfig {
  click: { i: [ev: MouseEvent]; o: { id: string; tagName: string; className: string } };
  history: { i: [to: string]; o: { from: string; to: string } };
  http: { i: [ev: HttpEvent]; o: HttpEvent };
  error: { i: [error: Error]; o: ErrorResult };
  resource: { i: [ev: ResourceErrorEvent]; o: { src: string } };
  unhandledrejection: { i: [ev: PromiseRejectionEvent]; o: ErrorResult };
  [k: string]: { i: any[]; o: any };
}

export interface EventHandler<K extends keyof EventHandlerConfig = keyof EventHandlerConfig> {
  name: K;
  init?: (monitor: MonitorCore) => void;
  handle: (...args: EventHandlerConfig[K]['i']) => EventHandlerConfig[K]['o'];
}
