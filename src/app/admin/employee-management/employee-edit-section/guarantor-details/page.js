'use client';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { setClickedGuarantorRecord } from '@/app/slices/employeeManagementSlice';

function EmpGuarantorDetails() {

    const dispatch = useDispatch();

    const { employeeToUpdate } = useSelector(state => state.employeeManagement);

    const router = useRouter();

    useEffect(() => {
        if (!employeeToUpdate?.guarantor_details) {
            router.push('/admin/employee-management');
        }
    }, [employeeToUpdate, router]);

    const setGuarantorCTA = (clickedGuarantor) => {
        dispatch(setClickedGuarantorRecord(clickedGuarantor));
    }

    return (
        <div>
            <h3 className="text-base font-semibold mb-4">Guarantor Details</h3>

            {employeeToUpdate?.guarantor_details?.length > 0 ? (
                employeeToUpdate.guarantor_details.map((guarantor, index) => (
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
                            href="/admin/employee-management/employee-edit-section/guarantor-details/emp-guarantor-form"
                            onClick={() => setGuarantorCTA(guarantor)}
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
                ))
            ) : (
                <p className="text-sm text-gray-500">No guarantor details available.</p>
            )}
        </div>
    )
}

export default EmpGuarantorDetails;