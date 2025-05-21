import { motion } from "motion/react";

export default function SidePageLink(props: {
  img: string;
  label: string;
  onClick?: () => void;
}) {
  function handleClick() {
    if (props.onClick) {
      props.onClick();
    }
  }

  return (
    <motion.div
      onClick={handleClick}
      className="h5-def sidepage flex items-center justify-center gap-[6px] px-[10px] py-[5px] rounded-[8px]"
    >
      <img src={props.img} alt="" />
      <div className="text-[14px]/[16px]">{props.label}</div>
    </motion.div>
  );
}
