/* TypeScript file generated from MxWebapi__Raf.res by genType. */
/* eslint-disable import/first */


// @ts-ignore: Implicit any on import
import * as Curry__Es6Import from 'rescript/lib/es6/curry.js';
const Curry: any = Curry__Es6Import;

// @ts-ignore: Implicit any on import
import * as MxWebapi__RafBS__Es6Import from './MxWebapi__Raf.bs';
const MxWebapi__RafBS: any = MxWebapi__RafBS__Es6Import;

import type {MutableMap_Int_key as Belt_MutableMap_Int_key} from '../../src/shims/belt.shim';

export const make: (_1:{ readonly times?: number }, _2:(() => void)) => number = function (Arg1: any, Arg2: any) {
  const result = Curry._2(MxWebapi__RafBS.make, Arg1.times, Arg2);
  return result
};

export const cancel: (id:Belt_MutableMap_Int_key) => void = MxWebapi__RafBS.cancel;

export const throttle: <a>(_1:{ readonly times?: number }, _2:((_1:a) => void), _3:a) => void = function <a>(Arg1: any, Arg2: any, Arg3: any) {
  const result = Curry._3(MxWebapi__RafBS.throttle, Arg1.times, Arg2, Arg3);
  return result
};

export const debounce: <a>(_1:{ readonly times?: number }, _2:((_1:a) => void), _3:a) => void = function <a>(Arg1: any, Arg2: any, Arg3: any) {
  const result = Curry._3(MxWebapi__RafBS.debounce, Arg1.times, Arg2, Arg3);
  return result
};
