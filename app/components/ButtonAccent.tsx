import { motion } from 'motion/react';
import { ProcessButtonProps, type ButtonTextProps } from './button/buttons';

const buttonVariants = {
  rest: { background: '#8b2635' },
  hover: { background: '#76222E' },
};

export default function ButtonAccent(props: ButtonTextProps) {
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
      className="p text-center flex items-center justify-center text-[white] bg-[#8b2635] px-4 py-2"
      style={ProcessButtonProps(props)}
      onClick={handleClick}
    >
      {props.label}
    </motion.button>
  );
}
