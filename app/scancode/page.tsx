/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { FunctionComponent, useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Scanner } from "@yudiel/react-qr-scanner";

import { decodeJWT } from "../utils/decode";
import { GetMemberGroup, ScanQRCode } from "../api/userApi/action";
import { WonderlandTeamType } from "../type";
import { useAppContext } from "../context";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const ScanCode = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [group, setGroup] = useState<WonderlandTeamType[]>([]);
  const [isError, setIsError] = useState("");

  const handleScan = async (result: any) => {
    if (Array.isArray(result) && result[0].rawValue) {
      const riddleId = new URL(result[0].rawValue).searchParams.get(
        "riddleId"
      )!;

      if (!group[0]?._id) {
        return setIsError("Please login to scan");
      }
      if (!riddleId) {
        return setIsError("Invalid QR code");
      }
      try {
        const resulted = await ScanQRCode(group[0]?._id, { riddleId });
        if (resulted) {
          
          router.push("/dashboard/challenges/wonderland/hunt");
        }
      } catch (error) {
        setIsError("QR code has already been scanned");
      }
    }
  };

  const handleParams = async (groupId: string) => {
    const riddleId = searchParams.get("riddleId");

    if (riddleId) {
      if (!groupId) {
        return setIsError("Please login to scan");
      }
      
      try {
        const resulted = await ScanQRCode(groupId, { riddleId });
        if (resulted) {
          
          router.push("/dashboard/challenges/wonderland/hunt");
        }
      } catch (error) {
        setIsError("QR code has already been scanned");
      }
    }
  };

  const getUserGroups = async () => {
    const token = localStorage.getItem("token") as string;
    const user = decodeJWT(token);
    try {
      const result = await GetMemberGroup(user._id);

      if (result) {
        setGroup(result);
        handleParams(result[0]?._id);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getUserGroups();
  }, []);

  if (group.length <= 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }

 

  return (
    <div className="py-4">
      <div className="flex justify-center">
        <img
          src="/images/3.png"
          alt="logo"
          className="object-contain w-2/3 h-auto"
        />
      </div>
      <div className="my-6 m-auto text-center">
        <p> Scan the QR code using the following box</p>
        <p>Make sure to make the QR centered</p>
      </div>

      {isError.length > 0 ? (
        <div className="flex flex-col gap-3 items-center">
          <p className="py-5  m-auto text-center text-white font-semibold alert  w-72 bg-red-500">
            {isError}
          </p>
          {group[0]?._id && isError ? (
            <p
              className="text-secondary/80 hover:text-secondary"
              onClick={() => setIsError("")}
            >
              Click here to start again.
            </p>
          ) : (
            ""
          )}
        </div>
      ) : (
        <div className="flex flex-row justify-center">
          <div className="w-[300px] h-[300px]">
            {<Scanner components={{ audio: false }} onScan={handleScan} />}
          </div>
        </div>
      )}
      {!group[0]?._id && isError && (
        // add a login button here redirecting to the login page /login
        <div className="py-5 m-auto text-center">
          <span
            onClick={() => {
              router.push(`/auth`);
            }}
            className=" text-secondary/80 hover:text-secondary"
          >
            Login
          </span>
        </div>
      )}
    </div>
  );
};
const FinalScan: FunctionComponent = () => {
  return (
    <Suspense>
      <ScanCode />
    </Suspense>
  );
};
export default FinalScan;
