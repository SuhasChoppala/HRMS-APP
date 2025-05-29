'use client';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { empContactsUpdation } from '@/app/slices/employeeManagementSlice';
import { setClickedEmployee } from '@/app/slices/employeeManagementSlice';

function EmpContactDetails() {

    const { getValues, formState: { dirtyFields }, reset, register, handleSubmit } = useForm({ defaultValues: { phoneNumber: '', phoneNumber2: '', email: '', state: '', city: '', address: '' } });

    const dispatch = useDispatch();
    const router = useRouter()

    const { employeeToUpdate } = useSelector(state => state.employeeManagement);

    useEffect(() => {
        if (employeeToUpdate && employeeToUpdate.id) {
            reset(employeeToUpdate.contact_details);
        } else {
            router.push('/admin/employee-management')
        }
    }, [employeeToUpdate]);

    const contactUpdateCTA = async () => {
        const allValues = getValues();
        const allValuesArray = Object.entries(allValues);
        const modifiedFields = allValuesArray.filter(([key]) => dirtyFields[key]);
        const modifiedFieldsObj = Object.fromEntries(modifiedFields);

        if (modifiedFieldsObj && modifiedFields.length > 0) {
            const updEmpContactDetails = {
                ...employeeToUpdate.contact_details,
                ...modifiedFieldsObj
            }
            const isUpdated = await dispatch(empContactsUpdation({ updEmpContactDetails, employeeToUpdate })).unwrap();
            if (isUpdated) {
                dispatch(setClickedEmployee({ ...employeeToUpdate, contact_details: updEmpContactDetails }));
                window.alert('Contact details of employee updated succesfully')
            }
        } else {
            window.alert('Updation failed as no changes were made');
        }
    }

    return (
        <div>
            <form noValidate className="space-y-6" onSubmit={handleSubmit(contactUpdateCTA)}>
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

export default EmpContactDetails;