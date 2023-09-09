import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Avatar,
  Tooltip,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { formatDateForTaskList } from "../../utils/Helper";

export function TaskItem({ data, bg }) {
  console.log(data)
  return (
    <Card className="max-w-[24rem] overflow-hidden p-0 rounded mt-3">
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="m-0 rounded-none"
      >
        
      </CardHeader>
      <CardBody className="p-3 relative">
        <div className={`w-5 h-5 ${bg} rounded-full absolute right-2 top-2`}></div>
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
          <Tooltip content="Natali Craig">
            <Avatar
              size="sm"
              variant="circular"
              alt="natali craig"
              src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1061&q=80"
              className="border-2 border-white hover:z-10"
            />
          </Tooltip>
          <Tooltip content="Tania Andrew">
            <Avatar
              size="sm"
              variant="circular"
              alt="tania andrew"
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
              className="border-2 border-white hover:z-10"
            />
          </Tooltip>
        </div>
        <Typography variant="small" className="font-normal col-span-9 text-deep-orange-600">{formatDateForTaskList(data?.deadline)}</Typography>
      </CardFooter>
    </Card>
  );
}