"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../store/slices/authSlice";
import { RootState, AppDispatch } from "../store";
import { useRouter } from "next/navigation";
import { FaCheckCircle } from "react-icons/fa";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const { status, error } = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    setIsError(false);
    e.preventDefault();
    const resultAction = await dispatch(signIn({ email, password }));

    if (signIn.fulfilled.match(resultAction)) {
      setIsError(false);
      router.push("/dashboard");
    } else if (error) setIsError(true);
  };

  const validForm = email.length > 1 && password.length > 1;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col text-sm">
      <div className="flex flex-col gap-6">
        <input
          type="text"
          className="input input-bordered w-full text-sm"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="input input-bordered w-full text-sm"
          onChange={(e) => setPassword(e.target.value)}
        />

        <Link
          href="/forgot-password"
          className="text-sm text-blue-500 self-end"
        >
          Forgot Password?
        </Link>

        <button
          className="btn w-full self-center bg-secondary/80 hover:bg-secondary border-none text-white disabled:bg-secondary/50 disabled:cursor-not-allowed disabled:text-neutral/60"
          disabled={status === "loading" || !validForm}
        >
          {status === "loading" ? "Logging in..." : "Log in"}
        </button>
      </div>
      {status === "failed" && isError && (
        <p className="text-red-500 text-sm text-center mt-4">{error}</p>
      )}
      {status === "succeeded" && !isError && (
        <div className="alert border-none text-sm rounded-md ">
          <FaCheckCircle className="text-5xl text-secondary" />
          <p>Signed in successfully! Redirecting to your dashboard...</p>
        </div>
      )}
      {/* signin with socials */}
      <div className="flex flex-col gap-4">
        <div className="divider after:bg-neutral before:bg-neutral">OR</div>
        <div className="flex flex-col gap-4">
          <Link
            href={`${process.env.NEXT_PUBLIC_API_URL}/api/users/google`}
            type="button"
            className="btn flex items-center space-x-2  border-inherit"
          >
            <FcGoogle className="w-5 h-5" /> <span>Continue with Google</span>
          </Link>
        </div>
      </div>
    </form>
  );
}
