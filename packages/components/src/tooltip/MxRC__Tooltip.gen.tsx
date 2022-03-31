/* TypeScript file generated from MxRC__Tooltip.res by genType. */
/* eslint-disable import/first */


import * as React from 'react';

// @ts-ignore: Implicit any on import
import * as MxRC__TooltipBS__Es6Import from './MxRC__Tooltip.bs';
const MxRC__TooltipBS: any = MxRC__TooltipBS__Es6Import;

import type {element as Dom_element} from '../../src/shims/dom.shim';

// tslint:disable-next-line:interface-over-type-literal
export type Props = {
  readonly content: string; 
  readonly id: string; 
  readonly target: (null | undefined | Dom_element)
};

export const ToolipContent_make: React.ComponentType<{
  readonly content: string; 
  readonly id: string; 
  readonly target: (null | undefined | Dom_element)
}> = MxRC__TooltipBS.ToolipContent.make;

// tslint:disable-next-line:interface-over-type-literal
export type make_Props = { readonly children: React.ReactNode; readonly title?: string };

export const make: React.ComponentType<{ readonly children: React.ReactNode; readonly title?: string }> = MxRC__TooltipBS.make;

export const ToolipContent: { make: React.ComponentType<{
  readonly content: string; 
  readonly id: string; 
  readonly target: (null | undefined | Dom_element)
}> } = MxRC__TooltipBS.ToolipContent
