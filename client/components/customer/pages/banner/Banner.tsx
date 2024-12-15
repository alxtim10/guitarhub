"use client";
import { useEffect, useRef, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules";
import { Swiper as SwiperType } from "swiper";
import Image from "next/image";

const Banner = () => {

  const imagesData = ['https://melodymusicshop.com/cdn/shop/files/Taylor-Web-Banner-acoustic-2023-2.jpg?v=1686070907',
    'https://guitargeargiveaway.co.uk/wp-content/uploads/2024/05/triple-Les-paul-comp-1.jpg',
    'https://i.ytimg.com/vi/EmJZ4Vnq5zk/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCs5uKALjONYN8Zlb9PYXOukHpMtQ',
    'https://melodymusicshop.com/cdn/shop/files/Gibson-Web-Banner-2023.jpg?v=1686070907'
  ]

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
    <div className="h-full w-full rounded-lg">
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
        {imagesData.map((data, i) => (
          <SwiperSlide key={i} className="h-full w-full relative rounded-lg">
            <div className="w-full rounded-lg h-[150px] p-4 relative">
              <Image
                src={data}
                fill
                className="rounded-lg"
                objectFit="cover"
                alt={'asd'} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
