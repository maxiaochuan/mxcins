/* TypeScript file generated from MxRC__Divider.res by genType. */
/* eslint-disable import/first */


import * as React from 'react';

// @ts-ignore: Implicit any on import
import * as MxRC__DividerBS__Es6Import from './MxRC__Divider.bs';
const MxRC__DividerBS: any = MxRC__DividerBS__Es6Import;

// tslint:disable-next-line:interface-over-type-literal
export type Props = {
  readonly type?: 
    "horizontal"
  | "vertical"; 
  readonly children?: React.ReactNode; 
  readonly className?: string; 
  readonly dashed?: boolean; 
  readonly orientation?: 
    "center"
  | "left"
  | "right"
};

export const make: React.ComponentType<{
  readonly type?: 
    "horizontal"
  | "vertical"; 
  readonly children?: React.ReactNode; 
  readonly className?: string; 
  readonly dashed?: boolean; 
  readonly orientation?: 
    "center"
  | "left"
  | "right"
}> = MxRC__DividerBS.make;