// components/Leaderboard.tsx
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

interface LeaderboardProps {
  data: { fullname: string; points?: number }[];
}

const Leaderboard: React.FC<LeaderboardProps> = ({ data }) => {
  const [search, setSearch] = useState("");
  const [sortType, setSortType] = useState("");

  const filteredData = data.filter((item) =>
    item.fullname.toLowerCase().includes(search.toLowerCase())
  );

  const sortedData = filteredData.sort((a, b) => {
    if (sortType === "nameAsc") return a.fullname.localeCompare(b.fullname);
    if (sortType === "nameDesc") return b.fullname.localeCompare(a.fullname);
    if (sortType === "pointsAsc") return a.points! - b.points!;
    if (sortType === "pointsDesc") return b.points! - a.points!;
    return 0;
  });
  return (
    <div className="mt-4 mx-4">
      <h2 className="text-lg font-semibold mb-8 text-center underline underline-offset-8">
        Leaderboard
      </h2>
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
      <div className="mt-4 shadow-md rounded-lg">
        <table className="table-auto w-full">
          <thead className="text-">
            <tr>
              <th className="px-4 py-2">No</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Points</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((entry, index) => (
              <tr key={index}>
                <th className="border px-4 py-2">{index + 1}</th>
                <td className="border px-4 py-2">{entry.fullname}</td>
                <td className="border px-4 py-2">{entry.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
