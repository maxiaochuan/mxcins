/* TypeScript file generated from MxRC__Input__Search.res by genType. */
/* eslint-disable import/first */


import * as React from 'react';

// @ts-ignore: Implicit any on import
import * as MxRC__Input__SearchBS__Es6Import from './MxRC__Input__Search.bs';
const MxRC__Input__SearchBS: any = MxRC__Input__SearchBS__Es6Import;

import type {ConfigContext_size as MxRC__ConfigProvider_ConfigContext_size} from '../../src/config-provider/MxRC__ConfigProvider.gen';

import type {node as MxRC__Libs__React_node} from '../../src/_libs/MxRC__Libs__React.gen';

import type {style as MxRC__Libs__React_style} from '../../src/_libs/MxRC__Libs__React.gen';

// tslint:disable-next-line:interface-over-type-literal
export type style = MxRC__Libs__React_style;

// tslint:disable-next-line:interface-over-type-literal
export type Props = {
  readonly addonBefore?: MxRC__Libs__React_node; 
  readonly className?: string; 
  readonly placeholder?: string; 
  readonly size?: MxRC__ConfigProvider_ConfigContext_size; 
  readonly style?: style
};

export const make: React.ComponentType<{
  readonly addonBefore?: MxRC__Libs__React_node; 
  readonly className?: string; 
  readonly placeholder?: string; 
  readonly size?: MxRC__ConfigProvider_ConfigContext_size; 
  readonly style?: style
}> = MxRC__Input__SearchBS.make;
