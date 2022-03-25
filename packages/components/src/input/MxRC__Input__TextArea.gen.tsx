/* TypeScript file generated from MxRC__Input__TextArea.res by genType. */
/* eslint-disable import/first */


import * as React from 'react';

// @ts-ignore: Implicit any on import
import * as MxRC__Input__TextAreaBS__Es6Import from './MxRC__Input__TextArea.bs';
const MxRC__Input__TextAreaBS: any = MxRC__Input__TextAreaBS__Es6Import;

import type {ConfigContext_size as MxRC__ConfigProvider_ConfigContext_size} from '../../src/config-provider/MxRC__ConfigProvider.gen';

import type {Form_t as ReactEvent_Form_t} from '../../src/shims/react.shim';

// tslint:disable-next-line:interface-over-type-literal
export type Props = {
  readonly className?: string; 
  readonly defaultValue?: string; 
  readonly maxLength?: number; 
  readonly onChange?: (_1:ReactEvent_Form_t) => void; 
  readonly placeholder?: string; 
  readonly rows?: number; 
  readonly size?: MxRC__ConfigProvider_ConfigContext_size; 
  readonly value?: string
};

export const make: React.ComponentType<{
  readonly className?: string; 
  readonly defaultValue?: string; 
  readonly maxLength?: number; 
  readonly onChange?: (_1:ReactEvent_Form_t) => void; 
  readonly placeholder?: string; 
  readonly rows?: number; 
  readonly size?: MxRC__ConfigProvider_ConfigContext_size; 
  readonly value?: string
}> = MxRC__Input__TextAreaBS.make;
