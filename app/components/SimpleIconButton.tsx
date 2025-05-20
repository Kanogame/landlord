export default function SimpleIconButton(props: { img: string }) {
  return (
    <div className="w-[30px] h-[30px] flex items-center justify-center">
      <img src={props.img} alt="" />
    </div>
  );
}
