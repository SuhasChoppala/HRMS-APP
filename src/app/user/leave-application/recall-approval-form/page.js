'use client';

import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { differenceInCalendarDays, subDays } from 'date-fns';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterRecallLeave, updateUserRecallResp } from '@/app/slices/userApplyLeaveSlice';


function RecallApprovalForm({ setIsRecallApprOpen, leaveToRespond, allLeaveApplications }) {

    const { register, handleSubmit, reset, formState: { errors }, watch } = useForm();

    const handleClose = () => setIsRecallApprOpen(false);

    const userDecision = watch('userDecision');

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(filterRecallLeave(leaveToRespond));
    }, [dispatch, leaveToRespond]);

    const { recalledLeaveToRespond } = useSelector(state => state.leaveApplication);

    function parseDDMMYYYY(dateString) {
        const [day, month, year] = dateString.split('-');
        return new Date(`${year}-${month}-${day}`);
    }

    //submision function
    const submissionCTA = async (formData) => {

        const newResump = parseDDMMYYYY(recalledLeaveToRespond.new_resumption_date);
        const newResumpDate = new Date(newResump);
        const start = parseDDMMYYYY(leaveToRespond.start_date);
        const startDate = new Date(start);
        const newEndDate = subDays(newResumpDate, 1);
        const newDuration = differenceInCalendarDays(newEndDate, startDate) + 1;

        const formatDate = (isoDate) => {
            const [year, month, day] = isoDate.split('-');
            return `${day}-${month}-${year}`;
        };

        const data = {
            ...formData,
            end_date: formatDate(newEndDate.toISOString().split('T')[0]),
            resumption_date: recalledLeaveToRespond.new_resumption_date,
            duration: newDuration,
            id: recalledLeaveToRespond.id
        }

        const sendResponse = await dispatch(updateUserRecallResp(data)).unwrap();
        if (sendResponse) {
            window.alert('Response sent');
            setIsRecallApprOpen(false);
            dispatch(allLeaveApplications());
        }
    };

    return (
        <Dialog open={true} onClose={handleClose} className="relative z-50">
            <DialogBackdrop className="fixed inset-0 bg-black/50" />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-xl bg-white p-6 text-left shadow-xl transition-all">
                    <div className="flex flex items-center justify-center gap-2 mb-6 text-center">
                        <Image src="/book-open.png" alt="Book Icon" width={20} height={20} />
                        <h2 className="text-lg text-[#1D1D1D] font-medium">Leave Recall</h2>
                    </div>


                    <div className="bg-[#E3EDF9] p-4 rounded-md text-sm text-[#1D1D1D] leading-relaxed mb-4">
                        <p className="mb-2 font-medium">Dear User,</p>
                        <p>
                            This is to inform you that you have been recalled from your leave by your line manager named <strong>{recalledLeaveToRespond?.releif_officer}</strong> as <strong>{recalledLeaveToRespond?.reason_for_recall}</strong>. Your new resumption date is <strong>{recalledLeaveToRespond?.new_resumption_date}</strong>.
                        </p>
                    </div>

                    <form noValidate className="space-y-6" onSubmit={handleSubmit(submissionCTA)}>
                        {/* Decision Selector */}
                        <div>
                            <label className="text-[#1D1D1D] text-sm font-medium">Select Decision</label>
                            <select
                                {...register('userDecision', { required: true })}
                                className="w-full mt-2 bg-[#E3EDF9] text-sm text-[#000000B2] px-4 py-2 rounded-md outline-none"
                            >
                                <option value="Approve">Approve</option>
                                <option value="Decline">Decline</option>
                            </select>
                        </div>

                        {/* Reason if Declined */}
                        {userDecision === 'Decline' && (
                            <div>
                                <label className="text-[#1D1D1D] text-sm font-medium">If No, state reason why?</label>
                                <textarea
                                    placeholder="State your reason..."
                                    className="w-full mt-2 bg-[#E3EDF9] text-sm text-[#000000B2] px-4 py-2 rounded-md outline-none"
                                    rows={3}
                                    {...register('reason', {
                                        validate: (value) => {
                                            if (userDecision === 'Decline') {
                                                return value && value.trim() !== '' || 'Reason is required';
                                            }
                                            return true;
                                        }
                                    })}
                                />
                                {errors.reason && (
                                    <p className="text-red-500 text-sm mt-1">{errors.reason.message}</p>
                                )}
                            </div>
                        )}

                        {/* Buttons */}
                        <div className="flex items-center justify-center gap-4 pt-4">
                            <button
                                type="submit"
                                className="bg-[#3F861E] text-sm text-white font-medium cursor-pointer px-10 py-2 rounded-lg hover:bg-[#336d19]"
                            >
                                Submit
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

export default RecallApprovalForm;
