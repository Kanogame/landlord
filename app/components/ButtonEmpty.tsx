import { motion } from 'motion/react';
import { ProcessButtonProps, type ButtonTextProps } from './button/buttons';

const buttonVariants = {
  rest: { background: '#fff' },
  hover: { background: '#D5C8C8' },
};

export default function ButtonEmpty(props: ButtonTextProps) {
  function handleClick() {
    if (props.onClick) {
      props.onClick();
    }
  }

  return (
    <motion.button
      initial="rest"
      whileHover="hover"
      variants={buttonVariants}
      className="cursor-pointer text-xs text-center flex items-center justify-center text-[#2D2D2D] border-[1px] border-[#8b2635] px-4 py-2"
      style={ProcessButtonProps(props)}
      onClick={handleClick}
    >
      {props.label}
    </motion.button>
  );
}
