import React from 'react'
import { Routes, Route } from "react-router-dom"
import { Task } from './pages/tasks/Task'
import Home from './pages/home/Home'


export const RouterPage = () => {
    return (
        <>

            <Routes>
                <Route path="/" element={<Home />} >
                <Route path="home" element={<Home />} />
                <Route path="task" element={<Task />} />

                </Route>
            </Routes>
        </>
    )
}
