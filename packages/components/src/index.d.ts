import * as React from 'react'
import { make as ConfigProvider, Props as ConfigProviderProps } from './config-provider/MxRC__ConfigProvider.gen'
import { make as Affix, Props as AffixProps } from './affix/MxRC__Affix.gen'
import { Props as ButtonProps, ButtonType, ButtonShapeType } from './button/MxRC__Button.gen'

declare const Button: React.ForwardRefExoticComponent<React.PropsWithoutRef<ButtonProps> & React.RefAttributes<HTMLElement>>

export {
  ConfigProvider,
  Affix,
  Button,
}

export type {
  ConfigProviderProps,
  AffixProps,
  ButtonProps,
  ButtonType,
  ButtonShapeType,
}