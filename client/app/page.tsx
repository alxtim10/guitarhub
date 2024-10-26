import Banner from "@/components/customer/pages/banner/Banner";
import Catalog from "@/components/customer/pages/catalog/Catalog";
import Category from "@/components/customer/pages/category/Category";
import NavbarMobile from "@/components/customer/pages/navbar/NavbarMobile";
import Image from "next/image";
export default function Home() {
  return (
    <main className="">
      <NavbarMobile />
      <div className="my-16">
        <Banner />
        <Category />
        <Catalog />
      </div>
    </main>
  );
}
