"use client";
import { Logo } from "@/public/assets/images";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();

  return (
    <section className="p-5">
      <Image src={Logo} width={35} height={35} alt="logo" />
      <div className="bg-white px-5 py-8 rounded-xl mt-10 shadow-lg">
        <h1 className="text-2xl font-bold">Sign in to your account</h1>
        <div className="mt-5 gap-3 flex flex-col items-start justify-center w-full">
          <label className="text-sm">Email</label>
          <input
            type="text"
            className="w-full rounded-lg border-2 border-gray-200 
            bg-gray-100  focus:border-green-300 focus:ring-0 focus:outline-0 transition-all"
          />
        </div>
        <div className="mt-5 gap-3 flex flex-col items-start justify-center w-full">
          <div className="flex items-center justify-between w-full">
            <label className="text-sm">Password</label>
            <label className="text-xs text-green-400 cursor-pointer hover:text-green-600 transition-all">
              Forgot your password?
            </label>
          </div>
          <input
            type="password"
            className="w-full rounded-lg border-2 border-gray-200 
            bg-gray-100  focus:border-green-300 focus:ring-0 focus:outline-0 transition-all"
          />
        </div>
        <div className="mt-4 gap-3 flex items-center justify-start w-full">
          <input type="checkbox" className="rounded-md" />
          <label className="text-xs">Remember Me</label>
        </div>
        <button
          onClick={() => {
            router.push("/");
          }}
          className="shadow-md mt-5 w-full bg-green-500  text-white py-3 rounded-md"
        >
          Sign In
        </button>
      </div>
      <h1 className="text-sm text-center mt-3">
        New to Guitarhub?{" "}
        <span className="text-green-400 cursor-pointer hover:text-green-500">
          Register
        </span>
      </h1>
    </section>
  );
};

export default Login;
