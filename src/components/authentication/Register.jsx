import React, { useState } from "react";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { HandleSignup } from "../../services/AuthService";
import { useAuthContext } from "../../context/AuthContext";

const Register = () => {
  const { isRegistered, setIsRegistered } = useAuthContext();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    HandleSignup(formData.email, formData.password, formData.name, setIsRegistered);
  };

  return (
    <div className="w-full h-full flex justify-center items-center mt-10">
      <Card color="transparent" shadow={true} className="p-10">
        <Typography variant="h4" color="blue-gray">
          Sign Up
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Enter your details to register.
        </Typography>
        {isRegistered ? (
          <div className="text-green-600 font-semibold mt-4">
            Registration Successful! Redirecting...
          </div>
        ) : (
          <form
            className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
            onSubmit={handleSubmit}
          >
            <div className="mb-4 flex flex-col gap-6">
              <Input
                size="lg"
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
              <Input
                size="lg"
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
              <Input
                type="password"
                size="lg"
                label="Password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>
            <Checkbox
              label={
                <Typography
                  variant="small"
                  color="gray"
                  className="flex items-center font-normal"
                >
                  I agree to the
                  <Link
                    to="/terms-and-conditions"
                    className="font-medium text-gray-900"
                  >
                    &nbsp;Terms and Conditions
                  </Link>
                </Typography>
              }
              containerProps={{ className: "-ml-2.5" }}
            />
            <Button type="submit" className="mt-6" fullWidth>
              Register
            </Button>
            <Typography color="gray" className="mt-4 text-center font-normal">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-gray-900">
                Sign In
              </Link>
            </Typography>
          </form>
        )}
      </Card>
    </div>
  );
};

export default Register;
