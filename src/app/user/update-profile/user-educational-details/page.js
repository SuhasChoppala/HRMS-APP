"use client";

import Image from "next/image";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getLoggedInUser } from "@/services/authServices";
import { setClickedRecord } from "@/app/slices/userUpdateProfileSlice";

function UserEducationalDetails() {

    const [loggedInUser, setLoggedInUser] = useState(null);

    useEffect(() => {
        const user = getLoggedInUser();
        setLoggedInUser(user);
    }, []);

    const dispatch = useDispatch();

    const acadRecordUpdate = (clickedRecord, type) => {
        dispatch(setClickedRecord({ clickedRecord, type }))
    }

    const profRecordUpdate = (clickedRecord, type) => {
        dispatch(setClickedRecord({ clickedRecord, type }))
    }


    return (
        <div className="space-y-8 text-black">
            {/* Academic Records */}
            <div>
                <h3 className="text-base font-semibold mb-4">Academic Records</h3>

                {loggedInUser?.educational_qualifications.academic_records.map((academicRecord, index) => (
                    <div
                        key={index}
                        className="bg-[#E3EDF9] p-4 rounded-lg flex justify-between items-start"
                    >
                        <div>
                            <p className="font-semibold text-sm">{academicRecord.institution_name}</p>
                            <p className="text-[#000000B2] text-xs mt-1">
                                {academicRecord.degree}, {academicRecord.enroll_date} - {academicRecord.passout_date}
                            </p>
                        </div>
                        <Link href={"/user/update-profile/user-educational-details/academic-form"} onClick={() => acadRecordUpdate(academicRecord, "academic")}>
                            <div className="flex flex-col items-center text-xs text-[#000000B2] cursor-pointer">
                                <Image src="/user-details-edit.png" alt="Edit" width={16} height={16} className="mb-1" />
                                <span>Edit</span>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>

            {/* Professional Qualifications */}
            <div>
                <h3 className="text-base font-semibold mb-4">Professional Qualifications</h3>

                {loggedInUser?.educational_qualifications.professional_qualifications.map((professionalRecord, index) => (
                    <div
                        key={index}
                        className="bg-[#E3EDF9] p-4 rounded-lg mb-4 flex justify-between items-start"
                    >
                        <div>
                            <p className="font-semibold text-sm">{professionalRecord.company_name}</p>
                            <p className="text-[#000000B2] text-xs mt-1">
                                at {professionalRecord.location}, <span className="font-semibold">{professionalRecord.start_date} - {professionalRecord.end_date}</span>
                            </p>
                        </div>
                        <Link href={"/user/update-profile/user-educational-details/professional-form"} onClick={() => profRecordUpdate(professionalRecord, "professional")}>
                            <div className="flex flex-col items-center text-xs text-[#000000B2] cursor-pointer">
                                <Image src="/user-details-edit.png" alt="Edit" width={16} height={16} className="mb-1" />
                                <span>Edit</span>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default UserEducationalDetails;
