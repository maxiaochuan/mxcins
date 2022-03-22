import * as React from 'react';
import styled from 'styled-components';
import { LayoutContext } from './hooks';
import { SiderProps } from './interface';

interface BaseComponentProps {
  $width: number;
  $collapsed: boolean;
  $collapsedWidth: number;
}

const BaseComponent = styled.aside.attrs<BaseComponentProps>(
  ({ $width, $collapsed, $collapsedWidth }) => ({
    $width: ($collapsed && $collapsedWidth) || $width,
  }),
)<BaseComponentProps>`
  position: relative;
  flex: ${({ $width }) => `0 0 ${$width}px`};
  width: ${({ $width }) => `${$width}px`};
  min-width: ${({ $width }) => `${$width}px`};
  max-width: ${({ $width }) => `${$width}px`};
  background: ${({ theme }) => theme['layout-sider-background-color']};
  transition: all 0.2s;
`;

const uid = (() => {
  let i = 0;
  return (prefix = '') => {
    i += 1;
    return `${prefix}${i}`;
  };
})();

const Sider = React.forwardRef<HTMLDivElement, SiderProps>((props, ref) => {
  const { width = 200, collapsed = false, collapsedWidth = 80, children, ...rest } = props;
  const ctx = React.useContext(LayoutContext);

  React.useEffect(() => {
    const id = uid('sider-');
    ctx.sider.add(id);
    return () => ctx.sider.remove(id);
  }, [ctx]);

  return (
    <BaseComponent
      ref={ref}
      $width={width}
      $collapsed={collapsed}
      $collapsedWidth={collapsedWidth}
      {...rest}
    >
      {children}
    </BaseComponent>
  );
});

export default Sider;
