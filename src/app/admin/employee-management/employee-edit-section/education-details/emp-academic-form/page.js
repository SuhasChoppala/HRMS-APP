'use client';
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation';
import { empAcadRecordUpdation } from "@/app/slices/employeeManagementSlice";
import { setClickedEmployee } from "@/app/slices/employeeManagementSlice";

function EmpAcademicForm() {

    const { empEducRecordToUpdate, employeeToUpdate } = useSelector(state => state.employeeManagement);

    const router = useRouter();

    const dispatch = useDispatch();

    const { reset, getValues, formState: { dirtyFields }, handleSubmit, register } = useForm({ defaultValues: { institution_name: '', degree: '', department: '', enroll_date: '', passout_date: '' } })

    useEffect(() => {
        if (empEducRecordToUpdate.type === 'academic' && empEducRecordToUpdate.recordToUpdate.id) {
            reset(empEducRecordToUpdate.recordToUpdate);
        } else {
            router.push('/admin/employee-management/employee-edit-section/education-details');
        }
    }, [])

    const updateAcadCTA = async () => {
        const empID = employeeToUpdate.id;
        const allValues = getValues();
        const allValuesArray = Object.entries(allValues);
        const modifiedFields = allValuesArray.filter(([key]) => dirtyFields[key]);
        const modifiedFieldsObj = Object.fromEntries(modifiedFields);

        if (modifiedFieldsObj && modifiedFields.length > 0) {
            const updatedAcadRecord = {
                ...empEducRecordToUpdate.recordToUpdate,
                ...modifiedFieldsObj
            }

            const isUpdated = await dispatch(empAcadRecordUpdation({ updatedAcadRecord, empID })).unwrap();
            if (isUpdated) {

                const updatedAcadObjs = employeeToUpdate.educational_qualifications.academic_records.map(record => record.id === updatedAcadRecord.id ? updatedAcadRecord : record);

                const updatedEmployee = {
                    ...employeeToUpdate,
                    educational_qualifications: {
                        ...employeeToUpdate.educational_qualifications,
                        academic_records: updatedAcadObjs
                    }
                }

                dispatch(setClickedEmployee(updatedEmployee));
                window.alert('Academic Record updated Successfully');
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
                <h3 className="text-base font-semibold">Academic Details</h3>
                <Link
                    href="/admin/employee-management/employee-edit-section/education-details"
                    className="text-sm text-blue-600 hover:underline font-medium flex items-center gap-1"
                >
                    <FaArrowLeft className="text-xs" />
                    Back
                </Link>
            </div>

            <form noValidate className="space-y-6" onSubmit={handleSubmit(updateAcadCTA)}>
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
    )
}

export default EmpAcademicForm;