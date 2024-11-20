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
    <section className="mt-8 h-full">
      <h1 className="text-xs font-extrabold">{title}</h1>
      <div className="grid grid-cols-2 gap-4 mt-2">
        {data && data.data.map((item, i) => (
          <Link href={'/product/1'} key={i}>
            <CatalogCard data={item} />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Catalog;
