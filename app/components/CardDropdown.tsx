import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import iconMore from '~/media/icons/icon-more.svg';
import iconCalendar from '~/media/icons/icon-calendar.svg';
import iconShare from '~/media/icons/icon-share.svg';
import iconPosition from '~/media/icons/icon-position.svg';
import iconWarn from '~/media/icons/icon-warn.svg';
import iconBan from '~/media/icons/icon-ban.svg';
import ButtonIcon from './ButtonIcon';
import { AnimatePresence, motion } from 'motion/react';
import DropdownElement from './DropdownElement';

const dropdownOptions = [
  {
    label: 'Календарь',
    icon: iconCalendar,
  },
  {
    label: 'Поделиться',
    icon: iconShare,
  },
  {
    label: 'На карте',
    icon: iconPosition,
  },
  {
    label: 'Пожаловаться',
    icon: iconWarn,
  },
  {
    label: 'Скрыть',
    icon: iconBan,
  },
];

const variants = {
  enter: {
    y: 10,
    opacity: 0,
  },
  rest: {
    y: 0,
    opacity: 1,
  },
};

export default function CardDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <ButtonIcon icon={iconMore} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <AnimatePresence>
          <motion.div
            className="w-35 bg-white gap-[10px] block-shadow p-[5px] rounded-[6px]"
            variants={variants}
            exit="enter"
            initial="enter"
            animate="rest"
            transition={{ type: 'tween' }}
          >
            {dropdownOptions.map(el => {
              return <DropdownElement label={el.label} icon={el.icon} />;
            })}
          </motion.div>
        </AnimatePresence>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
