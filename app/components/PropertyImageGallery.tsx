import { useState } from 'react';
import { motion } from 'framer-motion';
import ImageScroller from './ImageScroller';
import ButtonIcon from './ButtonIcon';
import ScrollerArrow from './ScrollerArrow';

interface PropertyImageGalleryProps {
  images: string[];
}

export default function PropertyImageGallery({
  images,
}: PropertyImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const displayImages =
    images.length > 0 ? images : ['/app/media/images/placeholder.png'];

  const itemWidth = 112;
  const visibleItems = 6;
  const maxScroll = Math.max(0, displayImages.length - visibleItems);
  const canScrollLeft = scrollPosition > 0;
  const canScrollRight = scrollPosition < maxScroll;

  const scrollLeft = () => {
    setScrollPosition(Math.max(0, scrollPosition - 1));
  };

  const scrollRight = () => {
    setScrollPosition(Math.min(maxScroll, scrollPosition + 1));
  };

  return (
    <div className="flex flex-col gap-[20px]">
      <div className="w-[780px] h-[370px] relative rounded-[20px] overflow-hidden">
        <ImageScroller images={[displayImages[selectedImage]]} />
      </div>

      <div className="bg-white shadow-md rounded-[20px] p-[20px] h-[80px] flex items-center gap-[12px] relative">
        <div className="w-[672px] overflow-hidden relative">
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
              <img
                key={index}
                src={image}
                alt=""
                className="w-[100px] h-[60px] rounded-[10px] cursor-pointer object-cover flex-shrink-0"
                onClick={() => setSelectedImage(index)}
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

        <div className="flex items-center justify-center text-[20px] font-[400] text-black flex-shrink-0">
          {displayImages.length}
        </div>
      </div>
    </div>
  );
}
