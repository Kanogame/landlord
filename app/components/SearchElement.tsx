import { motion } from "motion/react";
import { useNavigate } from "react-router";
import iconSearch from "~/media/icons/icon-search.svg";

export default function SearchElement(props: { label: string; link: string }) {
  const navigate = useNavigate();
  return (
    <motion.div
      onClick={() => {
        navigate(props.link);
      }}
      whileHover={{ y: -5, background: "#E9E9E9" }}
      className="flex w-[100%] justify-between p-[15px] bg-[#EFEFEF] rounded-[10px]"
    >
      <div className="h5-def">{props.label}</div>
      <img src={iconSearch} alt="" />
    </motion.div>
  );
}
