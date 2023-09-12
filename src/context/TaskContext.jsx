import { createContext, useContext, useEffect, useReducer } from "react";

const taskContext = createContext();

// Define your initial state
const initialState = {
    tasks: [],
};

// Define your reducer function
const taskReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TASK':
            return { ...state, tasks: [...state.tasks, action.payload] };
        case 'UPDATE_TASK':
            const updatedTasks = state.tasks.map(task => {
                if (task.id === action.payload.id) {
                    return { ...task, ...action.payload.updatedTask };
                }
                return task;
            });
            return { ...state, tasks: updatedTasks };
        default:
            return state;
    }
};

// Function to save tasks to local storage
const saveTasksToLocalStorage = (tasks) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

// Function to load tasks from local storage
const loadTasksFromLocalStorage = () => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    return tasks;
};

// Create a custom hook to access the context
export const useTaskContext = () => {
    return useContext(taskContext);
};

export const TaskContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(taskReducer, {
        tasks: loadTasksFromLocalStorage(), // Load tasks from local storage initially
    });

    // Function to update a task based on its ID
    const updateTask = (id, updatedTask) => {
        dispatch({
            type: 'UPDATE_TASK',
            payload: {
                id,
                updatedTask,
            },
        });
    };

    // Update the local storage whenever tasks change
    useEffect(() => {
        saveTasksToLocalStorage(state.tasks);
    }, [state.tasks]);

    return (
        <taskContext.Provider value={{ state, dispatch, updateTask }}>
            {children}
        </taskContext.Provider>
    );
};
