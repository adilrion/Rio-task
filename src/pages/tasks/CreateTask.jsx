import React, { useState } from 'react';
import {
  Card,
  Input,
  Button,
  Typography,
  Textarea,
  IconButton,
} from "@material-tailwind/react";
import { useTaskContext } from '../../context/TaskContext';
import { useNavigate } from 'react-router-dom';

export function CreateTask() {

  const navigate = useNavigate();
  
  const { dispatch } = useTaskContext();
  // Define state variables for form inputs
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    responsiblePerson: '',
    createdBy: '',
    deadline: '',
    status: 'pending',
    careatedDate: new Date(),
    id: Math.floor(Math.random() * 100000000000000)

  });

  console.log(formData)

  // Handle form input changes
  const handleInputChange = (e) => {


    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Dispatch an action to add the task to the context
    dispatch({ type: 'ADD_TASK', payload: formData });
    // Reset the form
    setFormData({
      title: '',
      description: '',
      responsiblePerson: '',
      createdBy: '',
      deadline: '',
    });
    navigate("/")
  };

  return (
    <Card color="transparent" shadow={false} className="bg-[#EEF1FF] p-5 rounded-none">
      <Typography variant="h4" color="blue-gray" className="pl-2 pb-2">
        New Task
      </Typography>

      <div className="bg-[#fbfcff] p-5 rounded-md">
        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="border-b-2 focus:outline-none w-full pb-2 text-lg"
            placeholder="Task Name"
          />

          <Textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            variant="static"
            placeholder="Your Comment"
            rows={8}
            className="text-[16px]"
          />

          <div className="bg-[#EEF1FF] px-2">
            <div className="py-2 grid grid-cols-12 items-center border-b border-gray-400">
              <h1 className="col-span-3">Responsible Person</h1>
              <input
                type="text"
                name="responsiblePerson"
                value={formData.responsiblePerson}
                onChange={handleInputChange}
                className="col-span-9 focus:outline-none py-2 px-2"
              />
            </div>
            <div className="py-2 grid grid-cols-12 items-center border-b border-gray-400">
              <h1 className="col-span-3">Created by</h1>
              <input
                type="text"
                name="createdBy"
                value={formData.createdBy}
                onChange={handleInputChange}
                className="col-span-9 focus:outline-none py-2 px-2"
              />
            </div>
            <div className="py-2 grid grid-cols-12 items-center border-b ">
              <h1 className="col-span-3">Deadline</h1>
              <input
                type="datetime-local"
                name="deadline"
                value={formData.deadline}
                onChange={handleInputChange}
                className="col-span-9 focus:outline-none py-2 px-2"
              />
            </div>
          </div>

          <div className="flex w-full justify-between py-1.5">
            <IconButton variant="text" color="blue-gray" size="sm">
            fdg
            </IconButton>

            <div className="flex gap-2">
              <Button size="sm" color="red" variant="text" className="rounded-md">
                Cancel
              </Button>
              <Button size="sm" type="submit" className="rounded-md">
                Post Comment
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Card>
  );
}
