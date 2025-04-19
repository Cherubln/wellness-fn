"use client";
import React from "react";
import {
  FaInstagram,
  FaWhatsapp,
  FaChevronRight,
  FaTag,
  FaCalendarAlt,
  FaChartLine,
} from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { ImPriceTags } from "react-icons/im";
import { ServiceType } from "@/app/type";
import Link from "next/link";

interface ActivityCardProps {
  activity: ServiceType;
}

const ActivityCardPage: React.FC<ActivityCardProps> = ({ activity }) => {
  return (
    <div className="w-full bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Header with Image and Discount Tag */}
      <div className="relative h-64 bg-indigo-900 flex items-center justify-center">
        <img
          src={activity.images[0] || "https://via.placeholder.com/300"}
          alt={activity.activityName}
          className="w-full h-full object-cover"
        />
        {/* {true && (
          <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full flex items-center gap-2">
            <FaTag className="w-4 h-4" />
            <span className="font-bold">
              {Math.floor(activity?.price! / 1000)}% OFF
            </span>
          </div>
        )} */}
      </div>

      {/* Main Content */}
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-900">
          {activity.activityName}
        </h1>

        {/* Price and Details */}
        <div className="border-t border-gray-200 pt-4 mt-4">
          <div className="flex justify-between items-center mb-3">
            {activity.price && (
              <div className="flex items-center gap-2">
                <ImPriceTags className="w-5 h-5 text-stone-500" />
                <span className="font-bold text-green-600">
                  KES {activity.price.toLocaleString()}
                </span>
              </div>
            )}
          </div>

          {/* Location and Availability */}

          <div className="flex flex-col gap-2">
            <span className="flex items-center gap-2">
              <FaCalendarAlt className="w-5 h-5 text-gray-500" />
              <span className="text-gray-600 font-semibold">Availability</span>
            </span>
            <span className="text-slate-500">{activity.availability}</span>
          </div>
        </div>

        {/* Description */}
        <p className="mt-4 text-gray-700 text-sm">{activity.description}</p>

        {/* Social Links */}
        <div className="mt-6">
          <h1 className="text-sm font-semibold">Our Social Account</h1>
          <div className="flex items-center gap-4 mt-2">
            <a
              href={activity.provider.whatsappLink}
              className="text-green-500 hover:text-green-600"
            >
              <FaWhatsapp className="w-6 h-6" />
            </a>
            <a
              href={activity.provider.instagramLink}
              className="text-pink-500 hover:text-pink-600"
            >
              <FaInstagram className="w-6 h-6" />
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-2 pt-4 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Brought to you by{" "}
              <span className="font-bold text-gray-700">
                {activity.provider.name || "Unknown Provider"}
              </span>
            </div>
            <Link href={"/dashboard"}>
              <button className="flex items-center gap-2 text-secondary/80 hover:text-secondary">
                View more
                <FaChevronRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityCardPage;
