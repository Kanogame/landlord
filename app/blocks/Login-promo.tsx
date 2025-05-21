import { useNavigate } from "react-router";
import Block from "~/components/Block";
import RegButtons from "~/components/RegButtons";

export default function LoginPromo() {
  const navigate = useNavigate();
  return (
    <Block label="Зарегистрируйтесь чтобы пользоваться всеми возможностями">
      <div className="h5-light w-[450px]">
        Для полноценного использования сайта, необходима регистрация.
        Присоединяйтесь, создайте аккаунт прямо сейчас, это бесплатно!
      </div>
      <RegButtons
        onLogClick={() => {
          navigate("/login");
        }}
        onRegClick={() => {
          navigate("/registration");
        }}
      />
    </Block>
  );
}
