"use client";

import { useEffect, useState } from "react";
import { Card } from "@/app/components/googleFit/card";
import Button from "@/app/components/home/button";
import { useRouter } from "next/navigation";
import { color, motion } from "framer-motion";
import SelectUser, { UserInfo } from "@/app/components/user/selectUser";
import { extractUserInfo } from "@/app/utils/filters";
import {
  CreateWonderlandTeam,
  GetAllUsers,
  GetOccupiedColors,
} from "@/app/api/userApi/action";
import { UserData } from "@/app/type";
import { decodeJWT } from "@/app/utils/decode";

const TeamColors = [
  "red",
  "blue",
  "green",
  "purple",
  "orange",
  "yellow",
  "pink",
];

export default function CreateTeam() {
  const [teamName, setTeamName] = useState("");
  const [users, setUsers] = useState<UserData[]>([]);
  const [selected, setSelected] = useState<UserInfo[]>([]);
  const [teamColor, setTeamColor] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();
  const [occupiedColors, setOccupiedColors] = useState<string[]>([]);

  const [leader, setLeader] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = decodeJWT(token);
      setLeader(decoded);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setSuccessMessage("");

    try {
      const ids = selected.map((u) => u.id);
      const formdata = {
        groupName: teamName,
        members: ids,
        admin: leader._id,
        teamColor: teamColor,
      };

      const result = await CreateWonderlandTeam(formdata);

      if (result) {
        setSuccessMessage("🎉 Your team was created successfully!");
      }
    } catch (error) {
      setSuccessMessage("❌ Failed to create team. Please try again.");
    } finally {
      setTeamName("");
      setTeamColor("");
      setLoading(false);
      setSelected([]);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const fetched = await GetAllUsers();
        const result = await GetOccupiedColors();
        setOccupiedColors(result.occupiedColors);

        setUsers(fetched.availableUsers);
      } catch (error) {
        console.error("Error fetching users", error);
      }
    })();
  }, []);

  const AvailableColors = TeamColors.filter(
    (color) => !occupiedColors.includes(color)
  );

  return (
    <>
      <motion.div
        whileHover={{ scale: 0.95 }}
        onClick={() => router.back()}
        transition={{ duration: 0.1 }}
        className="px-4 py-3 bg-slate-50 w-fit font-bold rounded-lg cursor-pointer hover:bg-slate-100 mb-6"
      >
        ← Go back
      </motion.div>

      {successMessage ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className={`max-w-md mx-auto p-6 rounded-xl shadow-md text-center space-y-4
      ${
        successMessage.startsWith("❌")
          ? "bg-red-50 border border-red-200 text-red-800"
          : "bg-green-50 border border-green-200 text-green-800"
      }`}
        >
          <h2 className="text-2xl font-semibold">
            {successMessage.startsWith("❌") ? "Oops! 😓" : "Success 🎉"}
          </h2>
          <p className="text-md">{successMessage}</p>
          <button
            onClick={() =>
              successMessage.startsWith("❌")
                ? router.push("/dashboard/challenges/wonderland/team")
                : router.push("/dashboard/challenges/wonderland/hunt")
            }
            className={`text-sm underline transition-colors duration-200
        ${
          successMessage.startsWith("❌")
            ? "text-red-700 hover:text-red-900"
            : "text-green-700 hover:text-green-900"
        }`}
          >
            {successMessage.startsWith("❌") ? "Try again" : "Start hunting"}
          </button>
        </motion.div>
      ) : (
        <div className="container mx-auto px-4 py-8">
          <Card className="max-w-lg mx-auto p-8 shadow-lg">
            <h1 className="text-3xl font-bold mb-8 text-center text-slate-800">
              Create Your Team
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="teamName"
                  className="block font-medium text-sm pl-2 text-slate-500"
                >
                  Team Name
                </label>
                <input
                  id="teamName"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  placeholder="Enter team name"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="teamMemberInput"
                  className="block font-medium text-sm pl-2 text-slate-500"
                >
                  Add Team Member (max: 5)
                </label>
                <SelectUser
                  allUsers={extractUserInfo(users)}
                  onSelect={(selectedUsers) => setSelected(selectedUsers)}
                  placeholder="Search user by name"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="teamColor"
                  className="block font-medium text-sm pl-2 text-slate-500"
                >
                  Team Color
                </label>
                <select
                  id="teamColor"
                  value={teamColor}
                  onChange={(e) => setTeamColor(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="" disabled>
                    Select team color
                  </option>
                  {AvailableColors.map((color, index) => (
                    <option key={index} value={color} className="capitalize">
                      {color}
                    </option>
                  ))}
                </select>
              </div>

              <Button title={loading ? "Creating..." : "Create Team"} />
            </form>
          </Card>
        </div>
      )}
    </>
  );
}
