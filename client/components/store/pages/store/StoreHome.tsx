'use client'
import { ArrowLeft } from 'flowbite-react-icons/outline';
import { useRouter } from 'next/navigation';

export default function StoreHome() {
    const router = useRouter();
    return (
        <section>
            <div className='bg-green-400 pt-6 pb-16 px-4 w-full rounded-b-3xl'>
                <div className='flex items-center gap-3 mb-3'>
                    <ArrowLeft
                        onClick={() => {
                            router.back();
                        }}
                        className='text-white w-7 h-7 cursor-pointer' />
                    <h1 className='font-bold text-white text-lg'>My Store</h1>
                </div>
                <p className='font-bold text-white text-2xl text-center mt-11'>
                    Nama toko yang unik, selalu terlihat menarik
                </p>
                <p className='text-black text-center text-sm mt-3'>
                    Gunakan nama yang singkat dan sederhana agar tokomu mudah dingat pembeli.
                </p>
            </div>
            <div className='p-4 bg-white shadow-md mx-4 rounded-xl -mt-10'>
                <h1>Hello, <b>Jaden Brooke</b> fill up your store detail!</h1>
                <div className="mt-5 gap-3 flex flex-col items-start justify-center w-full">
                    <label className="text-xs font-semibold">Store Name</label>
                    <input
                        type="text"
                        name="name"
                        placeholder='Enter Store Name'
                        // value={request.email}
                        // onChange={handleInput}
                        className="w-full rounded-lg border-2 border-gray-200 
            bg-gray-100 text-xs h-11 focus:border-green-300 focus:ring-0 focus:outline-0 transition-all"
                    />
                </div>
                <div className="mt-5 gap-3 flex flex-col items-start justify-center w-full">
                    <label className="text-xs font-semibold">Store Domain</label>
                    <div className='flex items-center justify-between gap-2 w-full'>
                        <h1>guitarhub/</h1>
                        <input
                            type="text"
                            name="domain"
                            placeholder='Enter Store Domain'
                            // value={request.email}
                            // onChange={handleInput}
                            className="w-full rounded-lg border-2 border-gray-200 
            bg-gray-100 text-xs h-11 focus:border-green-300 focus:ring-0 focus:outline-0 transition-all"
                        />
                    </div>
                </div>
                <hr className='border my-5' />
                <div className="gap-3 flex flex-col items-start justify-center w-full">
                    <label className="text-xs font-semibold">Address</label>
                    <textarea
                        rows={5}
                        name="address"
                        placeholder='Enter Store Address'
                        // value={request.email}
                        // onChange={handleInput}
                        className="w-full rounded-lg border-2 border-gray-200 
            bg-gray-100 text-xs focus:border-green-300 focus:ring-0 focus:outline-0 transition-all"
                    />
                </div>
                <button
                    className="shadow-md mt-5 w-full bg-green-500  text-white py-3 rounded-md"
                >
                    Create
                </button>
            </div>
        </section>
    )
}
