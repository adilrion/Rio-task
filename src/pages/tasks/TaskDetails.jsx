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
import { useNavigate, useParams } from 'react-router-dom';
import { useTaskContext } from '../../context/TaskContext';
import { formatDate } from '../../utils/Helper';


export const TaskDetails = () => {
  const navigate = useNavigate();
  const route = useParams();
  const { state, updateTask } = useTaskContext();
  const filtered = state?.tasks.filter((task) => task?.id == route?.id)[0];

 


  const handleUpdateStatus = (taskId, newStatus) => {
    try {
      // Use the correct updateTask function from the context
      updateTask(taskId, newStatus);
    } catch (error) {
      console.log(error);
    }
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

                    {
                      filtered?.responsiblePerson.length > 0 && (
                        <div className="flex gap-1">
                          {filtered?.responsiblePerson.map((person, index) => (
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
                                alt={person?.name}
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjIE9x_0IgzoW3whWyqVDXqK0K1hNxzNf_6meiHJJVTh4z7cz_LLY7aYXo6B-PfxqmYDc&usqp=CAU"
                                className="hover:z-10 mr-1 rounded-full"
                              />
                              <span>Natali </span>
                            </Button>
                          ))}
                        </div>
                      )
                    }
                   
                    



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
                    onClick={() => handleUpdateStatus(filtered.id, 'pending')}
                  >
                    Pending
                  </MenuItem>
                  <MenuItem
                    className="hover:bg-teal-500 hover:text-white"
                    onClick={() => handleUpdateStatus(filtered.id, 'progress')}
                  >
                    Progress
                  </MenuItem>
                  <MenuItem
                    className="hover:bg-[#B1B2FF] hover:text-white"
                    onClick={() => handleUpdateStatus(filtered.id, 'complete')}
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