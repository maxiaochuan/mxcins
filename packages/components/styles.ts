/* eslint-disable import/prefer-default-export */
import { css } from 'styled-components';

export interface StyledRowProps {
  $gutter: [number, number];
  $wrap: boolean | undefined;
  $justify: 'start' | 'end' | 'center' | 'space-between' | 'space-around';
  $align: 'top' | 'middle' | 'bottom';
}

export const row = css<StyledRowProps>`
  display: flex;
  flex-flow: row ${({ $wrap }) => ($wrap === false && 'nowrap') || 'wrap'};
  align-items: ${({ $align }) =>
    ($align === 'top' && 'flex-start') ||
    ($align === 'middle' && 'center') ||
    ($align === 'bottom' && 'flex-end')};
  justify-content: ${({ $justify }) => $justify};
  margin-right: -${({ $gutter }) => $gutter[0] / 2}px;
  margin-left: -${({ $gutter }) => $gutter[0] / 2}px;
  row-gap: ${({ $gutter }) => $gutter[1]}px;
`;

export interface StyledColProps {
  $gutter: [number, number];
  $flex: number | string | undefined;
  $span: number | undefined;
  $order: number | undefined;
  $offset: number | undefined;
}

const num2per = (span: number) => `${((span / 24) * 100).toFixed(8)}%`;

export const col = css<StyledColProps>`
  flex: ${({ $span, $flex }) =>
    (typeof $flex === 'number' && `${$flex} ${$flex} auto`) ||
    (typeof $flex === 'string' && /^\d+(\.\d+)?(px|em|rem|%)$/.test($flex) && `0 0 ${$flex}`) ||
    (typeof $flex === 'string' && $flex) ||
    (typeof $span === 'number' && num2per($span)) ||
    'auto'};
  max-width: ${({ $span }) => (typeof $span === 'number' ? num2per($span) : '100%')};
  margin-left: ${({ $offset }) => ($offset && num2per($offset)) || '0'};
  padding: 0 ${({ $gutter }) => $gutter[0] / 2}px;
  ${({ $order }) => $order && `order: ${$order};`}
`;
