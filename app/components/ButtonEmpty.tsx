import { motion, type HTMLMotionProps } from 'motion/react';
import { ProcessButtonProps, type ButtonTextProps } from './button/buttons';
import { forwardRef, type Ref } from 'react';

const buttonVariants = {
  rest: { background: '#fff' },
  hover: { background: '#D5C8C8' },
};

const ButtonEmpty = forwardRef<HTMLButtonElement, ButtonTextProps>(
  ({ label, width, height, radius, ...props }, ref: Ref<HTMLButtonElement>) => {
    return (
      <motion.button
        ref={ref}
        initial="rest"
        whileHover="hover"
        variants={buttonVariants}
        className={
          'cursor-pointer text-xs text-center flex items-center justify-center border-[1px] border-[#8b2635] text-[#8b2635] px-4 py-2'
        }
        style={ProcessButtonProps(width, height, radius)}
        {...(props as HTMLMotionProps<'button'>)}
      >
        {label}
      </motion.button>
    );
  }
);
export default ButtonEmpty;
