"use client";
import { useAppContext } from "@/app/context";
import Link from "next/link";
import React from "react";

const CheckEmployeeStatus = () => {
  const { setActiveModalId } = useAppContext();

  return (
    <div className="border px-8 py-4 max-w-xl w-full mt-4  text-primaryBlue flex flex-col gap-4 rounded-md">
      <span className="font-semibold">Complete your profile</span>
      <span className="text-sm text-opacity-40">
        Your feedback helps us understand how to improve leadership, culture,
        and your overall work experience. This survey should take about 5-10
        minutes. Your responses will remain confidential, and we will only share
        generalized employee data
      </span>
      <span className="flex gap-2 text-sm font-semibold text-nowrap">
        <span
          onClick={() => setActiveModalId(null)}
          className="p-3 text-white bg-secondary border border-secondary rounded-md cursor-pointer "
        >
          <Link href={"/dashboard/survey"}>Complete Now</Link>
        </span>
        <span
          onClick={() => setActiveModalId(null)}
          className="p-3 text-secondary cursor-pointer hover:border hover:border-secondary hover:duration-300 transition rounded-md"
        >
          Not now
        </span>
      </span>
    </div>
  );
};

export default CheckEmployeeStatus;
