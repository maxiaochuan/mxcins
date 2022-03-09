/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/button-has-type */
import * as React from 'react';
import styled from 'styled-components';
import {
  AnchorButtonProps,
  ButtonProps,
  NativeButtonProps,
  StyledButtonProps,
  BUTTON_HTML_TYPES,
  BUTTON_TYPES,
  SHAPE_TYPES,
} from './interface';
import { styles } from './styles';
import { useLoading } from './hooks';
import { isAnchor, isIconOnly, isUnbordered } from './tools';
import LoadingComponent from './Loading';
import { DEFAULT_SIZE } from '../config-provider/context';

type ClickEvent = React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>;

const Internal = styled(
  React.forwardRef<HTMLElement, ButtonProps & StyledButtonProps>((props, ref) => {
    const {
      type,
      size,
      icon,
      block,
      danger,
      onClick,
      children,
      loading,
      htmlType = BUTTON_HTML_TYPES[0],
      iconOnly,
      ...rest
    } = props as NativeButtonProps & StyledButtonProps;

    const handleClick = (e: ClickEvent) => {
      const { disabled } = props;
      if (loading || disabled) {
        e.preventDefault();
        return;
      }
      onClick?.(e);
    };

    const doms = {
      icon:
        icon && !loading ? (
          icon
        ) : (
          <LoadingComponent exist={!!icon} loading={!!loading} iconOnly={iconOnly} />
        ),
      child: children
        ? React.Children.map(children, child => {
            const childType = typeof child;
            if (childType === 'string' || childType === 'number') {
              return <span>{child}</span>;
            }
            return child;
          })
        : // eslint-disable-next-line unicorn/no-null
          null,
    };

    const node = isAnchor(props) ? (
      <a
        ref={ref as React.MutableRefObject<HTMLAnchorElement>}
        {...(rest as AnchorButtonProps)}
        onClick={handleClick}
      >
        {doms.icon}
        {doms.child}
      </a>
    ) : (
      <button
        ref={ref as React.MutableRefObject<HTMLButtonElement>}
        {...(rest as NativeButtonProps)}
        type={htmlType}
        onClick={handleClick}
      >
        {doms.icon}
        {doms.child}
      </button>
    );

    if (isUnbordered(type)) {
      return node;
    }

    return <Wave>{node}</Wave>;
  }),
)`
  ${styles}
`;

const Button = React.forwardRef<HTMLElement, ButtonProps>((props, ref) => {
  const { type = BUTTON_TYPES[0], shape = SHAPE_TYPES[0], loading = false, ...rest } = props;
  const [innerLoading] = useLoading({ loading });
  const size = useSize(props);
  const iconOnly = isIconOnly(rest);

  return (
    <Internal
      ref={ref}
      {...rest}
      type={type}
      size={size}
      shape={shape}
      iconOnly={iconOnly}
      loading={innerLoading}
    />
  );
});

Button.defaultProps = {
  size: DEFAULT_SIZE,
  type: BUTTON_TYPES[0],
  danger: false,
  block: false,
};

export default Button;
