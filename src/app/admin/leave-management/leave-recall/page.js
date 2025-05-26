'use client';
import Image from 'next/image';
import { allLeaveApplications } from '@/app/slices/userApplyLeaveSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import RecallForm from '../recall-form/page';

function LeaveRecall() {

    const dispatch = useDispatch();

    const [isRecallFormOpen, setIsRecallFormOpen] = useState(false)

    useEffect(() => {
        dispatch(allLeaveApplications())
    }, []);

    const { totalLeaveApplications } = useSelector(state => state.leaveApplication);

    const ongoingLeaves = totalLeaveApplications.filter(leave => {
        const today = new Date();
        const parseDate = (str) => {
            const [day, month, year] = str.split('-').map(Number);
            return new Date(year, month - 1, day);
        };

        const startDate = parseDate(leave.start_date);
        const endDate = parseDate(leave.end_date);

        if (today >= startDate && today <= endDate) {
            if (leave.status === 'Accepted' || leave.status === 'Recalled') {
                return true;
            }
        }
        return false;
    });

    const [leaveToRecall, setLeaveToRecall] = useState(null);

    const openForm = (leaveClicked) => {
        setIsRecallFormOpen(true);
        setLeaveToRecall(leaveClicked);
    }

    return (
        <div className='bg-white p-5 rounded-xl'>
            <div className='pb-2'>
                <h3 className="text-md text-[#1D1D1D] font-semibold mb-2">Ongoing Leave Applications</h3>
            </div>

            <div className="overflow-x-auto rounded-lg">
                <table className="min-w-full text-sm">
                    <thead className="bg-[#E3EDF9] text-[#1D1D1D] text-sm">
                        <tr>
                            <th className="text-center px-4 py-4">Name(s)</th>
                            <th className="text-center px-4 py-4">Duration(s)</th>
                            <th className="text-center px-4 py-4">Start Date</th>
                            <th className="text-center px-4 py-4">End Date</th>
                            <th className="text-center px-4 py-4">Resumption Date</th>
                            <th className="text-center px-4 py-4">Type</th>
                            <th className="text-center px-4 py-4">Reason(s)</th>
                            <th className="text-center px-4 py-4">Status</th>
                            <th className="text-center px-4 py-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ongoingLeaves && ongoingLeaves.length > 0 ? (
                            ongoingLeaves.map((leave, index) => (
                                <tr
                                    key={index}
                                    className={index % 2 === 0 ? 'bg-white' : 'bg-[#E3EDF9]'}
                                >
                                    <td className="px-4 py-4 text-black text-sm text-center">{leave.name}</td>
                                    <td className="px-4 py-4 text-black text-sm text-center">{leave.duration}</td>
                                    <td className="px-4 py-4 text-black text-sm text-center">{leave.start_date}</td>
                                    <td className="px-4 py-4 text-black text-sm text-center">{leave.end_date}</td>
                                    <td className="px-4 py-4 text-black text-sm text-center">{leave.resumption_date}</td>
                                    <td className="px-4 py-4 text-black text-sm text-center">{leave.leave_type}</td>
                                    <td className="px-4 py-4 text-black text-sm text-center">{leave.reason}</td>
                                    <td className="px-4 py-4 text-black text-sm text-center">{leave.status}</td>
                                    <td className="px-4 py-4 text-center">
                                        <button
                                            onClick={() => openForm(leave)}
                                            disabled={leave.status === 'Recalled'}
                                            className={`px-6 py-1 rounded text-sm ${leave.status === 'Recalled'
                                                ? 'bg-gray-400 text-white cursor-not-allowed'
                                                : 'bg-[#FF0000] text-white cursor-pointer'
                                                }`}>
                                            Recall
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="9" className="text-center text-sm py-4 text-gray-500">
                                    No ongoing leave applications
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {isRecallFormOpen && (
                <RecallForm setIsRecallFormOpen={setIsRecallFormOpen} leaveToRecall={leaveToRecall} allLeaveApplications={allLeaveApplications} />
            )}
        </div>
    )
}

export default LeaveRecall;