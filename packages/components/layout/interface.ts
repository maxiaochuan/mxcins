import type { HTMLAttributes } from 'react';

export interface LayoutProps extends HTMLAttributes<HTMLDivElement> {
  hasSider?: boolean;
}

export interface SiderProps extends HTMLAttributes<HTMLDivElement> {
  width?: number;
  collapsed?: boolean;
  collapsedWidth?: number;
}
