"use client";
import WellnessForm from "@/app/components/user/userFeedbackForm";
import UserProfileData from "@/app/components/user/userProfile";
import { AppDispatch } from "@/app/store";
import { logout } from "@/app/store/slices/authSlice";
import { isTokenValid } from "@/app/utils/auth";
import { checkEmployeeStatusFn } from "@/app/utils/corporate";
import { decodeJWT } from "@/app/utils/decode";
import { UserType } from "@/app/utils/type";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const nav = ["Edit Your Profile", "Set Activity Goal"];

const UserProfile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [activeNav, setActiveNav] = useState("Edit Your Profile");
  const [showStatus, setShowStatus] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        setUser(decodeJWT(token));
      }
    }
  }, []);

  const statusResult = async () => {
    const result = await checkEmployeeStatusFn();
    if (result) {
      setShowStatus(true);
    } else {
      setShowStatus(false);
    }
  };
  useEffect(() => {
    statusResult();
  }, []);

  useEffect(() => {
    if (!isTokenValid()) {
      dispatch(logout());
      router.push("/auth");
    }
  }, [dispatch, router]);

  return (
    <div className="w-full flex flex-col gap-8 justify-center items-center">
      <div className="mt-8 space-y-4 w-full flex flex-col items-center">
        <h1 className="text-2xl font-light">
          Welcome <span className="font-semibold">{user?.fullname} 👋 </span>
        </h1>
        <p className="text-sm font-medium text-slate-500 w-4/5 text-center">
          Your Health is your Wealth.
        </p>
      </div>
      <div className="w-full flex flex-col items-center gap-8">
        <div className="flex gap-2 sm:gap-8 items-center w-3/4 min-w-max max-w-4xl justify-center max-sm:overflow-y-scroll">
          {nav.map((item) => (
            <span
              onClick={() => setActiveNav(item)}
              key={item}
              className={`${
                activeNav === item
                  ? "border-b-2 font-semibold border-secondary/50"
                  : "font-light text-slate-400"
              } px-4 py-2 cursor-pointer text-sm transition-opacity duration-300`}
            >
              {item}
            </span>
          ))}
        </div>
        {activeNav === "Edit Your Profile" && (
          <div className="flex flex-col items-center w-full px-8 gap-8">
            {showStatus && (
              <div className="border px-8 py-4 w-full max-w-2xl text-primaryBlue flex flex-col gap-4 rounded-md ">
                <span className="font-semibold">Complete your profile</span>
                <span className="text-sm text-opacity-40">
                  Your feedback helps us understand how to improve leadership,
                  culture, and your overall work experience. This survey should
                  take about 5-10 minutes. Your responses will remain
                  confidential, and we will only share generalized employee data
                </span>
                <span className="flex gap-2 text-sm font-semibold text-nowrap">
                  <span className="p-3 text-white bg-secondary border border-secondary rounded-md cursor-pointer ">
                    <Link href={"/dashboard/survey"}>Complete Now</Link>
                  </span>
                  <span
                    onClick={() => setShowStatus(false)}
                    className="p-3 text-secondary cursor-pointer hover:border hover:border-secondary hover:duration-300 transition rounded-md"
                  >
                    Not now
                  </span>
                </span>
              </div>
            )}
            <UserProfileData user={user} />
          </div>
        )}
        {activeNav === "Set Activity Goal" && (
          <WellnessForm userId={user?._id} />
        )}
      </div>
    </div>
  );
};

export default UserProfile;
