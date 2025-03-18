"use client";

import InputComponent from "@/app/components/form/inputComponent";
import { BimaComponent } from "@/app/components/logo";
import { useEffect, useState } from "react";
import "react-international-phone/style.css";
import SubmitButton from "../form/submitButton";

import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FaCheck } from "react-icons/fa6";

import {
  CorporateAccountType,
  PostCorporateData,
} from "@/app/api/corporateApi/Action";
import { useAppContext } from "@/app/context";

function CorporateHRSignup({
  setShowNext,
}: {
  setShowNext: (showNext: boolean) => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isRePasswordVisible, setIsRePasswordVisible] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    repassword?: string;
  }>({});
  const [disable, setDisable] = useState(true);
  const [data, setData] = useState<CorporateAccountType>();
  const [loading, setLoading] = useState(false);
  const {SelectetPackage}=useAppContext()

  const handleInputValue = (value: string, id?: number, type?: string) => {
    if (type === "text") {
      setName(value);
      setErrors((prev) => ({ ...prev, name: "" }));
    }
    if (type === "email") {
      setEmail(value);
      if (!validateEmail(value)) {
        setErrors((prev) => ({
          ...prev,
          email: "Enter a valid email address",
        }));
      } else {
        setErrors((prev) => ({ ...prev, email: "" }));
      }
    }
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  useEffect(() => {
    if (name && email && password && repassword) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [errors]);

  const handleSubmit = async () => {
    let newErrors: {
      name?: string;
      email?: string;
      password?: string;
      repassword?: string;
    } = {};

    // Validate name and email
    if (!name) newErrors.name = "Enter your full name";
    if (!email) newErrors.email = "Enter a valid email";

    // Validate passwords
    if (!password) {
      newErrors.password = "Enter a password";
    }
    if (!repassword) {
      newErrors.repassword = "Re-enter your password";
    } else if (repassword !== password) {
      newErrors.repassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const formData = {
        companyName: name,
        email: email,
        password: repassword,
        packageSelection: {
          packagename:SelectetPackage.packagename,
          price:SelectetPackage.price,
          packageSize:SelectetPackage.packageSize,
          packageDuration:SelectetPackage.packageDuration,
        },
      };
      setLoading(true);
      const result = await PostCorporateData(formData);
      localStorage.setItem("token", result.token);
      setLoading(false);

      if (result) {
        setShowNext(true);
        setData(result);
      }
    } catch (error) {
      console.error("Submission failed:", error);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full bg-white p-2 md:p-4 xl:p-8">
      <div className="flex flex-col items-center gap-6 justify-center">
        <BimaComponent width={250} height={100} />
        <p className="w-full md:w-4/5 lg:w-3/4 text-center">
          Transform employee health, retention, and productivity with advanced
          analytics and personalized engagement.
        </p>
      </div>

      {loading ? (
        <div className="h-[200px] w-full flex justify-center items-center">
          <span className="loading loading-ring text-secondary loading-lg"></span>
        </div>
      ) : data ? (
        <div className="w-full h-[200px] border rounded-lg md:w-3/4 mx-auto flex flex-col sm:gap-4 items-center justify-center px-4">
          <span className="w-12 h-12 p-3 rounded-full bg-secondary flex items-center justify-center">
            <FaCheck className="object-contain text-6xl text-white" />
          </span>
          <span className="text-slate-600 text-base text-center">
            Your account has been successfully created. <br />
            click on the <strong>Proceed To Survey</strong> button below, and fill out
            the first section
          </span>
        </div>
      ) : (
        <div className="flex w-full items-center justify-center h-full">
          <div className="flex flex-col gap-4 w-full max-sm:px-4 sm:w-1/2">
            <InputComponent
              type="text"
              placeholder="Enter your company name..."
              handleInputValue={handleInputValue}
              value={name}
              error={errors.name}
            />

            <InputComponent
              type="email"
              handleInputValue={handleInputValue}
              placeholder="Enter company email..."
              value={email}
              error={errors.email}
            />

            {/* Password Input with Toggle Visibility */}
            <div>
              <label className="input input-bordered flex items-center border-gray-300 gap-2 focus-within:border-secondary/40 focus-within:outline-none focus-within:ring-0">
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  className="grow"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrors((prev) => ({
                      ...prev,
                      password:
                        e.target.value.length > 0 ? "" : "Enter a password",
                    }));
                  }}
                />
                <button
                  type="button"
                  onClick={() => setIsPasswordVisible((prev) => !prev)}
                  className="focus:outline-none"
                >
                  {isPasswordVisible ? (
                    <AiFillEye className="h-5 w-5 text-gray-500" />
                  ) : (
                    <AiFillEyeInvisible className="h-5 w-5 text-gray-500" />
                  )}
                </button>
              </label>
              {errors.password && (
                <span className="text-red-500 pl-2 text-sm">
                  {errors.password}
                </span>
              )}
            </div>

            {/* Confirm Password Input with Toggle Visibility */}
            <div>
              <label className="input input-bordered flex items-center gap-2 border-gray-300 focus-within:border-secondary/40 focus-within:outline-none focus-within:ring-0">
                <input
                  type={isRePasswordVisible ? "text" : "password"}
                  className="grow"
                  placeholder="Re-enter your password"
                  value={repassword}
                  onChange={(e) => {
                    setRePassword(e.target.value);
                    setErrors((prev) => ({
                      ...prev,
                      repassword:
                        e.target.value.length > 0
                          ? ""
                          : "Re-enter your password",
                    }));
                  }}
                />
                <button
                  type="button"
                  onClick={() => setIsRePasswordVisible((prev) => !prev)}
                  className="focus:outline-none"
                >
                  {isRePasswordVisible ? (
                    <AiFillEye className="h-5 w-5 text-gray-500" />
                  ) : (
                    <AiFillEyeInvisible className="h-5 w-5 text-gray-500" />
                  )}
                </button>
              </label>
              {errors.repassword && (
                <span className="text-red-500 pl-2 text-sm">
                  {errors.repassword}
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {!data && (
        <SubmitButton
          loading={loading}
          disable={disable}
          name="Submit"
          action="submit"
          setAction={handleSubmit}
        />
      )}
    </div>
  );
}

export default CorporateHRSignup;
