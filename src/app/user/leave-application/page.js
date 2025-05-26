'use client';

import Image from 'next/image';
import Link from 'next/link';
import { allLeaveApplications, leaveWithdraw } from '@/app/slices/userApplyLeaveSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import RecallApprovalForm from './recall-approval-form/page';

function LeaveApplication() {
    const leaveCards = [
        { type: 'Annual', count: 60 },
        { type: 'Sick', count: 20 },
        { type: 'Maternity', count: 60 },
        { type: 'Compassionate', count: 30 }
    ];

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(allLeaveApplications());
    }, [])

    const { totalLeaveApplications } = useSelector(state => state.leaveApplication)

    const withdrawCTA = async (leave) => {
        const isWithdraw = await dispatch(leaveWithdraw(leave)).unwrap();
        if (isWithdraw) {
            window.alert('Leave Withdraw Succesfull');
            dispatch(allLeaveApplications());
        }
    }

    const [isRecallApprOpen, setIsRecallApprOpen] = useState(false);
    const [leaveToRespond, setLeaveToRespond] = useState(null);

    const recallApprFormCTA = (clickedLeave) => {
        setIsRecallApprOpen(true);
        setLeaveToRespond(clickedLeave);
    }

    return (
        <div className="p-6 bg-[#E3EDF9] min-h-screen space-y-6">
            <div className="bg-white rounded-md px-6 py-4">
                <p className="text-md text-[#1D1D1D]">Dashboard &gt; Apply for Leave</p>
            </div>

            <div className="bg-white rounded-md p-6 space-y-6">
                <div className="flex items-center gap-3">
                    <Image src="/book-open.png" alt="Book Icon" width={20} height={20} />
                    <h2 className="text-lg text-[#1D1D1D] font-medium">Leave Application</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                    {leaveCards.map((leave, idx) => (
                        <div key={idx} className="bg-[#253D90] rounded-xl p-4 text-white flex flex-col sm:flex-row items-center sm:justify-between">
                            <div className="flex-shrink-0 mb-3 sm:mb-0 sm:mr-4">
                                <div className="w-16 h-16 md:w-20 md:h-20 bg-white text-[#253D90] text-xl md:text-2xl font-bold rounded-full flex items-center justify-center">
                                    {leave.count}
                                </div>
                            </div>
                            <div className="flex flex-col items-center sm:items-start text-center sm:text-left flex-1">
                                <p className="text-sm md:text-base font-medium leading-tight break-words">
                                    {leave.type} Leave
                                </p>
                                <Link href={`/user/leave-application/apply-leave?type=${leave.type}`}>
                                    <button className="mt-2 bg-[#FFC20E] cursor-pointer text-black text-[11px] md:text-xs font-semibold px-8 py-1 rounded-xl hover:bg-yellow-400">
                                        Apply
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                <div>
                    <div className='pb-2'>
                        <h3 className="text-md text-[#1D1D1D] font-semibold mb-3">Leave History</h3>
                    </div>
                    <div className="overflow-x-auto rounded-md">
                        <table className="min-w-full text-sm">
                            <thead className="bg-[#E3EDF9] text-[#1D1D1D] text-sm">
                                <tr>
                                    <th className="text-center px-4 py-2">Name(s)</th>
                                    <th className="text-center px-4 py-2">Duration(s)</th>
                                    <th className="text-center px-4 py-2">Start Date</th>
                                    <th className="text-center px-4 py-2">End Date</th>
                                    <th className="text-center px-4 py-2">Type</th>
                                    <th className="text-center px-4 py-2">Reason(s)</th>
                                    <th className="text-center px-4 py-2">Status</th>
                                    <th className="text-center px-4 py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {totalLeaveApplications && totalLeaveApplications.length > 0 ? (
                                    totalLeaveApplications.map((leave, index) => (
                                        <tr
                                            key={index}
                                            className={index % 2 === 0 ? 'bg-white' : 'bg-[#E3EDF9]'}
                                        >
                                            <td className="px-4 py-2 text-black text-sm text-center">{leave.name}</td>
                                            <td className="px-4 py-2 text-black text-sm text-center">{leave.duration}</td>
                                            <td className="px-4 py-2 text-black text-sm text-center">{leave.start_date}</td>
                                            <td className="px-4 py-2 text-black text-sm text-center">{leave.end_date}</td>
                                            <td className="px-4 py-2 text-black text-sm text-center">{leave.leave_type}</td>
                                            <td className="px-4 py-2 text-black text-sm text-center">{leave.reason}</td>
                                            <td className="px-4 py-2 text-black text-sm text-center">{leave.status}</td>
                                            <td className="px-4 py-2 text-center">
                                                {leave.status === 'Recalled' ? (
                                                    <button
                                                        className="bg-[#253D90] text-white px-10 py-1 text-sm rounded cursor-pointer"
                                                        onClick={() => recallApprFormCTA(leave)}
                                                    >
                                                        View
                                                    </button>
                                                ) : (
                                                    <div className="relative inline-block">
                                                        <select
                                                            defaultValue=""
                                                            className="bg-[#253D90] text-white pl-6 pr-6 text-sm py-1 rounded appearance-none cursor-pointer"
                                                            onChange={(e) => {
                                                                if (e.target.value === "Withdraw") {
                                                                    withdrawCTA(leave);
                                                                }
                                                                e.target.value = "";
                                                            }}
                                                        >
                                                            <option value="" disabled hidden className="pr-6">
                                                                Actions
                                                            </option>
                                                            <option value="Withdraw" disabled={leave.status === 'Accepted'}>Withdraw</option>
                                                        </select>
                                                        <Image
                                                            src="/actions-down-arrow.png"
                                                            alt="Dropdown Arrow"
                                                            width={12}
                                                            height={12}
                                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
                                                        />
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="8" className="text-center text-sm py-4 text-gray-500">
                                            No leave history found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {isRecallApprOpen && <RecallApprovalForm setIsRecallApprOpen={setIsRecallApprOpen} leaveToRespond={leaveToRespond} allLeaveApplications={allLeaveApplications} />}
        </div>
    );
}

export default LeaveApplication;
