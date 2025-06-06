'use client';
import { useSelector } from "react-redux";
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getLoggedInUser } from "@/services/authServices";
import { updateAcademicRecord } from "@/app/slices/userUpdateProfileSlice";
import { useRouter } from 'next/navigation';

function AcademicForm() {

    const router = useRouter();

    const { eduRecordToUpdate } = useSelector(state => state.updateProfile);

    const { register, handleSubmit, getValues, formState: { dirtyFields }, reset } = useForm({ defaultValues: { institution_name: '', degree: '', department: '', enroll_date: '', passout_date: '' } });

    const [loggedInUser, setLoggedInUser] = useState(null);

    useEffect(() => {
        const user = getLoggedInUser();
        setLoggedInUser(user);
        if (user && eduRecordToUpdate?.clickedRecord) {
            const { institution_name, degree, department, enroll_date, passout_date } = eduRecordToUpdate.clickedRecord;
            reset({
                institution_name,
                degree,
                department,
                enroll_date,
                passout_date
            })
        } else {
            router.push('/user/update-profile/user-educational-details');
        }
    }, [eduRecordToUpdate.clickedRecord, reset, router]);

    const dispatch = useDispatch();

    const updateEducRecordCTA = async () => {
        const userID = loggedInUser.id;
        const allValues = getValues();
        const allValuesArray = Object.entries(allValues);
        const modifiedValuesArray = allValuesArray.filter(([key]) => dirtyFields[key]);
        const modifiedFieldsObj = Object.fromEntries(modifiedValuesArray);

        if (modifiedFieldsObj && modifiedValuesArray.length > 0) {

            const updatedEduRecord = {
                ...eduRecordToUpdate.clickedRecord,
                ...modifiedFieldsObj
            }

            const isUpdated = await dispatch(updateAcademicRecord({ userID, updatedEduRecord, eduRecordToUpdate })).unwrap();
            if (isUpdated) {
                window.alert('Record Updated');

                const updatedAcademicRecords = loggedInUser.educational_qualifications.academic_records.map((record) =>
                    record.id === updatedEduRecord.id ? updatedEduRecord : record
                );

                const updatedLocalUser = {
                    ...loggedInUser,
                    educational_qualifications: {
                        ...loggedInUser.educational_qualifications,
                        academic_records: updatedAcademicRecords
                    }
                };

                localStorage.setItem('user', JSON.stringify(updatedLocalUser));
                setLoggedInUser(updatedLocalUser);

                router.push('/user/update-profile/user-educational-details');
            }
        } else {
            window.alert('Updation failed as no changes are made');
            router.push('/user/update-profile/user-educational-details');
        }

    }

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold">Academic Details</h3>
                <Link
                    href="/user/update-profile/user-educational-details"
                    className="text-sm text-blue-600 hover:underline font-medium flex items-center gap-1"
                >
                    <FaArrowLeft className="text-xs" />
                    Back
                </Link>
            </div>

            <form noValidate className="space-y-6" onSubmit={handleSubmit(updateEducRecordCTA)}>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-1 text-sm mb-2 font-semibold">Institution Name</label>
                        <input
                            {...register('institution_name')}
                            type="text"
                            className="w-full p-3 rounded-md bg-[#E3EDF9] text-[#000000B2] text-sm outline-none"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 text-sm mb-2 font-semibold">Degree</label>
                        <input
                            {...register('degree')}
                            type="text"
                            className="w-full p-3 rounded-md bg-[#E3EDF9] text-[#000000B2] text-sm outline-none"
                        />
                    </div>
                </div>

                <div>
                    <label className="block mb-1 text-sm mb-2 font-semibold">Department</label>
                    <input
                        {...register('department')}
                        type="text"
                        className="w-full p-3 rounded-md bg-[#E3EDF9] text-[#000000B2] text-sm outline-none"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-1 text-sm mb-2 font-semibold">Enroll Date</label>
                        <input
                            {...register('enroll_date')}
                            type="text"
                            className="w-full p-3 rounded-md bg-[#E3EDF9] text-[#000000B2] text-sm outline-none"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 text-sm mb-2 font-semibold">Passout Date</label>
                        <input
                            {...register('passout_date')}
                            type="text"
                            className="w-full p-3 rounded-md bg-[#E3EDF9] text-[#000000B2] text-sm outline-none"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="bg-[#3F861E] text-white cursor-pointer font-semibold py-2 px-10 rounded-md shadow-md text-sm hover:bg-[#2e6713]"
                >
                    Update
                </button>
            </form>
        </div>
    );
}

export default AcademicForm;
