"use client";
import { Plus } from "flowbite-react-icons/outline";
import { useCategoryHook } from "./hooks";
import { Pagination } from "flowbite-react";
import Link from "next/link";

export default function CategoriesPage() {
  const { data, isLoading, page, handlePage } = useCategoryHook();

  return (
    <section className="mt-10">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">CATEGORIES</h1>
          <p className="text-greySecondary">View all categories information</p>
        </div>
        <Link
          href={"/admin/categories/add"}
          className=" py-2 pl-2 pr-4 flex items-center justify-center gap-1 rounded-lg bg-green-400 text-white transition-all hover:bg-green-500"
        >
          <Plus className="text-white w-5 h-5" />
          <span className="text-sm">Add New</span>
        </Link>
      </div>
      <div className="flex items-center justify-between gap-5 bg-white p-5 w-full mt-[1rem] shadow-md rounded-lg">
        <div className="flex flex-col items-start justify-between h-20 w-full">
          <h1 className="text-md text-greySecondary">Total</h1>
          <div className="flex items-center justify-center gap-1">
            <h1 className="text-3xl">{data?.total}</h1>
            <p className="text-xs mt-2">Categories</p>
          </div>
        </div>
      </div>
      <hr className="mt-5 border-t border" />
      <input
        type="text"
        placeholder="Search"
        className="placeholder-slate-400 outline-none px-5 py-2 border-0 mt-4 focus:ring-greySecondary rounded-full"
      />
      {!isLoading && (
        <>
          <div className="flex w-full items-center justify-center mt-4">
            <div className="overflow-x-auto w-full shadow-lg rounded-lg">
              <table className="min-w-full bg-white rounded-lg">
                <thead>
                  <tr className="bg-slate-50 text-title">
                    <th className="py-3 px-4 text-left">ID</th>
                    <th className="py-3 px-4 text-left">Name</th>
                    <th className="py-3 px-4 text-left">Description</th>
                    <th className="py-3 px-4 text-left">Action</th>
                  </tr>
                </thead>
                <tbody className="text-greyMain">
                  {data &&
                    data.data.length > 0 &&
                    data.data.map((item: any, i) => {
                      return (
                        <tr key={i} className="border-b border-blue-gray-200">
                          <td className="py-6 px-4">{item.id}</td>
                          <td className="px-4">{item.name}</td>
                          <td className="px-4">{item.description}</td>
                          <td className="px-4">
                            <Link
                              href={`/admin/categories/edit?id=${item.id}`}
                              className="font-medium text-blue-600 hover:text-blue-800"
                            >
                              Edit
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
          {data && data.last_page > 1 && (
            <Pagination
              currentPage={page}
              totalPages={data.last_page}
              onPageChange={handlePage}
              previousLabel=""
              nextLabel=""
              showIcons
            />
          )}
        </>
      )}
    </section>
  );
}
