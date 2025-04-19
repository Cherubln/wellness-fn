"use client";
import { GetCorporateEmployees } from "@/app/api/corporateApi/Action";
import { getCorporateDetails } from "@/app/utils/corporate";
import React, { useEffect, useState } from "react";
import { AiOutlineFieldTime } from "react-icons/ai";
import { FaDatabase } from "react-icons/fa";
import { GiShakingHands } from "react-icons/gi";
import { MdSelfImprovement, MdSportsKabaddi } from "react-icons/md";

const wellnessFeatures = [
  {
    title: "Real-Time Analytics",
    description:
      "Monitor healthcare claims, absenteeism, and wellness engagement with up-to-date data visualizations.",
    icon: (
      <AiOutlineFieldTime className="text-4xl text-secondary text-center" />
    ),
  },
  {
    title: "Measurable ROI and VOI",
    description:
      "Quantify healthcare savings and productivity gains while also gauging improvements in morale, retention, and talent attraction.",
    icon: <GiShakingHands className="text-4xl text-secondary text-center" />,
  },
  {
    title: "Personalized Wellness Index",
    description:
      "Track overall employee well-being with our unique index and access tailored recommendations for continuous improvement.",
    icon: <MdSportsKabaddi className="text-4xl text-secondary text-center" />,
  },
  {
    title: "Employee Engagement Tracking",
    description:
      "See how your team interacts with wellness activities, and pinpoint the programs that spark the most participation.",
    icon: <MdSelfImprovement className="text-4xl text-secondary text-center" />,
  },
  {
    title: "Data-Backed Action Plans",
    description:
      "Convert insights into strategic initiatives that not only enhance employee health but also strengthen your organizational culture.",
    icon: <FaDatabase className="text-4xl text-secondary text-center" />,
  },
];

const ITEMS_PER_PAGE = 5;

const CorporateEmployee = () => {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortOrder, setSortOrder] = useState("asc");
  const [tableData, setTableData] = useState<
    {
      id: number;
      email: string;
      status: string;
    }[]
  >([]);

  useEffect(() => {
    GetEmployeeList();
  }, []);

  const GetEmployeeList = async () => {
    const user = getCorporateDetails();
    const result = await GetCorporateEmployees(user?._id);
    setTableData(result.employees);
  };

  // Filtered & Sorted Data
  const filteredData = Array.isArray(tableData)
    ? tableData.filter((item) =>
        filterStatus === "all" ? true : item.status === filterStatus
      )
    : [];

  const sortedData = [...filteredData].sort((a, b) => {
    return sortOrder === "asc"
      ? a.status.localeCompare(b.status)
      : b.status.localeCompare(a.status);
  });

  const totalPages = Math.ceil(sortedData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentData = sortedData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Pagination Handlers
  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  useEffect(() => {
    const timer = setTimeout(() => {
      setFade(true);
      setTimeout(() => {
        setIndex((prevIndex) => (prevIndex + 1) % wellnessFeatures.length);
        setFade(false);
      }, 1000);
    }, 5000);

    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div className="w-full px-8">
      <p className="text-center text-slate-500 lg:w-3/5 mx-auto">
        Leverage data-driven insights and actionable metrics to create a
        healthier, happier, and more productive workforce. Here’s what you can
        look forward to:
      </p>
      <div className="hidden w-full max-lg:flex items-center justify-center my-8 border py-8">
        <ul className="list-disc w-full md:w-4/5 space-y-3 px-4">
          <li
            className={`flex flex-col text-center items-center gap-2 transition-opacity duration-1000 ${
              fade ? "opacity-0" : "opacity-100"
            }`}
          >
            {wellnessFeatures[index].icon}
            <span className="font-semibold text-lg">
              {wellnessFeatures[index].title}
            </span>
            <span className="self-baseline">
              {wellnessFeatures[index].description}
            </span>
          </li>
        </ul>
      </div>

      <div className="max-lg:hidden flex flex-wrap items-stretch  gap-4 my-8">
        {wellnessFeatures.map((item, index) => (
          <div
            key={index}
            className=" w-[30%] border rounded  p-4 hover:bg-secondary/40 min-w-[250px] duration-300 hover:scale-105"
          >
            <div className="flex items-center gap-2 font-semibold text-slate-700 text-lg">
              <div>{item.icon}</div>
              {item.title}
            </div>
            <div className="self-baseline mt-4 text-slate-500">
              {item.description}
            </div>
          </div>
        ))}
      </div>

      <div className="w-full">
        {/* Filter & Sort Controls */}
        <div className="flex justify-between mb-4">
          <select
            className="border-2 px-3 py-2 rounded focus-within:border-secondary focus-within:outline-none"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>

          <button
            className="border-2 px-3 py-2 rounded border-secondary font-semibold duration-300 transition hover:text-white hover:bg-secondary"
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          >
            Sort by Status ({sortOrder})
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto w-full">
          <table className="table-auto w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">#</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((item, index) => (
                <tr key={index} className="border ">
                  <td className="border p-2 text-center">
                    {startIndex + index + 1}
                  </td>
                  <td className="border p-2">{item.email}</td>
                  <td
                    className={`border p-2 font-bold text-center ${
                      item.status === "completed"
                        ? "text-green-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {item.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-between mt-4 items-center font-semibold ">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-md ${
                currentPage === 1
                  ? "bg-gray-300 cursor-not-allowed text-white"
                  : "bg-secondary/70 text-white hover:bg-secondary"
              }`}
            >
              Previous
            </button>
            <span className="text-sm font-medium">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-md ${
                currentPage === totalPages
                  ? "bg-gray-300 cursor-not-allowed text-white"
                  : "bg-secondary/70 text-white hover:bg-secondary"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CorporateEmployee;
