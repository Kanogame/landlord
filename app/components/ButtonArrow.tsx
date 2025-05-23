import { motion } from 'motion/react';
import { ProcessButtonProps, type ButtonTextProps } from './button/buttons';
import arrow from './buttonArrow/go-arrow.svg';

const imageVariants = {
  rest: { x: 0, y: 0 },
  hover: { x: 2, y: -1 },
};

const buttonVariants = {
  rest: { background: '#8b2635' },
  hover: { background: '#76222E' },
};

export default function ButtonArrow(props: ButtonTextProps) {
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
      className="p text-center flex items-center justify-between text-[white] bg-[#8b2635] px-4 py-2"
      style={ProcessButtonProps(props)}
      onClick={handleClick}
    >
      {props.label}
      <motion.img src={arrow} alt="" variants={imageVariants} />
    </motion.button>
  );
}
