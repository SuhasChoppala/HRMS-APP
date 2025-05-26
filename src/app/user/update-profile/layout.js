'use client';

import UserUpdateProfileSidebar from '@/app/components/userUpdateProfileSideBar';
import React from 'react';

function UpdateProfileLayout({ children }) {
    return (
        <div className="bg-[#E3EDF9] min-h-screen p-6 text-black">

            <div className="bg-white px-6 py-4 mb-6 rounded-md">
                <h2 className="text-md text-[#1D1D1D]">Dashboard &gt; Update Profile</h2>
            </div>

            <div className="flex gap-6">

                <UserUpdateProfileSidebar />

                <div className="w-3/4 bg-white p-6 rounded-md shadow-sm">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default UpdateProfileLayout;
