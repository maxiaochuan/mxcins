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

import type {ReactNode as $$node} from 'react';

import type {htmlInputElement as Dom_htmlInputElement} from '../../src/shims/dom.shim';

import type {style as ReactDOM_style} from '../../src/shims/react.shim';

// tslint:disable-next-line:interface-over-type-literal
export type inputRef = {
  readonly focus: () => void; 
  readonly blur: () => void; 
  readonly input?: Dom_htmlInputElement
};
export type InputRef = inputRef;

// tslint:disable-next-line:interface-over-type-literal
export type _type = "text" | "password";
export type InputType = _type;

// tslint:disable-next-line:interface-over-type-literal
export type status = "default" | "warning" | "error";
export type InputStatusType = status;

// tslint:disable-next-line:interface-over-type-literal
export type node = $$node;

// tslint:disable-next-line:interface-over-type-literal
export type Props = {
  readonly type?: _type; 
  readonly addonAfter?: node; 
  readonly addonAfterNoStyle?: boolean; 
  readonly addonBefore?: node; 
  readonly addonBeforeNoStyle?: boolean; 
  readonly allowClear?: boolean; 
  readonly className?: string; 
  readonly defaultValue?: string; 
  readonly disabled?: boolean; 
  readonly groupStyle?: ReactDOM_style; 
  readonly maxLength?: number; 
  readonly onBlur?: (_1:ReactEvent_Focus_t) => void; 
  readonly onChange?: (_1:ReactEvent_Form_t) => void; 
  readonly onFocus?: (_1:ReactEvent_Focus_t) => void; 
  readonly onKeyDown?: (_1:ReactEvent_Keyboard_t) => void; 
  readonly onPressEnter?: (_1:ReactEvent_Keyboard_t) => void; 
  readonly placeholder?: string; 
  readonly prefix?: node; 
  readonly size?: MxRC__ConfigProvider_ConfigContext_size; 
  readonly status?: 
    "default"
  | "error"
  | "warning"; 
  readonly suffix?: node; 
  readonly value?: string
};

export const make: React.ComponentType<{
  readonly type?: _type; 
  readonly addonAfter?: node; 
  readonly addonAfterNoStyle?: boolean; 
  readonly addonBefore?: node; 
  readonly addonBeforeNoStyle?: boolean; 
  readonly allowClear?: boolean; 
  readonly className?: string; 
  readonly defaultValue?: string; 
  readonly disabled?: boolean; 
  readonly groupStyle?: ReactDOM_style; 
  readonly maxLength?: number; 
  readonly onBlur?: (_1:ReactEvent_Focus_t) => void; 
  readonly onChange?: (_1:ReactEvent_Form_t) => void; 
  readonly onFocus?: (_1:ReactEvent_Focus_t) => void; 
  readonly onKeyDown?: (_1:ReactEvent_Keyboard_t) => void; 
  readonly onPressEnter?: (_1:ReactEvent_Keyboard_t) => void; 
  readonly placeholder?: string; 
  readonly prefix?: node; 
  readonly size?: MxRC__ConfigProvider_ConfigContext_size; 
  readonly status?: 
    "default"
  | "error"
  | "warning"; 
  readonly suffix?: node; 
  readonly value?: string
}> = MxRC__InputBS.make;
