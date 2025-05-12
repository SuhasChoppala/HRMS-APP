import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div
      className="relative min-h-screen w-full flex flex-col items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: 'url(/login-admin.jpg)' }}
    >
      <div className="absolute inset-0 bg-[#0e1f63]/85"></div>

      {/* Logo on the top-left */}
      <div className="absolute top-6 left-6 z-20">
        <Image src="/kris-admin-logo.png" alt="HRMS Logo" width={150} height={50} />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white w-full max-w-lg p-8 rounded-lg">
        <h1 className="text-4xl font-bold mb-4">Welcome to HRMS App</h1>
        <p className="text-lg mb-6">Choose your role to continue</p>

        <div className="flex flex-col gap-5">
          <Link href="/admin/login-admin">
            <div className="bg-[#FFC20E] hover:bg-transparent text-black hover:text-white border border-transparent hover:border-white py-3 rounded-xl shadow-lg text-lg font-semibold cursor-pointer transition-all">
              Admin Login
            </div>
          </Link>
          <Link href="/user/login-user">
            <div className="bg-transparent text-white py-3 border border-white rounded-xl shadow-lg text-lg font-semibold cursor-pointer hover:text-black hover:border-[#FFC20E] hover:bg-[#FFC20E] transition-all">
              User Login
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
