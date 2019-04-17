declare module '@mxcins/types' {
  import * as H from 'history';
  import { RouteComponentProps as BasicProps, StaticContext } from 'react-router';
  import { IRoute } from 'umi-types';
  export interface IRCP<
    Params extends { [K in keyof Params]?: string } = {},
    C extends StaticContext = StaticContext,
    S = H.LocationState
  > extends BasicProps<Params, C, S> {
    route?: IRoute;
  }

  export * from 'umi-types';
  export * from 'type-fest';
}
