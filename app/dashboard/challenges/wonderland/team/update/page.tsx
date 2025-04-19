"use client";

import { useEffect, useState } from "react";
import { Card } from "@/app/components/googleFit/card";
import Button from "@/app/components/home/button";
import { useRouter } from "next/navigation";
import SelectUser, { UserInfo } from "@/app/components/user/selectUser";
import { extractUserInfo } from "@/app/utils/filters";
import {
  GetAllUsers,
  GetMemberGroup,
  UpdateWonderlandTeam,
} from "@/app/api/userApi/action";
import { UserData, WonderlandTeamType } from "@/app/type";
import { decodeJWT } from "@/app/utils/decode";
import { motion } from "framer-motion";

export default function UpdateTeam() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [selected, setSelected] = useState<UserInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();
  const [group, setGroup] = useState<WonderlandTeamType[]>([]);

  const [leader, setLeader] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = decodeJWT(token);
      setLeader(decoded);
      getUserGroups(decoded._id);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");

    try {
      const ids = selected.map((u) => u.id);
      const formdata = {
        members: group[0]?.members.concat(ids),
      };

      const result = await UpdateWonderlandTeam(group[0]._id, formdata);

      if (result) {
        setSuccessMessage("🎉 Your team was created successfully!");
      }
    } catch (error) {
      console.log({ error });
      setSuccessMessage("❌ Failed to create team. Please try again.");
    } finally {
      setLoading(false);
      setSelected([]);
    }
  };

  const getUserGroups = async (userId: string) => {
    try {
      const result = await GetMemberGroup(userId);
      if (result) {
        setGroup(result);
      }
    } catch (error) {
    } finally {
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const fetched = await GetAllUsers();
        setUsers(fetched.availableUsers);
      } catch (error) {
        console.error("Error fetching users", error);
      }
    })();
  }, []);

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
                ? router.push("/dashboard/challenges/wonderland/team/update")
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
              Add Team Member
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="teamMemberInput"
                  className="block font-medium text-sm pl-2 text-slate-500"
                >
                  Add New Member (max: 10)
                </label>
                <SelectUser
                  allUsers={extractUserInfo(users)}
                  onSelect={(selectedUsers) => setSelected(selectedUsers)}
                  placeholder="Search user by name"
                />
              </div>

              <Button title={loading ? "Creating..." : "Create Team"} />
            </form>
          </Card>
        </div>
      )}
    </>
  );
}
