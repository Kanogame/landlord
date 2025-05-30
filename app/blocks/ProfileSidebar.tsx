import { useNavigate, useLocation } from 'react-router';
import SidePageLink from '~/components/SidePageLink';
import iconHouse from '~/media/icons/icon-house.svg';
import iconHistory from '~/media/icons/icon-history.svg';
import iconBookmark from '~/media/icons/icon-bookmark.svg';
import iconGear from '~/media/icons/icon-gear.svg';

export default function ProfileSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  function nav(path: string) {
    navigate(path);
  }

  return (
    <div className="bg-white w-[100%] flex flex-col gap-[5px] items-start p-[10px] rounded-lg">
      <SidePageLink
        label="Мои объявления"
        img={iconHouse}
        onClick={() => nav('/profile/own')}
      />
      <SidePageLink
        label="Предыдущая недвижимость"
        img={iconHistory}
        onClick={() => nav('/profile/history')}
      />
      <SidePageLink
        label="Закладки"
        img={iconBookmark}
        onClick={() => nav('/profile/bookmarks')}
      />
      <SidePageLink
        label="Настройки профиля"
        img={iconGear}
        onClick={() => nav('/profile/settings')}
      />
    </div>
  );
}
