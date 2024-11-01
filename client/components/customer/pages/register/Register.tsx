"use client";
import { Logo } from "@/public/assets/images";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { useRegister } from "./hooks";

export default function Register() {
  
  const { request, handleRegister, handleInput } = useRegister();
  const router = useRouter();

  return (
    <section className="p-5">
      <Image src={Logo} width={35} height={35} alt="logo" />
      <div className="bg-white px-5 py-8 rounded-xl mt-10 shadow-lg">
        <h1 className="text-2xl font-bold">Create your account</h1>
        <div className="mt-5 gap-3 flex flex-col items-start justify-center w-full">
          <label className="text-xs font-semibold">Email</label>
          <input
            type="text"
            name="email"
            value={request.email}
            onChange={handleInput}
            placeholder="Enter Email"
            className="w-full rounded-lg border-2 border-gray-200 
            bg-gray-100 text-xs h-11 focus:border-green-300 focus:ring-0 focus:outline-0 transition-all"
          />
        </div>
        <div className="mt-5 gap-3 flex flex-col items-start justify-center w-full">
          <label className="text-xs font-semibold">Full Name</label>
          <input
            type="text"
            name="fullname"
            value={request.fullname}
            onChange={handleInput}
            placeholder="Enter Full Name"
            className="w-full rounded-lg border-2 border-gray-200 
            bg-gray-100 text-xs h-11 focus:border-green-300 focus:ring-0 focus:outline-0 transition-all"
          />
        </div>
        <div className="mt-5 gap-3 flex flex-col items-start justify-center w-full">
          <label className="text-xs font-semibold">Password</label>
          <input
            type="password"
            name="password"
            value={request.password}
            onChange={handleInput}
            placeholder="Enter Password"
            className="w-full rounded-lg border-2 border-gray-200 
            bg-gray-100 text-xs h-11 focus:border-green-300 focus:ring-0 focus:outline-0 transition-all"
          />
        </div>
        <button
          onClick={() => {
            handleRegister();
          }}
          className="shadow-md mt-5 w-full bg-green-500  text-white py-3 rounded-md"
        >
          Register
        </button>
      </div>
      <h1 className="text-sm text-center mt-3">
        Already registered?
        <span
          onClick={() => {
            router.push("/login");
          }}
          className="text-green-400 cursor-pointer hover:text-green-500"
        >
          {" "}
          Login
        </span>
      </h1>
    </section>
  );
}
