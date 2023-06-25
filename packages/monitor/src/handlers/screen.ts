import { record } from 'rrweb';
import { type EventHandler } from '../types';
import { nanoid } from 'nanoid';
import { zip } from '../common';

const eh: EventHandler<'screen'> = {
  name: 'screen',
  init: monitor => {
    monitor.cache.screenId = nanoid();
    let events: any[] = [];
    record({
      recordCanvas: true,
      checkoutEveryNms: 10_000,
      emit(e, isCheckout) {
        if (isCheckout ?? false) {
          if (monitor.hasError) {
            monitor.emit('screen', {
              id: monitor.cache.screenId,
              events,
            });

            monitor.cache.screenId = nanoid();
            events = [];
            monitor.hasError = false;
          } else {
            events = [];
            monitor.cache.screenId = nanoid();
          }
        }
        events.push(e);
      },
    });
  },

  handle: ev => {
    const { id, events } = ev;
    return {
      info: { id, events: zip(events) },
      report: true,
      sendOnly: true,
    };
  },
};

export default eh;
