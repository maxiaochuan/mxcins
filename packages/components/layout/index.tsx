import * as React from 'react';
import styled from 'styled-components';
import Header from './header';
import Footer from './footer';
import Content from './content';
import Sider from './sider';
import { LayoutProps } from './interface';
import { LayoutContext } from './hooks';

const BaseComponent = styled.section<{ $hasSider: boolean }>`
  display: flex;
  flex: auto;
  flex-direction: ${({ $hasSider }) => ($hasSider && 'row') || 'column'};
  min-height: 0;
  background: ${({ theme }) => theme['layout-background-color']};
`;

interface LayoutInterface extends React.FC<LayoutProps> {
  Header: typeof Header;
  Footer: typeof Footer;
  Content: typeof Content;
  Sider: typeof Sider;
}

const Layout: LayoutInterface = props => {
  const { hasSider, children, ...rest } = props;
  const [siders, setSiders] = React.useState<string[]>([]);

  const privide = React.useMemo(
    () => ({
      sider: {
        add: (id: string) => setSiders(prev => [...prev, id]),
        remove: (id: string) => setSiders(prev => prev.filter(i => i !== id)),
      },
    }),
    [setSiders],
  );

  return (
    <LayoutContext.Provider value={privide}>
      <BaseComponent $hasSider={hasSider || siders.length > 0} {...rest}>
        {children}
      </BaseComponent>
    </LayoutContext.Provider>
  );
};

Layout.Header = Header;
Layout.Footer = Footer;
Layout.Content = Content;
Layout.Sider = Sider;

export default Layout;
