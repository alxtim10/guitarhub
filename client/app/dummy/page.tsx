"use client";

import Carousel from "@/components/Carousel";
import Category from "@/components/Category";

const page = () => {
  return (
    <div className="flex items-center justify-center flex-col h-full">
      <Carousel />
      <Category />
    </div>
  );
};

export default page;
