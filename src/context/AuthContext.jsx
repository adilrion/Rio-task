import { createContext, useContext, useState } from "react";

const authContext = createContext();


export const useAuthContext = () => {
    return useContext(authContext);
};


export const AuthContext = ({ children }) => {


    const [isRegistered, setIsRegistered] = useState(false);

    
    return (
        <authContext.Provider value={{ isRegistered, setIsRegistered }}>{ children}</authContext.Provider>
    )
}