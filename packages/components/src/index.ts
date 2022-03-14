import * as React from 'react'
import type { BreakpointUtils_hash as BreakpointHash } from './_libs/MxRC__Libs__Utils.gen';
import { make as ConfigProvider, Props as ConfigProviderProps } from './config-provider/MxRC__ConfigProvider.gen'
import { make as Affix, Props as AffixProps } from './affix/MxRC__Affix.gen'
import { make as _Button, Props as ButtonProps, ButtonType, ButtonShapeType } from './button/MxRC__Button.gen'
import { make as Divider, Props as DividerProps } from './divider/MxRC_Divider.gen'
import { make as _Row, Props as _RowProps } from './grid/MxRC__Row.gen'

const Button: React.ForwardRefExoticComponent<React.PropsWithoutRef<ButtonProps> & React.RefAttributes<HTMLElement>> = _Button as any;

type gap = number | BreakpointHash

declare interface RowProps extends _RowProps<gap | [gap, gap]> {}

const Row: React.ComponentType<RowProps> = _Row

export {
  ConfigProvider,
  Affix,
  Button,
  Divider,
  Row,
}

export type {
  ConfigProviderProps,
  AffixProps,
  ButtonProps,
  ButtonType,
  ButtonShapeType,
  DividerProps,
  RowProps,
}