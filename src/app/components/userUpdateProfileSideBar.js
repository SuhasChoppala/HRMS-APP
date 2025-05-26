'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";

function UserUpdateProfileSidebar() {

    const pathname = usePathname();

    const updateUserItems = [
        { name: "Personal Details", href: "/user/update-profile/user-personal-details" },
        { name: "Contact Details", href: "/user/update-profile/user-contact-details" },
        { name: "Education Qualifications", href: "/user/update-profile/user-educational-details" },
        { name: "Guarantor Details", href: "/user/update-profile/user-guarantor-details" },
        { name: "Job Details", href: "/user/update-profile/user-job-details" },
        { name: "Financial Details", href: "/user/update-profile/user-financial-details" },
    ]
    return (
        <div className="w-1/4 bg-white p-6 rounded-md shadow-sm flex flex-col gap-3">
            {updateUserItems.map((item, index) => (
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

export default UserUpdateProfileSidebar;