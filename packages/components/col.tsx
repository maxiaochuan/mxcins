import React from 'react';
import styled from 'styled-components';
import { useColSize, RowContext } from './hooks';
import type { ColProps } from './interface';
import { col as styles, StyledColProps } from './styles';

interface BaseComponentProps extends StyledColProps, React.HTMLAttributes<HTMLDivElement> {}

const BaseComponent = styled.div<BaseComponentProps>`
  ${styles}
`;

const Col = React.forwardRef<HTMLDivElement, ColProps>((props, ref) => {
  const { xs, sm, md, lg, xl, xxl, flex, span, order, offset, ...rest } = props;
  const ctx = React.useContext(RowContext);
  const size = useColSize(props);

  return (
    <BaseComponent
      ref={ref}
      $gutter={ctx.gutter}
      {...rest}
      $flex={flex}
      $span={size.span}
      $order={size.order}
      $offset={size.offset}
    />
  );
});

export default Col;
