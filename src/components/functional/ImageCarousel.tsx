'use client';

import Image from 'next/image';
import { useState } from 'react';
import Swipe from 'react-easy-swipe';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

export default function ImageCarousel({ images }: { images: string[] }) {
  const [slide, setSlide] = useState(0);

  const handleNextSlide = () => {
    setSlide(slide === images.length - 1 ? 0 : slide + 1);
  };

  const handlePrevSlide = () => {
    setSlide(slide === 0 ? images.length - 1 : slide - 1);
  };

  return (
    <div className="relative">
      {images.length < 1 ? (
        <AiOutlineLeft
          onClick={handlePrevSlide}
          className="absolute inset-y-1/2 left-0 z-20 m-auto cursor-pointer text-5xl text-gray-400"
        />
      ) : null}

      <div className="relative m-auto flex h-[50vh] w-full overflow-hidden">
        <Swipe
          onSwipeLeft={handleNextSlide}
          onSwipeRight={handlePrevSlide}
          className="relative z-10 h-auto w-full"
        >
          {images.map((image, index) => {
            if (index === slide) {
              return (
                <Image
                  key={index}
                  src={image}
                  alt="img"
                  layout="fill"
                  objectFit="contain"
                />
              );
            }
          })}
        </Swipe>
      </div>
      {images.length < 1 ? (
        <AiOutlineRight
          onClick={handleNextSlide}
          className="absolute inset-y-1/2 right-0 z-20 m-auto cursor-pointer text-5xl text-gray-400"
        />
      ) : null}

      {images.length < 1 ? (
        <div className="relative flex justify-center p-2">
          {images.map((_, index) => {
            return (
              <div
                className={
                  index === slide
                    ? 'mx-2 mb-2 h-4 w-4 cursor-pointer rounded-full bg-gray-700'
                    : 'mx-2 mb-2 h-4 w-4 cursor-pointer rounded-full bg-gray-300'
                }
                key={index}
                onClick={() => {
                  setSlide(index);
                }}
              />
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
