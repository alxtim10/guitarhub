'use client'
import { Logo } from "@/public/assets/images";
import { Cart } from "flowbite-react-icons/outline";
import Image from "next/image";
import { useRouter } from "next/navigation";

const NavbarMobileTop = () => {

  const router = useRouter();

  return (
    <div className="absolute left-0 w-full top-0 py-4 px-7 flex items-center justify-between">
      <Image src={Logo} className='cursor-pointer' width={120} height={120} alt="logo" />
      <div className="flex items-center justify-center gap-5">
        <div className="bg-gray-50 rounded-full p-[6px] shadow-xl border cursor-pointer">
          <Cart className="w-7 h-7 text-black" />
        </div>
      </div>
    </div>
  );
};

export default NavbarMobileTop;
