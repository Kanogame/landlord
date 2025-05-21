import { ProcessButtonProps, type ButtonTextProps } from "./button/buttons";

export default function ButtonAccent(props: ButtonTextProps) {
  function handleClick() {
    if (props.onClick) {
      props.onClick();
    }
  }

  return (
    <button
      className="text-xs text-center flex items-center justify-center text-[white] bg-[#8b2635] px-4 py-2"
      style={ProcessButtonProps(props)}
      onClick={handleClick}
    >
      {" "}
      {props.label}
    </button>
  );
}
