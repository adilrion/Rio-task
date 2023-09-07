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

export function Login() {
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
        <CardBody className="flex flex-col gap-4  p-0">
          <Input label="Email" size="lg" />
          <Input label="Password" size="lg" />
          <div className="-ml-2.5">
            <Checkbox label="Remember Me" />
          </div>
        </CardBody>
        <CardFooter className="pt-0">
          <Button variant="gradient" fullWidth>
            Sign In
          </Button>
          <Typography variant="small" className="mt-6 flex justify-center">
            Don&apos;t have an account?
            <Typography
          
              variant="small"
              color="blue-gray"
              className="ml-1 font-bold"
            >
              <Link to='/register'>Sign up</Link>
            </Typography>
          </Typography>
        </CardFooter>
      </Card>
  </div>
  );
}