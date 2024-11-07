import React from 'react'
import { useStoreCategory } from './hooks'
import { AngleDown } from 'flowbite-react-icons/outline';

export default function ListCategory() {

  const { storeCategoryData } = useStoreCategory();

  return (
    <section className='flex flex-col gap-3 mt-7'>
      {storeCategoryData?.length && storeCategoryData.map((item, i) => {
        return (
          <div
            key={i}
            className='bg-white p-5 shadow-md rounded-md cursor-pointer flex items-center justify-between'
          >
            <h1>{item.name}</h1>
            <AngleDown />
          </div>
        )
      })}
    </section>
  )
}
