// components/Leaderboard.tsx
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

  return (
    <>
      <div className="bg-base-100 ">
        <div className="flex  gap-2 justify-between items-center">
          <label className="input input-bordered flex items-center gap-2  w-1/2">
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
            <option value={"nameDesc"}>names (Z-A)</option>
            <option value={"pointsAsc"}>Lowest Points</option>
            <option value={"pointsDesc"}>Highest Points</option>
          </select>
        </div>
        {status !== "loading" && sortedData.length > 0 ? (
          <div className="shadow-md rounded-lg mt-4">
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left">Team Name</th>
                  <th className="px-4 py-2 text-right">Points</th>
                </tr>
              </thead>
              <tbody>
                {sortedData.map((entry, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2">{entry.groupName}</td>
                    <td className="border px-4 py-2 text-right">
                      {entry.members.reduce(
                        (prev, next) => next.points! + prev,
                        0
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
    </>
  );
};

export default GroupLeaderBoard;
