/* TypeScript file generated from MxWebapi__Dom.res by genType. */
/* eslint-disable import/first */


// @ts-ignore: Implicit any on import
import * as Curry__Es6Import from 'rescript/lib/es6/curry.js';
const Curry: any = Curry__Es6Import;

// @ts-ignore: Implicit any on import
import * as MxWebapi__DomBS__Es6Import from './MxWebapi__Dom.bs';
const MxWebapi__DomBS: any = MxWebapi__DomBS__Es6Import;

import type {element as Dom_element} from '../../src/shims/dom.shim';

// tslint:disable-next-line:interface-over-type-literal
export type DomMover_point = 
    "tl"
  | "tc"
  | "tr"
  | "cl"
  | "cc"
  | "cr"
  | "bl"
  | "bc"
  | "br";

export const DomMover_align: (source:Dom_element, target:Dom_element, _3:{ readonly points: [DomMover_point, DomMover_point] }) => void = function (Arg1: any, Arg2: any, Arg3: any) {
  const result = Curry._3(MxWebapi__DomBS.DomMover.align, Arg1, Arg2, Arg3.points);
  return result
};
