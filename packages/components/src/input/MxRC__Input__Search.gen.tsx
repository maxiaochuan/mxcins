/* TypeScript file generated from MxRC__Input__Search.res by genType. */
/* eslint-disable import/first */


import * as React from 'react';

// @ts-ignore: Implicit any on import
import * as MxRC__Input__SearchBS__Es6Import from './MxRC__Input__Search.bs';
const MxRC__Input__SearchBS: any = MxRC__Input__SearchBS__Es6Import;

import type {Config_size as MxRC__Input_Config_size} from './MxRC__Input.gen';

import type {Form_t as ReactEvent_Form_t} from '../../src/shims/react.shim';

import type {Synthetic_t as ReactEvent_Synthetic_t} from '../../src/shims/react.shim';

import type {node as MxRC__Input_node} from './MxRC__Input.gen';

import type {style as ReactDOM_style} from '../../src/shims/react.shim';

// tslint:disable-next-line:interface-over-type-literal
export type Props = {
  readonly addonBefore?: MxRC__Input_node; 
  readonly allowClear?: boolean; 
  readonly disabled?: boolean; 
  readonly loading?: boolean; 
  readonly onChange?: (_1:ReactEvent_Form_t) => void; 
  readonly onSearch?: (_1:string, _2:ReactEvent_Synthetic_t) => void; 
  readonly placeholder?: string; 
  readonly prefix?: MxRC__Input_node; 
  readonly size?: MxRC__Input_Config_size; 
  readonly style?: ReactDOM_style; 
  readonly suffix?: MxRC__Input_node; 
  readonly value?: string
};

export const make: React.ComponentType<{
  readonly addonBefore?: MxRC__Input_node; 
  readonly allowClear?: boolean; 
  readonly disabled?: boolean; 
  readonly loading?: boolean; 
  readonly onChange?: (_1:ReactEvent_Form_t) => void; 
  readonly onSearch?: (_1:string, _2:ReactEvent_Synthetic_t) => void; 
  readonly placeholder?: string; 
  readonly prefix?: MxRC__Input_node; 
  readonly size?: MxRC__Input_Config_size; 
  readonly style?: ReactDOM_style; 
  readonly suffix?: MxRC__Input_node; 
  readonly value?: string
}> = MxRC__Input__SearchBS.make;
