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

export default function AutoButtonDropdown(props: {
  children: ReactNode;
  className?: string;
  button: ReactNode;
  buttonClassName?: string;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className={`min-w-0 ${props.buttonClassName}`}>
          {props.button}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="z-50">
        <AnimatePresence>
          <motion.div
            className={`w-35 bg-white gap-[10px] block-shadow p-[5px] rounded-[6px] ${props.className}`}
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
