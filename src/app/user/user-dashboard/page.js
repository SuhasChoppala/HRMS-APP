'use client';
import Accordion from "@mui/material/Accordion"; //accordion mui imports - start
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"; //accordion mui imports - end
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { getLoggedInUser } from "@/services/authServices";
import { fetchAnnouncements, fetchLeaves, fetchPayslipBreakdown, fetchBirthdays, fetchPerformaceAppraisal, toggleTaskStatus, sendBdayWishes, fetchAllMessagesInDB } from "../../slices/userDashboardSlice";
import { fetchAllTodos } from "../../slices/userDashboardSlice";

function UserDashboard() {

    const dispatch = useDispatch();
    const [isUserActive, setIsUserActive] = useState(null);

    const { leaves, todos, announcements, payslips, employeeBirthday, performanceAppraisal } = useSelector(state => state.userDashboard);

    const [loggedInUser, setLoggedInUser] = useState(null);

    useEffect(() => {
        const storedUser = getLoggedInUser();
        setLoggedInUser(storedUser);
    }, []);

    useEffect(() => {
        if (loggedInUser) {
            setTimeout(() => {
                setIsUserActive(true);
            }, 100);
        }
    }, [loggedInUser]);

    useEffect(() => {
        if (loggedInUser && loggedInUser.id) {
            dispatch(fetchLeaves(loggedInUser.id));
            dispatch(fetchAllTodos(loggedInUser.id));
            dispatch(fetchPayslipBreakdown(loggedInUser.id))
            dispatch(fetchAnnouncements());
            dispatch(fetchBirthdays());
            dispatch(fetchPerformaceAppraisal(loggedInUser.id));
            dispatch(fetchAllMessagesInDB());
        }
    }, [loggedInUser, , dispatch]);

    const toggleTODOstatus = async (todoID, currentStatus) => {
        const status = !currentStatus;
        try {
            const response = await dispatch(toggleTaskStatus({ todoID, status })).unwrap();
            if (response) {
                dispatch(fetchAllTodos(loggedInUser.id));
            }
        } catch (error) {
            console.error('Toggle status failed:', error);
        }
    };

    const sendWishesCTA = async (wishesReceiverID) => {
        try {
            const message = `${loggedInUser.name} wishes you a Happy Birthday`;
            const sent = await dispatch(sendBdayWishes({ wishesReceiverID, message })).unwrap();
            if (sent) {
                window.alert('Wishes Sent');
            }
        } catch (error) {
            console.log('Unable to send wishes:', error);
        }
    }

    return (
        <div className="min-h-screen bg-[#E3EDF9] px-10 py-2 pb-0 font-sans">
            {isUserActive ? (
                <>
                    <div className="px-1 py-3">
                        <h2 className="text-[#0b2c86] text-lg font-bold">Dashboard</h2>
                    </div>

                    <div className="bg-[#193288] text-white p-6 rounded-xl flex justify-between items-center mb-6">
                        <div className="flex items-center space-x-4">
                            <div className="rounded-full border-1 border-white p-0.75">
                                <Image src="/user-profile-card.png" alt="user-profile-icon" width={70} height={70} className="rounded-full" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold mb-1">{loggedInUser?.name}</h2>
                                <p className="text-lg font-light">{loggedInUser?.job_title}</p>
                            </div>
                        </div>
                        <Link href='/user/update-profile/user-personal-details'><button className="bg-[#FFC20E] text-black px-6 py-2 rounded font-semibold shadow cursor-pointer hover:bg-yellow-500">Edit Profile</button></Link>
                    </div>

                    {/* Leaves */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-white rounded-xl p-4 shadow">
                            <h3 className="text-stone-700 font-semibold mb-3 text-lg">Available Leave Days</h3>
                            <div className="mb-2">
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-stone-600 font-normal">Annual Leaves</span>
                                    <span className="text-stone-600 font-normal">
                                        {leaves?.annualLeaves} of 60 day(s)
                                    </span>
                                </div>
                                <div className="w-full bg-[#E0E3EC] h-5 rounded">
                                    <div
                                        className="bg-[#253D90] h-5 rounded"
                                        style={{ width: `${(leaves?.annualLeaves / 60) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                            <div className="mb-2">
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-stone-600 font-normal">Sick Leaves</span>
                                    <span className="text-stone-600 font-normal">
                                        {leaves?.sickLeaves} of 20 day(s)
                                    </span>
                                </div>
                                <div className="w-full bg-[#E0E3EC] h-5 rounded">
                                    <div
                                        className="bg-[#253D90] h-5 rounded"
                                        style={{ width: `${(leaves?.sickLeaves / 20) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                            <div className="mb-2">
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-stone-600 font-normal">Compassionate Leaves</span>
                                    <span className="text-stone-600 font-normal">
                                        {leaves?.compassionateLeaves} of 30 day(s)
                                    </span>
                                </div>
                                <div className="w-full bg-[#E0E3EC] h-5 rounded">
                                    <div
                                        className="bg-[#253D90] h-5 rounded"
                                        style={{ width: `${(leaves?.compassionateLeaves / 30) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>

                        {/* To-dos */}
                        <div className="bg-white rounded-xl p-4 shadow">
                            <h3 className="font-semibold text-lg text-stone-700 mb-3">To-dos</h3>
                            <div className="max-h-56 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
                                {todos?.map((todo, index) => (
                                    <div key={index} className="flex justify-between items-center rounded-md py-2 px-4 mb-2 bg-[#E3EDF9]">
                                        <div>
                                            <p className="font-semibold text-[#545559]">{todo.task_name}</p>
                                            <p className="font-normal text-[#545559] text-sm">Status: {todo.isCompleted ? 'Completed' : 'Incomplete'}</p>
                                        </div>
                                        <button onClick={() => toggleTODOstatus(todo.id, todo.isCompleted)} className="text-sm bg-[#253D90] text-[#E0E3EC] px-3 py-1 rounded-md cursor-pointer font-medium hover:bg-[#FFC20E] hover:text-[#1A265F] hover:shadow-md">Toggle Status</button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Announcements */}
                        <>
                            <div className="bg-white rounded-xl p-4 shadow">
                                <h3 className="font-semibold text-lg text-stone-700 mb-3">Announcement(s)</h3>
                                <div className="max-h-56 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
                                    {announcements?.map((announcement, index) => (
                                        <div key={index} className="mb-2">
                                            <Accordion disableGutters sx={{ backgroundColor: "#E3EDF9", borderRadius: "0.375rem", marginBottom: "0.5rem", boxShadow: "none", }}>
                                                <AccordionSummary
                                                    expandIcon={<ArrowDropDownIcon />}
                                                    aria-controls={`panel-content-${index}`}
                                                    id={`panel-header-${index}`}
                                                    sx={{
                                                        minHeight: "unset !important",
                                                        padding: "8px 16px",
                                                        "&.Mui-expanded": {
                                                            minHeight: "unset !important",
                                                            margin: 0,
                                                        },
                                                        "& .MuiAccordionSummary-content": {
                                                            margin: 0,
                                                            "&.Mui-expanded": {
                                                                margin: 0,
                                                            },
                                                        },
                                                    }}
                                                >
                                                    <Typography component="span" sx={{ fontWeight: 500, color: "#545559", fontSize: "0.875rem", }}>
                                                        {announcement.title}
                                                    </Typography>
                                                </AccordionSummary>
                                                <AccordionDetails sx={{ padding: "4px 16px 4px 16px", }}>
                                                    <Typography sx={{ fontWeight: 400, color: "#545559", fontSize: "0.875rem", }}>
                                                        {announcement.description}
                                                    </Typography>
                                                </AccordionDetails>
                                                <AccordionDetails sx={{ padding: "4px 16px 12px 16px", }}>
                                                    <Typography sx={{ fontWeight: 400, color: "#545559", fontSize: "0.875rem", }}>
                                                        {announcement.date}
                                                    </Typography>
                                                </AccordionDetails>
                                            </Accordion>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>

                        {/* Payslip */}
                        <div className="bg-white rounded-xl p-4 shadow">
                            <h3 className="font-semibold text-lg text-stone-700 mb-4">
                                April Pay slip breakdown
                            </h3>
                            <div className="grid grid-cols-4 py-3 mb-2 px-4 text-left bg-[#E3EDF9] text-sm text-[#545559] rounded-xl font-bold">
                                <div>Earnings</div>
                                <div>Amount</div>
                                <div>Deductions</div>
                                <div>Total</div>
                            </div>
                            <div className="space-y-2">
                                {payslips?.breakdown?.map((item, index) => (
                                    <div
                                        key={index}
                                        className="grid grid-cols-4 bg-[#E3EDF9] text-[#545559] font-semibold text-sm rounded-xl px-4 py-3"
                                    >
                                        <div>{item.Earnings}</div>
                                        <div>{item.Amount.toLocaleString()}</div>
                                        <div>{item.Deductions.toLocaleString()}</div>
                                        <div>{item.Total.toLocaleString()}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Birthdays */}
                        <div className="bg-white rounded-xl p-4 shadow">
                            <h3 className="font-semibold text-lg text-stone-700 mb-4">Birthdays</h3>
                            {employeeBirthday?.length > 0 ? (
                                employeeBirthday?.map((bdayEmployee, index) => (
                                    <div key={index} className="flex justify-between items-center mb-2 py-3 px-4 bg-[#E3EDF9] text-[#545559] rounded-xl font-semibold">
                                        {bdayEmployee.name === loggedInUser.name ? (<span>Its Your Birthday  🎉</span>) : (<span>{bdayEmployee.name}&apos;s day</span>)}
                                        {bdayEmployee.name === loggedInUser.name ? null : (
                                            <button
                                                onClick={() => sendWishesCTA(bdayEmployee.id)}
                                                className="text-sm bg-[#FFC20E] text-black px-3 py-1 rounded-md cursor-pointer font-medium hover:bg-yellow-500 hover:shadow-md"
                                            >
                                                Send Wishes 🎉
                                            </button>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <div className="flex justify-center items-center bg-[#E3EDF9] h-62 rounded-lg">
                                    <h2>No Employee Birthday Today</h2>
                                </div>
                            )}
                        </div>


                        {/* Performance Appraisal */}
                        <div className="bg-white rounded-xl p-4 shadow">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-semibold text-lg text-stone-700 mb-4">Performance Appraisal</h3>
                            </div>

                            <div className="relative h-48 pl-8 pr-2">
                                <div className="absolute inset-0 flex flex-col justify-between">
                                    {[12, 9, 6, 3, 0].map((val) => (
                                        <div key={val} className="flex items-center">
                                            <div className="w-6 text-xs text-[#545559] text-right pr-1 leading-none">{val}</div>
                                            <div className="border-t border-gray-300 w-full"></div>
                                        </div>
                                    ))}
                                </div>
                                <div className="absolute left-8 right-2 bottom-0 top-0 flex items-end justify-between px-1 z-10">
                                    {performanceAppraisal?.performance_values?.map((val, idx) => (
                                        <div
                                            key={idx}
                                            className="bg-[#253D90] w-4 rounded-t"
                                            style={{
                                                height: `calc(${(val / 12) * 100}% - 1px)`,
                                                marginBottom: '5px',
                                            }}
                                        />
                                    ))}
                                </div>
                                <div className="absolute -bottom-5 left-9 right-2 flex justify-between text-xs text-[#545559] px-1">
                                    {Array.from({ length: 12 }, (_, i) => (
                                        <span key={i}>{i}</span>
                                    ))}
                                </div>
                            </div>
                            <p className="text-center text-sm font-semibold mt-8 text-gray-700">
                                {performanceAppraisal?.from} - {performanceAppraisal?.to}
                            </p>
                        </div>
                    </div>
                </>
            ) : (

                <div className="flex justify-center items-center h-screen w-full">
                    <div className="text-center">
                        <div className="w-8 h-8 border-4 border-gray-400 border-t-transparent rounded-full animate-spin mx-auto" />
                        <p className="mt-4 text-gray-400 font-normal">Loading...</p>
                    </div>
                </div>

            )
            }
        </div >
    )
}

export default UserDashboard;