import { tw, apply } from 'twind';
import { css } from 'twind/css';

import { ConfigProvider, ConfigProviderProps } from './config-provider';
import { Affix, AffixProps } from './affix';
import { Button, ButtonProps } from './button';
import { Divider, DividerProps } from './divider';
import { Row, Col, RowProps, ColProps } from './grid';
import { Layout, LayoutProps, ContentProps, HeaderProps } from './layout';
import { Space, SpaceProps } from './space';
import { Input, InputActionRef, InputProps, SearchProps } from './input';
import { Tooltip, TooltipProps } from './tooltip';
import { Card, CardProps } from './card';
import {
  Form,
  FormProps,
  FormField,
  FormFieldProps,
  FormText,
  FormTextProps,
  FormPassword,
  FormTextPasswordProps,
} from './form';

export {
  ConfigProvider,
  Affix,
  Button,
  Divider,
  Row,
  Col,
  Layout,
  Space,
  Input,
  Tooltip,
  Card,
  Form,
  FormField,
  FormText,
  FormPassword,
};

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
  InputActionRef,
  SearchProps,
  TooltipProps,
  CardProps,
  FormProps,
  FormFieldProps,
  FormTextProps,
  FormTextPasswordProps,
};
