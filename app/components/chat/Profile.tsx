interface ProfileProps {
  name: string;
  avatar: string;
  subtitle: string;
  isBig: boolean;
  onClick?: () => void;
}

export default function Profile({
  name,
  avatar,
  subtitle,
  isBig,
  onClick,
}: ProfileProps) {
  return (
    <div className="flex gap-[10px] min-w-0 cursor-pointer" onClick={onClick}>
      <div
        className={`${
          isBig ? 'w-11 h-11' : 'w-10 h-10'
        } rounded-full flex-shrink-0`}
      >
        <img src={avatar} alt={name} className="w-full h-full rounded-full" />
      </div>

      <div className="flex-1 ml-2 min-w-0">
        <div
          className={`${
            isBig ? 'h4-def' : 'n1-def'
          } overflow-hidden text-ellipsis text-nowrap`}
        >
          {name}
        </div>
        <div className="p-def overflow-hidden text-ellipsis text-nowrap">
          {subtitle}
        </div>
      </div>
    </div>
  );
}
