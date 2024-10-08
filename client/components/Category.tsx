"use client";
import { useEffect, useRef, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules";
import { Swiper as SwiperType } from "swiper";

const Category = () => {
  const images = [
    {
      id: 1,
      src: "https://via.placeholder.com/600x300?text=Image+1",
      alt: "Image 1",
    },
    {
      id: 2,
      src: "https://via.placeholder.com/600x300?text=Image+2",
      alt: "Image 2",
    },
    {
      id: 3,
      src: "https://via.placeholder.com/600x300?text=Image+3",
      alt: "Image 3",
    },
    {
      id: 4,
      src: "https://via.placeholder.com/600x300?text=Image+4",
      alt: "Image 3",
    },
    {
      id: 5,
      src: "https://via.placeholder.com/600x300?text=Image+5",
      alt: "Image 3",
    },
    {
      id: 6,
      src: "https://via.placeholder.com/600x300?text=Image+6",
      alt: "Image 3",
    },
    {
      id: 7,
      src: "https://via.placeholder.com/600x300?text=Image+7",
      alt: "Image 3",
    },
  ];

  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const [ready, setReady] = useState(false);
  useEffect(() => {
    setReady(true);
  }, []);

  if (!ready) return null;

  const handleSlideChange = (swiper: SwiperType) => {
    setActiveIndex(swiper.activeIndex);
  };

  return (
    <div className="relative min-w-[360px] md:max-w-[768px] w-full h-full overflow-visible mt-5">
      <Swiper
        className="mySwiper"
        modules={[Navigation, A11y]}
        slidesPerView={7}
        navigation
        onSlideChange={handleSlideChange}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        {images.map((d, i) => (
          <SwiperSlide key={i} className="">
            <div className="flex items-center justify-center flex-col w-[50px] h-[50px]">
              <img
                src={d.src}
                alt={`Image ${i + 1}`}
                className="w-[50px] px-2 relative h-[50px]"
              />
              <p className="text-xs text-center">Alat Kesehatan</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Category;
