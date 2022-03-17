import { ComponentType, Suspense, lazy, FC } from 'react';
import { Outlet } from 'react-router-dom';

const dynamic = <T extends ComponentType<any>>(
  factory: () => Promise<{ default: T }>,
  opts: { isLayout?: boolean, loading?: ComponentType<any> },
): FC => {
  const { isLayout = false, loading: Loading = () => <>Loading...</> } = opts;
  const RealComponent = lazy(factory) as ComponentType<any>;

  return () => {
    return (
      <Suspense fallback={<Loading />}>
        <RealComponent>{isLayout ? <Outlet /> : null}</RealComponent>
      </Suspense>
    );
  };
};

export default dynamic;
