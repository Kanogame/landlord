import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import iconSearch from '~/media/icons/icon-search.svg';

export default function SearchElement(props: {
  label: string;
  link: string;
  isDesktop: boolean;
}) {
  const navigate = useNavigate();
  return (
    <motion.div
      onClick={() => {
        navigate(props.link);
      }}
      whileHover={{ y: -5, background: '#E9E9E9' }}
      className={
        'flex items-center w-[100%] justify-between p-[15px] bg-[#EFEFEF] rounded-[10px] ' +
        (props.isDesktop ? '' : ' min-h-[70px]')
      }
    >
      <div className="h5-def">{props.label}</div>
      <img src={iconSearch} alt="" />
    </motion.div>
  );
}
