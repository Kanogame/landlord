import { AnimatePresence, motion } from 'motion/react';
import SidePageLink from '~/components/SidePageLink';
import iconHouse from '~/media/icons/icon-house.svg';
import iconSearch from '~/media/icons/icon-search.svg';
import iconLink from '~/media/icons/icon-link.svg';
import iconChat from '~/media/icons/icon-chat.svg';
import iconHistory from '~/media/icons/icon-history.svg';
import iconBookmark from '~/media/icons/icon-bookmark.svg';
import iconCalendar from '~/media/icons/icon-calendar.svg';
import iconGear from '~/media/icons/icon-gear.svg';
import iconTeam from '~/media/icons/icon-team.svg';
import iconHelp from '~/media/icons/icon-help.svg';
import { useNavigate } from 'react-router';

const variants = {
  enter: () => {
    return {
      x: -300,
      opacity: 0,
    };
  },
  center: {
    x: 0,
    opacity: 1,
  },
  exit: () => {
    return {
      x: -300,
      opacity: 0,
    };
  },
};

interface sidePageProps {
  onClose: () => void;
}

export default function SidePage({ onClose }: sidePageProps) {
  const navigate = useNavigate();

  function nav(path: string) {
    navigate(path);
    onClose();
  }

  return (
    <motion.div
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{
        type: 'tween',
        duration: 0.2,
      }}
      className="absolute cursor-pointer bg-white w-[100%] h-[100%] z-100 flex flex-col gap-[5px] items-start p-[10px]"
    >
      <SidePageLink label="Главная" img={iconLink} onClick={() => nav('/')} />
      <SidePageLink
        label="Поиск"
        img={iconSearch}
        onClick={() => nav('/search')}
      />
      <SidePageLink
        label="Сообщения"
        img={iconChat}
        onClick={() => nav('/chat')}
      />
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
        onClick={() => nav('/profile/setting')}
      />
      <SidePageLink
        label="Обратная связь"
        img={iconTeam}
        onClick={() => nav('/chat')}
      />
      <SidePageLink
        label="Помощь"
        img={iconHelp}
        onClick={() => nav('/help')}
      />
    </motion.div>
  );
}
