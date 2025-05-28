export interface ButtonTextProps {
  label: string;
  width?: string;
  height?: string;
  radius?: number;
  disabled?: boolean;
  type?: "submit" | "reset" | "button";
  onClick?: () => void;
}

export function ProcessButtonProps(props: ButtonTextProps) {
  return {
    width: props.width ?? '120px',
    height: props.height ?? '30px',
    borderRadius: (props.radius ?? 4) + 'px',
  };
}
