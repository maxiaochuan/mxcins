import { make as BasicLayout } from './MxRC__Layout.gen';
import type { Props as LayoutProps } from './MxRC__Layout.gen';
import { make as Content } from './MxRC__Layout__Content.gen';
import type { Props as ContentProps } from './MxRC__Layout__Content.gen';
import { make as Header } from './MxRC__Layout__Header.gen';
import type { Props as HeaderProps } from './MxRC__Layout__Header.gen';
import { make as Footer } from './MxRC__Layout__Footer.gen';
import type { Props as FooterProps } from './MxRC__Layout__Footer.gen';
import { make as Sider } from './MxRC__Layout__Sider.gen';
import type { Props as SiderProps } from './MxRC__Layout__Sider.gen';

const Layout: typeof BasicLayout & {
  Content: typeof Content;
  Header: typeof Header;
  Footer: typeof Footer;
  Sider: typeof Sider;
} = BasicLayout as any;

Layout.Content = Content;
Layout.Header = Header;
Layout.Footer = Footer;
Layout.Sider = Sider;

export { Layout };

export type { LayoutProps, ContentProps, HeaderProps, FooterProps, SiderProps };
