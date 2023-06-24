import { UAParser } from 'ua-parser-js';
import { Base64 } from 'js-base64';
import pako from 'pako';

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

export const deviceInfo = new UAParser().getResult();

export const zip = (data: unknown): string => {
  if (data == null) return '';
  // 判断数据是否需要转为JSON
  const jsonstr =
    typeof data !== 'string' && typeof data !== 'number' ? JSON.stringify(data) : data;
  const str = Base64.encode(jsonstr.toString());
  const u8a = pako.gzip(str);
  const arr = Array.from(u8a);
  const result = arr.reduce((prev, v) => (prev += String.fromCharCode(v)), '');
  return Base64.btoa(result);
};

export const unzip = (b64: string): string => {
  const binstr = Base64.atob(b64);
  const char = binstr.split('').map(x => x.charCodeAt(0));
  const u8a = new Uint8Array(char);
  const data = pako.ungzip(u8a);

  const str = data.reduce((prev, v) => (prev += String.fromCharCode(v)), '');
  const result = Base64.decode(str);
  console.log('unzip', result);
  try {
    console.log('unzip', JSON.parse(result));
    return JSON.parse(result);
  } catch (err) {
    const error = err as Error;
    if (error?.message?.includes('Unexpected token o in JSON at position 0')) {
      return result;
    }
  }
  return result;
};
