import { useDesktop } from '~/hooks/useDesktop';
import ButtonAccent from './ButtonAccent';
import ButtonEmpty from './ButtonEmpty';

export default function RegButtons(props: {
  onRegClick: () => void;
  onLogClick: () => void;
}) {
  const isDesktop = useDesktop();
  return (
    <div
      className={isDesktop ? 'flex gap-[5px]' : 'flex width-[100%] gap-[10px]'}
    >
      <ButtonAccent
        label="Регистрация"
        onClick={props.onRegClick}
        width="100%"
      />
      <ButtonEmpty label="Вход" onClick={props.onLogClick} width="100%" />
    </div>
  );
}
