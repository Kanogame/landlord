import { motion } from 'motion/react';
import { ProcessButtonProps, type ButtonTextProps } from './button/buttons';

const buttonVariants = {
  rest: { background: '#8b2635' },
  hover: { background: '#76222E' },
};

export default function ButtonAccent(props: ButtonTextProps) {
  function handleClick() {
    if (props.onClick && !(props.disabled ?? false)) {
      props.onClick();
    }
  }

  return (
    <motion.button
      initial="rest"
      whileHover="hover"
      type={props.type ?? "button"}
      variants={buttonVariants}
      className={"cursor-pointer p text-center flex items-center justify-center text-[white] bg-[#8b2635] px-4 py-2" + (props.disabled ? "bg-[#76222E]" : "")}
      style={ProcessButtonProps(props)}
      onClick={handleClick}
    >
      {props.label}
    </motion.button>
  );
}
