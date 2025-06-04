import logo from '~/media/icons/logo.svg';
import iconBookmark from '~/media/icons/icon-bookmark.svg';
import iconBurger from '~/media/icons/icon-burger.svg';
import iconLogin from '~/media/icons/icon-login.svg';
import iconSearch from '~/media/icons/icon-search.svg';
import iconExit from '~/media/icons/icon-exit.svg';
import SimpleIconButton from '~/components/SimpleIconButton';
import { useNavigate } from 'react-router';
import { useAuth } from '~/hooks/useAuth';
import Avatar from '~/components/chat/Avatar';

export default function MobileHeader(props: {
  onSidepageClicked: () => void;
  sidepageOpened: boolean;
}) {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <div className="bg-white flex justify-between items-center border-b-[1px] border-b-[#EFEFEF] p-[5px]">
      <div className="flex items-center gap-[10px]">
        <SimpleIconButton
          img={props.sidepageOpened ? iconExit : iconBurger}
          onClick={props.onSidepageClicked}
        />
        <div onClick={() => navigate('/')}>
          <img src={logo} alt="logo" className="block w-full" />
        </div>
      </div>
      <div className="flex items-center gap-[10px] cursor-pointer">
        <SimpleIconButton
          img={iconSearch}
          onClick={() => navigate('/search')}
        />
        <SimpleIconButton
          img={iconBookmark}
          onClick={() => navigate('/profile/bookmarks')}
        />
        {isAuthenticated ? (
          <Avatar size={25} avatar={'https://placehold.co/25x25'} />
        ) : (
          <SimpleIconButton
            img={iconLogin}
            onClick={() => navigate('/login')}
          />
        )}
      </div>
    </div>
  );
}
