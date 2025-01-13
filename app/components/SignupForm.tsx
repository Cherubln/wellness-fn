"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store";
import { useRouter } from "next/navigation";
import { signupUser } from "../store/slices/authSlice";
import "react-international-phone/style.css";
import Link from "next/link";
import { FaCheckCircle } from "react-icons/fa";

const SignupForm: React.FC = () => {
  // const [accountType, setAccountType] = useState("individual");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  // const [phoneNumber, setPhoneNumber] = useState("");
  // const [gender, setGender] = useState("other");
  // const [groupName, setGroupName] = useState("");
  // const [groupMembers, setgroupMembers] = useState<string[]>([]);
  const [checked, setChecked] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const signupStatus = useSelector((state: RootState) => state.auth.status);
  const signupError = useSelector((state: RootState) => state.auth.error);

  const router = useRouter();

  const { status } = useSelector((state: RootState) => state.auth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userData = {
      fullname: fullName,
      email,
      username,
      password,
    };

    const resultAction = await dispatch(signupUser(userData));

    if (signupUser.fulfilled.match(resultAction)) {
      router.push("/dashboard");
    }
  };

  const validForm =
    email.length > 2 &&
    password.length > 2 &&
    fullName.length > 2 &&
    username.length > 2;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="w-full">
        {/* <label className="form-control w-full ">
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
          </label> */}
        <input
          type="text"
          className="input input-bordered w-full text-sm"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="w-full">
        <input
          type="password"
          placeholder="Password"
          className="input input-bordered w-full text-sm"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="w-full">
        <input
          type="text"
          placeholder="Full Name"
          className="input input-bordered w-full text-sm"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
      </div>
      <div className="w-full">
        <input
          type="text"
          placeholder="Username"
          className="input input-bordered w-full text-sm"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>

      {/* <section className="w-full flex flex-col gap-4">
        <div className="w-full">
          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text">
                Gender <span className="text-red-400">*</span>
              </span>
            </div>
            <select
              className="select select-bordered"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option value="male" className="text-black">
                Male
              </option>
              <option value="female" className="text-black">
                Female
              </option>
              <option value="other" className="text-black">
                Other
              </option>
            </select>
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
              inputProps={{ required: true }}
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
      </section> */}
      {/* <div>
        <label className="form-control w-full ">
          <div className="label">
            <span className="label-text">
              Sign up as <span className="text-red-400">*</span>
            </span>
          </div>
          <select
            className="select select-bordered"
            value={accountType}
            onChange={(e) => setAccountType(e.target.value)}
            required
          >
            <option value="individual" className="text-black">
              Individual
            </option>
            <option value="group" className="text-black">
              Group
            </option>
          </select>
        </label>
      </div>

      {accountType === "group" && (
        <div className="flex flex-col gap-4">
          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text">
                Group Name <span className="text-red-400">*</span>
              </span>
            </div>
            <input
              type="text"
              className="input input-bordered w-full "
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              required
            />
          </label>

          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text">
                Group Members <span className="text-red-400">*</span>
              </span>
            </div>
            <ItemSearch
              items={users}
              setfilteredItems={setgroupMembers}
              filteredItems={groupMembers}
            />
          </label>
        </div>
      )} */}

      <div className="flex flex-row gap-x-2 justify-center items-center text-sm">
        <input
          type="checkbox"
          onChange={() => setChecked(!checked)}
          id="terms"
          name="terms"
          className="checkbox border-secondary [--chkbg:theme(colors.secondary)] [--chkfg:white] checked:border-primary checkbox-sm"
        />
        <label htmlFor="terms">
          I accept{" "}
          <Link href="/terms" className="text-secondary underline text-sm">
            Terms and conditions
          </Link>
        </label>
      </div>
      <button
        type="submit"
        disabled={signupStatus === "loading" || !checked || !validForm}
        className={`btn w-full self-center bg-secondary/80 hover:bg-secondary border-none text-white disabled:bg-secondary/50 disabled:cursor-not-allowed disabled:text-neutral/60
          `}
      >
        Register
      </button>
      {signupStatus === "failed" && (
        // <p className="alert bg-red-400">{signupError}</p>
        <div
          role="alert"
          className="btn self-center w-full lg:w-1/2 bg-red-400"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {status === "failed" && (
            <p className="text-red-500 text-sm text-center mt-4">
              {signupError}
            </p>
          )}
        </div>
      )}
      {status === "succeeded" && (
        <p className="alert border-none text-sm rounded-md ">
          <FaCheckCircle className="text-5xl text-secondary" />
          <span>Signed up successfully! Redirecting to your dashboard...</span>
        </p>
      )}
    </form>
  );
};

export default SignupForm;
