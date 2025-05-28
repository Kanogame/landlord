import logo from '~/media/icons/logo.svg';
import RegButtons from '~/components/RegButtons';
import { useNavigate } from 'react-router';

export default function MainHeader(props: any) {
  const navigate = useNavigate();

  return (
    <div className="bg-white flex justify-center items-center border-b-[1px] border-b-[#EFEFEF] py-[5px]">
      <div className="flex flex-[0_1_1600px] justify-between items-center px-[50px]">
        <div onClick={() => navigate('/')} className="cursor-pointer">
          <img src={logo} alt="logo" className="block w-full" />
        </div>
        <div className="flex align-center gap-[15px]">
          <span onClick={() => navigate('/')} className="cursor-pointer p-def">
            Главная
          </span>
          <span
            onClick={() => navigate('/search?offerType=1')}
            className="cursor-pointer p-def"
          >
            Покупка
          </span>
          <span
            onClick={() => navigate('/search?offerType=0')}
            className="cursor-pointer p-def"
          >
            Аренда
          </span>
          <span className="p-def">|</span>
          <span
            onClick={() => navigate('/chat')}
            className="cursor-pointer p-def"
          >
            Чаты
          </span>
          <span
            onClick={() => navigate('/profile/monitoring')}
            className="cursor-pointer p-def"
          >
            Мониторинг
          </span>
        </div>
        <RegButtons
          onLogClick={() => {
            navigate('/login');
          }}
          onRegClick={() => {
            navigate('/register');
          }}
        />
      </div>
    </div>
  );
}
