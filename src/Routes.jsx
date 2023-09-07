import React from 'react'
import { Routes, Route } from "react-router-dom"
import { Task } from './pages/tasks/Task'
import Home from './pages/home/Home'
import { TaskDetails } from './pages/tasks/TaskDetails'
import { CreateTask } from './pages/tasks/CreateTask'


export const RouterPage = () => {
    return (
        <>

            <Routes>
                <Route path="/" element={<Home />} >
                <Route path="home" element={<Home />} />
                <Route path="task" element={<Task />} />
                <Route path="create-task" element={<CreateTask />} />
                <Route path="task-details" element={<TaskDetails />} />

                </Route>
            </Routes>
        </>
    )
}
