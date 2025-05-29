'use client';
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import { setClickedEducRecord } from "@/app/slices/employeeManagementSlice";
import { useEffect } from "react";
import { useRouter } from 'next/navigation';

function EmpEducationDetails() {

    const { employeeToUpdate } = useSelector(state => state.employeeManagement);

    const router = useRouter();

    useEffect(() => {
        if (!employeeToUpdate?.educational_qualifications?.academic_records || !employeeToUpdate?.educational_qualifications?.professional_qualifications) {
            router.push('/admin/employee-management');
        }
    }, [employeeToUpdate]);

    const dispatch = useDispatch();

    const handleRecordCTA = (recordToUpdate, type) => {
        dispatch(setClickedEducRecord({ recordToUpdate, type }))
    }

    return (
        <div className="space-y-8 text-black">
            {/* Academic Records */}
            <div>
                <h3 className="text-base font-semibold mb-4">Academic Records</h3>

                {employeeToUpdate?.educational_qualifications?.academic_records.map((academicRecord, index) => (
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
                        <Link href={"/admin/employee-management/employee-edit-section/education-details/emp-academic-form"} onClick={() => handleRecordCTA(academicRecord, "academic")}>
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

                {employeeToUpdate?.educational_qualifications?.professional_qualifications.map((professionalRecord, index) => (
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
                        <Link href={"/admin/employee-management/employee-edit-section/education-details/emp-professional-form"} onClick={() => handleRecordCTA(professionalRecord, "professional")} >
                            <div className="flex flex-col items-center text-xs text-[#000000B2] cursor-pointer">
                                <Image src="/user-details-edit.png" alt="Edit" width={16} height={16} className="mb-1" />
                                <span>Edit</span>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div >
    )
}

export default EmpEducationDetails;