import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu';
import { motion } from 'motion/react';

export default function DropdownElement(props: {
  label: string;
  icon: string;
}) {
  return (
    <DropdownMenuItem>
      <motion.div
        whileHover={{ background: '#EFEFEF' }}
        className="bg-[#fff] flex gap-[5px] items-center rounded-[2px] px-[10px] cursor-pointer"
      >
        <img src={props.icon} alt="" className="w-[12px] h-[100%]" />
        <span className="p-def">{props.label}</span>
      </motion.div>
    </DropdownMenuItem>
  );
}
