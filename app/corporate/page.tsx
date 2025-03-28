"use client";

import React, { useEffect, useState } from "react";
import { CorporateType } from "../utils/type";
import { getCorporateDetails } from "../utils/corporate";
import Loader from "../components/loader";
import Card from "../components/corporate/card";
import { LuRefreshCw } from "react-icons/lu";
import { motion } from "framer-motion";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import {
  GetCompletedSurvey,
  GetCorporateSurveyProgress,
  GetPendingSurvey,
  GetTotalEmployees,
  PostReminderEmails,
} from "../api/corporateApi/Action";
import RadialProgress from "../components/corporate/radioProgress";
import { FaExclamationTriangle } from "react-icons/fa";

const EmployeeStatus = [
  {
    title: "total Employees",
    total: 0,
    color: "#17df7f",
  },
  {
    title: "completed",
    total: 0,
    color: "#32a8a4",
  },
  {
    title: "pending",
    total: 0,
    color: "#d9b445",
  },
];

const CorporateDashboard = () => {
  const [corporate, setCorporate] = useState<CorporateType | null>(null);
  const [loading, setLoading] = useState(true);
  const [skeleton, setSkeleton] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [refreshResponse, setRefreshResponse] = useState(false);
  const [employeeStatus, setEmployeeStatus] = useState(EmployeeStatus);
  const [progressBar, setProgressBar] = useState<{
    module1Completed: boolean;
    employeeListUploaded: boolean;
    surveyCompletionRate: number;
  } | null>(null);

  const today = new Date().toLocaleDateString("en-GB");
  // const linkUrl = process.env.NEXT_PUBLIC_LINK_URL;

  useEffect(() => {
    setLoading(true);
    setCorporate(getCorporateDetails());
    setLoading(false);
  }, []);

  useEffect(() => {
    GetSurveyData();
  }, [corporate]);

  const GetSurveyData = async () => {
    if (corporate?._id) {
      try {
        setSkeleton(true);
        const { totalNumberOfemployees } = await GetTotalEmployees(
          corporate?._id
        );
        const { totalPendingEmployeeSurveys } = await GetPendingSurvey(
          corporate?._id
        );
        const { totalEmployeeCompletedSurveys } = await GetCompletedSurvey(
          corporate?._id
        );

        const result = await GetCorporateSurveyProgress(corporate?._id);

        setProgressBar(result.progress);

        setEmployeeStatus((prevStatus) =>
          prevStatus.map((status) => {
            if (status.title.toLowerCase().includes("total")) {
              return { ...status, total: totalNumberOfemployees || 0 };
            }
            if (status.title.toLowerCase().includes("completed")) {
              return { ...status, total: totalEmployeeCompletedSurveys || 0 };
            }
            if (status.title.toLowerCase().includes("pending")) {
              return { ...status, total: totalPendingEmployeeSurveys || 0 };
            }
            return status;
          })
        );
      } catch (error) {
        console.error("Error fetching survey data:", error);
      } finally {
        setSkeleton(false);
      }
    }
  };

  const handleRefresh = async () => {
    setRefresh(true);
    try {
      const responses = await PostReminderEmails(corporate?._id);
      if (responses.message) setRefreshResponse(true);
    } catch (error) {
      console.log("Something went wrong ");
    } finally {
      setRefresh(false);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="px-8 w-full h-full flex gap-8 flex-col items-center">
          <div className="w-full h-full flex gap-4 flex-col items-center">
            <div className="text-xl text-center font-bold">
              Welcome to {corporate?.companyName} Wellness Dashboard!
            </div>
            <div className="">
              <p className="text-center text-slate-500">
                Leverage data-driven insights and actionable metrics to create a
                healthier, happier, and more productive workforce.
              </p>
            </div>

            {isVisible && (
              <div className="bg-white px-4 py-2 rounded-lg shadow-md  flex flex-col items-center space-y-2">
                <FaExclamationTriangle className="text-yellow-500 text-2xl" />
                <p className="text-center text-gray-600 text-base">
                  This temporary dashboard displays the progress of the employee
                  survey.
                </p>
                <p className="text-center text-red-500 text-sm font-medium">
                  ⚠️ Some employees may find their survey emails in the spam
                  folder.
                </p>
                <button
                  onClick={() => setIsVisible(false)}
                  className="px-4 py-2 text-secondary border border-secondary font-bold text-sm hover:bg-secondary hover:text-white duration-300 rounded-full  transition"
                >
                  Okay
                </button>
              </div>
            )}
          </div>

          <div className="w-full flex max-md:flex-wrap gap-8 p-4">
            <div className="w-full md:w-1/3 items-center justify-evenly flex-wrap flex md:flex-col gap-6 ">
              {employeeStatus.map((item) => (
                <Card
                  key={item.title}
                  content={item.total}
                  title={item.title}
                  color={item.color}
                  skeleton={skeleton}
                />
              ))}
            </div>
            <div className="w-full md:w-2/3 border-2 py-4 px-8 rounded-lg flex-col justify-between flex gap-8">
              <span className="flex flex-col gap-2 font-semibold">
                <span className="text-slate-600 inline-flex items-center gap-2 ">
                  <FaRegCalendarAlt className="text-xl" />
                  {today}
                </span>
                <p className=" text-slate-500 inline-flex items-center gap-2">
                  <IoIosPeople className="text-2xl" />
                  Employee feedback Graph
                </p>
              </span>
              <div className="relative w-48 h-48 self-center">
                <div
                  className="absolute inset-0 rounded-full border-[16px] border-gray-100"
                  style={{ width: "100%", height: "100%" }}
                ></div>

                {skeleton ? (
                  <span></span>
                ) : (
                  <RadialProgress
                    progress={progressBar?.surveyCompletionRate}
                  />
                )}
              </div>
              <div className="flex flex-col text-slate-500">
                <span className="inline-flex gap-2 items-center">
                  <span className="w-8 h-2 rounded-md bg-gray-100 block"></span>
                  Pending
                </span>
                <span className="inline-flex gap-2 items-center">
                  <span className="w-8 h-2 rounded-md bg-secondary block"></span>
                  Completed
                </span>
              </div>
            </div>
          </div>

          <div className=" border rounded-lg py-6 px-8 flex flex-col items-center justify-center text-slate-500">
            <>
              {refresh ? (
                <div className=" min-w-[400px] max-w-3xl h-full flex justify-center">
                  <span className=" loading loading-ring loading-lg"></span>
                </div>
              ) : (
                <>
                  {refreshResponse
                    ? "The email has been successfully sent to the remaining employees."
                    : "Resend a notification email to remind employees who have not completed the survey."}

                  <motion.button
                    whileTap={{ scale: 0.8 }}
                    onClick={handleRefresh}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.1 }}
                    className="hover:bg-secondary hover:text-white text-slate-600 duration-300 transition border text-center border-secondary font-bold mt-6 flex justify-center items-center gap-2 p-3 w-4/5 rounded-full"
                  >
                    <LuRefreshCw />
                    Refresh
                  </motion.button>
                </>
              )}
            </>
          </div>
        </div>
      )}
    </>
  );
};

export default CorporateDashboard;
