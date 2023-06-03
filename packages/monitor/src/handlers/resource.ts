import { win } from '../common';
import { EVENT_TYPE, Handler } from '../types';

export interface ResourceErrorInput {
  ev: Omit<ErrorEvent, 'target'> & { target: HTMLScriptElement | HTMLImageElement };
}

export interface ResourceErrorResult {
  src: string;
}

const RejectHandler: Handler<ResourceErrorInput, ResourceErrorResult> = {
  name: EVENT_TYPE.RESOURCE_ERROR,
  init: (monitor) => {
    win.addEventListener('error', (ev) => {
      const ele = ev.target;
      if (ele instanceof HTMLScriptElement || ele instanceof HTMLImageElement) {
        monitor.emit(EVENT_TYPE.RESOURCE_ERROR, { ev: ev as ResourceErrorInput['ev'] });
      }
    }, true);
  },
  handle: ({ ev }) => {
    // const { message } = error;
    // const frames = ErrorStackParser.parse(error);
    // const { fileName: fname = '', columnNumber: column = 0, lineNumber: line = 0 } = frames[0];

    const result = {
      src: ev.target.src,
    }

    return result;
  }
}

export default RejectHandler;
