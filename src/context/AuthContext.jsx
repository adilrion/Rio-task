import { createContext, useContext, useState } from "react";

const authContext = createContext();

export const useAuthContext = () => {
   return useContext(authContext);
}

export const AuthContextProvider = ({ children }) => {


    const [auth, setAuth] = useState(null);


  
    return (
        <authContext.Provider value={{auth, setAuth}}>{children}</authContext.Provider>
    )
}
