import * as React from 'react';
import { ConfigProvider } from '@mxcins/components';

const Layout: React.FC = props => {
  const { children } = props;
  return <ConfigProvider>{children}</ConfigProvider>;
};

export default Layout;
