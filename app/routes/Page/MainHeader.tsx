import logo from '~/media/icons/logo.svg';
import RegButtons from '~/components/RegButtons';
import { useNavigate } from 'react-router';
import { useAuth } from '~/hooks/useAuth';
import ButtonAccent from '~/components/ButtonAccent';
import ButtonEmpty from '~/components/ButtonEmpty';
import ButtonIcon from '~/components/ButtonIcon';
import iconBookmark from '~/media/icons/icon-bookmark.svg';

export default function MainHeader(props: any) {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <div className="bg-white flex justify-center items-center border-b-[1px] border-b-[#EFEFEF] py-[5px]">
      <div className="flex flex-[0_1_1600px] justify-center items-center px-[50px] h-[30px] relative">
        <div
          onClick={() => navigate('/')}
          className="cursor-pointer absolute left-[50px]"
        >
          <img src={logo} alt="logo" className="block w-full" />
        </div>
        <div className="flex align-center gap-[15px]">
          <span onClick={() => navigate('/')} className="cursor-pointer p-def">
            Главная
          </span>
          <span
            onClick={() => {window.location.href =  '/search?offerType=1&pageNumber=1&pageSize=10&sortBy=0'}}
            className="cursor-pointer p-def"
          >
            Покупка
          </span>
          <span
            onClick={() => {window.location.href =  '/search?offerType=0&pageNumber=1&pageSize=10&sortBy=0'}}
            className="cursor-pointer p-def"
          >
            Аренда
          </span>
          <span
            onClick={() => navigate('/chat')}
            className="cursor-pointer p-def"
          >
            Чаты
          </span>
        </div>
        {isAuthenticated ? (
          <div className="flex gap-[5px] absolute right-[50px]">
            <ButtonIcon
              onClick={() => {
                navigate('/profile/bookmarks');
              }}
              icon={iconBookmark}
            />
            <ButtonAccent
              label="Мой аккаунт"
              onClick={() => navigate('/profile/settings')}
            />
            <ButtonEmpty
              label="Создать объявление"
              onClick={() => navigate('/editor')}
              width="170px"
            />
          </div>
        ) : (
          <div className="absolute right-[50px]">
            <RegButtons
              onLogClick={() => {
                navigate('/login');
              }}
              onRegClick={() => {
                navigate('/register');
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
