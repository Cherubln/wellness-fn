"use client";
import Image from "next/image";
import React, { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import axios, { AxiosError } from "axios";

const ResetPassword: React.FC = () => {
  const searchParams = useSearchParams();
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsError(false);
    setMessage("");
    if (password !== confirmPassword) {
      setIsError(true);
      setMessage("Passwords do not match.");
      return;
    }

    try {
      const token = searchParams.get("token");

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/reset-password`,

        { token, password }
      );
      if (response.data.message) {
        setMessage(response.data.message);
      } else {
        setIsError(true);
        setMessage(
          "There was a problem with your request. Please try again later."
        );
      }
    } catch (error) {
      console.log(error);
      setIsError(true);
      if (error instanceof AxiosError) {
        setMessage(error.response?.data.message);
      } else
        setMessage(
          "There was an error processing your request. Please try again later."
        );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-8 bg-white shadow-md rounded-lg">
        <h2 className="text-3xl font-bold mb-4 text-center">Reset Password</h2>
        <Image
          src="/images/reset-password.svg"
          alt="Artwork"
          width={240}
          height={240}
          className="mx-auto mb-6 w-60"
        />
        <p className="mb-4 text-center text-sm font-semibold text-neutral">
          Please enter and confirm your new password below.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <div className="form-control">
            <label htmlFor="password" className="label">
              <span className="label-text">New Password:</span>
            </label>
            <input
              placeholder="New Password"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input input-bordered w-full text-sm"
            />
          </div>
          <div className="form-control">
            <label htmlFor="confirm-password" className="label">
              <span className="label-text">Confirm Password:</span>
            </label>
            <input
              placeholder="Confirm Password"
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="input input-bordered w-full text-sm"
            />
          </div>
          <button
            type="submit"
            className="my-2 btn w-full self-center bg-secondary/80 hover:bg-secondary border-none text-white disabled:bg-secondary/50 disabled:cursor-not-allowed disabled:text-neutral/60"
            disabled={!password || !confirmPassword}
          >
            Submit
          </button>
        </form>
        {message && (
          <p
            className={`mt-4 text-center text-sm ${
              isError ? "text-red-500" : "text-green-600"
            }`}
          >
            {message}
          </p>
        )}
        {message && (
          <div className="mt-3 text-center">
            <Link href="/auth" className="btn btn-link">
              Go to login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

const FinalResetPassword = () => {
  return (
    <Suspense>
      <ResetPassword />
    </Suspense>
  );
};

export default FinalResetPassword;
