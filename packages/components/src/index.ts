import { tw, apply } from 'twind';
import { css } from 'twind/css';

import { ConfigProvider, ConfigProviderProps } from './config-provider';
import { Affix, AffixProps } from './affix';
import { Button, ButtonProps } from './button';
import { Divider, DividerProps } from './divider';
import { Row, Col, RowProps, ColProps } from './grid';
import { Layout, LayoutProps, ContentProps, HeaderProps } from './layout';
import { Space, SpaceProps } from './space';
import { Input, InputProps, SearchProps } from './input';

export { ConfigProvider, Affix, Button, Divider, Row, Col, Layout, Space, Input };

export const Twind = {
  tw,
  apply,
  css,
};

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
  InputProps,
  SearchProps,
};
