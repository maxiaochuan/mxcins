import { ComponentType, Suspense, lazy, FC } from 'react';
import { Outlet } from 'react-router';

const dynamic = <T extends ComponentType<any>>(
  factory: () => Promise<{ default: T }>,
  opts: { isLayout?: boolean } = {},
): FC => {
  const { isLayout = false } = opts;
  const RealComponent = lazy(factory) as ComponentType<any>;
  return () => {
    return (
      <Suspense fallback={<>loading...</>}>
        <RealComponent>{isLayout ? <Outlet /> : null}</RealComponent>
      </Suspense>
    );
  };
};

export default dynamic;
