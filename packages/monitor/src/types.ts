export enum EVENT_TYPE {
  ERROR = 'ERROR'
}

export interface WebMonitorOptions {

}

export interface Handler<T extends any = any> {
  name: EVENT_TYPE,
  init?: () => void;
  run: (arg: T) => void;
}