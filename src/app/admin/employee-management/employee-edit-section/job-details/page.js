'use client';
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation';

function EmpJobDetails() {
    const { reset, handleSubmit, register, formState: { dirtyFields }, getValues } = useForm({ defaultValues: { job_title: '', department: '', category: '' } });

    const dispatch = useDispatch();

    const { employeeToUpdate } = useSelector(state => state.employeeManagement);

    const router = useRouter();

    useEffect(() => {
        if (employeeToUpdate && employeeToUpdate.id) {
            reset(employeeToUpdate);
        } else {
            router.push('/admin/employee-management');
        }
    }, []);
    return (
        <div className="flex items-center justify-center p-4">
            <form noValidate className="space-y-6" onSubmit={handleSubmit()}>
                <div className="grid grid-cols-1 gap-4">
                    <div>
                        <label className="block text-sm font-semibold text-black mb-2 text-center">Job Role</label>
                        <input
                            {...register('job_title')}
                            type="text"
                            className="w-full p-3 rounded-md bg-[#E3EDF9] text-[#000000B2] text-sm outline-none text-center"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-semibold text-black mb-2 text-center">Department</label>
                        <input
                            {...register('department')}
                            type="text"
                            className="w-full p-3 rounded-md bg-[#E3EDF9] text-[#000000B2] text-sm outline-none text-center"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-black mb-2 text-center">Category</label>
                        <input
                            {...register('category')}
                            type="text"
                            className="w-full p-3 rounded-md bg-[#E3EDF9] text-[#000000B2] text-sm outline-none text-center"
                        />
                    </div>
                </div>

                <div className="text-center">
                    <button
                        type="submit"
                        className="bg-[#3F861E] text-white font-semibold py-2 px-10 rounded-md shadow-md text-sm hover:bg-[#2e6713] cursor-pointer"
                    >
                        Update
                    </button>
                </div>
            </form>
        </div>
    )
}

export default EmpJobDetails;