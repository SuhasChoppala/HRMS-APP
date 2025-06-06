'use client';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the form component with no SSR
const LeaveApplicationForm = dynamic(() => import('./LeaveApplicationForm'), {
    ssr: false,
});

function ApplyLeave() {
    return (
        <Suspense fallback={
            <div className="p-6 bg-[#E3EDF9] min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-lg text-gray-600">Loading leave application form...</p>
                </div>
            </div>
        }>
            <LeaveApplicationForm />
        </Suspense>
    );
}

export default ApplyLeave;
