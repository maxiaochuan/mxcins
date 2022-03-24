/* TypeScript file generated from MxRC__Input__Search.res by genType. */
/* eslint-disable import/first */


import * as React from 'react';

// @ts-ignore: Implicit any on import
import * as MxRC__Input__SearchBS__Es6Import from './MxRC__Input__Search.bs';
const MxRC__Input__SearchBS: any = MxRC__Input__SearchBS__Es6Import;

import type {ConfigContext_size as MxRC__ConfigProvider_ConfigContext_size} from '../../src/config-provider/MxRC__ConfigProvider.gen';

import type {Synthetic_t as ReactEvent_Synthetic_t} from '../../src/shims/react.shim';

import type {node as MxRC__Input_node} from './MxRC__Input.gen';

// tslint:disable-next-line:interface-over-type-literal
export type Props = {
  readonly addonBefore?: MxRC__Input_node; 
  readonly onSearch?: (_1:string, _2:ReactEvent_Synthetic_t) => void; 
  readonly placeholder?: string; 
  readonly size?: MxRC__ConfigProvider_ConfigContext_size
};

export const make: React.ComponentType<{
  readonly addonBefore?: MxRC__Input_node; 
  readonly onSearch?: (_1:string, _2:ReactEvent_Synthetic_t) => void; 
  readonly placeholder?: string; 
  readonly size?: MxRC__ConfigProvider_ConfigContext_size
}> = MxRC__Input__SearchBS.make;
