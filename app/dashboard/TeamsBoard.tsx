// components/Leaderboard.tsx
"use client";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import CreateTeamModal from "./CreateTeamModel";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { fetchGroups } from "../store/slices/groupsSlice";

const TeamsBoard = ({ userId }: { userId: string }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { groups, status } = useSelector((state: RootState) => state.groups);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isModalOpen === false) dispatch(fetchGroups(userId));
  }, [dispatch, isModalOpen, userId]);

  return (
    <>
      <div className="p-4 bg-base-100 ">
        <h2 className="font-semibold mb-4 text-center underline underline-offset-8">
          Your Teams
        </h2>

        {status !== "loading" && groups.length > 0 ? (
          <div className="shadow-md rounded-lg">
            <div className="flex justify-end mt-8">
              <button
                className="btn bg-secondary/80 hover:bg-secondary text-white btn-sm border-none"
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
                {groups.map((entry, index) => (
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
            You have not created/joined any team yet
            <div className="flex justify-center mt-8">
              <button
                className="btn bg-secondary/80 hover:bg-secondary text-white btn-sm border-none"
                onClick={() => setIsModalOpen(true)}
              >
                <FaPlus className="" />
                Add team
              </button>
              <CreateTeamModal isOpen={isModalOpen} onClose={setIsModalOpen} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TeamsBoard;
