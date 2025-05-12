'use client';
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginAdminApi } from "../../slices/loginSliceAdmin";

function LoginAdmin() {

    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();

    const dispatch = useDispatch();

    const router = useRouter();


    const loginAdminCTA = async (enteredDetails) => {
        try {
            const response = await dispatch(loginAdminApi(enteredDetails)).unwrap();

            if (response.success) {
                router.push('/admin/admin-dashboard');
            }
        } catch (error) {
            window.alert("Login failed: " + error);
            reset();
        }
    };

    return (
        <div className="h-screen w-full flex items-center justify-center bg-cover bg-center relative" style={{ backgroundImage: "url('/login-admin.jpg')" }}>
            <div className="absolute inset-0 bg-[#0e1f63]/85"></div>

            <div className="absolute top-6 left-6">
                <Image src="/kris-admin-logo.png" alt="Kris Logo" width={150} height={40} />
            </div>

            <div className="relative z-10 bg-transparent w-full max-w-md px-8 py-6">
                <h2 className="text-white text-4xl font-semibold text-center mb-5">Login</h2>
                <p className="text-xl font-light text-white text-center mb-6">Login to your account.</p>

                <form className="space-y-7" noValidate onSubmit={handleSubmit(loginAdminCTA)}>
                    <div>
                        <label className="text-white block mb-2">E-mail Address</label>
                        <input
                            type="email"
                            defaultValue="123@gmail.com"
                            className="w-full px-4 py-2 rounded-md bg-white text-black outline-none"
                            placeholder="Enter your email"
                            {...register('email', { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })}
                        />
                        {errors.email?.type === 'required' && <p className="text-base text-red-500 mt-2">Please enter Email Address</p>}
                        {errors.email?.type === 'pattern' && <p className="text-base text-red-500 mt-2">Please enter a valid email address</p>}
                    </div>

                    <div>
                        <label className="text-white block mb-2">Password</label>
                        <input
                            defaultValue="123"
                            type="password"
                            className="w-full px-4 py-2 rounded-md bg-white text-black outline-none"
                            placeholder="Enter your password"
                            {...register('password', { required: true })}
                        />
                        {errors.password?.type === 'required' && <p className="text-base text-red-500 mt-2">Please enter password</p>}
                    </div>

                    <button type="submit" className="w-full bg-yellow-500 text-black py-2 rounded-md font-semibold hover:bg-yellow-400 transition mt-5 cursor-pointer">
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
}

export default LoginAdmin;
