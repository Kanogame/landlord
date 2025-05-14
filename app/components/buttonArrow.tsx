import type { ButtonTextProps } from "./button/buttons";
import arrow from "./buttonArrow/go-arrow.svg";

export default function ButtonArrow(props: ButtonTextProps) {
  function handleClick() {
    if (props.onClick) {
      props.onClick();
    }
  }

  return (
    <button
      className="text-xs text-center flex items-center justify-between text-[white] rounded-[4px] bg-[#8b2635] px-4 py-2"
      style={{
        width: props.width + "px",
        height: props.height + "px",
      }}
      onClick={handleClick}
    >
      {props.label}
      <img src={arrow} alt="" />
    </button>
  );
}
