import React from 'react'
import { Routes, Route } from "react-router-dom"
import { Task } from './pages/tasks/Task'
import Home from './pages/home/Home'
import { TaskDetails } from './pages/tasks/TaskDetails'
import { CreateTask } from './pages/tasks/CreateTask'
import { Error } from './pages/error/Error'
import { Login } from './components/authentication/Login'
import Register from './components/authentication/Register'
import { ProtectedRoute } from './components/authentication/ProtectedRoute'


export const RouterPage = () => {
    return (
    

            <Routes>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
            <Route path="/" element={
                <ProtectedRoute>
                <Home />
                </ProtectedRoute>
            
            } >

                    <Route path="home" element={<Home />} />
                    <Route path="task" element={<Task />} />
                    <Route path="create-task" element={<CreateTask />} />
                    <Route path="task-details/:id" element={<TaskDetails />} />

                </Route>
                    <Route path="/*" element={<Error />} />
            </Routes>
      
    )
}
