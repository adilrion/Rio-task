import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Button,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

export function Login() {
  const { SignIn } = useAuthContext();

  // Create state variables to store user input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  // Event handler for "Sign In" button click
  const handleSignInClick = () => {
    // Call the SignIn function with user's email and password
    SignIn(email, password);
  };

  return (
    <div className="w-full h-full flex justify-center items-center mt-10">
      <Card className="w-96 p-8">
        <div className="mb-7">
          <Typography variant="h4" color="blue-gray">
            Sign In
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Enter your details to Sign In.
          </Typography>
        </div>
        <CardBody className="flex flex-col gap-4 p-0">
          {/* Email input */}
          <Input
            label="Email"
            size="lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password input */}
          <Input
            label="Password"
            size="lg"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="-ml-2.5">
            <Checkbox label="Remember Me" />
          </div>
        </CardBody>
        <CardFooter className="pt-0">
          {/* "Sign In" button */}
          <Button variant="gradient" fullWidth onClick={handleSignInClick}>
            Sign In
          </Button>
          <Typography variant="small" className="mt-6 flex justify-center">
            Don't have an account?
            <Typography variant="small" color="blue-gray" className="ml-1 font-bold">
              <Link to="/register">Sign up</Link>
            </Typography>
          </Typography>
        </CardFooter>
      </Card>
    </div>
  );
}
