import * as React from 'react';
import styled from 'styled-components';
import { LoadingOutlined } from '@ant-design/icons';
import Motion from 'rc-motion';
import { keyframes } from '../style';

const TransitionBody = styled.span<{ iconOnly: boolean }>`
  transition: all 0.3s ${({ theme }) => theme['ease-in-out']};
  .anticon {
    padding-right: ${({ theme, iconOnly }) => (iconOnly ? '0' : theme['padding-horizontal-xs'])};
    animation: none;
    svg {
      animation: ${keyframes.rotate} 1s infinite linear;
    }
  }
`;

const getCollapsedWidth = () => ({ width: 0, opacity: 0, transform: 'scale(0)' });
const getRealWidth = (node: HTMLElement) => ({
  width: node.scrollWidth,
  opacity: 1,
  transform: 'scale(1)',
});

const LoadingComponent: React.FC<{
  loading: boolean;
  exist: boolean;
  iconOnly: boolean;
}> = props => {
  const { exist, loading, iconOnly } = props;
  const visible = !!loading;
  if (exist) {
    return (
      <TransitionBody iconOnly={iconOnly}>
        <LoadingOutlined />
      </TransitionBody>
    );
  }

  return (
    <Motion
      visible={visible}
      motionName="motion"
      removeOnLeave
      onAppearStart={getCollapsedWidth}
      onAppearActive={getRealWidth}
      onEnterStart={getCollapsedWidth}
      onEnterActive={getRealWidth}
      onLeaveStart={getRealWidth}
      onLeaveActive={getCollapsedWidth}
    >
      {({ style }, ref: unknown) => (
        <TransitionBody
          style={style}
          ref={ref as React.MutableRefObject<HTMLSpanElement>}
          iconOnly={iconOnly}
        >
          <LoadingOutlined />
        </TransitionBody>
      )}
    </Motion>
  );
};

export default LoadingComponent;
