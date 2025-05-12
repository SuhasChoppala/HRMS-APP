'use client';
import Image from "next/image";
import { useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";

function AdminSidebar() {

    const [loggedInAdmin, setLoggedInAdmin] = useState(null);

    useEffect(() => {
        const storedAdmin = localStorage.getItem("admin");
        if (storedAdmin) {
            setLoggedInAdmin(JSON.parse(storedAdmin));
        }
    }, []);

    const currentPath = usePathname();

    const menuItems = [
        { name: "Dashboard", href: "/admin/admin-dashboard", mainRoute: "/admin/admin-dashboard", icon: "/admin-dashboard-icon.png" },
        { name: "Leave Management", href: "/admin/leave-management/leave-history", mainRoute: "/admin/leave-management", icon: "/leave-management-icon.png" },
        { name: "Employee Management", href: "/admin/employee-management", mainRoute: "/admin/employee-management", icon: "/employee-management-icon.png" },
        { name: "Performance Management", href: "/admin/performance-management", mainRoute: "/admin/performance-management", icon: "/performance-management-icon.png" },
    ];


    return (
        <>
            {loggedInAdmin ? (
                <aside className="w-80 bg-[#121C3E] text-white p-5 flex flex-col">
                    <div className="flex justify-center mb-10">
                        <Image src="/kris-admin-logo.png" alt="Kris Logo" width={150} height={40} />
                    </div>
                    <div className="mb-6 flex items-center space-x-3">
                        <div className="border border-white p-0.5 rounded-full">
                            <div className="w-12 h-12 bg-gray-400 rounded-full overflow-hidden">
                                <Image
                                    src="/admin-avatar.png"
                                    alt="Admin Avatar"
                                    width={60}
                                    height={60}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                        </div>
                        <div>
                            <p className="text-lg font-semibold">{loggedInAdmin?.name || "Loading..."}</p>
                            <p className="text-sm">Admin</p>
                        </div>
                    </div>

                    <nav className="flex-1">
                        <ul>
                            {menuItems.map((item) => (
                                <Link key={item.href} href={item.href}>
                                    <li
                                        className={`p-3 flex items-center space-x-3 rounded-lg ${currentPath.startsWith(item.mainRoute) ? "bg-yellow-500" : ""
                                            }`}
                                    >
                                        <Image src={item.icon} alt={item.name} width={20} height={20} />
                                        <span>{item.name}</span>
                                    </li>
                                </Link>
                            ))}
                        </ul>
                    </nav>

                    <button
                        className="bg-red-600 p-3 rounded-lg flex items-center space-x-2 justify-center cursor-pointer hover:bg-red-700"
                        onClick={() => {
                            localStorage.removeItem("admin");
                            window.location.href = "/admin/login-admin";
                        }}
                    >
                        <Image src="/admin-logout-icon.png" alt="Logout" width={20} height={20} />
                        <span>Log Out</span>
                    </button>
                </aside>
            ) : (
                <div></div>
            )}
        </>
    )
}

export default AdminSidebar;