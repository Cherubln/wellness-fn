"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import Link from "next/link";
import { serviceProviderSignUp } from "../store/slices/authSlice";
import { useRouter } from "next/navigation";

const services = [
  { id: 1, name: "Outdoor Activities" },
  { id: 2, name: "Dancing Classes" },
  { id: 3, name: "Mental wellness" },
  { id: 4, name: " Gym services" },
  { id: 5, name: "Nutrition training" },
  { id: 6, name: "Nutrition baskets" },
];

export default function ServiceProviderForm() {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [checked, setChecked] = useState(false);

  const [providerLogo, setProviderLogo] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const { status, error } = useSelector((state: RootState) => state.auth);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userData = {
      name: fullName,
      phoneNumber,
      services: selectedServices,
      email,
      password,
      logo: providerLogo,
      role: "service_provider",
    };
    const resultAction = await dispatch(serviceProviderSignUp(userData));

    if (serviceProviderSignUp.fulfilled.match(resultAction)) {
      router.push("/dashboard");
    }
  };

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
              className="input input-bordered w-full "
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
              className="input input-bordered w-full "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
        </div>
      </section>
      <section className="w-full flex flex-col md:flex-row gap-4">
        <div className="w-full">
          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text">
                Password <span className="text-red-400">*</span>
              </span>
            </div>
            <input
              type="password"
              className="input input-bordered w-full "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="w-full">
          <label className="label-text">
            <span className="my-2 block">
              Phone Number <span className="text-red-400">*</span>
            </span>
            <PhoneInput
              className="input input-bordered p-0 border-none"
              inputStyle={{
                height: "100%",
                width: "100%",
                fontSize: "1rem",
                borderColor: "currentcolor",
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
                  borderColor: "currentcolor",
                  backgroundColor: "inherit",
                },
              }}
              defaultCountry="ua"
              value={phoneNumber}
              onChange={(phone) => setPhoneNumber(phone)}
            />
          </label>
        </div>
      </section>
      <section className="w-full flex flex-col md:flex-row gap-4">
        <div className="w-full">
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">
                Services <span className="text-red-400">*</span>
              </span>
            </div>
            <select
              id="groupmembers"
              name="groupmembers"
              // className="border-2 rounded-xl p-2 py-3 w-full text-black mt-2
              className="select select-bordered"
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
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Provider Logo (optional)</span>
            </div>
            <input
              type="file"
              className="file-input file-input-bordered w-full"
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
          <Link href="/terms" className="text-blue-500 underline text-sm">
            Terms and conditions
          </Link>
        </label>
      </div>
      <button
        type="submit"
        disabled={status === "loading" || !checked}
        className={`mt-4 btn w-full lg:w-1/2 self-center bg-secondary hover:bg-secondary/80 border-none disabled:text-gray-300 text-primary disabled:bg-secondary/50 disabled:cursor-not-allowed`}
      >
        Register
      </button>
      {status === "failed" && <p>Error: {error}</p>}
    </form>
  );
}
