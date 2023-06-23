import { win } from '../common';
import { type EventHandler } from '../types';

const name = 'click';

const eh: EventHandler<'click'> = {
  name,
  init: monitor => {
    win.document.addEventListener('click', ev => {
      monitor.emit(name, ev);
    });
  },

  handle: ev => {
    return { ev };
  },
};

export default eh;
