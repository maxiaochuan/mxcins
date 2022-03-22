import type { ForwardRefExoticComponent, RefAttributes, PropsWithoutRef } from 'react';
import { make as GenButton, Props as ButtonProps } from './MxRC__Button.gen';

const Button: ForwardRefExoticComponent<PropsWithoutRef<ButtonProps> & RefAttributes<HTMLElement>> =
  GenButton as any;

export { Button };
export type { ButtonProps };
