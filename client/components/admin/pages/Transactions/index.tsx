export default function TransactionsPage() {
  return (
    <section className="mt-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">TRANSACTIONS</h1>
        <p className="text-greySecondary">View all transactions information</p>
      </div>
      <div className="flex items-center justify-between gap-5 bg-white p-5 w-full mt-[1rem] shadow-md rounded-lg">
        <div className="flex flex-col items-start justify-between h-20 w-full border-r">
          <h1 className="text-md text-greySecondary">Total</h1>
          <div className="flex items-center justify-center gap-1">
            <h1 className="text-3xl">5205</h1>
            <p className="text-xs mt-2">Transactions</p>
          </div>
        </div>
        <div className="flex flex-col items-start justify-between h-20 w-full border-r">
          <h1 className="text-md text-greySecondary">Users</h1>
          <div className="flex items-center justify-center gap-1">
            <h1 className="text-3xl">1500</h1>
            <p className="text-xs mt-2">Users</p>
          </div>
        </div>
        <div className="flex flex-col items-start justify-between h-20 w-full">
          <h1 className="text-md text-greySecondary">Total Amount</h1>
          <div className="flex items-center justify-center gap-2">
            <p className="text-sm mt-2">Rp.</p>
            <h1 className="text-3xl">250.350.200</h1>
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
                <th className="py-3 px-4 text-left">Date</th>
                <th className="py-3 px-4 text-left">User ID</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Amount</th>
                <th className="py-3 px-4 text-left">Address</th>
                <th className="py-3 px-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody className="text-greyMain">
              {[...Array(8)].map((_, i) => {
                return (
                  <tr key={i} className="border-b border-blue-gray-200">
                    <td className="py-8 px-4">TRX01160324</td>
                    <td className="px-4">2024-03-16 10:30:00</td>
                    <td className="px-4">USR00{i+1}</td>
                    <td className="px-4">Delivered</td>
                    <td className="px-4">Rp. 250.000</td>
                    <td className="px-4 w-[21rem] text-sm">Perum. Grand Wisata, Cluster Water Garden, BH 6/28, Kab. Bekasi</td>
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
