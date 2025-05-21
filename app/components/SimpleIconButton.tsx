export default function SimpleIconButton(props: {
  img: string;
  onClick?: () => void;
}) {
  function handleClick() {
    if (props.onClick) {
      props.onClick();
    }
  }

  return (
    <div
      className="w-[30px] h-[30px] flex items-center justify-center"
      onClick={handleClick}
    >
      <img src={props.img} alt="" />
    </div>
  );
}
