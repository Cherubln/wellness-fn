'use client'
import { extractUserInfo } from "@/app/utils/filters";
import { GetAllUsers, CreateRoles } from "@/app/api/userApi/action";
import { UserData } from "@/app/type";
import React, { useEffect, useState } from "react";
import SelectUser, { UserInfo } from "@/app/components/user/selectUser";

const ManageUserRoles = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [selected, setSelected] = useState<UserInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(false);

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

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const emails = selected.map((u) => u.email);
      const result = await CreateRoles(emails);
      if (result) setStatus(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setSelected([]);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow rounded-lg">
      <h1 className="text-xl font-bold mb-4 text-slate-700">
        Assign Roles to Users
      </h1>

      {status ? (
        <div className="bg-green-100 text-green-800 p-4 rounded-md mb-4 text-center">
          🎉 Roles successfully assigned!
        </div>
      ) : (
        <>
          <SelectUser
            allUsers={extractUserInfo(users)}
            onSelect={(selectedUsers) => setSelected(selectedUsers)}
            placeholder="Search user by name"
          />

          <button
            onClick={handleSubmit}
            disabled={selected.length === 0 || loading}
            className={`mt-6 px-6 py-2 font-semibold rounded-full transition ${
              selected.length === 0
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-secondary/70 text-white hover:bg-secondary"
            }`}
          >
            {loading ? "Assigning..." : "Assign Role"}
          </button>
        </>
      )}
    </div>
  );
};

export default ManageUserRoles;
