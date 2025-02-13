"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");
    setIsError(false);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );
      if (response.ok) {
        setMessage(
          "If this email address is registered, you will receive a password reset link."
        );
      } else {
        setIsError(true);
        setMessage(
          "There was a problem with your request. Please try again later."
        );
      }
    } catch (error) {
      setIsError(true);
      console.log(error);

      setMessage(
        "There was an error processing your request. Please try again later."
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-8 bg-white shadow-md rounded-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">Forgot Password</h2>
        <Image
          src="/images/forget-password.svg"
          alt="Artwork"
          width={240}
          height={240}
          className="mx-auto mb-6 w-60"
        />
        <p className="mb-4 text-center text-sm font-semibold text-neutral">
          Enter your email address below to receive a password reset link.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control">
            <label htmlFor="email" className="label">
              <span className="label-text">Email Address:</span>
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input input-bordered w-full"
            />
          </div>
          <button
            type="submit"
            className="btn w-full self-center bg-secondary/80 hover:bg-secondary border-none text-white disabled:bg-secondary/50 disabled:cursor-not-allowed disabled:text-neutral/60"
            disabled={!email}
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
        <div className="mt-8 text-center">
          <Link href="/auth" className="btn btn-link">
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
