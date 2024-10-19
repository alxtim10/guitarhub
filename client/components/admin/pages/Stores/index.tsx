import { Star } from "flowbite-react-icons/solid";

export default function StoresPage() {
  return (
    <section className="mt-10">
      <h1 className="text-xl font-bold">STORES</h1>
      <div className="flex items-center justify-between gap-5 bg-white p-5 w-full mt-[1rem] shadow-md rounded-lg">
        <div className="flex flex-col items-start justify-between h-20 w-full border-r">
          <h1 className="text-md text-greySecondary">Total</h1>
          <div className="flex items-center justify-center gap-1">
            <h1 className="text-3xl">500</h1>
            <p className="text-xs mt-2">Stores</p>
          </div>
        </div>
        <div className="flex flex-col items-start justify-between h-20 w-full border-r">
          <h1 className="text-md text-greySecondary">Verified</h1>
          <div className="flex items-center justify-center gap-1">
            <h1 className="text-3xl">355</h1>
            <p className="text-xs mt-2">Stores</p>
          </div>
        </div>
        <div className="flex flex-col items-start justify-between h-20 w-full border-r  ">
          <h1 className="text-md text-greySecondary">Average Rating</h1>
          <div className="flex items-center justify-center gap-1">
            <Star className="w-4 h-4 text-yellow-300 mb-3" />
            <h1 className="text-3xl">4.5</h1>
            <p className="text-xs mt-2">/ 5</p>
          </div>
        </div>
        <div className="flex flex-col items-start justify-between h-20 w-full">
          <h1 className="text-md text-greySecondary">Average Product per Store</h1>
          <div className="flex items-center justify-center gap-1">
            <h1 className="text-3xl">30</h1>
            <p className="text-xs mt-2">Products</p>
          </div>
        </div>
      </div>
      <hr className="mt-5 border-t border" />
      <div className="flex w-full items-center justify-center mt-4">
        <div className="overflow-x-auto w-full shadow-lg rounded-lg">
          <table className="min-w-full bg-white rounded-lg">
            <thead>
              <tr className="bg-blue-gray-100 text-gray-700">
                <th className="py-3 px-4 text-left">Store ID</th>
                <th className="py-3 px-4 text-left">Store Name</th>
                <th className="py-3 px-4 text-left">Product Quantity</th>
                <th className="py-3 px-4 text-left">Product Sold</th>
                <th className="py-3 px-4 text-left">Rating</th>
                <th className="py-3 px-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody className="text-blue-gray-900">
              <tr className="border-b border-blue-gray-200">
                <td className="py-6 px-4">STR001</td>
                <td className="px-4">Company A</td>
                <td className="px-4">15</td>
                <td className="px-4">1500</td>
                <td className="px-4">4.5/5</td>
                <td className="px-4">
                  <a href="#" className="font-medium text-blue-600 hover:text-blue-800">Edit</a>
                </td>
              </tr>
              <tr className="border-b border-blue-gray-200">
                <td className="py-6 px-4">STR001</td>
                <td className="px-4">Company A</td>
                <td className="px-4">15</td>
                <td className="px-4">1500</td>
                <td className="px-4">4.5/5</td>
                <td className="px-4">
                  <a href="#" className="font-medium text-blue-600 hover:text-blue-800">Edit</a>
                </td>
              </tr>
              <tr className="border-b border-blue-gray-200">
                <td className="py-6 px-4">STR001</td>
                <td className="px-4">Company A</td>
                <td className="px-4">15</td>
                <td className="px-4">1500</td>
                <td className="px-4">4.5/5</td>
                <td className="px-4">
                  <a href="#" className="font-medium text-blue-600 hover:text-blue-800">Edit</a>
                </td>
              </tr>
              <tr className="border-b border-blue-gray-200">
                <td className="py-6 px-4">STR001</td>
                <td className="px-4">Company A</td>
                <td className="px-4">15</td>
                <td className="px-4">1500</td>
                <td className="px-4">4.5/5</td>
                <td className="px-4">
                  <a href="#" className="font-medium text-blue-600 hover:text-blue-800">Edit</a>
                </td>
              </tr>
              <tr className="border-b border-blue-gray-200">
                <td className="py-6 px-4">STR001</td>
                <td className="px-4">Company A</td>
                <td className="px-4">15</td>
                <td className="px-4">1500</td>
                <td className="px-4">4.5/5</td>
                <td className="px-4">
                  <a href="#" className="font-medium text-blue-600 hover:text-blue-800">Edit</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
