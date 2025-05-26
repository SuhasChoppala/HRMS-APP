'use client';
import { useSelector } from "react-redux";
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import { getLoggedInUser } from "@/services/authServices";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { useDispatch } from "react-redux";
import { updateProfessionalRecord } from "@/app/slices/userUpdateProfileSlice";

function ProfessionalForm() {

    const router = useRouter();

    const dispatch = useDispatch();

    const { eduRecordToUpdate } = useSelector(state => state.updateProfile);

    const { register, handleSubmit, getValues, reset, formState: { dirtyFields } } = useForm({ defaultValues: { company_name: '', location: '', start_date: '', end_date: '' } });

    const [loggedInUser, setLoggedInUser] = useState(null);

    useEffect(() => {
        const user = getLoggedInUser();
        if (user && eduRecordToUpdate.clickedRecord) {
            setLoggedInUser(user);
            const { company_name, location, start_date, end_date } = eduRecordToUpdate.clickedRecord;
            reset({
                company_name,
                location,
                start_date,
                end_date
            })
        } else {
            router.push('/user/update-profile/user-educational-details');
        }
    }, [])

    const updateProfRecordCTA = async () => {

        const userID = loggedInUser.id;

        const allValues = getValues();
        const allFieldsArrays = Object.entries(allValues);
        const modifiedFields = allFieldsArrays.filter(([key]) => dirtyFields[key]);
        const modifiedFieldsObj = Object.fromEntries(modifiedFields);

        if (modifiedFieldsObj && modifiedFields.length > 0) {

            const updatedProfObj = {
                ...eduRecordToUpdate.clickedRecord,
                ...modifiedFieldsObj
            }

            const isProfRecordUpdated = await dispatch(updateProfessionalRecord({ userID, updatedProfObj, eduRecordToUpdate })).unwrap();

            if (isProfRecordUpdated) {
                window.alert('Record Updated');

                const updatedProfQualfs = loggedInUser.educational_qualifications.professional_qualifications.map(object =>
                    object.id === updatedProfObj.id ? updatedProfObj : object
                );

                const updatedLocalUser = {
                    ...loggedInUser,
                    educational_qualifications: {
                        ...loggedInUser.educational_qualifications,
                        professional_qualifications: updatedProfQualfs
                    }
                }

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
                <h3 className="text-base font-semibold">Professional Details</h3>
                <Link
                    href="/user/update-profile/user-educational-details"
                    className="text-sm text-blue-600 hover:underline font-medium flex items-center gap-1"
                >
                    <FaArrowLeft className="text-xs" />
                    Back
                </Link>
            </div>

            <form noValidate className="space-y-6" onSubmit={handleSubmit(updateProfRecordCTA)}>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-1 text-sm mb-2 font-semibold">Company Name</label>
                        <input
                            {...register('company_name')}
                            type="text"
                            className="w-full p-3 rounded-md bg-[#E3EDF9] text-[#000000B2] text-sm outline-none"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 text-sm mb-2 font-semibold">Location</label>
                        <input
                            {...register('location')}
                            type="text"
                            className="w-full p-3 rounded-md bg-[#E3EDF9] text-[#000000B2] text-sm outline-none"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-1 text-sm mb-2 font-semibold">Start Date</label>
                        <input
                            {...register('start_date')}
                            type="text"
                            className="w-full p-3 rounded-md bg-[#E3EDF9] text-[#000000B2] text-sm outline-none"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 text-sm mb-2 font-semibold">End Date</label>
                        <input
                            {...register('end_date')}
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

export default ProfessionalForm;
