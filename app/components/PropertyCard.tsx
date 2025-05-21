export default function PropertyCard(props: { key: number }) {
  return (
    <div className="w-[200px] h-[290px] shrink-0 bg-amber-600 rounded-[10px]">
      {props.key}
    </div>
  );
}
