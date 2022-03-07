import * as React from 'react'
import { make as ConfigProvider, Props as ConfigProviderProps } from './MxRC__ConfigProvider.gen'
import { Props as ButtonProps, ButtonType } from './MxRC_Button.gen'

export const Button: React.ForwardRefExoticComponent<React.PropsWithoutRef<ButtonProps> & React.RefAttributes<HTMLElement>>

export {
  ConfigProvider,
}

export type {
  ConfigProviderProps,
  ButtonProps,
  ButtonType,
}