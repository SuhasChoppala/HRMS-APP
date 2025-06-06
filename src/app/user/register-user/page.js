'use client';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { fetchingAllEmployees, userResgistration } from '../../slices/userRegisterSlice';
import { useDispatch } from 'react-redux';

function UserRegister() {

    const { register, watch, handleSubmit, reset, formState: { errors } } = useForm();

    const route = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchingAllEmployees());
    }, [dispatch])

    const registerUserCTA = async (data) => {
        try {
            const isRegisterSuccess = await dispatch(userResgistration(data)).unwrap();
            if (isRegisterSuccess.success) {
                window.alert('Register Successfull, Please Login');
                reset();
                route.push('/user/login-user');
            }
        } catch (error) {
            console.log(error)
            console.log('Registration Failed:', error);
        }
    }

    return (
        <div className="flex h-screen w-full">

            <div className="relative w-1/2 h-full flex items-center justify-center">
                <div className="absolute inset-0 bg-[url('/register-pic.jpg')] bg-cover bg-center"></div>
                <div className="absolute inset-0 bg-[#0e1f63]/85"></div>
                <div className="relative z-10 text-center px-12">
                    <h1 className="text-5xl font-bold text-white">HR Management Platform</h1>
                    <div className="w-full flex justify-center">
                        <div className="w-[80%] h-1 bg-white mt-4"></div>
                    </div>
                    <h2 className="text-3xl text-white mt-10">
                        Manage all employees, payrolls, and other human resource operations.
                    </h2>
                </div>
            </div>


            <div className="w-1/2 flex items-center justify-center bg-white p-8">
                <div className="max-w-xl w-full">
                    <h2 className="text-3xl font-bold text-[#233987]">Welcome to KRIS</h2>
                    <p className="text-xl text-gray-500 mb-6 mt-3">Register your account</p>

                    <form noValidate className="space-y-6" onSubmit={handleSubmit(registerUserCTA)}>
                        {/* Name & Email */}
                        <div className="grid grid-cols-2 gap-x-10 gap-y-4">
                            <div>
                                <label className="block mb-1 text-[#233987] font-semibold">Name</label>
                                <input {...register('name', { required: true })} type="text" className="px-3 py-2 rounded text-gray-700 w-full border border-stone-400 focus:outline-none focus:ring-2 focus:ring-blue-900" />
                                {errors.name?.type === 'required' && <p className="text-xs text-red-500 mt-2">This field is required</p>}
                            </div>

                            <div>
                                <label className="block mb-1 text-[#233987] font-semibold">Email</label>
                                <input {...register('email', { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })} type="email" className="px-3 py-2 rounded text-gray-700 w-full border border-stone-400 focus:outline-none focus:ring-2 focus:ring-blue-900" />
                                {errors.email?.type === 'required' && <p className="text-xs text-red-500 mt-2">This field is required</p>}
                                {errors.email?.type === 'pattern' && <p className="text-xs text-red-500 mt-2">Please enter valid email address</p>}
                            </div>
                        </div>

                        {/* Password & Phone Number */}
                        <div className="grid grid-cols-2 gap-x-10 gap-y-4">
                            <div>
                                <label className="block mb-1 text-[#233987] font-semibold">Password</label>
                                <input type="password" {...register('password', { required: true, pattern: /^[a-zA-Z0-9!@#$%^&*]{6,16}$/ })} className="px-3 py-2 rounded text-gray-700 w-full border border-stone-400 focus:outline-none focus:ring-2 focus:ring-blue-900" />
                                {errors.password?.type === 'required' && <p className="text-xs text-red-500 mt-2">This field is required</p>}
                                {errors.password?.type === 'pattern' && <p className="text-xs text-red-500 mt-2">Please enter valid password</p>}
                            </div>
                            <div>
                                <label className="block mb-1 text-[#233987] font-semibold">Phone Number</label>
                                <input {...register('phone_number', { required: true, pattern: /^(\+?\d{1,2}\s?)?(\(?\d{3}\)?)[-.\s]?\d{3}[-.\s]?\d{4}$/ })} type="tel" className="px-3 py-2 rounded text-gray-700 w-full border border-stone-400 focus:outline-none focus:ring-2 focus:ring-blue-900" />
                                {errors.phone_number?.type === 'required' && <p className="text-xs text-red-500 mt-2">This field is required</p>}
                                {errors.phone_number?.type === 'pattern' && <p className="text-xs text-red-500 mt-2">Please enter valid mobile number</p>}
                            </div>
                        </div>

                        {/* Address & Salary */}
                        <div className="grid grid-cols-2 gap-x-10 gap-y-4">
                            <div>
                                <label className="block mb-1 text-[#233987] font-semibold">Address</label>
                                <input {...register('address', { required: true })} type="text" className="px-3 py-2 rounded text-gray-700 w-full border border-stone-400 focus:outline-none focus:ring-2 focus:ring-blue-900" />
                                {errors.address?.type === 'required' && <p className="text-xs text-red-500 mt-2">This field is required</p>}
                            </div>
                            <div>
                                <label className="block mb-1 text-[#233987] font-semibold">Salary</label>
                                <input {...register('salary', { required: true, pattern: /^(?!0+(?:\.0+)?$)[0-9]+(?:\.[0-9]+)?$/ })} type="number" placeholder="per month" className="px-3 py-2 rounded text-gray-700 w-full border border-stone-400 focus:outline-none focus:ring-2 focus:ring-blue-900" />
                                {errors.salary?.type === 'required' && <p className="text-xs text-red-500 mt-2">This field is required</p>}
                                {errors.salary?.type === 'pattern' && <p className="text-xs text-red-500 mt-2">Please enter valid salary per month</p>}
                            </div>
                        </div>

                        {/* Department & Job Title */}
                        <div className="grid grid-cols-2 gap-x-10 gap-y-4">
                            <div>
                                <label className="block mb-1 text-[#233987] font-semibold">Department</label>
                                <input {...register('department', { required: true })} type="text" className="px-3 py-2 rounded text-gray-700 w-full border border-stone-400 focus:outline-none focus:ring-2 focus:ring-blue-900" />
                                {errors.department?.type === 'required' && <p className="text-xs text-red-500 mt-2">This field is required</p>}
                            </div>
                            <div>
                                <label className="block mb-1 text-[#233987] font-semibold">Job Title</label>
                                <input {...register('job_title', { required: true })} type="text" className="px-3 py-2 rounded text-gray-700 w-full border border-stone-400 focus:outline-none focus:ring-2 focus:ring-blue-900" />
                                {errors.job_title?.type === 'required' && <p className="text-xs text-red-500 mt-2">This field is required</p>}
                            </div>
                        </div>

                        {/* Start Date & Date of Birth */}
                        <div className="grid grid-cols-2 gap-x-10 gap-y-4">
                            <div>
                                <label className="block mb-1 text-[#233987] font-semibold">Start Date</label>
                                <input
                                    {...register('start_date', { required: true })}
                                    type="date"
                                    className="px-3 py-2 rounded text-gray-700 w-full border border-stone-400 focus:outline-none focus:ring-2 focus:ring-blue-900"
                                />
                                {errors.start_date?.type === 'required' && <p className="text-xs text-red-500 mt-2">This field is required</p>}
                            </div>
                            <div>
                                <label className="block mb-1 text-[#233987] font-semibold">Date of Birth</label>
                                <input
                                    {...register('date_of_birth', { required: true })}
                                    type="date"
                                    className="px-3 py-2 rounded text-gray-700 w-full border border-stone-400 focus:outline-none focus:ring-2 focus:ring-blue-900"
                                />
                                {errors.date_of_birth?.type === 'required' && <p className="text-xs text-red-500 mt-2">This field is required</p>}
                            </div>
                        </div>

                        {/* Category & Gender */}
                        <div className="grid grid-cols-2 gap-x-10 gap-y-4">
                            <div>
                                <label className="block mb-1 text-[#233987] font-semibold">Category</label>
                                <select {...register('category', { required: true })} className="px-3 py-2 rounded text-gray-700 w-full border border-stone-400 focus:outline-none focus:ring-2 focus:ring-blue-900">
                                    <option value="">Select Category</option>
                                    <option value="Full Time">Full Time</option>
                                    <option value="Part Time">Part Time</option>
                                    <option value="Remote">Remote</option>
                                    <option value="Intern">Intern</option>
                                </select>
                                {errors.category?.type === 'required' && <p className="text-xs text-red-500 mt-2">This field is required</p>}
                            </div>
                            <div>
                                <label className="block mb-1 text-[#233987] font-semibold">Gender</label>
                                <select {...register('gender', { required: true })} className="px-3 py-2 rounded text-gray-700 w-full border border-stone-400 focus:outline-none focus:ring-2 focus:ring-blue-900">
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                                {errors.gender?.type === 'required' && <p className="text-xs text-red-500 mt-2">This field is required</p>}
                            </div>
                        </div>

                        <button type='submit' className="w-full bg-[#233987] text-white py-2 my-3 rounded text-lg cursor-pointer hover:bg-[#1b2e75]">
                            Create Account
                        </button>

                    </form>
                    <p className="text-center text-gray-600 mt-4">
                        Already have an account? <Link href="/user/login-user" className="text-[#233987] underline">Log In</Link>
                    </p>
                </div>
            </div>
        </div>

    )
}

export default UserRegister;