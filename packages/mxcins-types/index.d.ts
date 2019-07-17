import * as H from 'history';
import React from 'react';
import { RouteComponentProps, StaticContext } from 'react-router';

export * from 'type-fest';

export interface IRoute {
  path?: string;
  component?: string;
  routes?: IRoute[];
  Routes?: string[];
  redirect?: string;
  [key: string]: any;
}

export interface IObjectType<V = any> {
  [x: string]: V;
}

export interface IRouteComponentProps<
  Params extends { [K in keyof Params]?: string } = {},
  C extends StaticContext = StaticContext,
  S = H.LocationState
> extends RouteComponentProps<Params, C, S> {
  route?: IRoute;
}

export type IReactComponent<P> =
  | React.StatelessComponent<P>
  | React.ComponentClass<P>
  | React.ClassicComponentClass<P>
  | React.SFC<P>;
