import type { ButtonTextProps } from "./button/buttons";

export default function ButtonEmpty(props: ButtonTextProps) {
  function handleClick() {
    if (props.onClick) {
      props.onClick();
    }
  }

  return (
    <button
      className="text-xs text-center flex items-center justify-center text-[#2D2D2D] rounded-[4px] border-[1px] border-[#8b2635] px-4 py-2"
      style={{
        width: props.width + "px",
        height: props.height + "px",
      }}
      onClick={handleClick}
    >
      {props.label}
    </button>
  );
}
