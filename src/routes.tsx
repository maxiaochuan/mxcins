import * as React from 'react';
import { Outlet, Route, RouteProps } from 'react-router';

interface RouteConfig {
  path: string;
  trunk: () => any;
  children?: RouteConfig[];
}

const routes: RouteConfig[] = [
  {
    path: "/",
    trunk: () => import('@/layouts'),
    children: [
      {
        path: '/libs',
        trunk: () => import('@/pages/libs'),
      }
    ],
  }
]

const make = (conf: RouteConfig) => {
  const { path, trunk, children } = conf;
  const Trunk = React.lazy(() => {
    const r = trunk();
    console.log('trunk', r)
    return r;
  });

  const element = children ? (
    <React.Suspense fallback={<>Loading...</>}>
      <Trunk children={<Outlet />} />
    </React.Suspense>
  ) : (
    <React.Suspense fallback={<>Loading...</>}>
      <Trunk />
    </React.Suspense>
  )

  return (
    <Route key={path} path={path} element={element}>
      {children?.map(make)}
    </Route>
  )
}

export default routes.map(make)
