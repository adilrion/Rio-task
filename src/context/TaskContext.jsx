import { createContext } from "react";


const createTaskContext = createContext();


export const TaskContextProvider = ({ children }) => {
    return (
        <createTaskContext.Provider>{children}</createTaskContext.Provider>
    )
}