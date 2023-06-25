import { win } from '../common';
import { type EventHandler } from '../types';

const getLocationRef = (): string => document.location.href;

const state = {
  lastHref: getLocationRef(),
};

const eh: EventHandler<'history'> = {
  name: 'history',
  init: monitor => {
    const prevonpopstate = win.onpopstate;
    win.onpopstate = function onpopstate(ev) {
      console.log('emit on onpopstate');
      monitor.emit('history', getLocationRef());
      prevonpopstate?.apply(this, [ev]);
    };
    // const prevonhashchange = win.onhashchange;
    // win.onhashchange = function onhashchange(ev) {
    //   monitor.emit('history', getLocationRef());
    //   prevonhashchange?.apply(this, [ev]);
    // };

    const prevPushState = history.pushState;
    const prevReplaceState = history.replaceState;
    history.pushState = function pushState(...args) {
      const to = args[2];
      if (to != null) {
        monitor.emit('history', String(to));
      }
      prevPushState.apply(this, args);
    };
    history.replaceState = function replaceState(...args) {
      const to = args[2];
      if (to != null) {
        monitor.emit('history', String(to));
      }
      prevReplaceState.apply(this, args);
    };
  },

  handle: to => {
    const from = state.lastHref;
    const url = new URL(to, from);
    state.lastHref = url.toString();
    return { info: { from, to: url.toString() }, report: false };
  },
};

export default eh;
