"use client";

import InputComponent from "@/app/components/form/inputComponent";
import { BimaComponent } from "@/app/components/logo";
import { useEffect, useState } from "react";
import "react-international-phone/style.css";
import { FaCheck } from "react-icons/fa6";
import SubmitButton from "../components/form/submitButton";
import { useAppContext } from "../context";

function EmplyoyeeSignup({
  setShowNext,
}: {
  setShowNext: (showNext: boolean) => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
  }>({});
  const [disable, setDisable] = useState(true);
  const [loading, setLoading] = useState(false);
  const { setEmployeeData } = useAppContext();

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
    if (name && email) {
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

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const formData = {
        name: name,
        email: email,
      };
      setShowNext(true);
      setLoading(true);
      setEmployeeData(formData);
      setLoading(false);
    } catch (error) {
      console.error("Submission failed:", error);
    } finally {
      setEmail("");
      setName("");
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full bg-white p-2 md:p-4 xl:p-8">
      {loading ? (
        <div className="h-[200px] w-full flex justify-center items-center">
          <span className="loading loading-ring text-secondary loading-lg"></span>
        </div>
      ) : (
        <div className="flex w-full items-center justify-center h-full">
          <div className="flex flex-col gap-4 w-full max-sm:px-4 sm:w-1/2">
            <InputComponent
              type="text"
              placeholder="Enter your name..."
              handleInputValue={handleInputValue}
              value={name}
              error={errors.name}
            />

            <InputComponent
              type="email"
              handleInputValue={handleInputValue}
              placeholder="Enter email..."
              value={email}
              error={errors.email}
            />
          </div>
        </div>
      )}

      {
        <SubmitButton
          loading={loading}
          disable={disable}
          name="Submit"
          action="submit"
          setAction={handleSubmit}
        />
      }
    </div>
  );
}

export default EmplyoyeeSignup;
