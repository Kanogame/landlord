import { AnimatePresence, motion } from "motion/react";
import SidePageLink from "~/components/sidePageLink";
import iconHouse from "~/media/icons/icon-house.svg";
import iconSearch from "~/media/icons/icon-search.svg";
import iconLink from "~/media/icons/icon-link.svg";
import iconChat from "~/media/icons/icon-chat.svg";
import iconHistory from "~/media/icons/icon-history.svg";
import iconBookmark from "~/media/icons/icon-bookmark.svg";
import iconCalendar from "~/media/icons/icon-calendar.svg";
import iconGear from "~/media/icons/icon-gear.svg";
import iconTeam from "~/media/icons/icon-team.svg";
import iconHelp from "~/media/icons/icon-help.svg";

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

export default function SidePage() {
  return (
    <motion.div
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{
        type: "tween",
        duration: 0.2,
      }}
      className="absolute cursor-pointer bg-white w-[100vw] h-[100vh] z-100 flex flex-col gap-[5px] items-start"
    >
      <SidePageLink label="Главная" img={iconLink} />
      <SidePageLink label="Поиск" img={iconSearch} />
      <SidePageLink label="Сообщения" img={iconChat} />
      <SidePageLink label="Мои объявления" img={iconHouse} />
      <SidePageLink label="Предыдущая недвижимость" img={iconHistory} />
      <SidePageLink label="Закладки" img={iconBookmark} />
      <SidePageLink label="Мониторинг" img={iconCalendar} />
      <SidePageLink label="Настройки профиля" img={iconGear} />
      <SidePageLink label="Обратная связь" img={iconTeam} />
      <SidePageLink label="Помощь" img={iconHelp} />
    </motion.div>
  );
}
