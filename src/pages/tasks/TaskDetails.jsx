import {
  Avatar,
  Button,
  Card,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography
} from "@material-tailwind/react";
import React from 'react';
import { useParams } from 'react-router-dom';
import { useTaskContext } from '../../context/TaskContext';
import { formatDate } from '../../utils/Helper';


export const TaskDetails = () => {

  const route = useParams();
  const { state, dispatch } = useTaskContext();
  const filtered = state?.tasks.filter((task) => task?.id == route?.id)[0];

  // Function to update and save the "status" value to local storage
  const handleStatusChange = (newStatus) => {
    // Update the "status" property of the filtered task
    const updatedTask = { ...filtered, status: newStatus };

    // Create a copy of the tasks array with the updated task
    const updatedTasks = state.tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );

    // Dispatch an action to update the tasks in the context
    dispatch({ type: 'UPDATE_TASKS', payload: updatedTasks });

    // Save the updated tasks to local storage
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  return (
    <>

      <Card color="transparent" shadow={false} className="bg-[#EEF1FF] p-5 rounded-none">
        <Typography variant="h4" color="blue-gray" className="pl-2 pb-2">
          {filtered?.title}
        </Typography>

        <div className="bg-[#fbfcff] p-5 rounded-md">
          <form >



            <Typography variant="paragraph" className='pb-8'>{filtered?.description}</Typography>

            <div className="bg-[#EEF1FF] px-2">
              <div className="py-2 grid grid-cols-12 items-center border-b border-gray-400">
                <h1 className="col-span-3">Responsible Person</h1>
                <div className="flex items-center justify-between p-0 col-span-9">
                  <div className="flex items-center justify-center space-x-3">
                    <Button
                      size="sm"
                      color="gray"
                      className="min-w-fit bg-opacity-20 text-gray-800 hover:scale-[1.02] focus:scale-[1.02] active:scale-100 p-1 text-xs  rounded-full capitalize"
                      ripple={false}
                      fullWidth={true}
                    >
                      <Avatar
                        size="xs"
                        variant="circular"
                        alt="natali craig"
                        src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1061&q=80"
                        className="hover:z-10 mr-1 rounded-full"
                      />
                      <span>Natali </span>
                    </Button>
                    <Button
                      size="sm"
                      color="gray"
                      className="min-w-fit bg-opacity-20 text-gray-800 hover:scale-[1.02] focus:scale-[1.02] active:scale-100 p-1 text-xs  rounded-full capitalize"
                      ripple={false}
                      fullWidth={true}
                    >
                      <Avatar
                        size="xs"
                        variant="circular"
                        alt="natali craig"
                        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                        className="hover:z-10 mr-1 rounded-full"
                      />
                      <span>Wasif Jafor</span>
                    </Button>




                  </div>
                </div>
              </div>
              <div className="py-2 grid grid-cols-12 items-center border-b border-gray-400">
                <h1 className="col-span-3">Created by</h1>
                <Typography variant="small" className="font-normal col-span-9">{filtered?.createdBy}</Typography>

              </div>
              <div className="py-2 grid grid-cols-12 items-center border-b  border-gray-400">
                <h1 className="col-span-3">Assigned date</h1>
                <Typography variant="small" className="font-normal col-span-9">{formatDate(filtered?.careatedDate)}</Typography>

              </div>
              <div className="py-2 grid grid-cols-12 items-center border-b ">
                <h1 className="col-span-3">Deadline</h1>
                <Typography variant="small" className="font-normal col-span-9 text-deep-orange-600">{formatDate(filtered?.deadline)}</Typography>

              </div>
            </div>

            <div className="flex w-full justify-between py-1.5">

              <Menu>
                <MenuHandler >
                  <Button className={`w-fit h-fit p-2 capitalize px-4 ${filtered?.status == 'pending' && 'bg-orange-500' || filtered?.status == 'progress' && 'bg-teal-500' || filtered?.status == 'complete' && 'bg-[#B1B2FF]'} rounded-full text-white`}>{filtered?.status}</Button>
                </MenuHandler>
                <MenuList className=''>
                  <MenuItem
                    className="hover:bg-orange-500 hover:text-white"
                    onClick={() => handleStatusChange('pending')}
                  >
                    Pending
                  </MenuItem>
                  <MenuItem
                    className="hover:bg-teal-500 hover:text-white"
                    onClick={() => handleStatusChange('progress')}
                  >
                    Progress
                  </MenuItem>
                  <MenuItem
                    className="hover:bg-[#B1B2FF] hover:text-white"
                    onClick={() => handleStatusChange('complete')}
                  >
                    Complete
                  </MenuItem>
                </MenuList>
              </Menu>


              <div className="flex gap-2">
                <Button size="sm" color="red" variant="text" className="rounded-md">
                  Cancel
                </Button>
                <Button size="sm" type="submit" className="rounded-md">
                  Edit
                </Button>
              </div>
            </div>
          </form>
        </div>
      </Card>

    </>
  )
}