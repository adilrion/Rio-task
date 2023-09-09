import React from 'react'
import { useAuthContext } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }) => {

   const {user} = useAuthContext();
    const navigate = useNavigate();
    if (!user) {
        navigate("/")
    } else {
        return (
            <>{children}</>
        )
    }
 
}
