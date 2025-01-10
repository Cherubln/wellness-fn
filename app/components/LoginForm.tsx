"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../store/slices/authSlice";
import { RootState, AppDispatch } from "../store";
import { useRouter } from "next/navigation";
import { FaCheckCircle } from "react-icons/fa";
// import { FcGoogle } from "react-icons/fc";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const { status, error } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const resultAction = await dispatch(signIn({ email, password }));

    if (signIn.fulfilled.match(resultAction)) {
      router.push("/dashboard");
    }
  };

  const validForm = email.length > 8 && password.length > 6;

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

        <button
          className="btn w-full self-center bg-secondary/80 hover:bg-secondary border-none text-white disabled:bg-secondary/50 disabled:cursor-not-allowed disabled:text-neutral/60"
          disabled={status === "loading" || !validForm}
        >
          {status === "loading" ? "Logging in..." : "Log in"}
        </button>
      </div>
      {status === "failed" && (
        <p className="text-red-500 text-sm text-center mt-4">{error}</p>
      )}
      {status === "succeeded" && (
        <p className="alert border-none text-sm rounded-md ">
          <FaCheckCircle className="text-5xl text-secondary" />
          <span>Signed in successfully! Redirecting to your dashboard...</span>
        </p>
      )}
      {/* signin with socials */}
      {/* <div className="flex flex-col gap-4">
        <div className="divider after:bg-neutral before:bg-neutral">OR</div>
        <div className="flex flex-col gap-4">
          <button
            type="button"
            className="btn flex items-center space-x-2  border-inherit hover:text-secondary  text-secondary/80"
          >
            <FcGoogle /> <span>Log in with Google</span>
          </button>
        </div>
      </div> */}
    </form>
  );
}
