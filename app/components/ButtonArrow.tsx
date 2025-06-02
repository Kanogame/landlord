import { motion, type HTMLMotionProps } from 'motion/react';
import { ProcessButtonProps, type ButtonTextProps } from './button/buttons';
import arrow from './buttonArrow/go-arrow.svg';
import { forwardRef, type Ref } from 'react';

const imageVariants = {
  rest: { x: 0, y: 0 },
  hover: { x: 2, y: -1 },
};

const buttonVariants = {
  rest: { background: '#8b2635' },
  hover: { background: '#76222E' },
};

const ButtonAccent = forwardRef<HTMLButtonElement, ButtonTextProps>(
  ({ label, width, height, radius, ...props }, ref: Ref<HTMLButtonElement>) => {
    return (
      <motion.button
        ref={ref}
        initial="rest"
        whileHover="hover"
        variants={buttonVariants}
        className={
          'cursor-pointer p text-center flex items-center justify-between text-[white] bg-[#8b2635] px-4 py-2' +
          (props.disabled ? 'bg-[#76222E]' : '')
        }
        style={ProcessButtonProps(width, height, radius)}
        {...(props as HTMLMotionProps<'button'>)}
      >
        {label}
        <motion.img src={arrow} alt="" variants={imageVariants} />
      </motion.button>
    );
  }
);
export default ButtonAccent;
