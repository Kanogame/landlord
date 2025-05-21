import { ProcessButtonProps, type ButtonTextProps } from "./button/buttons";

export default function ButtonEmpty(props: ButtonTextProps) {
  function handleClick() {
    if (props.onClick) {
      props.onClick();
    }
  }

  return (
    <button
      className="text-xs text-center flex items-center justify-center text-[#2D2D2D] border-[1px] border-[#8b2635] px-4 py-2"
      style={ProcessButtonProps(props)}
      onClick={handleClick}
    >
      {props.label}
    </button>
  );
}
