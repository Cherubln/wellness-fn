"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Login } from "../store/slices/authSlice";
import { RootState, AppDispatch } from "../store";
import { useRouter } from "next/navigation";
import { FaCheckCircle } from "react-icons/fa";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { decodeJWT } from "../utils/decode";
import PasswordInputComponent from "./form/passwordInput";
import { SessionProvider, signIn, signOut, useSession } from "next-auth/react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const { statusType, error } = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  const [isError, setIsError] = useState(false);

  const { data, status } = useSession();
 

  useEffect(() => {
    if (status === "authenticated") {
      localStorage.setItem("token", data.expires);
      router.push("/auth");
    }
  }, [status, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    setIsError(false);
    e.preventDefault();
    const resultAction = await dispatch(Login({ email, password }));

    if (Login.fulfilled.match(resultAction)) {
      setIsError(false);
      const user = decodeJWT(resultAction.payload.token);
      if (user?.corporate?.role === "corporate") {
        router.push("/corporate");
      } else {
        router.push("/dashboard");
      }
    } else if (error) setIsError(true);
  };

  const validForm = email.length > 1 && password.length > 1;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col text-sm">
      <div className="flex flex-col gap-6">
        <input
          type="text"
          className="input border border-gray-200 focus-within:border-secondary/40 focus-within:outline-none focus-within:ring-0 w-full text-sm"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <PasswordInputComponent
          errorMessage={""}
          placeholder={"Enter your password"}
          setPasswordValue={setPassword}
        />

        <Link
          href="/forgot-password"
          className="text-sm text-blue-500 self-end"
        >
          Forgot Password?
        </Link>

        <button
          className="btn w-full self-center bg-secondary/80 hover:bg-secondary border-none text-white disabled:bg-secondary/50 disabled:cursor-not-allowed disabled:text-neutral/60"
          disabled={statusType === "loading" || !validForm}
        >
          {statusType === "loading" ? "Logging in..." : "Log in"}
        </button>
      </div>
      {statusType === "failed" && isError && (
        <p className="text-red-500 text-sm text-center mt-4">{error}</p>
      )}
      {statusType === "succeeded" && !isError && (
        <div className="alert border-none text-sm rounded-md ">
          <FaCheckCircle className="text-5xl text-secondary" />
          <p>Signed in successfully! Redirecting to your dashboard...</p>
        </div>
      )}
      {/* signin with socials */}
      {/* <SessionProvider>
        <div className="flex flex-col gap-4">
          <div className="divider after:bg-neutral before:bg-neutral">OR</div>
          <div className="flex flex-col gap-4">
            <span
              onClick={() => signIn("google")}
              className="btn flex items-center space-x-2  border-inherit"
            >
              <FcGoogle className="w-5 h-5" /> <span>Continue with Google</span>
            </span>
          </div>
        </div>
      </SessionProvider> */}
    </form>
  );
}
