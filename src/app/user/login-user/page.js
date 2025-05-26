'use client';
import Image from 'next/image';
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { loginUserApi } from '../../slices/loginSliceUser';
import { useForm } from 'react-hook-form';
import { useRouter } from "next/navigation";


function UserLogin() {

    const router = useRouter();
    const dispatch = useDispatch();

    const { register, watch, handleSubmit, reset, formState: { errors } } = useForm();

    const loginUserCTA = async (userEnteredDetails) => {
        try {
            const isLoginSuccess = await dispatch(loginUserApi(userEnteredDetails)).unwrap();

            if (isLoginSuccess.loginSuccess) {
                router.push('/user/user-dashboard');
            }
        } catch (error) {
            window.alert("Login Failed: " + error);
            reset();
        }
    }


    return (
        <div className='flex h-screen w-full'>
            <div className="w-1/2 flex items-center justify-center bg-white p-10">
                <div className="max-w-md w-full">
                    <div className="mb-6">
                        <Image
                            src="/kris-logo.png"
                            alt="Kris Logo"
                            width={150}
                            height={40}
                        />
                    </div>
                    <div className='px-8 w-full'>
                        <form noValidate onSubmit={handleSubmit(loginUserCTA)}>
                            <h2 className="text-3xl font-bold text-blue-900 mb-2">Login</h2>
                            <p className="text-lg font-normal text-stone-500 mb-6">Login to your account.</p>

                            <div className="space-y-4">
                                <div>
                                    <label className="text-blue-900 font-semibold">E-mail Address</label>
                                    <input
                                        defaultValue="s1@gmail.com"
                                        {...register('userEmail', { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })}
                                        type="email"
                                        className="w-full p-2 mt-2 border rounded border-stone-400 focus:outline-none focus:ring-2 focus:ring-blue-900"
                                        placeholder="Enter your email"
                                    />
                                    {errors.userEmail?.type === 'required' && <p className="text-base text-red-500 mt-2">Please enter Email Address</p>}
                                    {errors.userEmail?.type === 'pattern' && <p className="text-base text-red-500 mt-2">Please enter valid Email Address</p>}
                                </div>
                                <div className='mt-5'>
                                    <label className="text-blue-900 font-semibold">Password</label>
                                    <input
                                        defaultValue="123"
                                        {...register('userPassword', { required: true })}
                                        type="password"
                                        className="w-full p-2 mt-2 border rounded border-stone-400 focus:outline-none focus:ring-2 focus:ring-blue-900"
                                        placeholder="Enter your password"
                                    />
                                    {errors.userPassword?.type === 'required' && <p className="text-base text-red-500 mt-2">Please enter Password</p>}
                                </div>

                                <button type='submit' className="w-full bg-blue-900 text-white p-3 rounded-lg cursor-pointer hover:bg-blue-800 mt-5">
                                    Sign In
                                </button>
                            </div>
                        </form>

                        <p className="text-center text-stone-500 mt-4">
                            Don’t have an account yet?
                            <Link href="/user/register-user" className="text-blue-900 font-semibold"> Join KRIS today.</Link>
                        </p>

                        <div className="flex justify-center text-center mt-4">
                            <Link
                                href="/"
                                className="text-sm text-blue-900 hover:underline font-medium flex items-center gap-1"
                            >
                                <FaArrowLeft className="text-blue-900 text-xs" />
                                Back
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-1/2 relative flex items-center justify-center">
                <div className="absolute inset-0 bg-[url('/login-pic.jpg')] bg-cover bg-center"></div>
                <div className="absolute inset-0 bg-[#0e1f63]/85"></div>
                <div className="relative z-10 text-center px-10">
                    <p className="text-white text-3xl font-semibold max-w-lg">
                        Manage all <span className="text-yellow-400">HR Operations</span> from the comfort of your home.
                    </p>
                </div>
            </div>
        </div>

    )
}

export default UserLogin;