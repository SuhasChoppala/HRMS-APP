'use client';
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchAllEmployees, fetchAllAppliedJobs } from "../../slices/adminDashboardSlice";



function AdminDashboard() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllEmployees());
        dispatch(fetchAllAppliedJobs())
    }, [dispatch]);

    const [isAdminActive, setIsAdminActive] = useState(null);

    useEffect(() => {
        const adminStatus = localStorage.getItem("admin");
        if (adminStatus) {
            setIsAdminActive(true);
        } else {
            setIsAdminActive(false);
        }
    }, []);

    const { employeesData, appliedJobs, totalEmployees, totalJobs } = useSelector(state => state.adminDashboard);

    return (
        <div className="flex-1">
            {isAdminActive ? (
                <main className="flex-1 p-6">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3 px-2">
                            <Image src="/admin-dahboard-head.png" alt="Dashboard head Icon" width={20} height={20} />
                            <h2 className="text-xl text-[#1D1D1D] font-medium">Dashboard</h2>
                        </div>
                    </div>


                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-6 px-2 py-6 mb-2">
                        <div className="bg-stone-800 p-4 rounded-xl text-white flex justify-center items-center min-w-[180px] h-20 shadow-lg">
                            <Image src="/admin-jobs-icon.png" alt="Jobs" width={45} height={45} />
                            <div className="ml-5 flex flex-col justify-center">
                                <span className="text-3xl font-bold">{totalJobs}</span>
                                <span className="text-md font-medium">Jobs</span>
                            </div>
                        </div>
                        <div className="bg-yellow-500 p-4 rounded-xl text-white flex justify-center items-center min-w-[180px] h-20 shadow-lg">
                            <Image src="/admin-employee-icon.png" alt="Employees" width={45} height={45} />
                            <div className="ml-5 flex flex-col justify-center">
                                <span className="text-3xl font-bold text-black">{totalEmployees}</span>
                                <span className="text-md font-medium text-black">Employees</span>
                            </div>
                        </div>
                        <div className="bg-blue-900 p-4 rounded-xl text-white flex justify-center items-center min-w-[180px] h-20 shadow-lg">
                            <Image src="/admin-payroll-icon.png" alt="Payrolls" width={45} height={45} />
                            <div className="ml-5 flex flex-col justify-center">
                                <span className="text-3xl font-bold">{totalEmployees}</span>
                                <span className="text-md font-medium">Payrolls</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6 px-2 h-[650px] overflow-hidden">
                        <div className="bg-white p-4 rounded-lg flex flex-col h-full min-h-0">
                            <h2 className="text-md font-semibold text-[#1D1D1D] mb-4">Applied Jobs</h2>

                            <div className="overflow-y-auto flex-1 min-h-0 space-y-6">
                                {employeesData?.map((employee) => {
                                    const employeeJobs = appliedJobs.filter(job => job.employee_id === employee.id);

                                    return (
                                        <div
                                            key={employee.id}
                                            className="bg-[#E3EDF9] p-5 rounded-lg"
                                        >
                                            <div className="text-md font-semibold text-[#1D1D1D]">{employee.name}</div>
                                            <div className="text-xs font-medium text-[#00000099] mb-3">
                                                {employee.job_title} - {employee.department}
                                            </div>
                                            <div className="space-y-2">
                                                {employeeJobs.length > 0 ? (
                                                    employeeJobs.map((job, index) => (
                                                        <div
                                                            key={index}
                                                            className="flex justify-between items-center bg-white py-2 px-3 rounded-lg"
                                                        >
                                                            <div className="flex flex-col">
                                                                <div className="text-md font-semibold text-[#1D1D1D]">{job.job_title}</div>
                                                                <div className="text-xs font-medium text-[#00000099]">{job.company_name}</div>
                                                            </div>
                                                            <div className="text-xs font-medium text-[#00000099]">
                                                                {job.applied_days_ago} days ago
                                                            </div>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div className="text-xs italic text-[#00000099]">No applied jobs</div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>


                        <div className="flex flex-col gap-6 h-full min-h-0">
                            <div className="bg-white p-4 rounded-lg shadow flex flex-col h-1/2 min-h-0">
                                <h2 className="text-md font-semibold text-[#1D1D1D] mb-4">Employees</h2>
                                <div className="overflow-y-auto flex-1 min-h-0 rounded-lg">
                                    <table className="min-w-full text-sm table-auto rounded-lg">
                                        <thead className="bg-[#E3EDF9] text-[#1D1D1D] text-sm">
                                            <tr>
                                                <th className="text-left px-4 py-2">Name</th>
                                                <th className="text-left px-4 py-2">Department</th>
                                                <th className="text-left px-4 py-2">Job Title</th>
                                                <th className="text-left px-4 py-2">Start Date</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-[#00000099]">
                                            {employeesData?.length > 0 ? (
                                                employeesData.map((employee, index) => (
                                                    <tr
                                                        key={employee.id}
                                                        className={index % 2 === 0 ? 'bg-white' : 'bg-[#E3EDF9]'}
                                                    >
                                                        <td className="px-4 py-2 text-black text-sm">{employee.name}</td>
                                                        <td className="px-4 py-2 text-black text-sm">{employee.department}</td>
                                                        <td className="px-4 py-2 text-black text-sm">{employee.job_title}</td>
                                                        <td className="px-4 py-2 text-black text-sm">{employee.start_date}</td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="4" className="text-center text-sm py-4 text-[#00000099]">
                                                        No employees found
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className="bg-white p-4 rounded-lg shadow flex flex-col h-1/2 min-h-0">
                                <h2 className="text-md font-semibold text-[#1D1D1D] mb-4">Payrolls</h2>
                                <div className="overflow-y-auto flex-1 min-h-0">
                                    {employeesData?.map((payroll) => (
                                        <div key={payroll.id} className="p-2 bg-[#E3EDF9] rounded-lg mb-2 flex items-center justify-between">
                                            <Image src={payroll.gender === 'Male' ? `/payroll-emp-avatar.png` : `/payroll-emp-lady-avatar.png`} alt={payroll.name} width={48} height={48} className="rounded-full object-cover" />
                                            <div className="ml-4 flex-1">
                                                <p className="text-md font-semibold text-[#1D1D1D]">{payroll.name}</p>
                                                <p className="text-xs text-[#00000099] font-medium">Salary Amount: ₹ {payroll.salary_amount}</p>
                                            </div>

                                            <span
                                                className={`text-xs font-semibold px-3 py-1 w-24 text-center rounded-full ${payroll.salary_status === 'Paid' ? 'bg-[#3F861E] text-gray-100' : 'bg-[#FFC20E] text-black'
                                                    }`}
                                            >
                                                {payroll.salary_status === 'Paid' ? 'Paid' : 'Processing'}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>


                </main>)

                :

                (
                    <div className="flex justify-center items-center h-screen w-full">
                        <div className="text-center">
                            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
                            <p className="mt-4 text-blue-500 font-normal">Loading...</p>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default AdminDashboard;