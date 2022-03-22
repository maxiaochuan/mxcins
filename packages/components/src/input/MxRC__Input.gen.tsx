/* TypeScript file generated from MxRC__Input.res by genType. */
/* eslint-disable import/first */


import * as React from 'react';

// @ts-ignore: Implicit any on import
import * as MxRC__InputBS__Es6Import from './MxRC__Input.bs';
const MxRC__InputBS: any = MxRC__InputBS__Es6Import;

import type {ConfigContext_size as MxRC__ConfigProvider_ConfigContext_size} from '../../src/config-provider/MxRC__ConfigProvider.gen';

import type {style as MxRC__Libs__React_style} from '../../src/_libs/MxRC__Libs__React.gen';

// tslint:disable-next-line:interface-over-type-literal
export type style = MxRC__Libs__React_style;

// tslint:disable-next-line:interface-over-type-literal
export type Props = {
  readonly className?: string; 
  readonly placeholder?: string; 
  readonly size?: MxRC__ConfigProvider_ConfigContext_size; 
  readonly style?: style
};

export const make: React.ComponentType<{
  readonly className?: string; 
  readonly placeholder?: string; 
  readonly size?: MxRC__ConfigProvider_ConfigContext_size; 
  readonly style?: style
}> = MxRC__InputBS.make;
