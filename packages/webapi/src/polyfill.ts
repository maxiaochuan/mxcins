import ResizeObserver from 'resize-observer-polyfill';

var win: any;

if (typeof window !== "undefined") {
    win = window;
} else if (typeof global !== "undefined") {
    win = global as any;
} else if (typeof self !== "undefined"){
    win = self as any;
} else {
    win = {} as any;
}

if (!Object.prototype.hasOwnProperty.call(win, 'ResizeObserver')) {
  win.ResizeObserver = ResizeObserver;
}
