/* TypeScript file generated from MxRC__Grid__Row.res by genType. */
/* eslint-disable import/first */


import * as React from 'react';

// @ts-ignore: Implicit any on import
import * as MxRC__Grid__RowBS__Es6Import from './MxRC__Grid__Row.bs';
const MxRC__Grid__RowBS: any = MxRC__Grid__RowBS__Es6Import;

import type {breakpoint as MxLibs__BreakpointSub_breakpoint} from '@mxcins/webapi/src/breakpoint-sub/MxLibs__BreakpointSub.gen';

import type {style as MxRC__Libs__React_style} from '../../src/_libs/MxRC__Libs__React.gen';

// tslint:disable-next-line:interface-over-type-literal
export type style = MxRC__Libs__React_style;

// tslint:disable-next-line:interface-over-type-literal
export type mspace = [Array<[MxLibs__BreakpointSub_breakpoint, number]>, Array<[MxLibs__BreakpointSub_breakpoint, number]>];

// tslint:disable-next-line:interface-over-type-literal
export type Props = {
  readonly align?: 
    "center"
  | "end"
  | "start"; 
  readonly children?: React.ReactNode; 
  readonly className?: string; 
  readonly justify?: 
    "center"
  | "end"
  | "space-around"
  | "space-between"
  | "start"; 
  readonly mspace?: mspace; 
  readonly space?: [number, number]; 
  readonly style?: style; 
  readonly wrap?: boolean
};

export const make: React.ComponentType<{
  readonly align?: 
    "center"
  | "end"
  | "start"; 
  readonly children?: React.ReactNode; 
  readonly className?: string; 
  readonly justify?: 
    "center"
  | "end"
  | "space-around"
  | "space-between"
  | "start"; 
  readonly mspace?: mspace; 
  readonly space?: [number, number]; 
  readonly style?: style; 
  readonly wrap?: boolean
}> = MxRC__Grid__RowBS.make;
