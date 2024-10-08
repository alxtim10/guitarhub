import React from 'react'

const page = () => {
    return (
        
        <div className=" my-20">
            <div className='px-5 flex items-center justify-start gap-2'>
                <div className='bg-green-400 w-16 h-16 rounded-full'></div>
                <div className='flex flex-col items-start justify-center'>
                    <h1 className='text-md font-bold'>Jaden Brooke</h1>
                    <div className='text-[0.6rem] w-fit shadow-md bg-gradient-to-br from-yellow-300 to-yellow-400 rounded-full px-3 py-1'>Gold Member</div>
                </div>
            </div>
            <div className='bg-black h-screen w-full mt-5 rounded-t-[1.7rem]'></div>
        </div>
    )
}

export default page