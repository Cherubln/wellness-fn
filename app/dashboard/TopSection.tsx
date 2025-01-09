import React from "react";
import { FaBell, FaUserCircle } from "react-icons/fa";
import { AiOutlineUser } from "react-icons/ai";
import { MdClose, MdLogout } from "react-icons/md";
import { BsQrCodeScan } from "react-icons/bs";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { logout } from "@/app/store/slices/authSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";

interface TopSectionProps {
  avatar?: string;
  username: string;
  role: string;
}

const TopSection: React.FC<TopSectionProps> = ({ avatar, username, role }) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const onLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  return (
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        <div className="flex justify-between items-center p-4 bg-base-100 ">
          <div className="flex items-center">
            <label htmlFor="my-drawer" className="drawer-button cursor-pointer">
              {avatar ? (
                <Image
                  src={avatar}
                  alt="User Avatar"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              ) : (
                <FaUserCircle className="text-4xl text-gray-600" />
              )}
            </label>
            <div className="ml-3">
              <p className="text-sm sm:text-lg font-semibold">
                {role === "user" ? "Hello" : "Welcome"}, {username}!
              </p>{" "}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <FaBell className="text-xl sm:text-2xl text-gray-600" />
            {role === "user" && (
              <Link href="/scan">
                <BsQrCodeScan className="text-xl sm:text-2xl text-gray-600" />
              </Link>
            )}
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
          {/* add a close button with a react icon */}

          <div className="flex justify-between">
            <li>
              <div className="flex items-center">
                <FaUserCircle className="text-4xl text-gray-600" />
                <div className="flex flex-col text-sm ml-1">
                  <span className="font-bold">{username}</span>
                  <span>Cherubin Ndikubwayo</span>
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
          <div className="divider after:bg-neutral/20 before:bg-neutral/20 m-1 h-1 "></div>
          <div className="mt-2 flex flex-col gap-2">
            <li className="hover:bg-secondary/80 rounded-md">
              <div className="flex items-center">
                <AiOutlineUser className="text-gray-600 text-xl" />
                <a>Your profile</a>
              </div>
            </li>
            <li className="hover:bg-secondary/80 rounded-md" onClick={onLogout}>
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
