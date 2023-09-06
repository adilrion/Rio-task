import React from 'react'
import { TopNavbar } from '../../components/navigation/Navbar'
import { Footer } from '../../components/footer/footer'
import { Outlet } from 'react-router-dom'
import { Sidebar } from '../../components/navigation/Sidebar'

const Home = () => {

  


    return (
        <>

            <TopNavbar />

            <div className="grid grid-cols-12 gap-x-3">
                <div className="col-span-3 relative">
                    <Sidebar />
                </div>
                <div className="col-span-9 py-5">
                    <Outlet />
                </div>
            </div>


            <Footer />


        </>
    )
}

export default Home