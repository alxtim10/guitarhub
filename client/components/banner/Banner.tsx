"use client";
import { useEffect, useRef, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules";
import { Swiper as SwiperType } from "swiper";

const Banner = () => {

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
    <div className="h-full w-full">
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
        spaceBetween={3}
        navigation
        onSlideChange={handleSlideChange}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        {[...Array(5)].map((_, i) => (
          <SwiperSlide key={i} className="h-full w-full relative">
            <div className="w-full bg-green-200 rounded-lg h-[150px] p-4 relative">
             
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
