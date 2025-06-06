'use client';
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation';
import { empProfRecordUpdation } from "@/app/slices/employeeManagementSlice";
import { setClickedEmployee } from "@/app/slices/employeeManagementSlice";

function EmpProfessionalForm() {

    const { reset, register, getValues, formState: { dirtyFields }, handleSubmit } = useForm({ defaultValues: { company_name: '', location: '', start_date: '', end_date: '' } })

    const router = useRouter();

    const dispatch = useDispatch();

    const { empEducRecordToUpdate, employeeToUpdate } = useSelector(state => state.employeeManagement);

    useEffect(() => {
        if (empEducRecordToUpdate.type === 'professional' && empEducRecordToUpdate.recordToUpdate.id) {
            reset(empEducRecordToUpdate.recordToUpdate)
        } else {
            router.push('/admin/employee-management/employee-edit-section/education-details');
        }
    }, [empEducRecordToUpdate.type, empEducRecordToUpdate.recordToUpdate, reset, router]);

    const profUpdateCTA = async () => {
        const employeeID = employeeToUpdate.id;
        const allValues = getValues();
        const allValuesArray = Object.entries(allValues);
        const modifiedFields = allValuesArray.filter(([key]) => dirtyFields[key]);
        const modifiedFieldsObj = Object.fromEntries(modifiedFields);

        if (modifiedFieldsObj && modifiedFields.length > 0) {
            const updatedProfRecord = {
                ...empEducRecordToUpdate.recordToUpdate,
                ...modifiedFieldsObj

            }
            const isProfUpdated = await dispatch(empProfRecordUpdation({ updatedProfRecord, employeeID })).unwrap();
            if (isProfUpdated) {

                const updatedProfObjs = employeeToUpdate.educational_qualifications.professional_qualifications.map(record => record.id === updatedProfRecord.id ? updatedProfRecord : record);

                const updatedFullEmp = {
                    ...employeeToUpdate,
                    educational_qualifications: {
                        ...employeeToUpdate.educational_qualifications,
                        professional_qualifications: updatedProfObjs
                    }
                }

                dispatch(setClickedEmployee(updatedFullEmp));
                window.alert('Professional Record updated Successfully');
                router.push('/admin/employee-management/employee-edit-section/education-details');
            }
        } else {
            window.alert('Updation failed as no changes are made');
            router.push('/admin/employee-management/employee-edit-section/education-details');
        }
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold">Professional Details</h3>
                <Link
                    href="/admin/employee-management/employee-edit-section/education-details"
                    className="text-sm text-blue-600 hover:underline font-medium flex items-center gap-1"
                >
                    <FaArrowLeft className="text-xs" />
                    Back
                </Link>
            </div>

            <form noValidate className="space-y-6" onSubmit={handleSubmit(profUpdateCTA)}>
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
    )
}

export default EmpProfessionalForm;