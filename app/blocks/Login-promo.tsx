import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router';
import Block from '~/components/Block';
import RegButtons from '~/components/RegButtons';
import { useDesktop } from '~/hooks/useDesktop';

export default function LoginPromo() {
  const navigate = useNavigate();
  const isDesktop = useDesktop();

  return (
    <Block
      label="Зарегистрируйтесь чтобы пользоваться всеми возможностями"
      isDesktop={isDesktop}
    >
      <div className="h5-light w-max-[450px]">
        Для полноценного использования сайта, необходима регистрация.
        Присоединяйтесь, создайте аккаунт прямо сейчас, это бесплатно!
      </div>
      <RegButtons
        onLogClick={() => {
          navigate('/login');
        }}
        onRegClick={() => {
          navigate('/register');
        }}
      />
    </Block>
  );
}
