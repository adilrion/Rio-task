import {
    SearchIcon as MagnifyingGlassIcon,
    ChevronUpIcon as ChevronUpDownIcon,
    PencilIcon,
    UserAddIcon as UserPlusIcon,
} from "@heroicons/react/solid";
import {
    Card,
    CardHeader,
    Input,
    Typography,
    Button,
    CardBody,
    Chip,
    CardFooter,
    Tabs,
    TabsHeader,
    Tab,
    Avatar,
    IconButton,
    Tooltip,
    Drawer,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { TaskItem } from "./TaskItem";
import { useTaskContext } from "../../context/TaskContext";


const TABS = [
    {
        label: "All",
        value: "all",
    },
    {
        label: "Monitored",
        value: "monitored",
    },
    {
        label: "Unmonitored",
        value: "unmonitored",
    },
];



const TABLE_ROWS = [
    {
        img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
        name: "John Michael",
        email: "john@creative-tim.com",
        job: "Manager",
        org: "Organization",
        online: true,
        date: "23/04/18",
    },
    {
        img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-2.jpg",
        name: "Alexa Liras",
        email: "alexa@creative-tim.com",
        job: "Programator",
        org: "Developer",
        online: false,
        date: "23/04/18",
    },
    {
        img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-1.jpg",
        name: "Laurent Perrier",
        email: "laurent@creative-tim.com",
        job: "Executive",
        org: "Projects",
        online: false,
        date: "19/09/17",
    },
    {
        img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-4.jpg",
        name: "Michael Levi",
        email: "michael@creative-tim.com",
        job: "Programator",
        org: "Developer",
        online: true,
        date: "24/12/08",
    },
    {
        img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-5.jpg",
        name: "Richard Gran",
        email: "richard@creative-tim.com",
        job: "Manager",
        org: "Executive",
        online: false,
        date: "04/10/21",
    },
];

export function Task() {


    const { state } = useTaskContext();

    const filteredTasks = state.tasks.filter((task) => task.status === 'desiredStatus');


    return (
        <Card className="h-full w-full bg-[#EEF1FF] rounded-none">
            <CardHeader floated={false} shadow={false} className="rounded p-5">
                <div className="mb-8 flex items-center justify-between gap-8">
                    <div>
                        <Typography variant="h5" color="blue-gray">
                            My Task
                        </Typography>
                        <Typography color="gray" className="mt-1 font-normal">
                            See information about all Task
                        </Typography>
                    </div>
                    <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                        <Button variant="outlined" size="sm">
                            view all
                        </Button>
                        <Link to='/create-task'>
                            <Button className="flex items-center gap-3" size="sm">

                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                                Add new task


                            </Button>
                        </Link>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                    <Tabs value="all" className="w-full md:w-max">
                        <TabsHeader>
                            {TABS.map(({ label, value }) => (
                                <Tab key={value} value={value}>
                                    &nbsp;&nbsp;{label}&nbsp;&nbsp;
                                </Tab>
                            ))}
                        </TabsHeader>
                    </Tabs>
                    <div className="w-full md:w-72">
                        <Input
                            label="Search"
                            icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                        />
                    </div>
                </div>
            </CardHeader>
            <CardBody className="overflow-x-auto p-5 grid grid-cols-3 gap-3">
                <div className="col-span-1">
                    <div className="bg-orange-500 flex justify-center py-3 rounded">
                        <h1 class="block font-sans text-md font-medium leading-tight tracking-normal text-white antialiased">
                            Pending
                        </h1>
                    </div>

                    <div className="">

                        {
                            state?.tasks?.filter((task) => task.status === 'pending').map((data, index) => (
                                <TaskItem key={index} data={data} bg={`bg-orange-500`} />
                            ))
                        }

                    </div>

                </div>
                <div className="col-span-1">
                    <div className="bg-teal-500 flex justify-center py-3 rounded">
                        <h1 class="block font-sans text-md font-medium leading-tight tracking-normal text-white antialiased">
                            Progress
                        </h1>
                    </div>

                    <div className="">

                        {
                            state?.tasks?.filter((task) => task.status === 'progress').map((data, index) => (
                                <TaskItem key={index} data={data} bg={`bg-teal-500`} />
                            ))
                        }

                    </div>

                </div>
                <div className="col-span-1">
                    <div className="bg-[#B1B2FF] flex justify-center py-3 rounded">
                        <h1 class="block font-sans text-md font-medium leading-tight tracking-normal text-white antialiased">
                            Complete
                        </h1>
                    </div>

                    <div className="">

                        {
                            state?.tasks?.filter((task) => task.status === 'complete').map((data, index) => (
                                <TaskItem key={index} data={data} bg={`bg-[#B1B2FF]`} />
                            ))
                        }

                    </div>

                </div>

            </CardBody>
            <CardFooter className="p-5 flex items-center justify-between border-t border-blue-gray-50 ">
                <Typography variant="small" color="blue-gray" className="font-normal">
                    Page 1 of 10
                </Typography>
                <div className="flex gap-2">
                    <Button variant="outlined" size="sm">
                        Previous
                    </Button>
                    <Button variant="outlined" size="sm">
                        Next
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
}