import {
  Avatar,
  Button,
  Card,
  IconButton,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { useTaskContext } from "../../context/TaskContext";

// Define the initial form state
const initialFormData = {
  title: "",
  description: "",
  responsiblePerson: [],
  createdBy: "",
  deadline: "",
  status: "pending",
  createdDate: new Date(),
  id: Math.floor(Math.random() * 100000000000000),
};

export function CreateTask() {
  const { userData } = useAuthContext();
  const navigate = useNavigate();
  const { dispatch } = useTaskContext();

  // Define state variables for form inputs
  const [formData, setFormData] = useState(initialFormData);
  const [filterUserData, setFilterUserData] = useState([]);
  const [responsiblePersonData, setResponsiblePersonData] = useState([]);

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
    dispatch({ type: "ADD_TASK", payload: formData });
    // Reset the form
    setFormData(initialFormData);
    navigate("/");
  };

  // Update the responsible persons in form data
  const updateResponsiblePersons = (data) => {
    const dd = responsiblePersonData?.filter((ff) => ff?.email === data?.email);
    if (!dd || dd.length === 0) {
      setResponsiblePersonData([...responsiblePersonData, data]);
      setFormData((prevData) => ({
        ...prevData,
        responsiblePerson: [...prevData.responsiblePerson, data],
      }));
    } else {
      // Remove the responsible person
      const updatedResponsiblePersons = responsiblePersonData.filter(
        (person) => person.email !== data.email
      );
      setResponsiblePersonData(updatedResponsiblePersons);
      setFormData((prevData) => ({
        ...prevData,
        responsiblePerson: prevData.responsiblePerson.filter(
          (person) => person.email !== data.email
        ),
      }));
    }
  };

  useEffect(() => {
    if (userData) {
      const filteredUsers = userData.filter((user) =>
        user?.email?.toLowerCase().includes(formData?.responsible?.toLowerCase()) ||
        user?.name?.toLowerCase().includes(formData?.responsible?.toLowerCase())
      );
      setFilterUserData(filteredUsers);
    }
    if (formData.responsible === "") {
      setFilterUserData([]);
    }
  }, [formData?.responsible, userData]);


console.log(formData)

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

              <div className="col-span-9 relative">
                <input
                  type="text"
                  name="responsible"
                  value={formData?.responsible}
                  onChange={handleInputChange}
                  className="focus:outline-none py-2 px-2 w-full"
                />
                <div className="absolute top-[50%] right-1 -translate-y-[50%] flex gap-2">
                  {responsiblePersonData?.map((data, index) => {
                    return (
                      <Button
                        key={index}
                        size="sm"
                        color="gray"
                        onClick={() => updateResponsiblePersons(data)}
                        className="min-w-fit bg-opacity-20 text-gray-800 hover:scale-[1.02] focus:scale-[1.02] active:scale-100 p-1 text-xs rounded-full capitalize"
                        ripple={false}
                        fullWidth={true}
                      >
                        <Avatar
                          size="xs"
                          variant="circular"
                          alt="User Avatar"
                          src={data.avatar}
                          className="hover:z-10 mr-1 rounded-full"
                        />
                        <span>{data?.name}</span>
                      </Button>
                    );
                  })}
                </div>
                <div className="max-h-72 w-[250px] overflow-y-scroll absolute bg-[#D2DAFF] shadow">
                  {filterUserData?.map((data, index) => (
                    <Button
                      key={index}
                      size="sm"
                      color="gray"
                      onClick={() => updateResponsiblePersons(data)}
                      className="min-w-fit bg-opacity-0 shadow-none text-gray-800 hover:scale-[1.02] focus:scale-[1.02] active:scale-100 p-1 text-xs text-start border-b border-gray-500 capitalize rounded-none"
                      ripple={false}
                      fullWidth={true}
                    >
                      <Avatar
                        size="xs"
                        variant="circular"
                        alt="User Avatar"
                        src={data.avatar}
                        className="hover:z-10 mr-1 rounded-full"
                      />
                      <span>{data?.name}</span>
                    </Button>
                  ))}
                </div>
              </div>
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
              {/* Add your IconButton content here */}
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
