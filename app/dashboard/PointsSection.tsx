"use client";
import React, { useState } from "react";
import CountUp from "react-countup";
import Image from "next/image";
import { FaDownload } from "react-icons/fa";
import {} from "react-icons/fa";
import Link from "next/link";
import { BsQrCodeScan } from "react-icons/bs";
import { AppDispatch, RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { createQRCode, IServiceProvider } from "../store/slices/authSlice";
import { FaArrowsSpin } from "react-icons/fa6";

interface BalanceSectionProps {
  user: {
    points?: number;
    qrCode?: {
      image: string;
    };
  };
  isServiceExist: boolean;
}

const PointsSection: React.FC<BalanceSectionProps> = ({
  user,
  isServiceExist,
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector((state: RootState) => state.auth);

  const handleGenerate = async () => {
    setIsGenerating(true);

    await dispatch(
      createQRCode({
        name: (auth.user as IServiceProvider).name,
        owner: (auth.user as IServiceProvider)._id!,
      })
    );
    setIsGenerating(false);
  };

  const handleDownload = async () => {
    const response = await fetch((auth.user as IServiceProvider).qrCode!.image);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "QRCode.png"; // You can set the desired file name here
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col items-center justify-center  bg-base-100">
      <div className="text-lg font-semibold">
        {user.points ? (
          <div className="flex justify-end items-center gap-2 font-bold">
            <span className="text-xl">Points</span>
            <Link href="/scan">
              <BsQrCodeScan className="text-xl text-gray-600 font-bold" />
            </Link>
          </div>
        ) : user.qrCode?.image ? (
          "Your QR Code"
        ) : (
          ""
        )}
      </div>
      {auth.statusType !== "loading" ? (
        user.points ? (
          <p className="text-2xl my-2.5 text-secondary font-bold">
            <CountUp end={user.points!} />
          </p>
        ) : (auth.user as IServiceProvider)?.qrCode?.image && isServiceExist ? (
          <div className="flex flex-col justify-center items-center">
            <Image
              src={(auth.user as IServiceProvider).qrCode.image}
              alt="QR Code"
              width={100}
              height={100}
              className={`w-40 h-40 ${isGenerating ? "animate-pulse" : ""}`}
            />
            <div className="flex gap-4">
              <button
                onClick={handleGenerate}
                className=" mt-2 px-2 py-1 bg-secondary text-white text-sm rounded-lg shadow-md hover:bg-secondary/80 focus:outline-none focus:ring-2 focus:ring-secondary/60 focus:ring-opacity-75 transition duration-300 sm:px-4 sm:py-2 sm:text-base flex items-center justify-center"
                disabled={isGenerating}
              >
                {isGenerating ? "Generating" : "New QR Code"}
                <FaArrowsSpin className="inline-block ml-2" />
              </button>
              <button
                onClick={handleDownload}
                className="mt-2 px-2 py-1 bg-secondary text-white text-sm rounded-lg shadow-md hover:bg-secondary/80 focus:outline-none focus:ring-2 focus:ring-secondary/60 focus:ring-opacity-75 transition duration-300 sm:px-4 sm:py-2 sm:text-base flex items-center justify-center"
                disabled={isGenerating}
              >
                <FaDownload className="inline-block mr-2" />
                Download
              </button>
            </div>
          </div>
        ) : (
          <div className="w-32 h-32 border text-center text-sm text-neutral flex flex-col items-center justify-center p-2 gap-3">
            Your QR Code will appear here, once you have at least a service.
          </div>
        )
      ) : (
        <div>
          <span className="loading loading-ring loading-lg"></span>
        </div>
      )}
    </div>
  );
};

export default PointsSection;
