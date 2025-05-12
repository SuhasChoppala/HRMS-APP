'use client';
import Image from 'next/image';
import { allLeaveApplications } from '@/app/slices/userApplyLeaveSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Link from 'next/link';
import { leaveActions } from '@/app/slices/leaveManagementSlice';

function LeaveHistory() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(allLeaveApplications())
    }, []);

    const { totalLeaveApplications } = useSelector(state => state.leaveApplication);

    const leaveActionCTA = async (leave, action) => {
        const isSuccess = await dispatch(leaveActions({ leave, action })).unwrap();
        if (isSuccess) {
            window.alert('Changed status successfully')
            dispatch(allLeaveApplications());
        }
    }

    const today = new Date();
    const parseDate = (str) => {
        const [day, month, year] = str.split('-').map(Number);
        return new Date(year, month - 1, day);
    }

    const isCurrent = (end) => {
        const endDate = parseDate(end);
        return endDate >= today;
    };

    return (
        <div className='bg-white p-5 rounded-xl'>
            <div className='pb-2'>
                <h3 className="text-md text-[#1D1D1D] font-semibold mb-2">Leave History</h3>
            </div>

            <div className="overflow-x-auto rounded-lg">
                <table className="min-w-full text-sm">
                    <thead className="bg-[#E3EDF9] text-[#1D1D1D] text-sm">
                        <tr>
                            <th className="text-center px-4 py-4">Name(s)</th>
                            <th className="text-center px-4 py-4">Duration(s)</th>
                            <th className="text-center px-4 py-4">Start Date</th>
                            <th className="text-center px-4 py-4">End Date</th>
                            <th className="text-center px-4 py-4">Type</th>
                            <th className="text-center px-4 py-4">Reason(s)</th>
                            <th className="text-center px-4 py-4">Status</th>
                            <th className="text-center px-4 py-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {totalLeaveApplications && totalLeaveApplications.length > 0 ? (
                            totalLeaveApplications.map((leave, index) => (
                                <tr
                                    key={index}
                                    className={index % 2 === 0 ? 'bg-white' : 'bg-[#E3EDF9]'}
                                >
                                    <td className="px-4 py-4 text-black text-sm text-center">{leave.name}</td>
                                    <td className="px-4 py-4 text-black text-sm text-center">{leave.duration}</td>
                                    <td className="px-4 py-4 text-black text-sm text-center">{leave.start_date}</td>
                                    <td className="px-4 py-4 text-black text-sm text-center">{leave.end_date}</td>
                                    <td className="px-4 py-4 text-black text-sm text-center">{leave.leave_type}</td>
                                    <td className="px-4 py-4 text-black text-sm text-center">{leave.reason}</td>
                                    <td className="px-4 py-4 text-black text-sm text-center">{leave.status}</td>
                                    <td className="px-4 py-4 text-center">
                                        <div className="relative inline-block">
                                            <select
                                                onChange={(e) => leaveActionCTA(leave, e.target.value)}
                                                defaultValue=""
                                                disabled={!isCurrent(leave.end_date)}
                                                className={`bg-[#253D90] text-white text-sm px-4 py-1 pr-6 rounded appearance-none ${isCurrent(leave.end_date) ? '' : 'cursor-not-allowed opacity-50'}`}                                            >
                                                <option value="" disabled hidden>
                                                    Actions
                                                </option>
                                                <option value="Accepted">Accept</option>
                                                <option value="Declined">Decline</option>
                                            </select>
                                            <Image
                                                src="/actions-down-arrow.png"
                                                alt="Dropdown Arrow"
                                                width={12}
                                                height={12}
                                                className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none"
                                            />
                                        </div>
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
        </div >
    );
}

export default LeaveHistory;