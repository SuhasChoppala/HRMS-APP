'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

export default function LeaveManagementLayout({ children }) {

    const leavesNavItems = [
        { name: "Leave History", href: "/admin/leave-management/leave-history" },
        { name: "Leave Recall", href: "/admin/leave-management/leave-recall" },
    ];

    const pathname = usePathname();

    return (
        <div className="p-6 bg-[#E9F1FC] min-h-screen space-y-6">

            <div className="flex items-center gap-3 px-2">
                <Image src="/book-open.png" alt="Book Icon" width={20} height={20} />
                <h2 className="text-lg text-[#1D1D1D] font-medium">Leave Application</h2>
            </div>

            <div className="flex gap-4 px-2">
                {leavesNavItems.map(item => (
                    <Link
                        key={item.name}
                        href={item.href}
                        className={`${pathname === item.href ? 'bg-[#F7C600] text-black' : 'bg-[#253D90] text-white'} text-sm font-semibold px-12 py-4 rounded-xl shadow-md cursor-pointer`}
                    >
                        {item.name}
                    </Link>
                ))}
            </div>


            <div className='px-2'>
                {children}
            </div>

        </div >
    );
}
