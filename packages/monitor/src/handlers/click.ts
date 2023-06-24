import { win } from '../common';
import { type EventHandler } from '../types';

const name = 'click';

const eh: EventHandler<'click'> = {
  name,
  init: monitor => {
    win.document.addEventListener('click', function (ev) {
      monitor.emit(name, ev);
    });
  },

  handle: ev => {
    const { target } = ev;
    if (target != null) {
      const { tagName, id, className } = target as Element;
      return { id, className, tagName };
    }
    return { id: '', className: '', tagName: '' };
  },
};

export default eh;
