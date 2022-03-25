/* TypeScript file generated from MxRC__Input.res by genType. */
/* eslint-disable import/first */


import * as React from 'react';

// @ts-ignore: Implicit any on import
import * as MxRC__InputBS__Es6Import from './MxRC__Input.bs';
const MxRC__InputBS: any = MxRC__InputBS__Es6Import;

import type {ConfigContext_size as MxRC__ConfigProvider_ConfigContext_size} from '../../src/config-provider/MxRC__ConfigProvider.gen';

import type {Focus_t as ReactEvent_Focus_t} from '../../src/shims/react.shim';

import type {Form_t as ReactEvent_Form_t} from '../../src/shims/react.shim';

import type {Keyboard_t as ReactEvent_Keyboard_t} from '../../src/shims/react.shim';

import type {htmlInputElement as Dom_htmlInputElement} from '../../src/shims/dom.shim';

import type {node as MxRC__Libs__React_node} from '../../src/_libs/MxRC__Libs__React.gen';

// tslint:disable-next-line:interface-over-type-literal
export type node = MxRC__Libs__React_node;

// tslint:disable-next-line:interface-over-type-literal
export type forward = {
  readonly focus: () => void; 
  readonly blur: () => void; 
  readonly input?: Dom_htmlInputElement
};

// tslint:disable-next-line:interface-over-type-literal
export type Props = {
  readonly addonAfter?: node; 
  readonly addonBefore?: node; 
  readonly className?: string; 
  readonly onBlur?: (_1:ReactEvent_Focus_t) => void; 
  readonly onChange?: (_1:ReactEvent_Form_t) => void; 
  readonly onKeyDown?: (_1:ReactEvent_Keyboard_t) => void; 
  readonly onPressEnter?: (_1:ReactEvent_Keyboard_t) => void; 
  readonly placeholder?: string; 
  readonly prefix?: node; 
  readonly size?: MxRC__ConfigProvider_ConfigContext_size; 
  readonly suffix?: node
};

export const make: React.ComponentType<{
  readonly addonAfter?: node; 
  readonly addonBefore?: node; 
  readonly className?: string; 
  readonly onBlur?: (_1:ReactEvent_Focus_t) => void; 
  readonly onChange?: (_1:ReactEvent_Form_t) => void; 
  readonly onKeyDown?: (_1:ReactEvent_Keyboard_t) => void; 
  readonly onPressEnter?: (_1:ReactEvent_Keyboard_t) => void; 
  readonly placeholder?: string; 
  readonly prefix?: node; 
  readonly size?: MxRC__ConfigProvider_ConfigContext_size; 
  readonly suffix?: node
}> = MxRC__InputBS.make;
