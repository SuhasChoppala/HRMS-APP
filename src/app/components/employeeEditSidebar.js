'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";

function EmployeeEditSidebar() {

    const pathname = usePathname();

    const updateEmployeeItems = [
        { name: "Personal Details", href: "/admin/employee-management/employee-edit-section/personal-details" },
        { name: "Contact Details", href: "/admin/employee-management/employee-edit-section/contact-details" },
        { name: "Education Qualifications", href: "/admin/employee-management/employee-edit-section/education-details" },
        { name: "Guarantor Details", href: "/admin/employee-management/employee-edit-section/guarantor-details" },
        { name: "Job Details", href: "/admin/employee-management/employee-edit-section/job-details" },
        { name: "Financial Details", href: "/admin/employee-management/employee-edit-section/financial-details" },
    ]
    return (
        <div className="w-1/4 bg-white p-6 rounded-md shadow-sm flex flex-col gap-3">
            {updateEmployeeItems.map((item, index) => (
                <Link
                    key={index}
                    href={item.href}
                    className={`py-4 rounded-lg text-sm font-medium bg-[#E3EDF9] text-black text-center ${pathname.startsWith(item.href) ? 'bg-[#FFC20E]' : ''}`}
                >
                    {item.name}
                </Link>
            ))}
        </div>
    )
}

export default EmployeeEditSidebar;