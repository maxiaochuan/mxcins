export interface RoutesOptions {
  routes: Route[];
}

export interface Route {
  key?: string;
  index?: boolean;
  path?: string;
  component?: string;
  wrappers?: string[];
  routes?: Route[];
}