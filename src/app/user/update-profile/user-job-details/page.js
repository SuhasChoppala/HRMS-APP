'use client';
import { useEffect, useState } from "react";
import { getLoggedInUser } from "@/services/authServices";

function UserJobDetails() {

    const [loggedInUser, setLoggedInUser] = useState(null);

    useEffect(() => {
        const user = getLoggedInUser();
        setLoggedInUser(user);
    }, []);

    return (
        <div className="flex items-center justify-center p-4">
            <div className="relative w-full rounded-xl bg-white p-6 text-center max-w-2xl">
                <div className="mb-8">
                    <p className="text-sm font-semibold text-black">JOB ROLE</p>
                    <h2 className="mt-2 p-3 rounded-md bg-[#E3EDF9] text-[#000000B2] text-sm text-center">
                        {loggedInUser?.job_title}
                    </h2>
                </div>

                <div className="grid grid-cols-2 gap-4 px-6">
                    <div>
                        <p className="text-sm font-semibold text-black text-center">Department</p>
                        <h3 className="mt-2 p-3 rounded-md bg-[#E3EDF9] text-[#000000B2] text-sm text-center">
                            {loggedInUser?.department}
                        </h3>
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-black text-center">Category</p>
                        <h3 className="mt-2 p-3 rounded-md bg-[#E3EDF9] text-[#000000B2] text-sm text-center">
                            {loggedInUser?.category}
                        </h3>
                    </div>
                </div>

                <p className="mt-6 text-sm font-semibold text-red-500 text-center">
                    This section is not editable.
                </p>
            </div>
        </div>
    );
}

export default UserJobDetails;
