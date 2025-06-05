import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import iconSearch from '~/media/icons/icon-search.svg';

export default function SearchElement(props: {
  label: string;
  link?: string;
  isDesktop: boolean;
  onClick?: () => void;
}) {
  const navigate = useNavigate();
  return (
    <motion.div
      onClick={() => {
        if (props.link) {
          navigate(props.link);
        }
        if (props.onClick) {
          props.onClick();
        }
      }}
      whileHover={{ y: -5, background: '#E9E9E9' }}
      className={
        'flex flex-1 items-center w-[100%] justify-between p-[15px] bg-[#EFEFEF] rounded-[10px] cursor-pointer ' +
        (props.isDesktop ? '' : ' min-h-[70px]')
      }
    >
      <div className="h5-def">{props.label}</div>
      <img src={iconSearch} alt="" />
    </motion.div>
  );
}
