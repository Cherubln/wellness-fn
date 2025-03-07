"use client";

import { UserType } from "@/app/utils/type";
import { useState, useEffect } from "react";
import {
  FaUser,
  FaEnvelope,
  FaStar,
  FaUsers,
  FaGamepad,
  FaEdit,
  FaCheck,
} from "react-icons/fa";
import Loader from "../loader";

const UserProfileData = ({ user }: { user: UserType | null }) => {
  const [loading, setLoading] = useState(true);
  const [editField, setEditField] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        fullname: user.fullname || "",
        username: user.username || "",
        email: user.email || "",
      });
      setLoading(false);
    }
  }, [user]);

  const handleEdit = (field: string) => {
    setEditField(field);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [editField as string]: e.target.value });
  };

  const handleSave = () => {
    setEditField(null);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="w-full max-w-2xl p-6 bg-white shadow-lg rounded-2xl">
      <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
        User Profile
      </h2>
      <ul className="space-y-4">
        {/* Full Name */}
        <li className="flex items-center justify-between gap-3 p-3 bg-gray-50 rounded-lg shadow-sm">
          <div className="flex items-center gap-3">
            <FaUser className="text-secondary text-lg" />
            <span className="font-semibold text-gray-600">Name:</span>
            {editField === "fullname" ? (
              <input
                type="text"
                value={formData.fullname}
                onChange={handleChange}
                className="border-b border-gray-400 outline-none bg-transparent text-gray-800"
                autoFocus
              />
            ) : (
              <span className="text-gray-800">{formData.fullname}</span>
            )}
          </div>
          {editField === "fullname" ? (
            <FaCheck
              className="text-green-500 cursor-pointer"
              onClick={handleSave}
            />
          ) : (
            <FaEdit
              className="text-gray-500 cursor-pointer"
              onClick={() => handleEdit("fullname")}
            />
          )}
        </li>

        {/* Username */}
        <li className="flex items-center justify-between gap-3 p-3 bg-gray-50 rounded-lg shadow-sm">
          <div className="flex items-center gap-3">
            <FaUser className="text-secondary text-lg" />
            <span className="font-semibold text-gray-600">User Name:</span>
            {editField === "username" ? (
              <input
                type="text"
                value={formData.username}
                onChange={handleChange}
                className="border-b border-gray-400 outline-none bg-transparent text-gray-800"
                autoFocus
              />
            ) : (
              <span className="text-gray-800">{formData.username}</span>
            )}
          </div>
          {editField === "username" ? (
            <FaCheck
              className="text-green-500 cursor-pointer"
              onClick={handleSave}
            />
          ) : (
            <FaEdit
              className="text-gray-500 cursor-pointer"
              onClick={() => handleEdit("username")}
            />
          )}
        </li>

        {/* Email */}
        <li className="flex items-center justify-between gap-3 p-3 bg-gray-50 rounded-lg shadow-sm">
          <div className="flex items-center gap-3">
            <FaEnvelope className="text-secondary text-lg" />
            <span className="font-semibold text-gray-600">Email:</span>
            {editField === "email" ? (
              <input
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="border-b border-gray-400 outline-none bg-transparent text-gray-800"
                autoFocus
              />
            ) : (
              <span className="text-gray-800">{formData.email}</span>
            )}
          </div>
          {editField === "email" ? (
            <FaCheck
              className="text-green-500 cursor-pointer"
              onClick={handleSave}
            />
          ) : (
            <FaEdit
              className="text-gray-500 cursor-pointer"
              onClick={() => handleEdit("email")}
            />
          )}
        </li>

        {/* Points */}
        <li className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg shadow-sm">
          <FaStar className="text-yellow-500 text-lg" />
          <span className="font-semibold text-gray-600">Points:</span>
          <span className="text-gray-800">{user?.points ?? "N/A"}</span>
        </li>

        {/* Favorite Activity */}
        <li className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg shadow-sm">
          <FaGamepad className="text-green-500 text-lg" />
          <span className="font-semibold text-gray-600">
            Favorite Activity:
          </span>
          <span className="text-gray-800">
            {user?.favoriteActivity || "N/A"}
          </span>
        </li>

        {/* My Groups */}
        <li className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg shadow-sm">
          <FaUsers className="text-blue-500 text-lg" />
          <span className="font-semibold text-gray-600">My Groups:</span>
          <span className="text-gray-800">
            {user?.groups?.length
              ? user.groups.map((item: string, index: number) => (
                  <span
                    key={index}
                    className="bg-gray-200 px-2 py-1 rounded-md text-sm mx-1"
                  >
                    {item}
                  </span>
                ))
              : "N/A"}
          </span>
        </li>
      </ul>
    </div>
  );
};

export default UserProfileData;
