'use client';

import Link from "next/link";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getLoggedInUser } from "@/services/authServices";
import { setClickedGuarantor } from "@/app/slices/userUpdateProfileSlice";

function UserGuarantorDetails() {

    const [loggedInUser, setLoggedInUser] = useState(null);

    useEffect(() => {
        const user = getLoggedInUser();
        setLoggedInUser(user);
    }, []);

    const dispatch = useDispatch();

    const handleGuarantorCTA = (clickedGuarantor) => {
        dispatch(setClickedGuarantor(clickedGuarantor));
    }

    return (
        <div>
            <h3 className="text-base font-semibold mb-4">Guarantor Details</h3>

            {loggedInUser?.guarantor_details.map((guarantor, index) => (
                <div
                    key={index}
                    className="bg-[#E3EDF9] p-4 rounded-lg flex justify-between items-start"
                >
                    <div>
                        <p className="font-semibold text-sm">{guarantor.guarantors_name}</p>
                        <p className="text-[#000000B2] text-xs mt-1">
                            {guarantor.occupation}, {guarantor.mobile_number}
                        </p>
                    </div>
                    <Link
                        href="/user/update-profile/user-guarantor-details/guarantor-form"
                        onClick={() => handleGuarantorCTA(guarantor)}
                    >
                        <div className="flex flex-col items-center text-xs text-[#000000B2] cursor-pointer">
                            <Image
                                src="/user-details-edit.png"
                                alt="Edit"
                                width={16}
                                height={16}
                                className="mb-1"
                            />
                            <span>Edit</span>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    );
}

export default UserGuarantorDetails;
