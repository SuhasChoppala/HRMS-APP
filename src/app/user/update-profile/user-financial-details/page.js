'use client';

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getLoggedInUser } from "@/services/authServices";
import { setClickedFinRecord } from "@/app/slices/userUpdateProfileSlice";

function UserFinancialDetails() {

    const [loggedInUser, setLoggedInUser] = useState(null);

    useEffect(() => {
        const user = getLoggedInUser();
        setLoggedInUser(user);
    }, []);

    const dispatch = useDispatch();

    const handleFinRecrodCTA = (clickedFinRecord) => {
        dispatch(setClickedFinRecord(clickedFinRecord));
    }

    return (
        <div>
            <h3 className="text-base font-semibold mb-4">Financial Details</h3>

            {loggedInUser?.financial_details.map((financialRecord, index) => (
                <div
                    key={index}
                    className="bg-[#E3EDF9] p-4 rounded-lg flex justify-between items-start"
                >
                    <div>
                        <p className="font-semibold text-sm">{financialRecord.bank_name}</p>
                        <p className="text-[#000000B2] text-xs mt-1">
                            {financialRecord.account_number}, {financialRecord.account_holder_name}
                        </p>
                    </div>
                    <Link
                        href="/user/update-profile/user-financial-details/financial-form"
                        onClick={() => handleFinRecrodCTA(financialRecord)}
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
    )
}

export default UserFinancialDetails;