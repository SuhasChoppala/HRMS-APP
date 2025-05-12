'use client'

import Image from 'next/image';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'

function UserProfileModal({ handleProfileClose, isProfileModalOpen, loggedInUser }) {

    return (
        <Dialog open={isProfileModalOpen} onClose={handleProfileClose} className="relative z-10">
            <DialogBackdrop className="fixed inset-0 bg-gray-500/75" />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4">
                    <DialogPanel className="relative w-full max-w-md transform overflow-hidden rounded-xl bg-white p-6 text-center shadow-xl">
                        <div className="absolute top-4 right-4">
                            <button className="text-gray-500" onClick={handleProfileClose}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                    cursor="pointer"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>

                        <div className="flex justify-center">
                            <Image src="/user-profile-card.png" alt="Avatar" width={96} height={96} className="rounded-full bg-yellow-400" />
                        </div>

                        <div className="mt-4 text-sm text-gray-600">Employee Name</div>
                        <div className="text-lg font-semibold text-black">{loggedInUser?.name}</div>

                        <div className="mt-4 text-sm text-gray-600">Department</div>
                        <div className="text-lg font-semibold text-black">{loggedInUser?.department}</div>

                        <div className="mt-6 flex justify-around text-left">
                            <div>
                                <div className="text-xs text-gray-500 text-center">Job Title</div>
                                <div className="text-base font-semibold">{loggedInUser?.job_title}</div>
                            </div>
                            <div>
                                <div className="text-xs text-gray-500 text-center">Job Category</div>
                                <div className="text-base font-semibold text-center">{loggedInUser?.category}</div>
                            </div>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}

export default UserProfileModal;