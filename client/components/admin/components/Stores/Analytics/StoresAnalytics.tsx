import { StoresListType } from "@/types/store";
import { Star } from "flowbite-react-icons/solid";
import React from "react";

interface StoresAnalyticsProps {
  total: number;
  total_verified: number;
  average_rating: number;
}

const StoresAnalytics = ({
  total,
  total_verified,
  average_rating,
}: StoresAnalyticsProps) => {
  return (
    <div className="flex items-center justify-between gap-5 bg-white p-5 w-full mt-[1rem] shadow-md rounded-lg">
      <div className="flex flex-col items-start justify-between h-20 w-full border-r">
        <h1 className="text-md text-greySecondary">Total</h1>
        <div className="flex items-center justify-center gap-1">
          <h1 className="text-3xl">{total}</h1>
          <p className="text-xs mt-2">Stores</p>
        </div>
      </div>
      <div className="flex flex-col items-start justify-between h-20 w-full border-r">
        <h1 className="text-md text-greySecondary">Verified</h1>
        <div className="flex items-center justify-center gap-1">
          <h1 className="text-3xl">{total_verified}</h1>
          <p className="text-xs mt-2">Stores</p>
        </div>
      </div>
      <div className="flex flex-col items-start justify-between h-20 w-full border-r  ">
        <h1 className="text-md text-greySecondary">Average Rating</h1>
        <div className="flex items-center justify-center gap-1">
          <Star className="w-4 h-4 text-yellow-300" />
          <h1 className="text-3xl">{Number(average_rating).toFixed(1)}</h1>
          <p className="text-xs mt-2">/ 5</p>
        </div>
      </div>
    </div>
  );
};

export default StoresAnalytics;
