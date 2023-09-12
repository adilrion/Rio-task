import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
    UserIcon as UserCircleIcon,
    CogIcon as Cog6ToothIcon,
    InboxIcon as InboxArrowDownIcon,
    QuestionMarkCircleIcon as LifebuoyIcon,
    LogoutIcon as PowerIcon,
    LightningBoltIcon as RocketLaunchIcon,
    ViewGridIcon as Square3Stack3DIcon,
    MenuAlt2Icon as Bars2Icon,
    CubeIcon as CubeTransparentIcon,
    CodeIcon as CodeBracketSquareIcon,
    ChevronDownIcon,
} from "@heroicons/react/solid";
import {
    Avatar,
    Button,
    Card,
    Collapse,
    IconButton,
    Menu,
    MenuHandler,
    MenuItem,
    MenuList,
    Navbar,
    Typography,
} from "@material-tailwind/react";
import { useAuthContext } from "../../context/AuthContext";

// Profile menu items
const profileMenuItems = [
    {
        label: "My Profile",
        icon: UserCircleIcon,
    },
    {
        label: "Edit Profile",
        icon: Cog6ToothIcon,
    },
    {
        label: "Inbox",
        icon: InboxArrowDownIcon,
    },
    {
        label: "Help",
        icon: LifebuoyIcon,
    },
    {
        label: "Sign Out",
        icon: PowerIcon,
    },
];

function ProfileMenu({ user, Logout }) {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const closeMenu = () => setIsMenuOpen(false);

    return (
        <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
            <MenuHandler>
                <Button
                    variant="text"
                    color="blue-gray"
                    className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
                >
                    <Avatar
                        variant="circular"
                        size="sm"
                        alt="tania andrew"
                        className="border border-gray-900 p-0.5"
                        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                    />
                    <ChevronDownIcon
                        strokeWidth={2.5}
                        className={`h-3 w-3 transition-transform ${isMenuOpen ? "rotate-180" : ""
                            }`}
                    />
                </Button>
            </MenuHandler>
            <MenuList className="p-1">
                <div className="w-full flex justify-center flex-col items-center p-5">
                    <Avatar
                        variant="circular"
                        size="lg"
                        alt="tania andrew"
                        className="border border-gray-900 p-0.5"
                        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                    />
                    <Typography variant="h6" color="blue" textGradient>
                        {user?.displayName}
                    </Typography>
                    <Typography variant="paragraph" color="blue-gray" textGradient>
                        Lorem ipsum dolor sit amet.
                    </Typography>
                </div>
                {profileMenuItems.map(({ label, icon }, key) => {
                    const isLastItem = key === profileMenuItems.length - 1;
                    return (
                        <MenuItem
                            key={label}
                            onClick={closeMenu}
                            className={`flex items-center gap-2 rounded ${isLastItem
                                    ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                                    : ""
                                }`}
                        >
                            {React.createElement(icon, {
                                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                                strokeWidth: 2,
                            })}
                            <Typography
                                as={isLastItem ? "button" : "span"}
                                variant="small"
                                className="font-normal"
                                color={isLastItem ? "red" : "inherit"}
                                onClick={isLastItem ? () => Logout() : null}
                            >
                                {label}
                            </Typography>
                        </MenuItem>
                    );
                })}
            </MenuList>
        </Menu>
    );
}

// Nav list items
const navListItems = [
    {
        label: "Task",
        to: "task",
        icon: CubeTransparentIcon,
    },
    {
        label: "New Task",
        to: "create-task",
        icon: CodeBracketSquareIcon,
    },
];

function NavList() {
    return (
        <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
            {navListItems.map(({ label, to, icon }, key) => (
                <Typography
                    key={label}
                    
                    href="#"
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                >
                    <Link to={`/${to}`}>
                        <MenuItem className="flex items-center gap-2 lg:rounded-full">
                            {React.createElement(icon, { className: "h-[18px] w-[18px]" })}{" "}
                            {label}
                        </MenuItem>
                    </Link>
                </Typography>
            ))}
        </ul>
    );
}

function TopNavbar() {
    const { user, Logout } = useAuthContext();

    const [isNavOpen, setIsNavOpen] = useState(false);

    const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

    useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setIsNavOpen(false)
        );
    }, []);

    return (
        <Navbar className="rounded-none h-max max-w-full shadow-sm">
            <div className="relative mx-auto flex items-center justify-between text-blue-gray-900">
                <Typography
                    as="a"
                    href="#"
                    className="mr-4 ml-2 cursor-pointer py-1.5 font-bold"
                >
                    Rio Task
                </Typography>
                <div className="absolute top-2/4 left-2/4 hidden -translate-x-2/4 -translate-y-2/4 lg:block">
                    <NavList />
                </div>
                <IconButton
                    size="sm"
                    color="blue-gray"
                    variant="text"
                    onClick={toggleIsNavOpen}
                    className="ml-auto mr-2 lg:hidden"
                >
                    <Bars2Icon className="h-6 w-6" />
                </IconButton>
                {user ? (
                    <ProfileMenu user={user} Logout={Logout} />
                ) : (
                    <Link to="/login">
                        <Button>Login</Button>
                    </Link>
                )}
            </div>
            <Collapse open={isNavOpen}>
                <NavList />
            </Collapse>
        </Navbar>
    );
}

export default TopNavbar;
