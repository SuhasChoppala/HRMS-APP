'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

function EmpPersonalDetails() {

    const dispatch = useDispatch();

    const router = useRouter()

    const { employeeToUpdate } = useSelector(state => state.employeeManagement);

    const { register, handleSubmit, reset, getValues, formState: { dirtyFields } } = useForm({ defaultValues: { name: '', department: '', job_title: '', category: '' } });

    useEffect(() => {
        if (employeeToUpdate && employeeToUpdate.id) {
            reset(employeeToUpdate);
        } else {
            router.push('/admin/employee-management')
        }
    }, [])

    return (
        <form noValidate onSubmit={handleSubmit()} className="flex items-center justify-center p-4">
            <div className="relative w-full rounded-xl bg-white p-6 text-center">

                <div className="flex justify-center">
                    {employeeToUpdate.gender === 'Male' ? (
                        <Image
                            src="/user-profile-card.png"
                            alt="Avatar"
                            width={96}
                            height={96}
                            className="rounded-full bg-yellow-400"
                        />
                    ) : (
                        <Image
                            src="/lady-avatar-emp.png"
                            alt="Avatar"
                            width={96}
                            height={96}
                            className="rounded-full bg-yellow-400"
                        />
                    )}
                </div>

                <div className="mt-4 text-sm font-semibold text-black">Employee Name</div>
                <input
                    {...register('name')}
                    className="mt-2 p-3 rounded-md bg-[#E3EDF9] text-[#000000B2] text-sm outline-none text-center"
                />

                <div className="mt-0 flex justify-around text-left rounded-xl p-4 max-w-3xl mx-auto">
                    <div className="text-center mx-4">
                        <div className="mt-4 text-sm font-semibold text-black">Department</div>
                        <input
                            {...register('department')}
                            className="mt-2 p-3 rounded-md bg-[#E3EDF9] text-[#000000B2] text-sm outline-none text-center"
                        />
                    </div>
                    <div className="text-center mx-4">
                        <div className="mt-4 text-sm font-semibold text-black">Job Title</div>
                        <input
                            {...register('job_title')}
                            className="mt-2 p-3 rounded-md bg-[#E3EDF9] text-[#000000B2] text-sm outline-none text-center"
                        />
                    </div>
                    <div className="text-center mx-4">
                        <div className="mt-4 text-sm font-semibold text-black">Job Category</div>
                        <input
                            {...register('category')}
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
    )
}

export default EmpPersonalDetails;