'use client';

import Image from "next/image";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchMessages } from '../slices/userNavbarSlice';
import Box from '@mui/material/Box'; //messages icon imports starts here
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import MailIcon from '@mui/icons-material/Mail'; //messages icon imports ends here
import UserNotificationsModal from "./userNotificationsModal";
import UserProfileModal from "./userProfileModal";
import { getLoggedInUser } from "@/services/authServices";

function UserNavbar() {
    const dispatch = useDispatch();
    const [isMessagesModalOpen, setIsMessagesModalOpen] = useState(false);
    const [isNotificationsVisited, setIsNotificationsVisited] = useState(false);

    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)

    const { userMessages } = useSelector(state => state.userNavbar);

    const [loggedInUser, setLoggedInUser] = useState(null);

    useEffect(() => {
        const user = getLoggedInUser();
        setLoggedInUser(user);
    }, []);


    useEffect(() => {
        if (loggedInUser && loggedInUser.id) {
            dispatch(fetchMessages(loggedInUser.id));
        }
    }, [loggedInUser, dispatch]);

    const openMessagesModal = () => {
        setIsMessagesModalOpen(true);
    };

    const handleDialogClose = () => {
        setIsMessagesModalOpen(false);
        setIsNotificationsVisited(true);
    };

    const openProfileCard = () => {
        setIsProfileModalOpen(true)
    }

    const handleProfileClose = () => {
        setIsProfileModalOpen(false)
    }


    const NavMenuItems = [
        { name: "Dashboard", href: "/user/user-dashboard", mainRoute: "/user/user-dashboard" },
        { name: "Apply for leave", href: "/user/leave-application", mainRoute: "/user/leave-application" },
        { name: "Update Profile", href: "/user/update-profile/user-personal-details", mainRoute: "/user/update-profile" },
    ];

    const currentPath = usePathname();

    //message icon badge
    const StyledBadge = styled(Badge)(() => ({
        '& .MuiBadge-badge': {
            backgroundColor: '#FF0000',
            color: 'white',
            fontSize: '0.6rem',
            fontWeight: 'bold',
            height: 18,
            width: 18,
            minWidth: 0,
            borderRadius: '50%',
            border: '2px solid white',
            boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.2)',
            right: -2,
            top: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
    }));


    return (
        <>
            <nav className="flex justify-between items-center bg-white shadow px-10 pr-14 py-2 rounded-md relative h-[66px]">
                <div className="flex">
                    <Image src="/kris-logo.png" alt="user-dash-logo" width={120} height={100} className="pb-1" />
                </div>

                <div className="absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2">
                    <div className="flex space-x-14 text-sm font-medium relative">
                        {NavMenuItems.map(item => (
                            <div key={item.href} className="relative flex flex-col items-center justify-center h-[66px]">
                                <Link
                                    href={item.href}
                                    className="hover:text-yellow-500 cursor-pointer flex items-center h-full pt-2"
                                >
                                    <span>{item.name}</span>
                                </Link>
                                {currentPath.startsWith(item.mainRoute) && (
                                    <span className="absolute -left-[5px] -right-[5px] bottom-0 h-[3px] bg-[#FFC20E] rounded-t-md"></span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex items-center space-x-5">
                    <Box
                        onClick={openMessagesModal}
                        sx={{
                            backgroundColor: '#3F861E',
                            width: 38,
                            height: 38,
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer'
                        }}
                    >
                        <StyledBadge badgeContent={!isNotificationsVisited ? userMessages?.length : 0}>
                            <MailIcon sx={{ fontSize: 24, color: 'white' }} />
                        </StyledBadge>
                    </Box>

                    <Image src="/user-navbar-icon.png" onClick={openProfileCard} alt="user-nav-icon" width={40} height={40} className="rounded-full cursor-pointer" />
                    <button
                        className="bg-red-600 p-2 rounded-full flex items-center justify-center cursor-pointer hover:bg-red-700"
                        onClick={() => {
                            localStorage.removeItem("user");
                            window.location.href = "/user/login-user";
                        }}
                    >
                        <svg
                            className="transform rotate-180"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="white"
                            viewBox="0 0 24 24"
                            width="20"
                            height="20"
                        >
                            <path d="M16 13v-2H7V8l-5 4 5 4v-3h9z" />
                            <path d="M20 3H12v2h8v14h-8v2h8a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z" />
                        </svg>
                    </button>
                </div>
            </nav>

            <UserNotificationsModal handleDialogClose={handleDialogClose} isMessagesModalOpen={isMessagesModalOpen} userMessages={userMessages} />

            <UserProfileModal handleProfileClose={handleProfileClose} isProfileModalOpen={isProfileModalOpen} loggedInUser={loggedInUser} />
        </>
    );
}

export default UserNavbar;
