import ButtonAccent from "./ButtonAccent";
import ButtonEmpty from "./ButtonEmpty";

export default function RegButtons(props: {
  onRegClick: () => void;
  onLogClick: () => void;
}) {
  return (
    <div className="flex gap-[5px]">
      <ButtonAccent label="Регистрация" onClick={props.onRegClick} />
      <ButtonEmpty label="Вход" onClick={props.onLogClick} />
    </div>
  );
}
