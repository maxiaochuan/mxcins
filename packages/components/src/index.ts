import type { ForwardRefExoticComponent, RefAttributes, PropsWithoutRef } from 'react';
import {
  make as ConfigProvider,
  Props as ConfigProviderProps,
} from './config-provider/MxRC__ConfigProvider.gen';
import { make as Affix, Props as AffixProps } from './affix/MxRC__Affix.gen';
import {
  make as GenButton,
  Props as ButtonProps,
  ButtonType,
  ButtonShapeType,
} from './button/MxRC__Button.gen';
import { make as Divider, Props as DividerProps } from './divider/MxRC_Divider.gen';
import { Row, Col, RowProps, ColProps } from './grid';
import { Layout, LayoutProps, ContentProps, HeaderProps } from './layout';

const Button: ForwardRefExoticComponent<PropsWithoutRef<ButtonProps> & RefAttributes<HTMLElement>> =
  GenButton as any;

export { ConfigProvider, Affix, Button, Divider, Row, Col, Layout };

export type {
  ConfigProviderProps,
  AffixProps,
  ButtonProps,
  ButtonType,
  ButtonShapeType,
  DividerProps,
  RowProps,
  ColProps,
  LayoutProps,
  ContentProps,
  HeaderProps,
};
