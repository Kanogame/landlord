export default function Avatar(props: { avatar: string }) {
  return (
    <div className="w-10 h-10 rounded-full bg-gray-300 flex-shrink-0">
      <img
        src={props.avatar}
        alt="Аватар"
        className="w-full h-full rounded-full"
      />
    </div>
  );
}
