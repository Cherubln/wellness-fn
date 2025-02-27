/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { AiOutlineUser } from "react-icons/ai";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getCorporateDetails } from "@/app/utils/corporate";
import { CorporateType } from "@/app/utils/type";
import { MdClose, MdLogout } from "react-icons/md";
import { IoMdHome } from "react-icons/io";

const CorporateNavBar = () => {
  const router = useRouter();
  const [user, setUser] = useState<CorporateType | null>(null);

  useEffect(() => {
    setUser(getCorporateDetails());
  }, []);

  const onLogout = () => {
    localStorage.removeItem("token");
    router.push("/auth");
  };

  return (
    <div className="drawer z-50">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content fixed w-full md:container md:mx-auto md:max-w-6xl drop-shadow bg-white">
        {/* Top Navigation Bar */}
        <div className="flex justify-between items-center p-4 bg-base-100">
          {/* User Profile Section */}
          <label
            htmlFor="my-drawer"
            className="drawer-button cursor-pointer flex items-center"
          >
            {user?.profilePicture ? (
              <Image
                src={user.profilePicture}
                alt="User Avatar"
                width={40}
                height={40}
                className="rounded-full"
              />
            ) : (
              <FaUserCircle className="text-4xl text-gray-600" />
            )}
            <div className="ml-3 text-sm sm:text-lg font-semibold">
              <p>{user?.companyName || "Corporate User"}</p>
            </div>
          </label>
          {/* Logo */}
          <img src="/images/5.jpg" alt="Company Logo" className="w-28 h-auto" />
        </div>
      </div>

      {/* Sidebar Drawer */}
      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-[var(--background)] text-base-content min-h-full w-80 rounded-r-2xl">
          {/* Sidebar Header */}
          <div className="flex justify-between items-center px-4 py-3">
            <div className="flex items-center">
              <FaUserCircle className="text-4xl text-gray-600" />
              <div className="ml-2 text-sm">
                <p className="font-bold">{user?.companyName}</p>
                <p className="text-gray-500">{user?.email}</p>
              </div>
            </div>
            <label
              htmlFor="my-drawer"
              className="drawer-button p-1 cursor-pointer hover:bg-neutral/20 rounded-md"
            >
              <MdClose className="text-xl text-gray-600" />
            </label>
          </div>

          <div className="divider m-1 h-1 after:bg-neutral/20 before:bg-neutral/20"></div>

          {/* Navigation Links */}
          <div className="mt-2 space-y-2">
            <li
              onClick={() => router.push("/corporate")}
              className="hover:bg-secondary/70 hover:font-semibold hover:duration-300 transition hover:text-white rounded-md "
            >
              <div className="flex items-center py-4">
                <IoMdHome className="text-gray-600 text-xl" />
                <span>Dashboard</span>
              </div>
            </li>
            <li
              onClick={() => router.push("/corporate/employee")}
              className="hover:bg-secondary/70 hover:font-semibold hover:duration-300 transition hover:text-white rounded-md"
            >
              <div className="flex items-center py-4">
                <AiOutlineUser className="text-gray-600 text-xl" />
                <span>Employee List</span>
              </div>
            </li>
            <li onClick={onLogout} className="hover:bg-secondary/70 hover:font-semibold hover:duration-300 transition hover:text-white rounded-md">
              <div className="flex items-center py-4">
                <MdLogout className="text-gray-600 text-xl" />
                <span>Sign Out</span>
              </div>
            </li>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default CorporateNavBar;
