import { motion, type HTMLMotionProps } from 'motion/react';
import { forwardRef, type Ref } from 'react';

const buttonVariants = {
  rest: { background: '#F3E7E7' },
  hover: { background: '#D5C8C8' },
};

interface ButtonIconProps extends HTMLMotionProps<'button'> {
  icon?: string;
  label?: string;
  width?: string;
}

const ButtonIconText = forwardRef<HTMLButtonElement, ButtonIconProps>(
  ({ icon, label, width = '80px', ...props }, ref: Ref<HTMLButtonElement>) => {
    return (
      <motion.button
        ref={ref}
        initial="rest"
        whileHover="hover"
        variants={buttonVariants}
        className="cursor-pointer text-center flex flex-col items-center justify-center bg-[#F3E7E7] p-[7px] rounded-[4px] h-[46px]"
        style={{ width }}
        {...(props as HTMLMotionProps<'button'>)}
      >
        {icon && (
          <img src={icon} alt="" className="w-[16px] h-[16px] mb-[2px]" />
        )}
        {label && (
          <span className="text-[12px] text-[#2D2D2D] leading-none">
            {label}
          </span>
        )}
      </motion.button>
    );
  }
);

export default ButtonIconText;
