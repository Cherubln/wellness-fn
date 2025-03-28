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


function ActivityCard() {
  return (
    <div className="w-full bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Header with Image and Discount Tag */}
      <div className="relative h-64 bg-indigo-900">
        <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full flex items-center gap-2">
          <FaTag className="w-4 h-4" />
          <span className="font-bold">20% OFF</span>
        </div>
        <div className="absolute inset-0 flex items-center justify-between p-6">
          <div className="text-white">
            <h1 className="text-3xl font-bold mb-2">Afya Huru</h1>
            <h2 className="text-xl">Wellness Package</h2>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Price and Details */}
        <div className="border-t border-gray-200 pt-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <FaChartLine className="w-5 h-5 text-orange-500" />
              <span className="text-gray-600 font-semibold">
                Points Earned:
              </span>
              <span className="text-slate-500">500</span>
            </div>
            <div className="flex items-center  gap-2 ">
              <ImPriceTags className="w-5 h-5 text-stone-500" />
              <span className="font-bold text-green-600">KES 10,499.00</span>
            </div>
          </div>

          {/* Location and Hours */}
          <div className="flex  gap-2 mb-4">
            <IoLocationOutline className="w-5 h-5 text-red-700" />
            <span className="text-gray-600 font-semibold">
              Home & Office Collection
            </span>
            <FaCalendarAlt className="w-5 h-5 text-gray-500 ml-4" />
            <span className="text-gray-600 font-semibold">Walk-In:</span>
            <span className="text-slate-500">7am - 8pm</span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4 mt-6">
            <a href="#" className="text-green-500 hover:text-green-600">
              <FaWhatsapp className="w-6 h-6" />
            </a>
            <a href="#" className="text-pink-500 hover:text-pink-600">
              <FaInstagram className="w-6 h-6" />
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Brought to you by{" "}
              <span className="font-bold text-gray-700">Pathcare Kenya</span>
            </div>
            <button className="flex items-center gap-2 text-blue-500 hover:text-blue-600">
              View more
              <FaChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ActivityCard;
