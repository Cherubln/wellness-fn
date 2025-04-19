"use client";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { fetchGroups } from "../store/slices/groupsSlice";
import { FaSearch } from "react-icons/fa";

const GroupLeaderBoard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { groups, status } = useSelector((state: RootState) => state.groups);

  const [search, setSearch] = useState("");
  const [sortType, setSortType] = useState("pointsDesc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredData = groups.filter((item) =>
    item.groupName.toLowerCase().includes(search.toLowerCase())
  );

  const sortedData = filteredData.sort((a, b) => {
    if (sortType === "nameAsc") return a.groupName.localeCompare(b.groupName);
    if (sortType === "nameDesc") return b.groupName.localeCompare(a.groupName);
    if (sortType === "pointsAsc")
      return (
        a.members.reduce((prev, next) => next.points! + prev, 0)! -
        b.members.reduce((prev, next) => next.points! + prev, 0)!
      );
    if (sortType === "pointsDesc")
      return (
        b.members.reduce((prev, next) => next.points! + prev, 0)! -
        a.members.reduce((prev, next) => next.points! + prev, 0)!
      );
    return 0;
  });

  useEffect(() => {
    dispatch(fetchGroups());
  }, [dispatch]);

  // Pagination calculations
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="bg-base-100 ">
      <div className="flex gap-2 justify-between items-center">
        <label className="input input-bordered flex items-center gap-2 w-1/2">
          <input
            type="text"
            className="grow"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <FaSearch className="h-4 w-4 opacity-70" />
        </label>

        <select
          className="select select-bordered w-1/2 "
          onChange={(e) => setSortType(e.target.value)}
          defaultValue={sortType}
        >
          <option disabled value={""}>
            Sort by
          </option>
          <option value={"nameAsc"}>Names (A-Z)</option>
          <option value={"nameDesc"}>Names (Z-A)</option>
          <option value={"pointsAsc"}>Lowest Points</option>
          <option value={"pointsDesc"}>Highest Points</option>
        </select>
      </div>

      {status !== "loading" && paginatedData.length > 0 ? (
        <div className="shadow-md rounded-lg mt-4">
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2 text-center">No</th>
                <th className="px-4 py-2 text-center">Team Name</th>
                <th className="px-4 py-2 text-center">Points</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((entry, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border text-start px-4 py-2">
                    {entry.groupName}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {entry.members.reduce(
                      (prev, next) => next.points! + prev,
                      0
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-4 px-4 py-2">
            <button
              className={` ${
                currentPage > 1
                  ? "hover:bg-secondary hover:text-white cursor-pointer border-secondary"
                  : "cursor-not-allowed text-slate-300 border-slate-300"
              } duration-300 transition flex items-center px-3 py-2 border rounded-md`}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              className={` ${
                currentPage < totalPages
                  ? "hover:bg-secondary hover:text-white cursor-pointer border-secondary"
                  : "cursor-not-allowed text-slate-300 border-slate-300"
              } duration-300 transition flex items-center px-3 py-2 border rounded-md`}
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
            >
              Next
            </button>
          </div>
        </div>
      ) : status === "loading" ? (
        <div className="text-sm my-4 py-10 text-center">
          <span className="loading loading-ring loading-lg"></span>
        </div>
      ) : (
        <div className="text-sm my-4 py-10 text-center">
          No Groups have been yet created.
        </div>
      )}
    </div>
  );
};

export default GroupLeaderBoard;
