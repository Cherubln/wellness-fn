import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import GroupLeaderBoard from "./GroupLeaderBoard";
import { RootState } from "../store";
import { useSelector } from "react-redux";

interface LeaderboardProps {
  data: { fullname: string; points?: number }[];
}

const Leaderboard: React.FC<LeaderboardProps> = ({ data }) => {
  const { status } = useSelector((state: RootState) => state.users);
  const [search, setSearch] = useState("");
  const [sortType, setSortType] = useState("pointsDesc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filtering data based on search input
  const filteredData = data.filter((item) =>
    item.fullname.toLowerCase().includes(search.toLowerCase())
  );

  // Sorting data
  const sortedData = filteredData.sort((a, b) => {
    if (sortType === "nameAsc") return a.fullname.localeCompare(b.fullname);
    if (sortType === "nameDesc") return b.fullname.localeCompare(a.fullname);
    if (sortType === "pointsAsc") return a.points! - b.points!;
    if (sortType === "pointsDesc") return b.points! - a.points!;
    return 0;
  });

  // Pagination calculations
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const [currentLeaderBoard, setCurrentLeaderBoard] = useState("Individuals");

  return (
    <div className="mt-8 mx-4">
      <div className="flex gap-8 items-center justify-center">
        <h2
          className={`font-semibold mb-8 text-center underline underline-offset-8 ${
            currentLeaderBoard === "Individuals" ? "text-secondary" : ""
          }`}
          onClick={() => setCurrentLeaderBoard("Individuals")}
        >
          Individuals
        </h2>
        <h2
          className={`font-semibold mb-8 text-center underline underline-offset-8 ${
            currentLeaderBoard === "Groups" ? "text-secondary" : ""
          }`}
          onClick={() => setCurrentLeaderBoard("Groups")}
        >
          Groups
        </h2>
      </div>

      {currentLeaderBoard === "Individuals" ? (
        <>
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
              className="select select-bordered w-1/2"
              onChange={(e) => setSortType(e.target.value)}
              defaultValue={sortType}
            >
              <option disabled value="">
                Sort by
              </option>
              <option value="nameAsc">Names (A-Z)</option>
              <option value="nameDesc">Names (Z-A)</option>
              <option value="pointsAsc">Lowest Points</option>
              <option value="pointsDesc">Highest Points</option>
            </select>
          </div>

          {status !== "loading" && paginatedData.length > 0 ? (
            <div className="mt-4 shadow-md rounded-lg">
              <table className="table-auto w-full">
                <thead>
                  <tr>
                    <th className="px-4 py-2">No</th>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Points</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map((entry, index) => (
                    <tr key={index}>
                      <th className="border px-4 py-2">
                        {(currentPage - 1) * itemsPerPage + index + 1}
                      </th>
                      <td className="border text-start px-4 py-2">
                        {entry.fullname}
                      </td>
                      <td className="border px-4 py-2">{entry.points}</td>
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
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
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
              No data available
            </div>
          )}
        </>
      ) : (
        <GroupLeaderBoard />
      )}
    </div>
  );
};

export default Leaderboard;
