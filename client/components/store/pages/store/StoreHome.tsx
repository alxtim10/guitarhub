'use client'
import { AngleRight, ArrowLeft } from 'flowbite-react-icons/outline';
import { useRouter } from 'next/navigation';
import { useStore } from './hooks';
import Loading from '@/components/loaders/Loading';
import StoreForm from '../../components/form/StoreForm';
import { Star, Store } from 'flowbite-react-icons/solid';
import { StoreHomeTabs } from '@/constants/menu';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import Catalog from '@/components/customer/pages/catalog/Catalog';
import ListCategory from '../../components/category/ListCategory';
import LoadingWeb from '@/components/loaders/LoadingWeb';

export default function StoreHome() {

    const router = useRouter();
    const {
        storeData,
        handleInput,
        handleAdd,
        request,
        isLoading,
        selectedTabs,
        setSelectedTabs,
        isFetching
    } = useStore(1);

    if (isLoading && isFetching > 0) {
        return <LoadingWeb />
    }

    return (
        <section>
            {storeData && (
                <>
                    <div className='relative bg-green-400 pt-7 pb-7 px-4 w-full rounded-b-3xl'>
                        <div className='flex items-center gap-3 mb-3'>
                            <ArrowLeft
                                onClick={() => {
                                    router.back();
                                }}
                                className='text-white w-7 h-7 cursor-pointer' />
                            <h1 className='font-bold text-white text-lg'>My Store</h1>
                        </div>
                        <div className='flex items-start justify-start gap-2 mt-5'>
                            <Store className='text-white w-20 h-20' />
                            <div className='flex flex-col items-start justify-center mt-1'>
                                <div className='flex items-center justify-center gap-3'>
                                    <h1 className='font-bold text-white text-2xl mt-1'>{storeData.name}</h1>
                                    <div className='bg-green-100 text-gray-700  rounded-full shadow-lg px-2 flex items-center justify-center gap-1 text-sm mt-2'>
                                        <h1>{storeData.rating}</h1>
                                        <Star className='text-yellow-300 w-4 h-4 mb-1' />
                                    </div>
                                </div>
                                <p className='text-xs text-gray-100'>{storeData.location}</p>
                            </div>
                        </div>
                        <button className='absolute right-5 bottom-3 cursor-pointer bg-green-200 rounded-full px-3 py-1 text-xs flex items-center justify-center'><span>Edit Store</span>
                            <AngleRight className='w-3 h-3' />
                        </button>
                    </div>
                    <TabGroup className="mt-4" selectedIndex={selectedTabs} onChange={setSelectedTabs}>
                        <TabList className='flex items-center justify-around w-full outline-none'>
                            {StoreHomeTabs.map((tab, i) => {
                                return (
                                    <Tab className={`${selectedTabs === i ? 'text-green-500 border-b-green-500' : 'border-b-transparent'} border-b cursor-pointer transition-all outline-none`} key={i}>{tab}</Tab>
                                )
                            })}
                        </TabList>
                        <TabPanels className='px-4'>
                            <TabPanel className='mt-7'>
                                <div className='bg-green-400 h-[12rem] rounded-xl'></div>
                                <Catalog title={'Recommendation'} />
                            </TabPanel>
                            <TabPanel className={'mt-7'}>
                                <div className='flex items-center justify-center'>
                                    <button
                                        onClick={() => {
                                            router.push(`/profile/store/add-product?store_id=${storeData.id}`)
                                        }}
                                        className='bg-green-400 rounded-full px-2 py-1 cursor-pointer text-white text-xs'>+ Add Product</button>
                                </div>
                                <Catalog title={''} />
                            </TabPanel>
                            <TabPanel className={'mt-7'}>
                                <div className='flex items-center justify-center'>
                                    <button
                                        onClick={() => {
                                            router.push('/profile/store/addcategory')
                                        }}
                                        className='bg-green-400 rounded-full px-2 py-1 cursor-pointer text-white text-xs'>+ Add Category</button>
                                </div>
                                <ListCategory />
                            </TabPanel>
                        </TabPanels>
                    </TabGroup>
                </>
            )}
            {!storeData &&
                <>
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
                    <StoreForm handleAdd={handleAdd} handleInput={handleInput} request={request} />
                </>}
        </section>
    )
}
