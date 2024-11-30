'use client'
import { ArrowLeft } from 'flowbite-react-icons/outline';
import { useRouter } from 'next/navigation';
import { useAddCategory } from './hooks';
import LoadingWeb from '@/components/loaders/LoadingWeb';

export default function AddCategory() {

    const router = useRouter();
    const { request, handleInput, handleAdd, isLoading } = useAddCategory();

    if (isLoading) {
        return <LoadingWeb />
    }

    return (
        <section className='p-5'>
            <div className='flex items-center gap-3 mb-3'>
                <ArrowLeft
                    onClick={() => {
                        router.back();
                    }}
                    className='w-7 h-7 cursor-pointer' />
                <h1 className='font-bold text-lg'>Add Category</h1>
            </div>
            <div className="bg-white px-5 py-8 rounded-xl mt-10 shadow-lg">

                <h1 className="text-2xl font-bold">Category</h1>
                <div className="mt-5 gap-3 flex flex-col items-start justify-center w-full">
                    <label className="text-xs font-semibold">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={request.name}
                        onChange={handleInput}
                        className="w-full rounded-lg border-2 border-gray-200 
            bg-gray-100 text-xs h-11 focus:border-primary focus:ring-0 focus:outline-0 transition-all"
                    />
                </div>
                <div className="mt-5 gap-3 flex flex-col items-start justify-center w-full">
                    <label className="text-xs font-semibold">Description</label>
                    <textarea
                        rows={5}
                        name="description"
                        value={request.description}
                        onChange={handleInput}
                        className="w-full rounded-lg border-2 border-gray-200 
            bg-gray-100 text-xs focus:border-primary focus:ring-0 focus:outline-0 transition-all"
                    />
                </div>

                <button
                    onClick={handleAdd}
                    className="shadow-md mt-5 w-full bg-primary  text-white py-3 rounded-md"
                >
                    Add
                </button>
            </div>
        </section>
    )
}
