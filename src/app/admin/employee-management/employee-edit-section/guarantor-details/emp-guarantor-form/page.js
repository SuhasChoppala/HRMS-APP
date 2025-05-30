'use client';
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation';
import { empGuarantorUpdation } from "@/app/slices/employeeManagementSlice";
import { setClickedEmployee } from "@/app/slices/employeeManagementSlice";

function EmpGuarantorForm() {

    const { employeeToUpdate, empGuarantorToUpdate } = useSelector(state => state.employeeManagement);

    const { reset, register, handleSubmit, formState: { dirtyFields }, getValues } = useForm({ defaultValues: { guarantors_name: '', occupation: '', mobile_number: '' } })

    const router = useRouter();

    const dispatch = useDispatch();

    useEffect(() => {
        if (empGuarantorToUpdate && empGuarantorToUpdate.id) {
            reset(empGuarantorToUpdate);
        } else {
            router.push('/admin/employee-management/employee-edit-section/guarantor-details')
        }
    }, [])

    const empGuarantorUpdateCTA = async () => {
        const empID = employeeToUpdate.id;
        const allValues = getValues();
        const allValuesArray = Object.entries(allValues);
        const modifiedFields = allValuesArray.filter(([key]) => dirtyFields[key]);
        const modifiedFieldsObj = Object.fromEntries(modifiedFields);

        if (modifiedFieldsObj && modifiedFields.length > 0) {
            const updatedGuarantor = {
                ...empGuarantorToUpdate,
                ...modifiedFieldsObj
            }
            const isGuarObjUpdated = await dispatch(empGuarantorUpdation({ empID, updatedGuarantor })).unwrap();
            if (isGuarObjUpdated) {
                const updatedGuarantorArray = employeeToUpdate.guarantor_details.map(guar =>
                    guar.id === updatedGuarantor.id ? updatedGuarantor : guar
                );

                const updatedEmpObj = {
                    ...employeeToUpdate,
                    guarantor_details: updatedGuarantorArray
                };

                dispatch(setClickedEmployee(updatedEmpObj));
                window.alert('Guarantor details updated Successfully');
                router.push('/admin/employee-management/employee-edit-section/guarantor-details');
            }
        } else {
            window.alert('Updatoin failed as no changes were made');
            router.push('/admin/employee-management/employee-edit-section/guarantor-details')
        }
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold">Guarantor Details</h3>
                <Link
                    href="/admin/employee-management/employee-edit-section/guarantor-details"
                    className="text-sm text-blue-600 hover:underline font-medium flex items-center gap-1"
                >
                    <FaArrowLeft className="text-xs" />
                    Back
                </Link>
            </div>

            <form noValidate className="space-y-6" onSubmit={handleSubmit(empGuarantorUpdateCTA)}>
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
    )
}

export default EmpGuarantorForm;