"use client";
import { Check } from "flowbite-react-icons/outline";
import { useAddCategoryHook } from "./hooks";

export default function AddCategoryPage() {
  const { handleInput, handleAdd, request } = useAddCategoryHook();

  return (
    <section className="mt-10">
      <h1 className="text-2xl font-bold">CATEGORIES</h1>
      <div className="bg-white p-5 pb-7 w-full mt-[1rem] shadow-md rounded-3xl">
        <p className="text-title text-xl">Add New Category</p>
        <div className="flex flex-col justify-center mt-5 gap-2">
          <label className="text-md text-greyMain">Category Name</label>
          <input
            type="text"
            name="name"
            value={request.name}
            onChange={handleInput}
            placeholder="Enter Category Name"
            className="bg-[#f3f3f3] border-0 rounded-lg px-5 py-3"
          />
        </div>
        <div className="flex flex-col justify-center mt-5 gap-2">
          <label className="text-md text-greyMain">Category Description</label>
          <textarea
            rows={8}
            name="description"
            value={request.description}
            onChange={handleInput}
            placeholder="Enter Category Description"
            className="bg-[#f3f3f3] border-0 rounded-lg px-5 py-3"
          />
        </div>
        <button
          onClick={handleAdd}
          className="bg-green-500 text-white mt-5 gap-2 px-4 pr-5 py-3 flex items-center rounded-full"
        >
          <Check />
          <span>Add Category</span>
        </button>
      </div>
    </section>
  );
}
