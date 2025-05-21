import { AnimatePresence, motion } from "motion/react";

const variants = {
  enter: () => {
    return {
      x: -300,
      opacity: 0,
    };
  },
  center: {
    x: 0,
    opacity: 1,
  },
  exit: () => {
    return {
      x: -300,
      opacity: 0,
    };
  },
};

export default function SidePage() {
  return (
    <motion.div
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{
        type: "tween",
        duration: 0.2,
      }}
      className="absolute bg-amber-600 w-[100vw] h-[100vh] z-100"
    >
      hello
    </motion.div>
  );
}
