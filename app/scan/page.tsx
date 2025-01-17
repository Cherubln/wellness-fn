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
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const Scan = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [qrResult, setQrResult] = useState(null);
  const { user, ...auth } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  const handleScan = async (result: any) => {
    if (Array.isArray(result) && result[0].rawValue) {
      const id = new URL(result[0].rawValue).searchParams.get("id")!;

      console.log({ id });
      await dispatch(scanForPoints({ qrCodeID: id, userID: user._id! }));
      router.push("/dashboard");
    }
  };

  const handleParams = async () => {
    const id = searchParams.get("id");

    if (id) {
      await handleScan(id);
      return;
    }
  };
  useEffect(() => {
    handleParams();
  }, []);

  return (
    <div className="">
      <div className="py-5 my-6 m-auto text-center">
        <p> Scan the QR code using the following box</p>
        <p>Make sure to make the QR centered</p>
      </div>

      <div className="flex flex-row justify-center">
        <div className="w-[300px] h-[300px]">
          {<Scanner components={{ audio: false }} onScan={handleScan} />}
        </div>
      </div>
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
