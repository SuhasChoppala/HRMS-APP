'use client';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { allLeaveApplications, applyLeave } from '../../../slices/userApplyLeaveSlice';
import { differenceInCalendarDays } from 'date-fns';
import { useRouter } from 'next/navigation';


function ApplyLeave() {
    const searchParams = useSearchParams();
    const leaveType = searchParams.get('type');

    const dispatch = useDispatch();
    const router = useRouter();

    const { register, handleSubmit, reset, watch, setValue, formState: { errors } } = useForm();

    const { loggedInUser } = useSelector(state => state.userDashboard);

    useEffect(() => {
        if (loggedInUser) {
            dispatch(allLeaveApplications());
        }
    }, []);

    const startDate = watch('start_date');
    const endDate = watch('end_date');


    useEffect(() => {
        if (startDate && endDate) {
            const start = new Date(startDate);
            const end = new Date(endDate);
            const diff = differenceInCalendarDays(end, start) + 1;

            if (diff > 0) {
                setValue('duration', diff);
                const nextDay = new Date(end);
                nextDay.setDate(end.getDate() + 1);
                const isoDate = nextDay.toISOString().split('T')[0];
                setValue('resumption_date', isoDate);
            } else {
                setValue('duration', '');
                setValue('resumption_date', '');
            }
        } else {
            setValue('duration', '');
            setValue('resumption_date', '');
        }
    }, [startDate, endDate, setValue]);


    const applyLeaveCTA = async (data) => {
        const userID = loggedInUser.id;
        const userName = loggedInUser.name;

        const formatDate = (isoDate) => {
            const [year, month, day] = isoDate.split('-');
            return `${day}-${month}-${year}`;
        };

        const formattedData = {
            ...data,
            start_date: formatDate(data.start_date),
            end_date: formatDate(data.end_date),
            resumption_date: formatDate(data.resumption_date),
        };

        try {
            const applied = await dispatch(applyLeave({ formattedData, userID, userName, leaveType })).unwrap();
            if (applied) {
                window.alert('Leave Applied Successfully');
                reset();
                router.push('/user/leave-application');
            }
        } catch (error) {
            console.log('Leave Application Failed:', error);
        }
    }

    return (
        <div className="p-6 bg-[#E3EDF9] min-h-screen space-y-6">
            <div className="bg-white rounded-md px-6 py-4">
                <p className="text-md text-[#1D1D1D]">
                    Dashboard &gt; Apply for Leave &gt; {leaveType} Leave
                </p>
            </div>

            <div className="max-w-3xl mx-auto bg-white rounded-lg p-8 space-y-6">
                <div className="text-center space-y-1">
                    <div className="flex justify-center items-center gap-2">
                        <Image src="/book-open.png" alt="Book Icon" width={24} height={24} />
                        <h2 className="text-xl font-semibold text-[#1D1D1D]">Leave Application</h2>
                    </div>
                    <p className="text-sm text-[#1D1D1D] mt-4">Fill the required fields below to apply for {leaveType?.toLowerCase()} leave.</p>
                </div>

                <form noValidate className="space-y-6" onSubmit={handleSubmit(applyLeaveCTA)}>
                    {/* Leave Type & Reason */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div>
                            <label className="text-[#1D1D1D] text-sm font-semibold">Leave Type</label>
                            <input
                                type="text"
                                value={leaveType}
                                readOnly
                                className="w-full mt-2 bg-[#E3EDF9] text-sm text-[#000000B2] rounded-md px-4 py-2 outline-none"
                            />
                        </div>
                        <div>
                            <label className="text-[#1D1D1D] text-sm font-semibold">Reason for leave</label>
                            <input
                                type="text"
                                {...register('reason', { required: true })}
                                className="w-full mt-2 bg-[#E3EDF9] text-sm text-[#000000B2] rounded-md px-4 py-2 outline-none"
                            />
                            {errors.reason?.type === 'required' && (
                                <p className="text-xs text-red-500 mt-2">This field is required</p>
                            )}
                        </div>
                    </div>

                    {/* Start & End Date */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div>
                            <label className="text-[#1D1D1D] text-sm font-semibold">Start Date</label>
                            <input
                                type="date"
                                {...register('start_date', { required: true })}
                                className="w-full mt-2 bg-[#E3EDF9] text-[#000000B2] text-sm px-4 py-2 rounded-md outline-none"
                            />
                            {errors.start_date?.type === 'required' && (
                                <p className="text-xs text-red-500 mt-2">This field is required</p>
                            )}
                        </div>
                        <div>
                            <label className="text-[#1D1D1D] text-sm font-semibold">End Date</label>
                            <input
                                type="date"
                                {...register('end_date', {
                                    required: 'This field is required',
                                    validate: (value) => {
                                        const start = new Date(watch('start_date'));
                                        const end = new Date(value);
                                        return end >= start || 'End date must be after start date';
                                    }
                                })}
                                className="w-full mt-2 bg-[#E3EDF9] text-[#000000B2] text-sm px-4 py-2 rounded-md outline-none"
                            />
                            {errors.end_date && (
                                <p className="text-xs text-red-500 mt-2">{errors.end_date.message}</p>
                            )}
                        </div>
                    </div>

                    {/* Duration & Resumption Date */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div>
                            <label className="text-[#1D1D1D] text-sm font-semibold">Duration</label>
                            <input
                                type="number"
                                {...register('duration', { required: true })}
                                readOnly
                                className="w-full mt-2 bg-[#E3EDF9] text-[#000000B2] text-sm px-4 py-2 rounded-md outline-none"
                            />
                        </div>
                        <div>
                            <label className="text-[#1D1D1D] text-sm font-semibold">Resumption Date</label>
                            <input
                                type="date"
                                {...register('resumption_date', { required: true })}
                                readOnly
                                className="w-full mt-2 bg-[#E3EDF9] text-[#000000B2] text-sm px-4 py-2 rounded-md outline-none"
                            />
                        </div>
                    </div>

                    {/* Submit & Reset */}
                    <div className="flex gap-4 pt-4 items-center justify-center">
                        <button
                            type="submit"
                            className="bg-[#3F861E] text-white font-semibold cursor-pointer px-14 py-2 rounded-lg hover:shadow-md hover:bg-[#336d19]"
                        >
                            Submit
                        </button>
                        <button
                            onClick={() => reset()}
                            type="reset"
                            className="border border-[#F50707] cursor-pointer text-[#F50707] font-semibold px-14 py-2 rounded-lg hover:shadow-md hover:bg-[#F50707] hover:text-white"
                        >
                            Reset
                        </button>
                    </div>
                </form>
            </div >
        </div >
    );
}

export default ApplyLeave;
