import React from 'react'
import { Footer } from '../../components/footer/footer'
import { Outlet, useLocation, useRoutes } from 'react-router-dom'
import { Sidebar } from '../../components/navigation/Sidebar'
import { Task } from '../tasks/Task'
import TopNavbar from '../../components/navigation/Navbar'

const Home = () => {

  
    const path = useLocation();
   

    return (
        <>

            <TopNavbar />

            <div className="grid grid-cols-12 ">
                <div className="col-span-3 relative">
                    <Sidebar />
                </div>
                <div className="col-span-9 ">

                    {path?.pathname === '/' && <Task/>}
                    <Outlet />
                </div>
            </div>


            <Footer />


        </>
    )
}

export default Home