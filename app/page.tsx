/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";

export default function Home() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="pt-8 px-4 flex flex-col items-center sm:pt-8 h-screen gap-4 ">
      <div
        className="w-full max-w-xs
 "
      >
        <div className="flex justify-center">
          <img
            src="/images/3.png"
            alt="logo"
            className="object-contain w-2/3 h-auto"
          />
        </div>
        {/* <h1 className="capitalize text-xl font-bold w-full  text-center ">
          welcome to the biggest health challenge 2025
        </h1> */}

        <div className="sm:mt-8 w-full  flex flex-col gap-8 sm:border border-neutral p-8 rounded-md">
          <h2 className="text-2xl font-semibold text-center capitalize ">
            {isLogin ? "Login" : "Sign up"}
          </h2>
          {isLogin ? <LoginForm /> : <SignupForm />}
          <div className="text-center text-sm">
            {/* {isLogin ? (
              <p className="text-sm text-center mb-4">Forgot password?</p>
            ) : (
              ""
            )} */}
            <p>
              {isLogin
                ? "Don't have an account? "
                : "Already have an account? "}
              <span
                onClick={() => setIsLogin(!isLogin)}
                className="text-secondary font-bold cursor-pointer"
              >
                {isLogin ? "Sign up" : "Log in"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
