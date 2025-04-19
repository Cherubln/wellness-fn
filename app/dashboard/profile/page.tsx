"use client";
import { GetUserBookings } from "@/app/api/booking/action";
import ActivityCard from "@/app/components/activities/activityCard";
import ChallengeCard from "@/app/components/healthChallenge/challengeCard";
import ChallengeList, {
  challengesData,
} from "@/app/components/healthChallenge/challengeList";
import BookingsTable from "@/app/components/profile/bookingTable";
import WellnessForm from "@/app/components/profile/userFeedbackForm";
import UserProfileData from "@/app/components/profile/userProfile";
import UserAnalyticsCard from "@/app/components/profile/userProfileCards";
import { useAppContext } from "@/app/context";
import { AppDispatch } from "@/app/store";
import { logout } from "@/app/store/slices/authSlice";
import { BookingDataType } from "@/app/type";
import { isTokenValid } from "@/app/utils/auth";
import { checkEmployeeStatusFn } from "@/app/utils/corporate";
import { decodeJWT } from "@/app/utils/decode";
import { UserType } from "@/app/utils/type";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import { IoMdAdd } from "react-icons/io";
import { useDispatch } from "react-redux";

const nav = [
  "My Activities",
  "My Challenges",
  "My Bookings",
  "Edit Profile",
  "Set Activity Goal",
];

const UserProfile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [activeNav, setActiveNav] = useState("My Activities");
  const [showStatus, setShowStatus] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);
  const [bookingList, setBookingList] = useState<BookingDataType[]>([]);
  const { setActiveTab } = useAppContext();

  const token = localStorage.getItem("token") as string;
  const userId = decodeJWT(token);
  useEffect(() => {
    if (typeof window !== "undefined") {
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
    getMyBookings();
  }, []);

  useEffect(() => {
    if (!isTokenValid()) {
      dispatch(logout());
      router.push("/auth");
    }
  }, [dispatch, router]);

  const getMyBookings = async () => {
    try {
      const result = await GetUserBookings(userId._id);

      setBookingList(result.bookings);
    } catch (error) {}
  };

  
  return (
    <div className="w-full flex flex-col gap-6 justify-center items-center">
      <div className="mt-4 space-y-2 w-full flex flex-col items-center text-center">
        <h1 className="text-2xl font-light">
          Welcome to the Biggest Health Challenge
        </h1>
        <p className="text-sm font-medium text-slate-500 w-4/5 text-center">
          Your wellness your way
        </p>
      </div>
      <UserAnalyticsCard userInfo={user} />

      <div className="w-full flex flex-col items-center gap-8">
        <div className="bg-slate-100 rounded-full flex gap-2 px-2 py-1 sm:gap-8 items-center w-[90%] justify-evenly overflow-x-scroll hide-scrollbar">
          {nav.map((item) => (
            <span
              onClick={() => setActiveNav(item)}
              key={item}
              className={`${
                activeNav === item
                  ? "border-b-2 font-semibold border-secondary/50 bg-white rounded-full duration-300 transition"
                  : "font-light text-slate-400"
              } px-4 py-3 cursor-pointer text-sm transition-opacity duration-300 w-fit text-nowrap`}
            >
              {item}
            </span>
          ))}
        </div>

        {activeNav === "My Activities" &&
          (bookingList?.length < 0 ? (
            <div className="flex flex-wrap items-center justify-center px-2 gap-4">
              {" "}
              <ActivityCard />
            </div>
          ) : (
            <>
              <div className="flex flex-col items-center justify-center gap-4 h-80 w-full mx-auto">
                <p className="text-slate-500 text-lg">Activity not available</p>
                <Link href={"/dashboard"}>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setActiveTab("Activities")}
                    className="text-white bg-secondary rounded-full w-fit py-3 px-4 flex items-center gap-2 font-bold"
                  >
                    Reserve Activity
                    <IoMdAdd className="text-lg " />
                  </motion.button>
                </Link>
              </div>
            </>
          ))}

        {activeNav === "My Challenges" && (
          <div className="flex items-stretch justify-center flex-wrap gap-6">
            {challengesData.length > 0 ? (
              challengesData.map((challenge) => (
                <span key={challenge.id}>
                  <ChallengeCard challenge={challenge} />
                </span>
              ))
            ) : (
              <p className="text-gray-500 text-center col-span-full">
                No challenges found.
              </p>
            )}
          </div>
        )}

        {activeNav === "My Bookings" && (
          <BookingsTable bookings={bookingList} />
        )}

        {activeNav === "Edit Profile" && (
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
