'use client';

import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { getLoggedInUser } from "@/services/authServices";
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation';
import { updateGuarantorDetails } from "@/app/slices/userUpdateProfileSlice";

function GuarantorForm() {

    const router = useRouter();

    const dispatch = useDispatch();

    const { guarantorToUpdate } = useSelector(state => state.updateProfile);

    const { handleSubmit, reset, register, getValues, formState: { dirtyFields } } = useForm({ defaultValues: { guarantors_name: '', occupation: '', mobile_number: '' } });

    const [loggedInUser, setLoggedInUser] = useState(null);

    useEffect(() => {
        const user = getLoggedInUser();
        setLoggedInUser(user);
        if (user && guarantorToUpdate.id) {
            const { guarantors_name, occupation, mobile_number } = guarantorToUpdate;
            reset({
                guarantors_name,
                occupation,
                mobile_number
            })
        } else {
            router.push('/user/update-profile/user-guarantor-details')
        }
    }, [])

    const guarantorUpdationCTA = async () => {
        const userID = loggedInUser.id;
        const allValues = getValues();
        const allFieldsArray = Object.entries(allValues);
        const modifiedFields = allFieldsArray.filter(([key]) => dirtyFields[key]);
        const modifiedFieldsObj = Object.fromEntries(modifiedFields);

        if (modifiedFieldsObj && modifiedFields.length > 0) {

            const updatedGuarantorObj = {
                ...guarantorToUpdate,
                ...modifiedFieldsObj
            }

            const isGuarantorUpdated = await dispatch(updateGuarantorDetails({ userID, updatedGuarantorObj })).unwrap();
            if (isGuarantorUpdated) {

                const updatedGuarantorArray = loggedInUser.guarantor_details.map(guarantorObj => guarantorObj.id === updatedGuarantorObj.id ? updatedGuarantorObj : guarantorObj);

                const updatedLocalUser = {
                    ...loggedInUser,
                    guarantor_details: updatedGuarantorArray
                }
                localStorage.setItem("user", JSON.stringify(updatedLocalUser));
                setLoggedInUser(updatedLocalUser);
                window.alert('Guarantor details updated succesfully');
                router.push('/user/update-profile/user-guarantor-details');
            }
        } else {
            window.alert('Updation failed as no changes are made');
            router.push('/user/update-profile/user-guarantor-details');
        }
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold">Guarantor Details</h3>
                <Link
                    href="/user/update-profile/user-guarantor-details"
                    className="text-sm text-blue-600 hover:underline font-medium flex items-center gap-1"
                >
                    <FaArrowLeft className="text-xs" />
                    Back
                </Link>
            </div>

            <form noValidate className="space-y-6" onSubmit={handleSubmit(guarantorUpdationCTA)}>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-1 text-sm mb-2 font-semibold">Guarantor's Name</label>
                        <input
                            {...register('guarantors_name')}
                            type="text"
                            className="w-full p-3 rounded-md bg-[#E3EDF9] text-[#000000B2] text-sm outline-none"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 text-sm mb-2 font-semibold">Occupation</label>
                        <input
                            {...register('occupation')}
                            type="text"
                            className="w-full p-3 rounded-md bg-[#E3EDF9] text-[#000000B2] text-sm outline-none"
                        />
                    </div>
                </div>

                <div>
                    <label className="block mb-1 text-sm mb-2 font-semibold">Mobile Number</label>
                    <input
                        {...register('mobile_number')}
                        type="text"
                        className="w-full p-3 rounded-md bg-[#E3EDF9] text-[#000000B2] text-sm outline-none"
                    />
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

export default GuarantorForm;
