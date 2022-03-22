import * as React from 'react'
import { make as ConfigProvider, Props as ConfigProviderProps } from './config-provider/MxRC__ConfigProvider.gen'
import { make as Affix, Props as AffixProps } from './affix/MxRC__Affix.gen'
import { make as _Button, Props as ButtonProps, ButtonType, ButtonShapeType } from './button/MxRC__Button.gen'
import { make as Divider, Props as DividerProps } from './divider/MxRC_Divider.gen'
import { Row, Col, RowProps, ColProps } from './grid';

const Button: React.ForwardRefExoticComponent<React.PropsWithoutRef<ButtonProps> & React.RefAttributes<HTMLElement>> = _Button as any;

export {
  ConfigProvider,
  Affix,
  Button,
  Divider,
  Row,
  Col,
}

export type {
  ConfigProviderProps,
  AffixProps,
  ButtonProps,
  ButtonType,
  ButtonShapeType,
  DividerProps,
  RowProps,
  ColProps,
}