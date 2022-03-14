import * as React from 'react';
import { ConfigProvider } from '@mxcins/components/src';

const Layout: React.FC = props => {
  const { children } = props;
  return <ConfigProvider>{children}</ConfigProvider>;
};

export default Layout;
