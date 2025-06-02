import { useState } from 'react';
import banner from '~/media/images/banner1.png';
import banner2 from '~/media/images/banner2.png';
import { AnimatePresence, motion } from 'motion/react';
import ButtonAccent from '~/components/ButtonAccent';
import ScrollerArrow from '~/components/ScrollerArrow';
import { AddressSuggestions } from 'react-dadata';

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

export interface TImageLink {
  id: string;
  propertyId: string;
  link: string;
}

export default function ImageScroller(props: { images: TImageLink[] }) {
  const [[page, direction], setPage] = useState([0, 0]);

  const images =
    props.images.length == 0
      ? ['/app/media/images/placeholder.png']
      : props.images.map(
          image => `${import.meta.env.VITE_BACKEND_ENDPOINT}${image.link}`
        );
  const showArrows = props.images.length > 1;
  const currentSlide = images[page];

  function nextImage() {
    if (page === images.length - 1) {
      setPage([0, 1]);
    } else {
      setPage([page + 1, 1]);
    }
  }

  function prevImage() {
    if (page === 0) {
      setPage([images.length - 1, -1]);
    } else {
      setPage([page - 1, -1]);
    }
  }

  return (
    <div className="w-[100%] h-[100%] overflow-hidden flex relative">
      {showArrows && (
        <>
          <ScrollerArrow right={false} onClick={prevImage} />
          <ScrollerArrow right={true} onClick={nextImage} />
        </>
      )}

      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={page}
          custom={direction}
          variants={variants}
          className={
            'absolute flex flex-col h-[100%] w-[100%] justify-between bg-center bg-cover bg-no-repeat rounded-[5px]'
          }
          initial="enter"
          animate="center"
          exit="exit"
          style={{ backgroundImage: `url(${currentSlide})` }}
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
        />
      </AnimatePresence>
    </div>
  );
}
