import { motion, type HTMLMotionProps } from 'motion/react';
import { forwardRef, type ButtonHTMLAttributes, type Ref } from 'react';

const buttonVariants = {
  rest: { background: '#F3E7E7' },
  hover: { background: '#D5C8C8' },
};

interface ButtonIconProps extends HTMLMotionProps<'button'> {
  icon?: string;
}

const ButtonIcon = forwardRef<HTMLButtonElement, ButtonIconProps>(
  ({ icon, ...props }, ref: Ref<HTMLButtonElement>) => {
    return (
      <motion.button
        ref={ref}
        initial="rest"
        whileHover="hover"
        variants={buttonVariants}
        className="p text-center flex items-center justify-center bg-[#F3E7E7] p-[7px] rounded-[4px]"
        {...(props as HTMLMotionProps<'button'>)}
      >
        <img src={icon} alt="" />
      </motion.button>
    );
  }
);

export default ButtonIcon;
