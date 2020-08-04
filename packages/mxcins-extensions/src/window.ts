/* eslint-disable no-restricted-globals */

const win: Window & typeof globalThis = (() => {
  if (typeof window !== 'undefined') {
    return window;
  }
  if (typeof global !== 'undefined') {
    return global as never;
  }
  if (typeof self !== 'undefined') {
    return self as never;
  }
  return {} as never;
})();

export default win;
