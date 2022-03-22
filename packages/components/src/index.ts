import {
  make as ConfigProvider,
  Props as ConfigProviderProps,
} from './config-provider/MxRC__ConfigProvider.gen';
import { make as Affix, Props as AffixProps } from './affix/MxRC__Affix.gen';
import { Button, ButtonProps } from './button';
import { make as Divider, Props as DividerProps } from './divider/MxRC_Divider.gen';
import { Row, Col, RowProps, ColProps } from './grid';
import { Layout, LayoutProps, ContentProps, HeaderProps } from './layout';
import { Space, SpaceProps } from './space';

export { ConfigProvider, Affix, Button, Divider, Row, Col, Layout, Space };

export type {
  ConfigProviderProps,
  AffixProps,
  ButtonProps,
  DividerProps,
  RowProps,
  ColProps,
  LayoutProps,
  ContentProps,
  HeaderProps,
  SpaceProps,
};
