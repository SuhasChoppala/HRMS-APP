'use client';

import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { differenceInCalendarDays } from 'date-fns';
import { getAllLeaveRecalls, leaveRecallofEmp } from '../../../slices/leaveManagementSlice';
import { fetchAllMessagesInDB } from '@/app/slices/userDashboardSlice';

function RecallForm({ setIsRecallFormOpen, leaveToRecall, allLeaveApplications }) {

    const { loggedInAdmin } = useSelector(state => state.adminDashboard)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllLeaveRecalls());
        dispatch(fetchAllMessagesInDB());
    }, [dispatch])

    const { register, watch, handleSubmit, reset, formState: { errors } } = useForm();

    const handleClose = () => setIsRecallFormOpen(false);

    function parseDDMMYYYY(dateString) {
        const [day, month, year] = dateString.split('-');
        return new Date(`${year}-${month}-${day}`);
    }

    const end = leaveToRecall?.end_date ? parseDDMMYYYY(leaveToRecall.end_date) : null;
    const currentDate = new Date();
    const daysRemaining = end ? differenceInCalendarDays(end, currentDate) : 0;

    const recallLeaveCTA = async (formData) => {
        const formatDate = (isoDate) => {
            const [year, month, day] = isoDate.split('-');
            return `${day}-${month}-${year}`;
        };

        const dataTopass = {
            ...formData,
            new_resumption_date: formatDate(formData.new_resumption_date)
        }
        const isRecalled = await dispatch(leaveRecallofEmp({ leaveToRecall, dataTopass })).unwrap();
        if (isRecalled) {
            reset();
            dispatch(allLeaveApplications());
            window.alert('Leave Recall Succesfull! The Employee has been sent a leave recall message.')
            setIsRecallFormOpen(false);
        }
    }

    return (
        <Dialog open={true} onClose={handleClose} className="relative z-50">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-black/50 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
            />

            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <DialogPanel
                    transition
                    className="w-full max-w-lg transform overflow-hidden rounded-xl bg-white p-6 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
                >
                    <div className="flex flex-col items-left gap-2 mb-6">
                        <Image
                            src="/admin-recall-form-icon.png"
                            alt="Recall Icon"
                            width={40}
                            height={40}
                            className="object-contain"
                        />
                        <DialogTitle className="text-lg font-bold text-[#1D1D1D]">
                            Leave Recall
                        </DialogTitle>
                        <p className="text-sm text-gray-600 text-left">
                            Fill in the required details to recall this employee
                        </p>
                    </div>

                    <form noValidate className="space-y-6" onSubmit={handleSubmit(recallLeaveCTA)}>
                        {/* Employee Name & Days Remaining */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="text-[#1D1D1D] text-sm font-medium">Employee Name</label>
                                <input
                                    type="text"
                                    {...register('employee_name')}
                                    value={leaveToRecall?.name}
                                    readOnly
                                    className="w-full mt-2 bg-[#E3EDF9] text-sm text-[#000000B2] rounded-md px-4 py-2 outline-none"
                                />
                            </div>
                            <div>
                                <label className="text-[#1D1D1D] text-sm font-medium">Days Remaining</label>
                                <input
                                    type="number"
                                    {...register('days_remaining')}
                                    value={daysRemaining || 0}
                                    readOnly
                                    className="w-full mt-2 bg-[#E3EDF9] text-sm text-[#000000B2] px-4 py-2 rounded-md outline-none"
                                />
                            </div>
                        </div>

                        {/* Start & End Date */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="text-[#1D1D1D] text-sm font-medium">Start Date</label>
                                <input
                                    type="text"
                                    {...register('start_date')}
                                    value={leaveToRecall?.start_date}
                                    readOnly
                                    className="w-full mt-2 bg-[#E3EDF9] text-sm text-[#000000B2] rounded-md px-4 py-2 outline-none"
                                />
                            </div>
                            <div>
                                <label className="text-[#1D1D1D] text-sm font-medium">End Date</label>
                                <input
                                    type="text"
                                    {...register('end_date')}
                                    value={leaveToRecall?.end_date}
                                    readOnly
                                    className="w-full mt-2 bg-[#E3EDF9] text-sm text-[#000000B2] rounded-md px-4 py-2 outline-none"
                                />
                            </div>
                        </div>

                        {/* Resumption Date & New Resumption Date */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="text-[#1D1D1D] text-sm font-medium">Resumption Date</label>
                                <input
                                    type="text"
                                    {...register('resumption_date')}
                                    value={leaveToRecall?.resumption_date}
                                    readOnly
                                    className="w-full mt-2 bg-[#E3EDF9] text-sm text-[#000000B2] rounded-md px-4 py-2 outline-none"
                                />
                            </div>
                            <div>
                                <label className="text-[#1D1D1D] text-sm font-medium">New Resumption Date</label>
                                <input
                                    {...register('new_resumption_date', {
                                        required: 'This field is required',
                                        validate: (value) => {
                                            const todayDate = new Date();
                                            const currentResumpDate = parseDDMMYYYY(watch('resumption_date'));
                                            const newResumptionDate = new Date(value)
                                            const isValidNewResumpDate = newResumptionDate > todayDate && newResumptionDate < currentResumpDate;
                                            return isValidNewResumpDate || 'New Resumption Date must be before Current Resumption Date and after Today\'s Date';
                                        }
                                    })}
                                    type="date"
                                    className="w-full mt-2 bg-[#E3EDF9] text-sm text-[#000000B2] px-4 py-2 rounded-md outline-none"
                                />
                                {errors.new_resumption_date && (
                                    <p className="text-xs text-red-500 mt-2">{errors.new_resumption_date.message}</p>
                                )}
                            </div>
                        </div>

                        {/* Reason for Recall */}
                        <div>
                            <label className="text-[#1D1D1D] text-sm font-medium">Reason for Recall</label>
                            <textarea
                                {...register('reason_for_recall', { required: 'This field is required' })}
                                className="w-full mt-2 bg-[#E3EDF9] text-sm text-[#000000B2] px-4 py-2 rounded-md outline-none"
                                rows={3}
                                placeholder="Enter reason for recalling this employee..."
                            />
                            {errors.reason_for_recall && (
                                <p className="text-xs text-red-500 mt-2">{errors.reason_for_recall.message}</p>
                            )}
                        </div>

                        {/* Relief Officer */}
                        <div>
                            <label className="text-[#1D1D1D] text-sm font-medium">Relief Officer(s)</label>
                            <input
                                type="text"
                                {...register('relief_officer_name')}
                                defaultValue={loggedInAdmin?.name || ''}
                                readOnly
                                className="w-full mt-2 bg-[#E3EDF9] text-sm text-[#000000B2] px-4 py-2 rounded-md outline-none"
                            />
                        </div>

                        {/* Buttons */}
                        <div className="flex items-center justify-center gap-4 pt-4">
                            <button
                                type="submit"
                                className="bg-[#3F861E] text-sm text-white font-medium cursor-pointer px-10 py-2 rounded-lg hover:bg-[#336d19]"
                            >
                                Initiate Recall
                            </button>
                            <button
                                type="button"
                                onClick={handleClose}
                                className="border border-[#F50707] text-[#F50707] text-sm font-medium cursor-pointer px-10 py-2 rounded-lg hover:bg-[#F50707] hover:text-white"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </DialogPanel>
            </div>
        </Dialog>
    );
}

export default RecallForm;
