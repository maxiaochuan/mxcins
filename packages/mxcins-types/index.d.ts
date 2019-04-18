declare module '@mxcins/types' {
  import * as H from 'history';
  import React from 'react';
  import { RouteComponentProps as BasicProps, StaticContext } from 'react-router';
  import { IRoute } from 'umi-types';
  export interface IRouteComponentProps<
    Params extends { [K in keyof Params]?: string } = {},
    C extends StaticContext = StaticContext,
    S = H.LocationState
  > extends BasicProps<Params, C, S> {
    route?: IRoute;
  }

  export type IReactComponent<P> =
    | React.StatelessComponent<P>
    | React.ComponentClass<P>
    | React.ClassicComponentClass<P>
    | React.SFC<P>;

  export * from 'umi-types';
  export * from 'type-fest';
}
