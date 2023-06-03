export const win = (() => {
  let win;
  if (typeof window !== 'undefined') {
    win = window;
  } else if (typeof global !== 'undefined') {
    win = global;
  } else if (typeof self !== 'undefined') {
    win = self;
  } else {
    win = {};
  }
  return win as Window;
})();

export const throttle = <F extends (...args: any[]) => void>(fn: F, delay = 16) => {
  let canRun = true;
  return function (this: any, ...args: any[]) {
    if (!canRun) return;
    fn.apply(this, args);
    canRun = false;
    setTimeout(() => {
      canRun = true;
    }, delay);
  };
};
