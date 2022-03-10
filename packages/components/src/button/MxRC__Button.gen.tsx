/* TypeScript file generated from MxRC__Button.res by genType. */
/* eslint-disable import/first */


import * as React from 'react';

// @ts-ignore: Implicit any on import
import * as MxRC__ButtonBS__Es6Import from './MxRC__Button.bs';
const MxRC__ButtonBS: any = MxRC__ButtonBS__Es6Import;

import type {ConfigContext_size as MxRC__ConfigProvider_ConfigContext_size} from '../../src/config-provider/MxRC__ConfigProvider.gen';

import type {style as MxRC__Libs__React_style} from '../../src/_libs/MxRC__Libs__React.gen';

// tslint:disable-next-line:interface-over-type-literal
export type _type = 
    "default"
  | "primary"
  | "dashed"
  | "text"
  | "link";
export type ButtonType = _type;

// tslint:disable-next-line:interface-over-type-literal
export type shape = "default" | "circle" | "round";
export type ButtonShapeType = shape;

// tslint:disable-next-line:interface-over-type-literal
export type style = MxRC__Libs__React_style;

// tslint:disable-next-line:interface-over-type-literal
export type evt = MouseEvent;

// tslint:disable-next-line:interface-over-type-literal
export type onClick = (_1:evt) => void;

// tslint:disable-next-line:interface-over-type-literal
export type Props = {
  readonly type?: _type; 
  readonly block?: boolean; 
  readonly children?: React.ReactNode; 
  readonly className?: string; 
  readonly danger?: boolean; 
  readonly disabled?: boolean; 
  readonly ghost?: boolean; 
  readonly icon?: JSX.Element; 
  readonly loading?: boolean; 
  readonly onClick?: onClick; 
  readonly shape?: shape; 
  readonly size?: MxRC__ConfigProvider_ConfigContext_size; 
  readonly style?: style
};

export const make: React.ComponentType<{
  readonly type?: _type; 
  readonly block?: boolean; 
  readonly children?: React.ReactNode; 
  readonly className?: string; 
  readonly danger?: boolean; 
  readonly disabled?: boolean; 
  readonly ghost?: boolean; 
  readonly icon?: JSX.Element; 
  readonly loading?: boolean; 
  readonly onClick?: onClick; 
  readonly shape?: shape; 
  readonly size?: MxRC__ConfigProvider_ConfigContext_size; 
  readonly style?: style
}> = MxRC__ButtonBS.make;
