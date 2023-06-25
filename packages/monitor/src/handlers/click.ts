import { win } from '../common';
import { type EventHandler } from '../types';

const name = 'click';

const eh: EventHandler<'click'> = {
  name,
  init: monitor => {
    win.document.addEventListener('click', function (ev) {
      monitor.emit(name, this);
    });
  },

  handle: ev => {
    const ele = ev.activeElement;
    if (ele == null) {
      return null;
    }
    const tag = ele.tagName.toLowerCase();

    if (tag === 'body') {
      return null;
    }

    return {
      info: { ele: ele.outerHTML },
      report: false,
    };
  },
};

export default eh;
