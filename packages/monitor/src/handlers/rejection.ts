import ErrorStackParser from 'error-stack-parser';
import { win } from '../common';
import { EVENT_TYPE, Handler } from '../types';
import { ErrorResult } from './error';

export interface UnhandleRejectionInput {
  ev: PromiseRejectionEvent;
}

export interface UnhandleRejectionResult extends ErrorResult {}

const UnhandleRejectionHandler: Handler<UnhandleRejectionInput, UnhandleRejectionResult> = {
  name: EVENT_TYPE.UNHANDLE_REJECTION,
  init: (monitor) => {
    win.addEventListener('unhandledrejection', (ev) => {
      monitor.emit(EVENT_TYPE.UNHANDLE_REJECTION, { ev });
    })
  },
  handle: ({ ev }) => {
    const { reason } = ev;
    const frames = ErrorStackParser.parse(reason);
    const { fileName: fname = '', columnNumber: column = 0, lineNumber: line = 0 } = frames[0];
    const message = reason.message;

    const result = {
      fname,
      message,
      line,
      column,
    }

    return result;
  }
}

export default UnhandleRejectionHandler;
