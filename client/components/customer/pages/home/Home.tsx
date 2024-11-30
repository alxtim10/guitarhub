import React from 'react'
import NavbarMobile from '../navbar/NavbarMobile'
import Banner from '../banner/Banner'
import Category from '../category/Category'
import Catalog from '../catalog/Catalog'

export default function Home() {

    return (
        <section>
            <div className='p-5'>
                <NavbarMobile />
            </div>
            <div className="mb-16 mt-7">
                <div className='pt-5 px-5'>
                    <Banner />
                </div>
                {/* <Category /> */}
                <Catalog title={'For You'} />
            </div>
        </section>
    )
}
