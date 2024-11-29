import { Plus } from "flowbite-react-icons/outline";

export default function UsersPage() {
  return (
    <section className="mt-10">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">USERS</h1>
          <p className="text-greySecondary">View all users information</p>
        </div>
        <button className=" py-2 pl-2 pr-4 flex items-center justify-center gap-1 rounded-lg bg-green-400 text-white transition-all hover:bg-primary">
          <Plus className="text-white w-5 h-5" />
          <span className="text-sm">Add New</span>
        </button>
      </div>
      <div className="flex items-center justify-between gap-5 bg-white p-5 w-full mt-[1rem] shadow-md rounded-lg">
        <div className="flex flex-col items-start justify-between h-20 w-full border-r">
          <h1 className="text-md text-greySecondary">Total</h1>
          <div className="flex items-center justify-center gap-1">
            <h1 className="text-3xl">5208</h1>
            <p className="text-xs mt-2">Users</p>
          </div>
        </div>
        <div className="flex flex-col items-start justify-between h-20 w-full">
          <h1 className="text-md text-greySecondary">Active</h1>
          <div className="flex items-center justify-center gap-1">
            <h1 className="text-3xl">5008</h1>
            <p className="text-xs mt-2">Users</p>
          </div>
        </div>
      </div>
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
                <th className="py-3 px-4 text-left">ID</th>
                <th className="py-3 px-4 text-left">Username</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Phone</th>
                <th className="py-3 px-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody className="text-greyMain">
              {[...Array(8)].map((_, i) => {
                return (
                  <tr key={i} className="border-b border-blue-gray-200">
                    <td className="py-6 px-4">USR00{i + 1}</td>
                    <td className="px-4">alexander.timotius</td>
                    <td className="px-4">alxtim10@gmail.com</td>
                    <td className="px-4">08111520628</td>
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
