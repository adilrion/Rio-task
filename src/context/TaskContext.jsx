import { createContext, useContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";

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
        <createTaskContext.Provider value={{ state, dispatch, updateTask }}>
            {children}
        </createTaskContext.Provider>
    );
};
