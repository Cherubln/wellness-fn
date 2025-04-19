/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client";
import React, { useState, useEffect, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import Link from "next/link";
import { serviceProviderSignUp } from "../store/slices/authSlice";
import { useRouter } from "next/navigation";
import { FaCheckCircle } from "react-icons/fa";
import PasswordInputComponent from "./form/passwordInput";

const services = [
  { id: 1, name: "Physical Activities" },
  { id: 2, name: "Diagnostic services" },
  { id: 3, name: "Mental wellness" },
  { id: 4, name: "Reward partners" },
  { id: 5, name: "Nutrition" },
];

export const socialConnection = [
  { id: 1, name: "Whatsapp" },
  { id: 2, name: "linkedin" },
  { id: 3, name: "Instagram" },
  { id: 4, name: "Facebook" },
  { id: 5, name: "Our website" },
  { id: 6, name: "Friends & family" },
];

export default function ServiceProviderForm() {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // Added confirmPassword state
  const [passwordError, setPasswordError] = useState(""); // State for password error message
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [whatsappLink, setWhatsappLink] = useState(""); // Added whatsappLink state
  const [instagramLink, setInstagramLink] = useState(""); // Added instagramLink state
  const [connection, setConnection] = useState("");

  const [checked, setChecked] = useState(false);
  const [providerLogo, setProviderLogo] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const { statusType, error } = useSelector((state: RootState) => state.auth);
  const [isError, setIsError] = useState(false);
  const router = useRouter();
  const [isTyping, setIsTyping] = useState({
    whatsapp: false,
    instagram: false,
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    const value = e.target.value;
    type === "whatsapp" ? setWhatsappLink(value) : setInstagramLink(value);

    setIsTyping((prevTyping) => ({
      ...prevTyping,
      [type]: true,
    }));
  };

  useEffect(() => {
    if (confirmPassword && password !== confirmPassword) {
      setPasswordError("Passwords do not match");
    } else {
      setPasswordError("");
    }
  }, [password, confirmPassword]);

  function isValidLink(link: string, type: "instagram" | "whatsapp") {
    const patterns = {
      instagram: /^(https?:\/\/)?((w{3}\.)?)instagram\.com\/.+/i,
      whatsapp: /^(https?:\/\/)?((w{3}\.)?)wa\.me\/.+/i,
    };

    return patterns[type].test(link);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    setIsError(false);
    e.preventDefault();

    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    const userData = {
      name: fullName,
      phoneNumber,
      services: selectedServices,
      email,
      heardFrom: connection,
      whatsappLink, // Added whatsappLink to userData
      instagramLink, // Added instagramLink to userData
      password,
      logo: providerLogo,
      role: "service_provider",
    };

    const resultAction = await dispatch(serviceProviderSignUp(userData));

    if (serviceProviderSignUp.fulfilled.match(resultAction)) {
      setIsError(false);
      router.push("/dashboard");
    } else if (error) setIsError(true);
  };
  const validForm =
    email.length > 1 &&
    password.length > 1 &&
    confirmPassword.length > 1 && // Updated validation check
    fullName.length > 1 &&
    selectedServices.length > 0 &&
    !passwordError;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <section className="w-full flex flex-col md:flex-row gap-4">
        <div className="w-full">
          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text">
                Service Provider Name <span className="text-red-400">*</span>
              </span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full border-gray-300 focus-within:border-secondary/40 focus-within:outline-none focus-within:ring-0 "
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="w-full">
          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text">
                Email <span className="text-red-400">*</span>
              </span>
            </div>
            <input
              type="email"
              className="input input-bordered w-full border-gray-300 focus-within:border-secondary/40 focus-within:outline-none focus-within:ring-0 "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
        </div>
      </section>

      <section className="w-full flex flex-col md:flex-row gap-4">
        <div className="w-full">
          <span className="label-text">
            Password <span className="text-red-400">*</span>
          </span>
          <PasswordInputComponent
            errorMessage=""
            placeholder="Enter password"
            setPasswordValue={setPassword}
          />
        </div>
        <div className="w-full">
          <span className="label-text">
            Confirm Password <span className="text-red-400">*</span>
          </span>
          <PasswordInputComponent
            errorMessage=""
            placeholder="Confirm your password"
            setPasswordValue={setConfirmPassword}
          />
          {passwordError && (
            <span className="text-red-500 pl-2 text-sm">{passwordError}</span>
          )}
        </div>
      </section>

      <section className="w-full flex flex-col md:flex-row gap-4">
        <div className="w-full">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">
                WhatsApp Link <span className="">(Optional)</span>
              </span>
            </div>
            <input
              type="text"
              placeholder="WhatsApp Link"
              className="input input-bordered w-full border-gray-300 focus-within:border-secondary/40 focus-within:outline-none focus-within:ring-0"
              value={whatsappLink}
              onChange={(e) => handleInputChange(e, "whatsapp")}
            />
            {isTyping.whatsapp && !isValidLink(whatsappLink, "whatsapp") && (
              <span className="text-red-400 text-sm">
                Please enter a valid WhatsApp link.
              </span>
            )}
          </label>
        </div>
        <div className="w-full">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">
                Instagram Link <span className="">(Optional)</span>
              </span>
            </div>
            <input
              type="text"
              placeholder="Instagram Link"
              className="input input-bordered w-full border-gray-300 focus-within:border-secondary/40 focus-within:outline-none focus-within:ring-0"
              value={instagramLink}
              onChange={(e) => handleInputChange(e, "instagram")}
            />
            {isTyping.instagram && !isValidLink(instagramLink, "instagram") && (
              <span className="text-red-400 text-sm">
                Please enter a valid Instagram link.
              </span>
            )}
          </label>
        </div>
      </section>

      <section className="w-full flex flex-col md:flex-row gap-4">
        <div className="w-full">
          <label className="label-text">
            <span className="my-2 block">
              Phone Number <span className="text-red-400">*</span>
            </span>
            <PhoneInput
              className="input  p-0 border-gray-300 focus-within:border-secondary/40 focus-within:outline-none focus-within:ring-0"
              inputStyle={{
                height: "100%",
                width: "100%",
                fontSize: "1rem",
                borderColor: "#e5e7eb",
                borderTopRightRadius: "0.5rem",
                borderBottomRightRadius: "0.5rem",
                backgroundColor: "inherit",
                color: "inherit",
              }}
              countrySelectorStyleProps={{
                buttonStyle: {
                  height: "100%",
                  fontSize: "1rem",
                  padding: "0 0.5rem",
                  borderTopLeftRadius: "0.5rem",
                  borderBottomLeftRadius: "0.5rem",
                  borderColor: "#e5e7eb",
                  backgroundColor: "inherit",
                },
              }}
              defaultCountry="ua"
              value={phoneNumber}
              onChange={(phone) => setPhoneNumber(phone)}
            />
          </label>
        </div>
        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text">Where did you hear us ?</span>
          </div>
          <select
            id="connection"
            name="connection"
            className="select  border border-gray-200 focus-within:border-secondary/40 focus-within:outline-none focus-within:ring-0"
            onChange={(e) => setConnection(e.target.value)}
            defaultValue={""}
          >
            <option value="" disabled>
              Select where you heard about us
            </option>
            {socialConnection.map((conne) => (
              <option key={conne.id} value={conne.name} className="text-black">
                {conne.name}
              </option>
            ))}
          </select>
        </label>
      </section>

      <section className="w-full flex flex-col md:flex-row gap-4">
        <div className="w-full">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">
                Services <span className="text-red-400">*</span>
              </span>
            </div>
            <select
              id="groupmembers"
              name="groupmembers"
              className="select border border-gray-200 focus-within:border-secondary/40 focus-within:outline-none focus-within:ring-0"
              onChange={(e) =>
                setSelectedServices([...selectedServices, e.target.value])
              }
              defaultValue={""}
            >
              <option value="" disabled>
                choose a service
              </option>
              {services.map((service) => (
                <option
                  key={service.id}
                  value={service.name}
                  className="text-black"
                >
                  {service.name}
                </option>
              ))}
            </select>
          </label>
          <div className="my-4 flex flex-wrap gap-2">
            {selectedServices.map((member, index) => (
              <span key={index} className="badge bg-secondary/50 p-3">
                {member}
              </span>
            ))}
          </div>
        </div>

        {/* file input */}
        <div className="w-full">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Provider Logo (optional)</span>
            </div>
            <input
              type="file"
              className="file-input border border-slate-200  w-full focus-within:border-secondary/40 focus-within:outline-none focus-within:ring-0"
              onChange={(event) => {
                const file = event.target?.files?.[0];
                const reader = new FileReader();
                reader.onload = (e) => {
                  const base64Image = e.target?.result;
                  setProviderLogo(base64Image as string);
                  localStorage.setItem("uploadedImage", base64Image as string);
                };
                reader.readAsDataURL(file!);
              }}
              accept="image/*"
            />
          </label>
        </div>
      </section>

      <div className="flex flex-row gap-x-4 items-center">
        <input
          type="checkbox"
          onChange={() => setChecked(!checked)}
          id="terms"
          name="terms"
          className="checkbox border-secondary [--chkbg:theme(colors.secondary)] [--chkfg:white] checked:border-primary"
        />
        <label htmlFor="terms">
          I accept{" "}
          <Link
            href="/terms-of-service"
            className="text-blue-500 underline text-sm"
          >
            Terms and conditions
          </Link>
        </label>
      </div>

      <button
        type="submit"
        disabled={statusType === "loading" || !checked || !validForm}
        className={`mt-4 btn w-full lg:w-1/2 self-center bg-secondary hover:bg-secondary/80 border-none disabled:text-gray-300 text-primary disabled:bg-secondary/50 disabled:cursor-not-allowed`}
      >
        Register
      </button>

      {statusType === "failed" && isError && (
        <p className="text-red-500 text-center"> {error}</p>
      )}
      {statusType === "succeeded" && !isError && (
        <p className="alert border-none text-sm rounded-md ">
          <FaCheckCircle className="text-5xl text-secondary" />
          <span>Signed up successfully! Redirecting to your dashboard...</span>
        </p>
      )}
    </form>
  );
}
