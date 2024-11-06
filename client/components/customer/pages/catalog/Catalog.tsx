import React from "react";
import CatalogCard from "./CatalogCard";
import Link from "next/link";

interface CatalogProps {
  title: string;
}

const Catalog = ({
  title
}: CatalogProps) => {
  return (
    <section className="mt-8 h-full">
      <h1 className="text-xs font-extrabold">{title}</h1>
      <div className="grid grid-cols-2 gap-4 mt-2">
        {[...Array(8)].map((_, i) => (
          <Link href={'/product/1'} key={i}>
            <CatalogCard />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Catalog;
