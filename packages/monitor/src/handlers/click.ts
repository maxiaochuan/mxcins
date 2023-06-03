import { win } from '../common';
import { EVENT_TYPE, Handler } from '../types';

export interface ClickInput {
  ev: MouseEvent;
}

export interface ClickResult {
  ev: MouseEvent;
}

const ClickHandler: Handler<ClickInput, ClickResult> = {
  name: EVENT_TYPE.CLICK,
  init: (monitor) => {
    win.document.addEventListener('click', function(ev) {
      monitor.emit(EVENT_TYPE.CLICK, { ev });
    })
  },
  handle: ({ ev }) => {
    // const { message } = error;
    // const frames = ErrorStackParser.parse(error);
    // const { fileName: fname = '', columnNumber: column = 0, lineNumber: line = 0 } = frames[0];

    // TODO: 数据构建
    // const result = {
    //   fname,
    //   message,
    //   line,
    //   column,
    // }

    return { ev };
  }
}

export default ClickHandler;
