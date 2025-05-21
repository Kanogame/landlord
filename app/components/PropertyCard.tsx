import { motion } from "motion/react";

export default function PropertyCard(props: { key: number }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="w-[200px] h-[290px] shrink-0 bg-amber-600 rounded-[10px] mt-[5px]"
    >
      {props.key}
    </motion.div>
  );
}
