"use client";
import { GetUserStepsData } from "@/app/api/stepsApi/action";
import PointsSection from "@/app/dashboard/PointsSection";
import { RootState } from "@/app/store";
import { getLastDigits } from "@/app/utils/filters";
import { UserType } from "@/app/utils/type";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  FaUser,
  FaTrophy,
  FaWalking,
  FaBullseye,
  FaUsers,
  FaMedal,
  FaChartLine,
  FaCalendarAlt,
} from "react-icons/fa";
import { HiTrendingUp } from "react-icons/hi";
import { LuMedal } from "react-icons/lu";
import { RiExternalLinkLine } from "react-icons/ri";
import { useSelector } from "react-redux";

// Mock user data
const user = {
  fullname: "",
  email: "sarah.anderson@example.com",
  points: 1250,
  rank: 20,
  steps: {
    daily: 8432,
    weekly: 20145,
  },
  goal: 40000,
  groups: 0,
  activities: 0,
  challenges: 0,
  profileImage:
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
};

function UserAnalyticsCard({ userInfo }: { userInfo: UserType | null }) {
  const { services } = useSelector((state: RootState) => state.services);
  const [dailySteps, setDailySteps] = useState<number>(0);
  const [weeklySteps, setWeeklySteps] = useState<number>(0);

  function getInitials(fullName?: string) {
    return fullName
      ?.split(" ")
      .map((word) => word.charAt(0).toUpperCase())
      .join("");
  }
  useEffect(() => {
    getUserDailySteps();
    getUserWeeklySteps();
  }, [userInfo]);

  const getUserDailySteps = async () => {
    try {
      const result = await GetUserStepsData("today", null, userInfo?._id);
      if (result) setDailySteps(result.steps);
    } catch (error) {
      console.log("Request denied", error);
    }
  };

  const getUserWeeklySteps = async () => {
    try {
      const result = await GetUserStepsData("weekly", null, userInfo?._id);
      if (result) setWeeklySteps(result.steps);
    } catch (error) {
      console.log("Request denied", error);
    }
  };

  return (
    <div className="p-4">
      <div className="flex flex-wrap items-stretch justify-center gap-4">
        {/* Profile Card */}
        <div className="w-full min-w-40 sm:w-64 lg:w-[200px] bg-white rounded-xl shadow-sm p-4 flex flex-col border border-gray-100 hover:shadow-md transition-shadow">
          <div className="relative">
            <div className="w-20 h-20 text-4xl bg-stone-600 font-bold text-white flex items-center justify-center rounded-full object-cover border shadow-sm">
              {getInitials(userInfo?.fullname)}
            </div>
            <span className="absolute bottom-0 left-14 md:right-0 bg-green-500 w-5 h-5 rounded-full border-2 border-white"></span>
          </div>
          <div>
            <h2 className="mt-4 text-xl font-semibold text-gray-800">
              {userInfo?.fullname}
            </h2>
            <p className="text-gray-500 text-sm">{userInfo?.email}</p>
            <p className="text-gray-500 text-sm">{userInfo?.username}</p>
          </div>
        </div>

        {/* Achievement Card */}
        <div className="w-full min-w-40 sm:w-64 lg:w-[200px] bg-white rounded-xl shadow-sm p-4 border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <FaTrophy className="text-yellow-500 w-4 h-4" />
            <FaMedal className="text-blue-500 w-4 h-4" />
          </div>
          <div className="gap-4 flex sm:flex-col  justify-between">
            <div>
              <PointsSection
                user={{ points: userInfo?.points, qrCode: { image: "" } }}
                isServiceExist={services.length > 0}
              />
            </div>
            <div>
              <p className="text-gray-500 text-sm flex gap-1 items-center">
                Current Rank
                <Link href={"/dashboard/leaderboard"}>
                  <RiExternalLinkLine className="hover:text-secondary" />
                </Link>
              </p>
              <p className="text-2xl font-bold text-gray-800">
                #{userInfo?.rank || "_"}
              </p>
            </div>
          </div>
        </div>

        {/* Steps Card */}
        <div className="w-full min-w-40 sm:w-64 lg:w-[200px] bg-white rounded-xl shadow-sm p-4 border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <FaWalking className="text-indigo-500 w-4 h-4" />
            <LuMedal className="text-red-500 w-4 h-4" />
          </div>
          <div className="space-y-2">
            <div>
              <p className="text-gray-500 text-sm">Today's Steps</p>
              <p className="text-xl font-bold text-gray-800">
                {dailySteps.toLocaleString()}
              </p>
            </div>

            <div className="flex justify-between items-end">
              <div>
                <p className="text-gray-500 text-sm">Weekly Steps</p>
                <p className="text-xl font-bold text-gray-800">
                  {weeklySteps.toLocaleString()}
                </p>
              </div>
              <HiTrendingUp className="text-green-500 w-5 h-5" />
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div
                className="bg-secondary/90 h-2 rounded-full"
                style={{
                  width: `${
                    (weeklySteps / getLastDigits(userInfo?.stepsGoal)) * 100
                  }%`,
                }}
              ></div>
            </div>

            <div className="text-sm text-gray-500">
              Goal:{" "}
              <span className="text-slate-700 font-semibold">
                {userInfo?.stepsGoal.toLocaleString()}
              </span>{" "}
              steps
            </div>
          </div>
        </div>

        {/* Activity Card */}
        <div className="w-full min-w-40 sm:w-64 lg:w-[200px] bg-white rounded-xl shadow-sm p-4 border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <FaUser className="text-purple-500 w-4 h-4" />
            <FaCalendarAlt className="text-teal-500 w-4 h-4" />
          </div>
          <div className="space-y-2 flex flex-col items-center text-center">
            <div>
              <p className="text-gray-500 text-sm flex gap-1 items-center">
                Active Groups
                <Link href={"/dashboard/leaderboard"}>
                  <RiExternalLinkLine className="hover:text-secondary" />
                </Link>
              </p>
              <p className="text-xl font-bold text-gray-800">
                {userInfo?.groups.length}
              </p>
            </div>
            <div>
              <p className="text-gray-500 text-sm flex gap-1 items-center">
                Activities{" "}
                <Link href={"/dashboard/activities"}>
                  <RiExternalLinkLine className="hover:text-secondary" />
                </Link>
              </p>
              <p className="text-xl font-bold text-gray-800">
                {user.activities}
              </p>
            </div>
            <div>
              <p className="text-gray-500 text-sm flex gap-1 items-center">
                Challenges
                <Link href={"/dashboard/challenges"}>
                  <RiExternalLinkLine className="hover:text-secondary" />
                </Link>
              </p>
              <p className="text-xl font-bold text-gray-800">
                {userInfo?.steps ? 1 : 0}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserAnalyticsCard;
