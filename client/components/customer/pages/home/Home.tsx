import React from 'react'
import NavbarMobile from '../navbar/NavbarMobile'
import Banner from '../banner/Banner'
import Category from '../category/Category'
import Catalog from '../catalog/Catalog'

export default function Home() {

    return (
        <section className='p-5'>
            <NavbarMobile />
            <div className="my-16">
                <Banner />
                <Category />
                <Catalog />
            </div>
        </section>
    )
}
