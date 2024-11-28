"use client";
import { Plus } from "flowbite-react-icons/outline";
import StoresAnalytics from "../../components/Stores/Analytics/StoresAnalytics";
import { useStores } from "./hooks";
import Loading from "@/components/loaders/Loading";
import { Pagination } from "flowbite-react";

export default function StoresPage() {
  const { listData: data, isFetching, page, handlePage, router } = useStores();

  if (isFetching > 0) {
    return <Loading />;
  }

  return (
    <section className="mt-10">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">STORES</h1>
          <p className="text-greySecondary">View all stores information</p>
        </div>
        <button className=" py-2 pl-2 pr-4 flex items-center justify-center gap-1 rounded-lg bg-green-400 text-white transition-all hover:bg-primary">
          <Plus className="text-white w-5 h-5" />
          <span className="text-sm">Add New</span>
        </button>
      </div>
      {data && (
        <StoresAnalytics
          total={data.total}
          total_verified={data.total_verified_stores}
          average_rating={data.average_rating}
        />
      )}
      <hr className="mt-5 border-t border" />
      <input
        type="text"
        placeholder="Search"
        className="placeholder-slate-400 outline-none px-5 py-2 border-0 mt-4 focus:ring-greySecondary rounded-full"
      />
      <div className="flex w-full items-center justify-center mt-4">
        <div className="overflow-x-auto w-full shadow-lg rounded-lg">
          <table className="min-w-full bg-white rounded-lg">
            <thead>
              <tr className="bg-slate-50 text-title">
                <th className="py-3 px-4 text-left">Store ID</th>
                <th className="py-3 px-4 text-left">Store Name</th>
                <th className="py-3 px-4 text-left">Store Description</th>
                <th className="py-3 px-4 text-left">Rating</th>
                <th className="py-3 px-4 text-left">Location</th>
                <th className="py-3 px-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody className="text-greyMain">
              {data?.data.length && (
                <>
                  {data.data.map((item, i) => {
                    return (
                      <tr key={i} className="border-b border-blue-gray-200">
                        <td className="py-6 px-4">{item.id}</td>
                        <td className="px-4">{item.name}</td>
                        <td className="px-4">{item.description}</td>
                        <td className="px-4">
                          {Number(item.rating).toFixed(1)}
                        </td>
                        <td className="px-4">{item.location}</td>
                        <td className="px-4">
                          <a
                            href="#"
                            className="font-medium text-blue-600 hover:text-blue-800"
                          >
                            Edit
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                </>
              )}
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
    </section>
  );
}
