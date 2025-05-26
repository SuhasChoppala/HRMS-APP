'use client';

import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { getLoggedInUser } from "@/services/authServices";
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation';
import { updateFinancialDetails } from "@/app/slices/userUpdateProfileSlice";

function FinancialForm() {

    const router = useRouter();

    const dispatch = useDispatch();

    const { finRecordToUpdate } = useSelector(state => state.updateProfile);

    const [loggedInUser, setLoggedInUser] = useState(null);

    const { handleSubmit, reset, register, getValues, formState: { dirtyFields } } = useForm({ defaultValues: { bank_name: '', account_number: '', account_holder_name: '' } });

    useEffect(() => {
        const user = getLoggedInUser();
        setLoggedInUser(user);
        if (user && finRecordToUpdate.id) {
            const { bank_name, account_number, account_holder_name } = finRecordToUpdate;
            reset({
                bank_name,
                account_number,
                account_holder_name
            })
        } else {
            router.push('/user/update-profile/user-financial-details')
        }
    }, [])

    const financialUpdationCTA = async () => {
        const userID = loggedInUser.id;
        const allValues = getValues();
        const allFieldsArray = Object.entries(allValues);
        const modifiedFields = allFieldsArray.filter(([key]) => dirtyFields[key]);
        const modifiedFieldsObj = Object.fromEntries(modifiedFields);

        if (modifiedFieldsObj && modifiedFields.length > 0) {
            const updatedFinObject = {
                ...finRecordToUpdate,
                ...modifiedFieldsObj
            }

            const isFinRecordUpdated = await dispatch(updateFinancialDetails({ userID, updatedFinObject })).unwrap();
            if (isFinRecordUpdated) {
                const updatedFinArray = loggedInUser.financial_details.map(object => object.id === updatedFinObject.id ? updatedFinObject : object);

                const updatedLocalUser = {
                    ...loggedInUser,
                    financial_details: updatedFinArray
                }

                localStorage.setItem("user", JSON.stringify(updatedLocalUser));
                setLoggedInUser(updatedLocalUser);
                window.alert('Financial details updated succesfully');
                router.push('/user/update-profile/user-financial-details');
            }
        } else {
            window.alert('Updation failed as no changes are made');
            router.push('/user/update-profile/user-financial-details');
        }

    }

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold">Financial Details</h3>
                <Link
                    href="/user/update-profile/user-financial-details"
                    className="text-sm text-blue-600 hover:underline font-medium flex items-center gap-1"
                >
                    <FaArrowLeft className="text-xs" />
                    Back
                </Link>
            </div>

            <form noValidate className="space-y-6" onSubmit={handleSubmit(financialUpdationCTA)}>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-1 text-sm mb-2 font-semibold">Bank Name</label>
                        <input
                            {...register('bank_name')}
                            type="text"
                            className="w-full p-3 rounded-md bg-[#E3EDF9] text-[#000000B2] text-sm outline-none"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 text-sm mb-2 font-semibold">Account Number</label>
                        <input
                            {...register('account_number')}
                            type="text"
                            className="w-full p-3 rounded-md bg-[#E3EDF9] text-[#000000B2] text-sm outline-none"
                        />
                    </div>
                </div>

                <div>
                    <label className="block mb-1 text-sm mb-2 font-semibold">Account Holder's Name</label>
                    <input
                        {...register('account_holder_name')}
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

export default FinancialForm;
