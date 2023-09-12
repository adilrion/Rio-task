import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Avatar,
  Tooltip,
  MenuHandler,
  Menu,
  MenuItem,
  MenuList,
  Button
} from "@material-tailwind/react";

import { Link } from "react-router-dom";
import { formatDateForTaskList } from "../../utils/Helper";
import { useTaskContext } from "../../context/TaskContext";

export function TaskItem({ data, bg }) {

  const {updateTask } = useTaskContext();

  // Function to update and save the "status" value to local storage



  // Function to handle updating the status when a link is clicked
  const handleUpdateStatus = (taskId, newStatus) => {
    try {
      // Use the correct updateTask function from the context
      updateTask(taskId, newStatus);
    } catch (error) {
      console.log(error);
    }
  };

  

  return (
    <Card className="max-w-[24rem] overflow-hidden p-0 rounded mt-3">
      
      <CardBody className="p-3 relative">
        <div className={` ${bg} rounded-full `}>

          <Menu>
            <MenuHandler >
              <div className={`w-5 h-5 absolute right-2 top-2 rounded-full text-white ${data?.status == 'pending' && 'bg-orange-500' || data?.status == 'progress' && 'bg-teal-500' || data?.status == 'complete' && 'bg-[#B1B2FF]'} `}></div>
            </MenuHandler>
            <MenuList className=''>
              <MenuItem
                className="hover:bg-orange-500 hover:text-white"
                onClick={() => handleUpdateStatus(data.id, 'pending')}
              >
                Pending
              </MenuItem>
              <MenuItem
                className="hover:bg-teal-500 hover:text-white"
                onClick={() => handleUpdateStatus(data.id, 'progress')}
              >
                Progress
              </MenuItem>
              <MenuItem
                className="hover:bg-[#B1B2FF] hover:text-white"
                onClick={() => handleUpdateStatus(data.id, 'complete')}
              >
                Complete
              </MenuItem>
            </MenuList>
          </Menu>

        </div>
<Link to={`/task-details/${data?.id}`}>
        <Typography variant="h6" color="blue-gray">
         {data?.title}
          </Typography></Link>
        <Typography variant="paragraph" color="gray" className="mt-2 font-normal line-clamp-[1">
          {data?.description}
        </Typography>
      </CardBody>
      <CardFooter className="flex items-center justify-between p-0 px-3 pb-3">
        <div className="flex items-center -space-x-3">

          {
            data?.responsiblePerson.length > 0 && (
              <div className="flex gap-1">
                {data?.responsiblePerson.map((person, index) => (
                  <Tooltip key={index} content={person?.name}>
                    <Avatar
                      size="sm"
                      variant="circular"
                      alt={person?.name}
                      src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjIE9x_0IgzoW3whWyqVDXqK0K1hNxzNf_6meiHJJVTh4z7cz_LLY7aYXo6B-PfxqmYDc&usqp=CAU'
                      className="border-2 border-white hover:z-10"
                    />
                  </Tooltip>
                ))}
              </div>
            )
          }

        
        </div>
        <Typography variant="small" className="font-normal col-span-9 text-deep-orange-600">{formatDateForTaskList(data?.deadline)}</Typography>
      </CardFooter>
    </Card>
  );
}