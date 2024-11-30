'use client'
import React from "react";
import CatalogCard from "./CatalogCard";
import Link from "next/link";
import { useCatalog } from "./hooks";

interface CatalogProps {
  title: string;
}

const Catalog = ({
  title
}: CatalogProps) => {

  const { data } = useCatalog();

  return (
    <section className="mt-5 h-full bg-white min-h-screen p-5 rounded-t-[38px]">
      <h1 className="text-sm font-extrabold">{title}</h1>
      <div className="grid grid-cols-2 gap-4 mt-3 w-full">
        {data && data.data.map((item, i) => (
          <Link href={`/product/${item.id}`} key={i}>
            <CatalogCard data={item} />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Catalog;
