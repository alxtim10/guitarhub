import { Plus } from "flowbite-react-icons/outline";

export default function BannersPage() {
  return (
    <section className="mt-10">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">BANNERS</h1>
          <p className="text-greySecondary">View all banners information</p>
        </div>
        <button className=" py-2 pl-2 pr-4 flex items-center justify-center gap-1 rounded-lg bg-green-400 text-white transition-all hover:bg-primary">
          <Plus className="text-white w-5 h-5" />
          <span className="text-sm">Add New</span>
        </button>
      </div>
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
                <th className="py-3 px-4 text-left">Banner ID</th>
                <th className="py-3 px-4 text-left">Banner Name</th>
                <th className="py-3 px-4 text-left">Category</th>
                <th className="py-3 px-4 text-left">Image</th>
                <th className="py-3 px-4 text-left">Order</th>
                <th className="py-3 px-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody className="text-greyMain">
              {[...Array(5)].map((_, i) => {
                return (
                  <tr key={i} className="border-b border-blue-gray-200">
                    <td className="py-6 px-4">BNR00{i+1}</td>
                    <td className="px-4">Fender Sale</td>
                    <td className="px-4">A - Top Banner</td>
                    <td className="px-4">
                        <div className="bg-green-400 w-10 h-10"></div>
                    </td>
                    <td className="px-4">{i+1}</td>
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
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
