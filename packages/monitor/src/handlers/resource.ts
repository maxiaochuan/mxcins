import { win } from '../common';
import { type ResourceErrorEvent, type EventHandler } from '../types';

const RejectHandler: EventHandler<'resource'> = {
  name: 'resource',
  init: monitor => {
    win.addEventListener(
      'error',
      ev => {
        const ele = ev.target;
        if (ele instanceof HTMLScriptElement || ele instanceof HTMLImageElement) {
          monitor.emit('resource', ev as ResourceErrorEvent);
        }
      },
      true,
    );
  },
  handle: ev => {
    const result = {
      src: ev.target.src,
    };

    return result;
  },
};

export default RejectHandler;
