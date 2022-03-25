/* TypeScript file generated from MxRC__Space.res by genType. */
/* eslint-disable import/first */


import * as React from 'react';

// @ts-ignore: Implicit any on import
import * as MxRC__SpaceBS__Es6Import from './MxRC__Space.bs';
const MxRC__SpaceBS: any = MxRC__SpaceBS__Es6Import;

import type {style as MxRC__Libs__React_style} from '../../src/_libs/MxRC__Libs__React.gen';

// tslint:disable-next-line:interface-over-type-literal
export type style = MxRC__Libs__React_style;

// tslint:disable-next-line:interface-over-type-literal
export type Props = {
  readonly align?: 
    "baseline"
  | "center"
  | "end"
  | "start"; 
  readonly children?: React.ReactNode; 
  readonly className?: string; 
  readonly direction?: 
    "horizontal"
  | "vertical"; 
  readonly size?: 
    "default"
  | "large"
  | "small"; 
  readonly split?: JSX.Element; 
  readonly style?: style; 
  readonly wrap?: boolean
};

export const make: React.ComponentType<{
  readonly align?: 
    "baseline"
  | "center"
  | "end"
  | "start"; 
  readonly children?: React.ReactNode; 
  readonly className?: string; 
  readonly direction?: 
    "horizontal"
  | "vertical"; 
  readonly size?: 
    "default"
  | "large"
  | "small"; 
  readonly split?: JSX.Element; 
  readonly style?: style; 
  readonly wrap?: boolean
}> = MxRC__SpaceBS.make;