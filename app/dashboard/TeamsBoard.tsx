// components/Leaderboard.tsx
"use client";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import CreateTeamModal from "./CreateTeamModel";

interface LeaderboardProps {
  data: { name: string; points: number }[];
}

const TeamsBoard: React.FC<LeaderboardProps> = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="p-4 bg-base-100 shadow-md rounded-lg">
      <h2 className="text-lg font-semibold mb-4 text-center underline underline-offset-8">
        Your Teams
      </h2>
      <div className="flex justify-end mt-8">
        <button
          className="btn bg-secondary text-white btn-sm"
          onClick={() => setIsModalOpen(true)}
        >
          <FaPlus className="" />
          Add team
        </button>
        <CreateTeamModal isOpen={isModalOpen} onClose={setIsModalOpen} />
      </div>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left">Team Name</th>
            <th className="px-4 py-2 text-right">Points</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{entry.name}</td>
              <td className="border px-4 py-2 text-right">{entry.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeamsBoard;
