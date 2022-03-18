/* TypeScript file generated from MxRC__Row.res by genType. */
/* eslint-disable import/first */


import * as React from 'react';

// @ts-ignore: Implicit any on import
import * as MxRC__RowBS__Es6Import from './MxRC__Row.bs';
const MxRC__RowBS: any = MxRC__RowBS__Es6Import;

import type {style as MxRC__Libs__React_style} from '../../src/_libs/MxRC__Libs__React.gen';

// tslint:disable-next-line:interface-over-type-literal
export type style = MxRC__Libs__React_style;

// tslint:disable-next-line:interface-over-type-literal
export type Props<spacing> = {
  readonly align?: 
    "center"
  | "end"
  | "start"; 
  readonly children?: React.ReactNode; 
  readonly className?: string; 
  readonly justify?: 
    "center"
  | "end"
  | "spacing-around"
  | "spacing-between"
  | "start"; 
  readonly spacing?: spacing; 
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
  | "spacing-around"
  | "spacing-between"
  | "start"; 
  readonly spacing?: any; 
  readonly style?: style; 
  readonly wrap?: boolean
}> = MxRC__RowBS.make;
