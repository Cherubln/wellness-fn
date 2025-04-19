"use client";

import { GetGroupRanking, GetGroupRankingTop } from "@/app/api/userApi/action";
import { Card } from "@/app/components/googleFit/card";
import Loader from "@/app/components/loader";
import { WonderlandTeamType } from "@/app/type";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaAward, FaMedal, FaTrophy } from "react-icons/fa6";

export default function Leaderboard() {
  const [teams, setTeams] = useState<WonderlandTeamType[]>([]);
  const [topTeam, setTopTeam] = useState<WonderlandTeamType[]>([]);
  const router = useRouter();
  const [loading, setloading] = useState(false);
  const [loadingGroup, setloadingGroup] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      loadLeaderboard();
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setloading(true);
    setloadingGroup(true);
    loadLeaderboard();
  }, []);

  const loadLeaderboard = async () => {
    const data = await GetGroupRanking();
    const result = await GetGroupRankingTop();

    if (data) {
      setloadingGroup(false);
      setTeams(data);
    }
    if (result) {
      setloading(false);
      setTopTeam(result);
    }
  };

  if (loadingGroup && loading) return <Loader />;

  return (
    <>
      <div className="flex px-3 items-center justify-between">
        <motion.div
          whileHover={{ scale: 0.9 }}
          onClick={() => router.push("/dashboard/challenges/wonderland")}
          transition={{ duration: 0.1 }}
          className="px-4 py-3 bg-slate-50 font-bold w-fit rounded-lg cursor-pointer hover:bg-slate-100"
        >
          ← Go back
        </motion.div>
        <motion.div
          whileHover={{ scale: 0.9 }}
          onClick={() => {
            loadLeaderboard();
            setloading(true);
            setloadingGroup(true);
          }}
          transition={{ duration: 0.1 }}
          className="px-4 py-3 bg-slate-50 font-bold w-fit rounded-lg cursor-pointer hover:bg-slate-100"
        >
          🔃 Refresh
        </motion.div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-12">Leaderboard</h1>

          {/* Top 3 Highlights */}
          <div className="grid md:grid-cols-3 max-md:grid gap-6 mb-12">
            <Card className={`p-6 text-center relative`}>
              <div className="absolute top-2 right-2 w-8 h-8 rounded-full text-white text-lg bg-yellow-600 flex items-center justify-center font-bold mb-4">
                {2}
              </div>
              <FaTrophy className={`w-12 h-12 mx-auto mb-4 `} />
              <h3 className="font-semibold mb-2 capitalize">
                {topTeam[1]?.groupName || "------"}
              </h3>
              <p className="text-2xl font-bold mb-1">
                {topTeam[1]?.groupPoints.toLocaleString() || 0}
              </p>
              <p className="text-muted-foreground">Points</p>
            </Card>

            <Card
              className={
                "border p-6 text-center shadow-xl md:scale-110 relative"
              }
            >
              <div className="absolute top-2 right-3 w-10 h-10 rounded-full text-white text-xl bg-yellow-600 flex items-center justify-center font-bold mb-4">
                {1}
              </div>
              <FaMedal className={`w-12 h-12 mx-auto mb-4 text-secondary `} />
              <h3 className="font-semibold mb-2 capitalize">
                {topTeam[0]?.groupName || "------"}
              </h3>
              <p className="text-2xl font-bold mb-1">
                {topTeam[0]?.groupPoints.toLocaleString() || 0}
              </p>
              <p className="text-muted-foreground">Points</p>
            </Card>
            <Card className={`p-6 text-center relative`}>
              <div className="absolute top-2 right-2 w-8 h-8 rounded-full text-white text-xl bg-yellow-600 flex items-center justify-center font-bold mb-4">
                {3}
              </div>
              <FaAward className={`w-12 h-12 mx-auto mb-4`} />
              <h3 className="font-semibold mb-2 capitalize">
                {topTeam[2]?.groupName || "------"}
              </h3>
              <p className="text-2xl font-bold mb-1">
                {topTeam[2]?.groupPoints.toLocaleString() || 0}
              </p>
              <p className="text-muted-foreground">Points</p>
            </Card>
          </div>

          {/* Full Table */}
          <Card className="overflow-x-scroll hide-scrollbar">
            <div className="p-4">
              <table className="w-full min-w-[500px]">
                <thead>
                  <tr className="border-b text-nowrap">
                    <th className="pb-4 px-2">Rank</th>
                    <th className="pb-4 px-2 ">Team</th>
                    <th className="pb-4 px-2">Total Members</th>
                    <th className="pb-4 px-2">Points</th>
                    <th className="pb-4 px-2">Total Time Used</th>
                    <th className="pb-4 px-2">Solved Riddles</th>
                  </tr>
                </thead>
                <tbody>
                  {teams.length === 0 ? (
                    <tr>
                      <td colSpan={6}>
                        <div className="flex justify-center items-center h-80 text-gray-500 text-lg font-medium bg-gray-50 rounded-md">
                          🚫 No teams found. Please create team first and come
                          back later.
                        </div>
                      </td>
                    </tr>
                  ) : (
                    [...teams]
                      .sort((a, b) => b.groupPoints - a.groupPoints)
                      .map((team, index) => (
                        <tr key={team._id} className="border-b last:border-0">
                          <td className="py-4 text-center">{index + 1}</td>
                          <td className="py-4 flex justify-start">
                            <div className="flex items-center capitalize text-nowrap">
                              <div
                                className={`w-8 h-5 mr-3 rounded-sm `}
                                style={{ backgroundColor: team?.teamColor }}
                              />
                              {team.groupName}
                            </div>
                          </td>
                          <td className="py-4 text-center font-semibold">
                            {team.members.length}
                          </td>
                          <td className="py-4 text-center font-semibold">
                            {team.groupPoints}
                          </td>
                          <td className="py-4 text-center font-semibold">
                            {team.totalTimeUsed}
                          </td>
                          <td className="py-4 text-center font-semibold">
                            {team.riddles.length}
                          </td>
                        </tr>
                      ))
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
