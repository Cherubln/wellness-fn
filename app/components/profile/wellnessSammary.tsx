import { WellnessDataType } from "@/app/utils/type";
import React from "react";
import { FaDiagnoses, FaRegCalendarAlt } from "react-icons/fa";
import { GiMeal } from "react-icons/gi";
import { IoFastFoodOutline, IoTimer } from "react-icons/io5";
import { MdOutlineSportsHandball, MdSportsKabaddi } from "react-icons/md";
import { RiMentalHealthFill, RiMentalHealthLine } from "react-icons/ri";

const WellnessSummary = ({ userData }: { userData?: WellnessDataType }) => {
  if (!userData)
    return (
      <p className="text-center text-3xl text-green-700 w-full h-[500px] flex items-center justify-center ">
        No Goal Set Yet
      </p>
    );

  const goals = [
    {
      label: "Physical Activity",
      value:
        userData.physicalActivity[0] !== "Other"
          ? userData.physicalActivity
          : userData.otherPhysicalActivity,
      icon: <MdOutlineSportsHandball className="text-4xl text-secondary/80" />,
    },
    {
      label: "Mental Wellness",
      value:
        userData.mentalWellness[0] !== "Other"
          ? userData.mentalWellness
          : userData.otherMentalWellness,
      icon: <RiMentalHealthLine className="text-4xl text-blue-500/80" />,
    },
    {
      label: "Nutrition",
      value:
        userData.nutrition[0] === "Other"
          ? userData.nutrition
          : userData.otherNutrition,
      icon: <IoFastFoodOutline className="text-3xl text-yellow-500/80" />,
    },
    {
      label: "Annual Checkup",
      value: userData.annualCheckup,
      icon: <FaRegCalendarAlt className="text-3xl text-indigo-500/80" />,
    },
    {
      label: "Deworming",
      value: userData.deworming,
      icon: <IoTimer className="text-3xl text-red-500/80" />,
    },
    {
      label: "Physical Activity Goal",
      value: userData.physicalActivityGoal,
      icon: <MdSportsKabaddi className="text-4xl text-green-800/80" />,
    },
    {
      label: "Mental Wellness Goal",
      value: userData.mentalWellnessGoal,
      icon: <RiMentalHealthFill className="text-3xl text-yellow-400" />,
    },
    {
      label: "Nutrition Goal",
      value: userData.nutritionGoal,
      icon: <GiMeal className="text-4xl text-yellow-700/80" />,
    },
    {
      label: "Diagnostics Goal",
      value: userData.diagnosticsGoal,
      icon: <FaDiagnoses className="text-4xl text-zinc-800/80" />,
    },
  ];

  return (
    <div className="w-full bg-white rounded-lg px-8 pb-8 ">
      <h2 className="text-2xl font-semibold text-center text-slate-700 mb-4">
        Wellness Goals Summary
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {goals.map((goal, index) =>
          goal.value && goal.value !== "null" && goal.value.length > 0 ? (
            <div
              key={index}
              className="flex gap-4 items-center border border-gray-300 rounded-lg p-4 bg-gray-50 shadow-sm hover:bg-secondary/40 hover:scale-105 duration-300 transition"
            >
              <div className="">{goal.icon}</div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700">
                  {goal.label}
                </h3>
                <p className="text-gray-600">
                  {Array.isArray(goal.value)
                    ? goal.value.join(", ")
                    : goal.value}
                </p>
              </div>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};

export default WellnessSummary;
