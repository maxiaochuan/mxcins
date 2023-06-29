import { win } from '../common';
import { type EventHandler } from '../types';

const getLocationHref = (): string => win.document.location.href;

const state = {
  lastHref: '',
};

const eh: EventHandler<'history'> = {
  name: 'history',
  init: monitor => {
    state.lastHref = getLocationHref();
    const prevonpopstate = win.onpopstate;
    win.onpopstate = function onpopstate(ev) {
      monitor.emit('history', getLocationHref());
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
