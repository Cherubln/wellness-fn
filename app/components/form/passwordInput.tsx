"use client";
import React, { useEffect, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
interface Props {
  errorMessage: string;
  placeholder: string;
  setPasswordValue: (password: string) => void;
}

const PasswordInputComponent = ({
  errorMessage,
  placeholder,
  setPasswordValue,
}: Props) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (errorMessage) setError(true);
  }, [errorMessage]);

  return (
    <div>
      <label className="flex items-center justify-between input input-bordered  gap-2 border-gray-300 focus-within:border-secondary/40 focus-within:outline-none focus-within:ring-0">
        <input
          type={isPasswordVisible ? "text" : "password"}
          className="grow"
          placeholder={placeholder}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setPasswordValue(e.target.value);
            setError(e.target.value.length > 0 ? false : true);
          }}
        />
        <button
          type="button"
          onClick={() => {
            setIsPasswordVisible((prev) => !prev);
          }}
          className="focus:outline-none py-2"
        >
          {isPasswordVisible ? (
            <AiFillEye className="h-5 w-5 text-gray-500" />
          ) : (
            <AiFillEyeInvisible className="h-5 w-5 text-gray-500" />
          )}
        </button>
      </label>
      {error && (
        <span className="text-red-500 pl-2 text-sm">{errorMessage}</span>
      )}
    </div>
  );
};

export default PasswordInputComponent;
