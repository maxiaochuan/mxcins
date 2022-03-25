/* TypeScript file generated from MxWebapi__SingleResizeObserver.res by genType. */
/* eslint-disable import/first */


// @ts-ignore: Implicit any on import
import * as Curry__Es6Import from 'rescript/lib/es6/curry.js';
const Curry: any = Curry__Es6Import;

// @ts-ignore: Implicit any on import
import * as MxWebapi__SingleResizeObserverBS__Es6Import from './MxWebapi__SingleResizeObserver.bs';
const MxWebapi__SingleResizeObserverBS: any = MxWebapi__SingleResizeObserverBS__Es6Import;

import type {ResizeObserver_ResizeObserverEntry_t as Webapi_ResizeObserver_ResizeObserverEntry_t} from 'rescript-webapi/src/Webapi.gen';

import type {element as Dom_element} from '../../src/shims/dom.shim';

// tslint:disable-next-line:interface-over-type-literal
export type ResizeListenerSet_resizeListener = (_1:Webapi_ResizeObserver_ResizeObserverEntry_t) => void;
export type ResizeListenerType = ResizeListenerSet_resizeListener;

// tslint:disable-next-line:interface-over-type-literal
export type ResizeListenerSet_Id_t = ResizeListenerSet_resizeListener;

// tslint:disable-next-line:interface-over-type-literal
export type ElementResizeListenersMap_Id_t = Dom_element;

export const observe: (element:ElementResizeListenersMap_Id_t, listener:ResizeListenerSet_Id_t) => void = function (Arg1: any, Arg2: any) {
  const result = Curry._2(MxWebapi__SingleResizeObserverBS.observe, Arg1, Arg2);
  return result
};

export const unobserve: (element:ElementResizeListenersMap_Id_t, listener:((_1:Webapi_ResizeObserver_ResizeObserverEntry_t) => void)) => void = function (Arg1: any, Arg2: any) {
  const result = Curry._2(MxWebapi__SingleResizeObserverBS.unobserve, Arg1, Arg2);
  return result
};
