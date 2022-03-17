import { ComponentType, Suspense, lazy, FC } from 'react';

const dynamic = <T extends ComponentType<any>>(
  factory: () => Promise<{ default: T }>,
  opts: { loading?: ComponentType<any> },
): FC => {
  const { loading: Loading = () => <>Loading...</> } = opts;
  const RealComponent = lazy(factory) as ComponentType<any>;

  return () => {
    return (
      <Suspense fallback={<Loading />}>
        <RealComponent />
      </Suspense>
    );
  };
};

export default dynamic;
