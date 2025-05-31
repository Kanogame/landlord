import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import ButtonIcon from './ButtonIcon';
import { type ReactNode } from 'react';
import { AnimatePresence, motion } from 'motion/react';

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

export default function ButtonIconDropdown(props: {
  icon: string;
  onClick?: () => void;
  children: ReactNode;
}) {
  function handleClick(e: any) {
    e.stopPropagation();
    if (props.onClick) {
      props.onClick();
    }
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <ButtonIcon icon={props.icon} onClick={handleClick} />
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
            {props.children}
          </motion.div>
        </AnimatePresence>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
