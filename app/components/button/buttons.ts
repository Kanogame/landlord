export interface ButtonTextProps {
  label: string;
  width?: number;
  height?: number;
  radius?: number;
  onClick?: () => void;
}

export function ProcessButtonProps(props: ButtonTextProps) {
  return {
    width: (props.width ?? 120) + "px",
    height: (props.height ?? 30) + "px",
    borderRadius: (props.radius ?? 4) + "px",
  };
}
