import * as React from 'react';
import { Outlet, Route } from 'react-router';

interface RouteConfig {
  key?: string;
  index?: boolean;
  path?: string;
  trunk: () => any;
  children?: RouteConfig[];
}

const routes: RouteConfig[] = [
  {
    path: '/',
    trunk: () => import('@/layouts'),
    children: [
      {
        key: 'home',
        index: true,
        trunk: () => import('@/pages/home'),
      },
      {
        path: '/components/button',
        trunk: () => import('@/pages/components/button'),
      },
      {
        path: '/webapi',
        trunk: () => import('@/pages/webapi'),
      },
    ],
  },
];

const make = (conf: RouteConfig) => {
  const { index, key, path, trunk, children } = conf;
  const Trunk = React.lazy(() => trunk());

  const element = children ? (
    <React.Suspense fallback={<>Loading...</>}>
      <Trunk children={<Outlet />} />
    </React.Suspense>
  ) : (
    <React.Suspense fallback={<>Loading...</>}>
      <Trunk />
    </React.Suspense>
  );

  return (
    <Route index={index} key={key || path} path={path} element={element}>
      {children?.map(make)}
    </Route>
  );
};

export default routes.map(make);
