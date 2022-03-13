/* TypeScript file generated from MxLibs__SingleResizeObserver.res by genType. */
/* eslint-disable import/first */


// @ts-ignore: Implicit any on import
import * as Curry__Es6Import from 'rescript/lib/es6/curry.js';
const Curry: any = Curry__Es6Import;

// @ts-ignore: Implicit any on import
import * as MxLibs__SingleResizeObserverBS__Es6Import from './MxLibs__SingleResizeObserver.bs';
const MxLibs__SingleResizeObserverBS: any = MxLibs__SingleResizeObserverBS__Es6Import;

import type {ResizeObserverEntry_t as MxLibs__ResizeObserver_ResizeObserverEntry_t} from '../../src/resize-observer/MxLibs__ResizeObserver.gen';

import type {element as Dom_element} from '../../src/shims/dom.shim';

// tslint:disable-next-line:interface-over-type-literal
export type ResizeListenerSet_resizeListener = (_1:MxLibs__ResizeObserver_ResizeObserverEntry_t) => void;
export type ResizeListenerType = ResizeListenerSet_resizeListener;

// tslint:disable-next-line:interface-over-type-literal
export type ResizeListenerSet_Id_t = ResizeListenerSet_resizeListener;

// tslint:disable-next-line:interface-over-type-literal
export type ElementResizeListenersMap_Id_t = Dom_element;

export const observe: (element:ElementResizeListenersMap_Id_t, listener:ResizeListenerSet_Id_t) => void = function (Arg1: any, Arg2: any) {
  const result = Curry._2(MxLibs__SingleResizeObserverBS.observe, Arg1, Arg2);
  return result
};

export const unobserve: (element:ElementResizeListenersMap_Id_t, listener:((_1:MxLibs__ResizeObserver_ResizeObserverEntry_t) => void)) => void = function (Arg1: any, Arg2: any) {
  const result = Curry._2(MxLibs__SingleResizeObserverBS.unobserve, Arg1, Arg2);
  return result
};
