import type { HTMLMotionProps } from 'motion/react';

export interface ButtonTextProps extends HTMLMotionProps<'button'> {
  label: string;
  width?: string;
  height?: string;
  radius?: number;
}

export function ProcessButtonProps(
  width?: string,
  height?: string,
  radius?: number
) {
  return {
    width: width ?? '120px',
    height: height ?? '30px',
    borderRadius: (radius ?? 4) + 'px',
  };
}
