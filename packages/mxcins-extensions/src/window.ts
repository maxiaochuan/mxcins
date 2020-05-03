/* eslint-disable no-restricted-globals */

const win: Window & typeof globalThis = (() => {
  if (typeof window !== 'undefined') {
    return window;
  }
  if (typeof global !== 'undefined') {
    return global as any;
  }
  if (typeof self !== 'undefined') {
    return self as any;
  }
  return {} as any;
})();

export default win;
