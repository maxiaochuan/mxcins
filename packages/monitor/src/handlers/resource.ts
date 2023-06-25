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
    const info = {
      src: ev.target.src,
    };

    return { info, report: true };
  },
};

export default RejectHandler;
