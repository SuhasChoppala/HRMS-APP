'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getLoggedInUser } from '@/services/authServices';
import { useDispatch } from 'react-redux';
import { personalDetailsUpdation } from '@/app/slices/userUpdateProfileSlice';

function UserPersonalDetails() {
    const dispatch = useDispatch();

    const { register, handleSubmit, reset, getValues, formState: { dirtyFields } } = useForm({ defaultValues: { name: '', department: '', job_title: '', category: '' } });

    const [loggedInUser, setLoggedInUser] = useState(null);

    useEffect(() => {
        const user = getLoggedInUser();
        setLoggedInUser(user);
        if (user) {
            reset(user);
        }
    }, [reset]);

    const onSubmit = async () => {
        const userID = loggedInUser.id;

        const allValues = getValues();
        const entriesArray = Object.entries(allValues);
        const modifiedFields = entriesArray.filter(([key]) => dirtyFields[key]);
        const modifiedFieldsObj = Object.fromEntries(modifiedFields);

        if (modifiedFieldsObj && modifiedFields.length > 0) {
            const isUpdated = await dispatch(personalDetailsUpdation({ userID, modifiedFieldsObj })).unwrap();
            if (isUpdated) {
                const updatedUser = { ...loggedInUser, ...modifiedFieldsObj };
                localStorage.setItem("user", JSON.stringify(updatedUser));
                setLoggedInUser(updatedUser);
                window.alert('Name Updation Successful');
            }
        } else {
            window.alert('Update failed as no changes are made');
        }
    };

    return (
        <form noValidate onSubmit={handleSubmit(onSubmit)} className="flex items-center justify-center p-4">
            <div className="relative w-full rounded-xl bg-white p-6 text-center">

                <div className="flex justify-center">
                    <Image
                        src="/user-profile-card.png"
                        alt="Avatar"
                        width={96}
                        height={96}
                        className="rounded-full bg-yellow-400"
                    />
                </div>

                <div className="mt-4 text-sm font-semibold text-black">Employee Name</div>
                <input
                    {...register('name')}
                    className="mt-2 p-3 rounded-md bg-[#E3EDF9] text-[#000000B2] text-sm outline-none text-center"
                />
                <div className="mt-1 text-xs text-gray-500">(Only this field is editable)</div>

                <div className="mt-0 flex justify-around text-left rounded-xl p-4 max-w-3xl mx-auto">
                    <div className="text-center mx-4">
                        <div className="mt-4 text-sm font-semibold text-black">Department</div>
                        <input
                            {...register('department')}
                            readOnly
                            className="mt-2 p-3 rounded-md bg-[#E3EDF9] text-[#000000B2] text-sm outline-none text-center"
                        />
                    </div>
                    <div className="text-center mx-4">
                        <div className="mt-4 text-sm font-semibold text-black">Job Title</div>
                        <input
                            {...register('job_title')}
                            readOnly
                            className="mt-2 p-3 rounded-md bg-[#E3EDF9] text-[#000000B2] text-sm outline-none text-center"
                        />
                    </div>
                    <div className="text-center mx-4">
                        <div className="mt-4 text-sm font-semibold text-black">Job Category</div>
                        <input
                            {...register('category')}
                            readOnly
                            className="mt-2 p-3 rounded-md bg-[#E3EDF9] text-[#000000B2] text-sm outline-none text-center"
                        />
                    </div>
                </div>

                <div className="mt-6 flex justify-center">
                    <button
                        type="submit"
                        className="bg-[#3F861E] text-white cursor-pointer font-semibold py-2 px-10 rounded-md shadow-md text-sm hover:bg-[#2e6713]"
                    >
                        Update
                    </button>
                </div>
            </div>
        </form>
    );
}

export default UserPersonalDetails;
