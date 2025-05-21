import { useState } from "react";
import banner from "~/media/images/banner1.png";
import banner2 from "~/media/images/banner2.png";
import { AnimatePresence, motion } from "motion/react";
import ButtonAccent from "~/components/buttonAccent";
import ScrollerArrow from "~/components/scrollerArrow";

export interface Slide {
  image: string;
  header: string;
  desc: string;
  href: string;
}

const props: Slide[] = [
  {
    image: banner,
    header: "Ипотека от партнера",
    desc: "Откройте выгодную ипотеку от одного из партнёров на срок от 10 лет. ",
    href: "./",
  },
  {
    image: banner2,
    header: "Другая Ипотека от партнера",
    desc: "Откройте выгодную ипотеку от одного из партнёров на срок от 10 лет. ",
    href: "./",
  },
  {
    image: banner,
    header: "Ипотека от партнера",
    desc: "Откройте выгодную ипотеку от одного из партнёров на срок от 10 лет. ",
    href: "./",
  },
  {
    image: banner2,
    header: "Другая Ипотека от партнера",
    desc: "Откройте выгодную ипотеку от одного из партнёров на срок от 10 лет. ",
    href: "./",
  },
];

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    };
  },
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      x: direction > 0 ? -300 : 300,
      opacity: 0,
    };
  },
};

export default function SlideScroller() {
  const [[page, direction], setPage] = useState([0, 0]);

  const currentSlide = props[page];

  function nextSlide() {
    if (page === props.length - 1) {
      setPage([0, 1]);
    } else {
      setPage([page + 1, 1]);
    }
  }

  function prevSlide() {
    console.log(page);
    if (page === 0) {
      setPage([props.length - 1, -1]);
    } else {
      setPage([page - 1, -1]);
    }
  }

  return (
    <div className="relative overflow-hidden flex h-[400px]">
      <ScrollerArrow right={false} onClick={prevSlide} />
      <ScrollerArrow right={true} onClick={nextSlide} />

      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={page}
          custom={direction}
          variants={variants}
          className="flex flex-col h-[100%] w-[100%] absolute p-[50px] justify-between"
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          style={{
            background: `url(${currentSlide.image})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="h1-def">{currentSlide.header}</div>
          <div className="h4-def w-[500px]">{currentSlide.desc}</div>

          <ButtonAccent label="Узнать больше" width={180} height={40} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
