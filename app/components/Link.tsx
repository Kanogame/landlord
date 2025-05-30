import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import type { TLink } from '../lib/link';

const arrow = {
  init: { x: 0 },
  hover: { x: -3 },
};

interface ArrowLinkProps {
  link: TLink;
  big: boolean;
}

export default function ArrowLink({ link, big }: ArrowLinkProps) {
  const navigate = useNavigate();

  return (
    <motion.div
      initial="init"
      whileHover="hover"
      className="items-center flex gap-[10px] cursor-pointer"
      onClick={e => {
        e.stopPropagation();
        navigate(link.href);
      }}
    >
      <div className={big ? 'h4 text-[#008DE5]' : 'p text-[#008DE5]'}>
        {link.label}
      </div>
      <motion.svg
        variants={arrow}
        width="8"
        height="14"
        viewBox="0 0 8 14"
        className={
          big ? 'rotate-180 w-[12px] h-[20px]"' : 'rotate-180 w-[6px] h-[10px]"'
        }
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M7.83216 0.158175C7.88537 0.208187 7.92758 0.2676 7.95638 0.33301C7.98518 0.398421 8 0.468543 8 0.539361C8 0.610179 7.98518 0.680301 7.95638 0.745711C7.92758 0.811122 7.88537 0.870534 7.83216 0.920547L1.3801 7.00014L7.83216 13.0797C7.93944 13.1808 7.9997 13.3179 7.9997 13.4609C7.9997 13.6039 7.93944 13.741 7.83216 13.8421C7.72489 13.9432 7.5794 14 7.4277 14C7.27599 14 7.1305 13.9432 7.02323 13.8421L0.167835 7.38133C0.114634 7.33132 0.0724241 7.2719 0.0436241 7.20649C0.0148241 7.14108 0 7.07096 0 7.00014C0 6.92932 0.0148241 6.8592 0.0436241 6.79379C0.0724241 6.72838 0.114634 6.66897 0.167835 6.61896L7.02323 0.158175C7.0763 0.108036 7.13934 0.0682557 7.20874 0.0411135C7.27815 0.0139713 7.35255 0 7.4277 0C7.50284 0 7.57724 0.0139713 7.64665 0.0411135C7.71606 0.0682557 7.7791 0.108036 7.83216 0.158175Z"
          className="fill-[#008DE5]"
        />
      </motion.svg>
    </motion.div>
  );
}
