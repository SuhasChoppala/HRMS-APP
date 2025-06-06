'use client';
import { useEffect, useState } from "react";
import { getLoggedInUser } from "@/services/authServices";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { contactDetailsUpdation } from "@/app/slices/userUpdateProfileSlice";

function UserContactDetails() {

    const [loggedInUser, setLoggedInUser] = useState(null);

    const { handleSubmit, reset, getValues, register, formState: { dirtyFields } } = useForm({ defaultValues: { phoneNumber: '', phoneNumber2: '', email: '', address: '', state: '', city: '' } });

    useEffect(() => {
        const user = getLoggedInUser();
        setLoggedInUser(user);
        if (user) {
            const { phoneNumber, phoneNumber2, email, address, state, city } = user.contact_details || {};
            reset({
                phoneNumber,
                phoneNumber2,
                email,
                address,
                state,
                city,
            });
        }
    }, [reset]);

    const dispatch = useDispatch();

    const onSubmitContactFrom = async () => {

        const userId = loggedInUser.id;
        const allValues = getValues();
        const entriesArray = Object.entries(allValues);
        const modifiedFields = entriesArray.filter(([key]) => dirtyFields[key]);
        const modifiedContactsObj = Object.fromEntries(modifiedFields);

        if (modifiedContactsObj && modifiedFields.length > 0) {
            const updatedContactDetails = {
                ...loggedInUser.contact_details,
                ...modifiedContactsObj
            }
            const isUpdated = await dispatch(contactDetailsUpdation({ userId, updatedContactDetails })).unwrap();
            if (isUpdated) {
                const updatedUser = {
                    ...loggedInUser,
                    contact_details: {
                        ...loggedInUser.contact_details,
                        ...modifiedContactsObj
                    }
                };
                localStorage.setItem("user", JSON.stringify(updatedUser));
                setLoggedInUser(updatedUser);
                window.alert("Contact details has been updated succesfully")
            }
        } else {
            window.alert('Update failed as no changes are made');
        }
    }

    return (
        <div>
            <form noValidate className="space-y-6" onSubmit={handleSubmit(onSubmitContactFrom)}>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-1 text-sm mb-2 font-semibold">Phone Number 1</label>
                        <input
                            {...register('phoneNumber')}
                            type="text"
                            className="w-full p-3 rounded-md bg-[#E3EDF9] text-[#000000B2] text-sm outline-none"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 text-sm mb-2 font-semibold">Phone Number 2</label>
                        <input
                            {...register('phoneNumber2')}
                            type="text"
                            className="w-full p-3 rounded-md bg-[#E3EDF9] text-[#000000B2] text-sm outline-none"
                        />
                    </div>
                </div>

                <div>
                    <label className="block mb-1 text-sm mb-2 font-semibold">E-mail Address</label>
                    <input
                        {...register('email')}
                        type="email"
                        className="w-full p-3 rounded-md bg-[#E3EDF9] text-[#000000B2] text-sm outline-none"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-1 text-sm mb-2 font-semibold">State of residence</label>
                        <input
                            {...register('state')}
                            type="text"
                            className="w-full p-3 rounded-md bg-[#E3EDF9] text-[#000000B2] text-sm outline-none"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 text-sm mb-2 font-semibold">City</label>
                        <input
                            {...register('city')}
                            type="text"
                            className="w-full p-3 rounded-md bg-[#E3EDF9] text-[#000000B2] text-sm outline-none"
                        />
                    </div>
                </div>

                <div>
                    <label className="block mb-1 text-sm mb-2 font-semibold">Residential Address</label>
                    <input
                        {...register('address')}
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
    )
}

export default UserContactDetails;