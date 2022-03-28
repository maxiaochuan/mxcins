/* TypeScript file generated from MxRC__Grid__Row.res by genType. */
/* eslint-disable import/first */


import * as React from 'react';

// @ts-ignore: Implicit any on import
import * as MxRC__Grid__RowBS__Es6Import from './MxRC__Grid__Row.bs';
const MxRC__Grid__RowBS: any = MxRC__Grid__RowBS__Es6Import;

import type {BreakpointSub_breakpoint as MxWebapi_BreakpointSub_breakpoint} from '../../src/shims/mxwebapi.shim';

import type {Style_t as ReactDOM_Style_t} from '../../src/shims/react.shim';

// tslint:disable-next-line:interface-over-type-literal
export type mspace = [Array<[MxWebapi_BreakpointSub_breakpoint, number]>, Array<[MxWebapi_BreakpointSub_breakpoint, number]>];

// tslint:disable-next-line:interface-over-type-literal
export type Props = {
  readonly align?: 
    "center"
  | "end"
  | "start"; 
  readonly children?: React.ReactNode; 
  readonly className?: string; 
  readonly dynamicSpace?: mspace; 
  readonly justify?: 
    "center"
  | "end"
  | "space-around"
  | "space-between"
  | "start"; 
  readonly space?: [number, number]; 
  readonly style?: ReactDOM_Style_t; 
  readonly wrap?: boolean
};

export const make: React.ComponentType<{
  readonly align?: 
    "center"
  | "end"
  | "start"; 
  readonly children?: React.ReactNode; 
  readonly className?: string; 
  readonly dynamicSpace?: mspace; 
  readonly justify?: 
    "center"
  | "end"
  | "space-around"
  | "space-between"
  | "start"; 
  readonly space?: [number, number]; 
  readonly style?: ReactDOM_Style_t; 
  readonly wrap?: boolean
}> = MxRC__Grid__RowBS.make;
