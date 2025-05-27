'use client';

import EmployeeEditSidebar from '@/app/components/employeeEditSideBar';
import React from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

function EmployeeEditLayout({ children }) {

    const { employeeToUpdate } = useSelector(state => state.employeeManagement);

    return (
        <div className="bg-[#E3EDF9] min-h-screen p-6 text-black">

            <div className="bg-white px-6 py-4 mb-6 rounded-md">
                <h2 className="text-md text-[#1D1D1D]">Employee Management &gt; Employee Profile &gt; {employeeToUpdate.name} </h2>
            </div>

            <div className="flex gap-6">

                <EmployeeEditSidebar />

                <div className="w-3/4 bg-white p-6 rounded-md shadow-sm">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default EmployeeEditLayout;
