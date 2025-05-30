import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Block from './Block';
import ScrollerArrow from './ScrollerArrow';
import type { TImageLink } from './ImageScroller';

interface PropertyImageGalleryProps {
  images: TImageLink[];
}

const imageVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
  }),
};

export default function PropertyImageGallery({
  images,
}: PropertyImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const displayImages =
    images.length > 0
      ? images
      : [
          {
            id: 'placeholder',
            propertyId: '',
            link: '/app/media/images/placeholder.png',
          },
        ];

  const itemWidth = 112;
  const visibleItems = 6;
  const maxScroll = Math.max(0, displayImages.length - visibleItems);
  const canScrollLeft = scrollPosition > 0;
  const canScrollRight = scrollPosition < maxScroll;
  const showMainArrows = displayImages.length > 1;

  const scrollLeft = () => {
    setScrollPosition(Math.max(0, scrollPosition - 1));
  };

  const scrollRight = () => {
    setScrollPosition(Math.min(maxScroll, scrollPosition + 1));
  };

  const nextImage = () => {
    if (selectedImage === displayImages.length - 1) {
      setSelectedImage(0);
      setDirection(1);
    } else {
      setSelectedImage(selectedImage + 1);
      setDirection(1);
    }
  };

  const prevImage = () => {
    if (selectedImage === 0) {
      setSelectedImage(displayImages.length - 1);
      setDirection(-1);
    } else {
      setSelectedImage(selectedImage - 1);
      setDirection(-1);
    }
  };

  const handleThumbnailClick = (index: number) => {
    setDirection(index > selectedImage ? 1 : -1);
    setSelectedImage(index);
  };

  const openFullscreen = () => {
    setIsFullscreen(true);
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
  };

  return (
    <>
      <div className="flex flex-col gap-[20px]">
        {/* Main Image Display */}
        <div className="flex-[1_0_400px] h-[100px] relative rounded-[20px] overflow-hidden">
          {showMainArrows && !isFullscreen && (
            <>
              <ScrollerArrow right={false} onClick={prevImage} />
              <ScrollerArrow right={true} onClick={nextImage} />
            </>
          )}

          {/* Fullscreen Button */}
          <button
            onClick={openFullscreen}
            className="absolute top-4 right-4 bg-[#00000075] text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-70 transition-all z-10"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 3H5C3.89543 3 3 3.89543 3 5V8M21 8V5C21 3.89543 20.1046 3 19 3H16M16 21H19C20.1046 21 21 20.1046 21 19V16M3 16V19C3 20.1046 3.89543 21 5 21H8"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={selectedImage}
              custom={direction}
              variants={imageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute w-full h-full bg-center bg-cover bg-no-repeat rounded-[20px] cursor-pointer"
              style={{
                backgroundImage: `url(${displayImages[selectedImage].link})`,
              }}
              onClick={openFullscreen}
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
            />
          </AnimatePresence>
        </div>

        {/* Thumbnail Gallery */}
        <Block label="" isDesktop={true}>
          <div className="overflow-auto scrollbar-0 relative">
            <motion.div
              className="flex gap-[12px]"
              animate={{
                x: -scrollPosition * itemWidth,
              }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30,
              }}
            >
              {displayImages.map((image, index) => (
                <motion.img
                  key={image.id}
                  src={image.link}
                  alt=""
                  className={`w-[100px] h-[60px] rounded-[10px] cursor-pointer object-cover flex-shrink-0 transition-all duration-200 ${
                    selectedImage === index
                      ? 'border-2 border-blue-500'
                      : 'border-2 border-transparent hover:border-gray-300'
                  }`}
                  onClick={() => handleThumbnailClick(index)}
                />
              ))}
            </motion.div>

            {canScrollLeft && (
              <ScrollerArrow right={false} onClick={scrollLeft} />
            )}

            {canScrollRight && (
              <ScrollerArrow right={true} onClick={scrollRight} />
            )}
          </div>
        </Block>
      </div>

      {/* Fullscreen Overlay */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-90 z-[10] flex items-center justify-center"
            onClick={closeFullscreen}
          >
            {/* Close button */}
            <button
              onClick={closeFullscreen}
              className="absolute top-4 right-4 text-white text-2xl bg-[#00000075] bg-opacity-50 rounded-full w-12 h-12 flex items-center justify-center hover:bg-opacity-70 transition-all z-[10000]"
            >
              ×
            </button>

            {showMainArrows && (
              <>
                <ScrollerArrow right={false} onClick={prevImage} />
                <ScrollerArrow right={true} onClick={nextImage} />
              </>
            )}

            <div className="relative w-full h-full flex items-center justify-center">
              {showMainArrows && (
                <>
                  <div className="absolute left-4 z-[10000]">
                    <ScrollerArrow right={false} onClick={prevImage} />
                  </div>
                  <div className="absolute right-4 z-[10000]">
                    <ScrollerArrow right={true} onClick={nextImage} />
                  </div>
                </>
              )}

              <div className="relative w-[90vw] h-[90vh] flex items-center justify-center">
                <AnimatePresence initial={false} custom={direction}>
                  <motion.img
                    key={selectedImage}
                    custom={direction}
                    variants={imageVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    src={displayImages[selectedImage].link}
                    alt=""
                    className="absolute max-w-full max-h-full object-contain rounded-[10px]"
                    onClick={e => e.stopPropagation()}
                    transition={{
                      x: { type: 'spring', stiffness: 300, damping: 30 },
                      opacity: { duration: 0.2 },
                    }}
                  />
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
