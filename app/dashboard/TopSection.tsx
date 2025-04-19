"use client";
import React, { useEffect, useState } from "react";
import { FaAngleDown, FaTrophy, FaUserCircle } from "react-icons/fa";
import { AiOutlineUser } from "react-icons/ai";
import { MdClose, MdLogout } from "react-icons/md";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { logout } from "@/app/store/slices/authSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { IoMdHome } from "react-icons/io";
import Link from "next/link";
import { FaListCheck, FaPeopleRoof } from "react-icons/fa6";

export interface TopSectionProps {
  user: {
    username?: string;
    name?: string;
    fullname?: string;
    role: string;
    profilePicture?: string;
    logo?: string;
    email?: string;
  };
}

const TopSection: React.FC<TopSectionProps> = ({ user }) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [isOpen, setIsOpen] = useState(false);

  const onLogout = () => {
    dispatch(logout());
    router.push("/auth");
  };

  useEffect(() => {
    // Monitor changes in the drawer's checkbox state
    const drawerInput = document.getElementById(
      "my-drawer"
    ) as HTMLInputElement;

    const handleDrawerChange = () => {
      setIsOpen(drawerInput?.checked || false);
    };

    drawerInput?.addEventListener("change", handleDrawerChange);

    return () => {
      drawerInput?.removeEventListener("change", handleDrawerChange);
    };
  }, []);

  return (
    <div className="drawer z-50">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content w-full md:container md:mx-auto md:max-w-4xl drop-shadow fixed bg-white">
        {/* Page content here */}
        <div className="flex justify-between items-center p-4 bg-base-100">
          <div className="flex items-center">
            <label
              htmlFor="my-drawer"
              className="drawer-button cursor-pointer flex gap-2 items-center border p-2 rounded-lg"
            >
              {user.profilePicture || user.logo ? (
                <Image
                  src={user.profilePicture! || user.logo!}
                  alt="User Avatar"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              ) : (
                <FaUserCircle className="text-4xl text-gray-600" />
              )}
              <span>
                <FaAngleDown
                  className={`text-lg text-gray-500 transform transition-transform duration-300 ${
                    isOpen ? "rotate-180" : "rotate-0"
                  }`}
                />
              </span>
            </label>
            <div className="ml-3">
              <p className="text-sm sm:text-lg font-semibold flex flex-col">
                <span>{user.role === "user" ? "Hello" : "Welcome"},</span>
                <span>{user.fullname || user.username || user.name}</span>
              </p>
            </div>
          </div>

          {/* logo */}
          <div className="flex items-center space-x-4">
            <Link href={"/dashboard"}>
              <img src="/images/3.png" alt="log" className="w-20 h-auto" />
            </Link>
          </div>
        </div>
      </div>

      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-[var(--background)] text-base-content min-h-full w-80 rounded-r-2xl">
          {/* Sidebar content here */}
          <div className="flex justify-between">
            <li>
              <div className="flex items-center">
                <FaUserCircle className="text-4xl text-gray-600" />
                <div className="flex flex-col text-sm ml-1">
                  <span className="font-bold">
                    {user.username || user.name}
                  </span>
                  <span className="capitalize">
                    {user.fullname || user.role}
                  </span>
                </div>
              </div>
            </li>
            <label
              htmlFor="my-drawer"
              className="drawer-button m-2 p-1 cursor-pointer self-start hover:bg-neutral/20 rounded-md"
            >
              <MdClose className="text-xl text-gray-600" />
            </label>
          </div>
          <div className="divider after:bg-neutral/20 before:bg-neutral/20 m-1 h-1"></div>
          <div className="mt-2 flex flex-col gap-2">
            <label htmlFor="my-drawer">
              <li
                onClick={() => router.push("/dashboard")}
                className="hover:bg-secondary/80 rounded-md py-2"
              >
                <div className="flex items-center">
                  <IoMdHome className="text-gray-600 text-xl" />
                  <a>Home</a>
                </div>
              </li>
            </label>

            {user.role === "service_provider" && (
              <label htmlFor="my-drawer">
                <li
                  onClick={() =>
                    router.push("/dashboard/service-provider/bookings")
                  }
                  className="hover:bg-secondary/80 rounded-md py-2"
                >
                  <div className="flex items-center">
                    <FaListCheck className="text-gray-600 text-xl" />
                    <a>Bookings</a>
                  </div>
                </li>
              </label>
            )}
            {user.role === "service_provider" &&
              (user.email === "admin@ape.com" ||
                user.email === "apertacurauser@gmail.com") && (
                <label htmlFor="my-drawer">
                  <li
                    onClick={() =>
                      router.push("/dashboard/service-provider/user")
                    }
                    className="hover:bg-secondary/80 rounded-md py-2"
                  >
                    <div className="flex items-center">
                      <FaPeopleRoof className="text-gray-600 text-xl" />
                      <a>Manage User</a>
                    </div>
                  </li>
                </label>
              )}

            {user.role !== "service_provider" && (
              <label htmlFor="my-drawer">
                <li
                  onClick={() => router.push("/dashboard/profile")}
                  className="hover:bg-secondary/80 rounded-md py-2"
                >
                  <div className="flex items-center">
                    <AiOutlineUser className="text-gray-600 text-xl" />
                    <a>Your profile</a>
                  </div>
                </li>
              </label>
            )}

            {user.role !== "service_provider" && (
              <label htmlFor="my-drawer">
                <li
                  onClick={() => router.push("/dashboard/leaderboard")}
                  className="hover:bg-secondary/80 rounded-md py-2"
                >
                  <div className="flex items-center">
                    <FaTrophy className="text-gray-600 text-xl" />
                    <a>LeaderBoard</a>
                  </div>
                </li>
              </label>
            )}

            <li
              className="hover:bg-secondary/80 rounded-md py-2"
              onClick={onLogout}
            >
              <div className="flex items-center">
                <MdLogout className="text-gray-600 text-xl" />
                <span>Sign out</span>
              </div>
            </li>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default TopSection;
