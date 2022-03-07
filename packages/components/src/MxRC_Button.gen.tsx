/* TypeScript file generated from MxRC_Button.res by genType. */
/* eslint-disable import/first */


import * as React from 'react';

// @ts-ignore: Implicit any on import
import * as MxRC_ButtonBS__Es6Import from './MxRC_Button.bs';
const MxRC_ButtonBS: any = MxRC_ButtonBS__Es6Import;

import type {ConfigContext_size as MxRC__ConfigProvider_ConfigContext_size} from './MxRC__ConfigProvider.gen';

import type {style as MxRC_React_style} from '../src/libs/MxRC_React.gen';

// tslint:disable-next-line:interface-over-type-literal
export type _type = 
    "default"
  | "primary"
  | "dashed"
  | "text"
  | "link";

// tslint:disable-next-line:interface-over-type-literal
export type style = MxRC_React_style;

// tslint:disable-next-line:interface-over-type-literal
export type Props = {
  readonly type?: _type; 
  readonly block?: boolean; 
  readonly children?: React.ReactNode; 
  readonly danger?: boolean; 
  readonly disabled?: boolean; 
  readonly size?: MxRC__ConfigProvider_ConfigContext_size; 
  readonly style?: style
};

export const make: React.ComponentType<{
  readonly type?: _type; 
  readonly block?: boolean; 
  readonly children?: React.ReactNode; 
  readonly danger?: boolean; 
  readonly disabled?: boolean; 
  readonly size?: MxRC__ConfigProvider_ConfigContext_size; 
  readonly style?: style
}> = MxRC_ButtonBS.make;
