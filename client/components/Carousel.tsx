"use client";
import { useEffect, useRef, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules";
import { Swiper as SwiperType } from "swiper";

const Carousel = () => {
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

  const pagination = {
    clickable: true,
    renderBullet: function (index: any, className: any) {
      return '<span class="' + className + '">' + "</span>";
    },
  };

  return (
    <div className="relative min-w-[360px] md:max-w-[768px] w-full rounded-b-3xl h-[270px] overflow-hidden">
      <Swiper
        className="mySwiper"
        modules={[Autoplay, Navigation, Pagination, A11y]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop={true}
        pagination={pagination}
        slidesPerView={1}
        navigation
        onSlideChange={handleSlideChange}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        {images.map((d, i) => (
          <SwiperSlide key={i} className="w-768px">
            <div className="w-full relative h-[270px]">
              <img
                src={d.src}
                alt={`Image ${i + 1}`}
                className="w-full relative h-full inset-0"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;
