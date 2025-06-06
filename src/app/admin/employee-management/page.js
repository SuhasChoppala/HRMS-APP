'use client';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { getAllEmployees } from "@/app/slices/employeeManagementSlice";
import Link from "next/link";
import { setClickedEmployee } from "@/app/slices/employeeManagementSlice";


function EmployeeManagement() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllEmployees());
    }, [dispatch])

    const { allEmployees } = useSelector(state => state.employeeManagement);

    const setEmployeeCTA = (clickedEmployee) => {
        dispatch(setClickedEmployee(clickedEmployee));
    }

    return (
        <div className="p-6 bg-[#E9F1FC] min-h-screen space-y-6">

            <div className="flex items-center gap-3 px-2">
                <Image src="/employee-management-black.png" alt="Employee manage black Icon" width={20} height={20} />
                <h2 className="text-lg text-[#1D1D1D] font-medium">Employee Management</h2>
            </div>

            <div className='bg-white p-5 rounded-xl'>

                <div className='pb-2'>
                    <h3 className="text-md text-[#1D1D1D] font-semibold mb-2">Employee History</h3>
                </div>

                <div className="overflow-x-auto rounded-lg">
                    <table className="min-w-full text-sm">
                        <thead className="bg-[#E3EDF9] text-[#1D1D1D] text-sm">
                            <tr>
                                <th className="text-center px-4 py-4">Name</th>
                                <th className="text-center px-4 py-4">Department</th>
                                <th className="text-center px-4 py-4">Job Title</th>
                                <th className="text-center px-4 py-4">Start Date</th>
                                <th className="text-center px-4 py-4">Category</th>
                                <th className="text-center px-4 py-4">Gender</th>
                                <th className="text-center px-4 py-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allEmployees && allEmployees.length > 0 ? (
                                allEmployees.map((employee, index) => (
                                    <tr
                                        key={index}
                                        className={index % 2 === 0 ? 'bg-white' : 'bg-[#E3EDF9]'}
                                    >
                                        <td className="px-4 py-4 text-black text-sm text-center">{employee.name}</td>
                                        <td className="px-4 py-4 text-black text-sm text-center">{employee.department}</td>
                                        <td className="px-4 py-4 text-black text-sm text-center">{employee.job_title}</td>
                                        <td className="px-4 py-4 text-black text-sm text-center">{employee.start_date}</td>
                                        <td className="px-4 py-4 text-black text-sm text-center">{employee.category}</td>
                                        <td className="px-4 py-4 text-black text-sm text-center">{employee.gender}</td>
                                        <td className="px-4 py-4 text-center">
                                            <Link href={'/admin/employee-management/employee-edit-section/personal-details/'}>
                                                <button
                                                    onClick={() => setEmployeeCTA(employee)}
                                                    className="bg-[#253D90] hover:bg-[#1e3276] transition-colors text-white text-sm px-6 py-1 rounded cursor-pointer"
                                                >
                                                    Edit
                                                </button>
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" className="text-center text-sm py-4 text-gray-500">
                                        No Employee history found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div >
    )
}

export default EmployeeManagement;