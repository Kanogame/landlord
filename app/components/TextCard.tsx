import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import iconLink from '~/media/icons/icon-link.svg';

export default function TextCard(props: {
  header: string;
  desc: string;
  link?: string;
}) {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ y: -5, background: '#E9E9E9' }}
      onClick={() => {
        if (props.link) {
          navigate(props.link);
        }
      }}
      className="cursor-pointer p-[15px] relative bg-[#EFEFEF] rounded-[6px] flex flex-col gap-[5px] h-[100%]"
    >
      <img
        src={iconLink}
        className="w-[20px] absolute right-[15px] top-[15px]"
      />
      <div className="h4-def">{props.header}</div>
      <div className="h5-light">{props.desc}</div>
    </motion.div>
  );
}
