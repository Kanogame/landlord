import { useNavigate, useLocation } from 'react-router';
import SidePageLink from '~/components/SidePageLink';
import iconHouse from '~/media/icons/icon-house.svg';
import iconHistory from '~/media/icons/icon-history.svg';
import iconBookmark from '~/media/icons/icon-bookmark.svg';
import iconGear from '~/media/icons/icon-gear.svg';
import Block from '~/components/Block';
import { useDesktop } from '~/hooks/useDesktop';

export default function ProfileSidebar() {
  const navigate = useNavigate();
  const isDesktop = useDesktop();

  return (
    <Block isDesktop={isDesktop}>
      <div className="bg-white w-[100%] flex flex-col gap-[5px] items-start p-[10px] rounded-lg">
        <SidePageLink
          label="Мои объявления"
          img={iconHouse}
          onClick={() => navigate('/profile/own')}
        />
        <SidePageLink
          label="Предыдущая недвижимость"
          img={iconHistory}
          onClick={() => navigate('/profile/history')}
        />
        <SidePageLink
          label="Закладки"
          img={iconBookmark}
          onClick={() => navigate('/profile/bookmarks')}
        />
        <SidePageLink
          label="Настройки профиля"
          img={iconGear}
          onClick={() => navigate('/profile/settings')}
        />
      </div>
    </Block>
  );
}
