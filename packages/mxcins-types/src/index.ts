import type * as H from 'history';

export type {
  Primitive,
  JsonObject,
  JsonArray,
  JsonValue,
  Class,
  TypedArray,
  ObservableLike,
  Merge,
  PartialDeep,
  ReadonlyDeep,
  Promisable,
  ValueOf,
  Stringified,
  PackageJson,
  TsConfigJson,
} from 'type-fest';

export const tuple = <T extends string[]>(...args: T) => args;

export interface IRoute {
  path?: string;
  component?: string;
  routes?: IRoute[];
  Routes?: string[];
  redirect?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface IStaticContext {
  statusCode?: number;
}

export interface IMatch<Params extends { [K in keyof Params]?: string } = {}> {
  params: Params;
  isExact: boolean;
  path: string;
  url: string;
}

export interface IRouteComponentProps<
  Params extends { [K in keyof Params]?: string } = {},
  C extends IStaticContext = IStaticContext,
  S = H.LocationState
> {
  history: H.History;
  location: H.Location<S> & { query: Partial<Record<string, string>> };
  match: IMatch<Params>;
  staticContext?: C;
  route?: IRoute;
}

export interface IRCPS<
  Params extends { [K in keyof Params]?: string } = {},
  C extends IStaticContext = IStaticContext,
  S = H.LocationState
> {
  history: H.History;
  location: H.Location<S> & { query: Partial<Record<string, string>> };
  match: IMatch<Params>;
  staticContext?: C;
  route?: IRoute;
}

export const ABSTRUSE_VALUE_TYPES = tuple(
  'string',
  'number',
  'boolean',
  'object',
  'array',
  'id',
  'name',
  'date',
  'datetime',
  'json',
  'unknown',
);

export type AbstruseValueType = typeof ABSTRUSE_VALUE_TYPES[number];
