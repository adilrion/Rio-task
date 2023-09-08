import { createContext, useContext, useEffect, useReducer } from "react";


const createTaskContext = createContext();
// Define your initial state
const initialState = {
    tasks: [],
};

// Define your reducer function
const taskReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TASK':
            return { ...state, tasks: [...state.tasks, action.payload] };
        default:
            return state;
    }
};

// Add functions for saving and loading data to/from local storage
const saveTasksToLocalStorage = (tasks) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

const loadTasksFromLocalStorage = () => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    return tasks;
};



// Create a custom hook to access the context
export const useTaskContext = () => {
    return useContext(createTaskContext);
};



export const TaskContextProvider = ({ children }) => {


    const [state, dispatch] = useReducer(taskReducer, {
        tasks: loadTasksFromLocalStorage(), // Load tasks from local storage initially
    });

 

    // Update the local storage whenever tasks change
    useEffect(() => {
        saveTasksToLocalStorage(state.tasks);
    }, [state.tasks]);



    return (
        <createTaskContext.Provider value={{ state, dispatch }}>{children}</createTaskContext.Provider>
    )
}