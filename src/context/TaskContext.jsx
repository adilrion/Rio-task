// TaskContext.js
import { createContext, useContext, useEffect, useReducer } from 'react';

const TaskContext = createContext();

const initialState = {
    tasks: [],
};

const taskReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TASK':
            return { ...state, tasks: [...state.tasks, action.payload] };
        case 'UPDATE_TASK':
            const updatedTasks = state.tasks.map((task) => {
                if (task.id == action.payload.id) {
                    return { ...task, status: action.payload.status };
                }
                return task;
            });
            return { ...state, tasks: updatedTasks };
        default:
            return state;
    }
};

const saveTasksToLocalStorage = (tasks) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

const loadTasksFromLocalStorage = () => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    return tasks;
};

export const useTaskContext = () => {
    return useContext(TaskContext);
};

export const TaskContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(taskReducer, {
        tasks: loadTasksFromLocalStorage(),
    });

    const updateTask = (taskId, status) => {
        dispatch({
            type: 'UPDATE_TASK',
            payload: { id: taskId, status },
        });
    };

    useEffect(() => {
        saveTasksToLocalStorage(state.tasks);
    }, [state.tasks]);

    return (
        <TaskContext.Provider value={{ state, dispatch, updateTask }}>
            {children}
        </TaskContext.Provider>
    );
};
