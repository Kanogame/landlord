export default function Profile(props: {
  name: string;
  avatar: string;
  subtitle: string;
}) {
  return (
    <div className="flex gap-[10px] min-w-0">
      <div className="w-10 h-10 rounded-full flex-shrink-0">
        <img
          src={props.avatar}
          alt={props.name}
          className="w-full h-full rounded-full"
        />
      </div>

      <div className="flex-1 ml-2 min-w-0">
        <div className="n1-def overflow-hidden text-ellipsis text-nowrap">
          {props.name}
        </div>
        <div className="p-def overflow-hidden text-ellipsis text-nowrap">
          {props.subtitle}
        </div>
      </div>
    </div>
  );
}
