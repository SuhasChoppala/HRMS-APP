'use client'

import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';

function UserNotificationsModal({ handleDialogClose, isMessagesModalOpen, userMessages }) {
    return (
        <>
            <Dialog open={isMessagesModalOpen} onClose={handleDialogClose} className="relative z-10">
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
                />
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <DialogPanel
                            transition
                            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                        >
                            <div className="flex justify-between items-center p-4 pb-0">
                                <DialogTitle as="h3" className="font-semibold text-lg text-stone-700">
                                    Messages
                                </DialogTitle>
                                <button className="text-gray-500" onClick={handleDialogClose}>
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
                            <div className="bg-white px-4 pb-4 sm:p-6 sm:pb-4">
                                {userMessages?.map((user, index) => (
                                    <div key={index} className="bg-[#E3EDF9] p-4 mb-3 rounded-md">
                                        <p className="font-medium text-[#545559]">{user.message}</p>
                                    </div>
                                ))}
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    )
}

export default UserNotificationsModal;