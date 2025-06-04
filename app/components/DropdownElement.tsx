import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu';
import { motion } from 'motion/react';

interface DropdownElementProps {
  label: string;
  icon?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export default function DropdownElement({
  label,
  icon,
  onClick,
}: DropdownElementProps) {
  return (
    <DropdownMenuItem>
      <motion.div
        whileHover={{ background: '#EFEFEF' }}
        className="bg-[#fff] flex gap-[5px] items-center rounded-[2px] px-[10px] cursor-pointer"
        onClick={e => onClick && onClick(e)}
      >
        {icon && <img src={icon} alt="" className="w-[12px] h-[100%]" />}
        <span className="h5-def">{label}</span>
      </motion.div>
    </DropdownMenuItem>
  );
}
