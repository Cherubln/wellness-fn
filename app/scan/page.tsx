/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { FunctionComponent, useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Scanner } from "@yudiel/react-qr-scanner";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { IUser, scanForPoints } from "../store/slices/authSlice";
import useAuth from "../hooks/useAuth";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const Scan = () => {
  useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isOutsideScanned, setisOutsideScanned] = useState("");
  const { user, statusType, error, ...auth } = useSelector(
    (state: RootState) => state.auth
  );
  const [isError, setIsError] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const handleScan = async (result: any) => {
    if (Array.isArray(result) && result[0].rawValue) {
      const id = new URL(result[0].rawValue).searchParams.get("id")!;

      if (!user._id) {
        return setIsError("Please login to scan");
      }
      if (!id) {
        return setIsError("Invalid QR code");
      }
      const resulted = await dispatch(
        scanForPoints({ qrCodeID: id, userID: user._id! })
      );

      if (resulted.payload.error) {
        setIsError(resulted.payload.error);
      } else {
        localStorage.setItem("qrScanned", JSON.stringify({ qrScanned: true }));
        router.push(
          `/dashboard?state=${encodeURIComponent(
            JSON.stringify({ qrScanned: true })
          )}`
        );
      }
    }
  };

  const handleParams = async () => {
    const id = searchParams.get("id");

    if (id) {
      if (!user._id) {
        setisOutsideScanned(id);
        return setIsError("Please login to scan");
      }
      const resulted = await dispatch(
        scanForPoints({ qrCodeID: id, userID: user._id! })
      );

      if (resulted.payload.error) {
        setIsError(resulted.payload.error);
      } else {
        router.push(
          `/dashboard?state=${encodeURIComponent(
            JSON.stringify({ qrScanned: true })
          )}`
        );
      }
      return;
    }
  };
  useEffect(() => {
    handleParams();
  }, [user]);

  if (statusType === "loading") {
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

      {isError ? (
        <div className="flex flex-col gap-3 items-center">
          <p className="py-5  m-auto text-center text-white font-semibold alert  w-72 bg-red-500">
            {error || isError}
          </p>
          {user._id && isError ? (
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
      {!user._id && isError && (
        // add a login button here redirecting to the login page /login
        <div className="py-5 m-auto text-center">
          <span
            onClick={() => {
              router.push(`/auth`);
              localStorage.setItem("isScanned", isOutsideScanned);
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
      <Scan />
    </Suspense>
  );
};
export default FinalScan;
