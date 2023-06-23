/* eslint-disable @typescript-eslint/ban-ts-comment */
export const win = (() => {
  let win;
  if (typeof window !== 'undefined') {
    win = window;
    // @ts-expect-error
  } else if (typeof global !== 'undefined') {
    // @ts-expect-error
    win = global;
  } else if (typeof self !== 'undefined') {
    win = self;
  } else {
    win = {};
  }
  return win as Window;
})();

export const throttle = <F extends (this: any, ...args: any[]) => void>(fn: F, delay = 16): F => {
  let canRun = true;
  return function (this: any, ...args: any[]) {
    if (!canRun) return;
    fn.apply(this, args);
    canRun = false;
    setTimeout(() => {
      canRun = true;
    }, delay);
  } as F;
};
