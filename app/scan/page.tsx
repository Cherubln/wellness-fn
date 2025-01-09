/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { FunctionComponent, useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Scanner } from "@yudiel/react-qr-scanner";
import { useDispatch, useSelector } from "react-redux";
import { addResult } from "@/app/store/scan/scanResSlice";
import { setUser } from "@/app/store/user/user";
import { RootState } from "@/app/store";

const Scan = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [userFromLs, setUserFromLs] = useState<any>();
  const [qrResult, setQrResult] = useState(null);
  const user = useSelector((state: RootState) => state.userInfo.user);
  const results = useSelector((state: RootState) => state.scanResults.results);
  const dispatch = useDispatch();
  const updateUser = async (
    id: string,
    token: string,
    points: any,
    hasScanned: any
  ) => {
    const response = await fetch(
      `https://localhost:3005/api/users/updateUser/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ points: points, hasScanned: hasScanned }),
      }
    );
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      // dispatch(setUser({...user, points: user.points + data.points}));
    } else {
      console.log("error", response.status, response);
    }
  };

  const getQrResult = async (id: string) => {
    const response = await fetch(`https://localhost:3005/api/qrs/getQr/${id}`);

    if (response.ok) {
      const data = await response.json();
      console.log("data", data.qrcode);
      setQrResult(data.qrcode);
      return data.qrcode;
    } else {
      console.log("error", response.status);
    }
  };

  const handleRegistration = async (result: any) => {
    console.log("register", result);

    if (
      !userFromLs &&
      !userFromLs?.fullname &&
      result &&
      result.type === "registration"
    ) {
      console.log("registering");
      dispatch(
        addResult({
          result: result.points,
          message: "Thanks for the registration",
        })
      );
      dispatch(
        setUser({
          ...user,
          type: result.dedicated === "active" ? "active" : "inactive",
          isActive: result.dedicated === "active",
          hasScanned: [result.name],
          points: result.points,
        })
      );
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...user,
          type: result.dedicated === "active" ? "active" : "inactive",
          isActive: result.dedicated === "active",
          points: result.points,
          hasScanned: [result.name],
        })
      );
      console.log("results", results);
      console.log("user from scan", user);
      router.push("/register");
      return;
    }
    if (userFromLs && result.type === "registration") {
      dispatch(addResult({ results: "", message: "Already registered" }));
      router.push("/dashboard");
      return;
    }
  };
  const handlePoints = async (data: any) => {
    console.log("points", data);
    console.log(userFromLs);
    if (data && data.type !== "registration") {
      const value = data.points;
      const userls = JSON.parse(localStorage.getItem("user") as any);
      const before = Number(userls.user.points);
      console.log("userls", userls.user.points);
      console.log("user", userls.user.hasScanned.includes(data.name));
      console.log("statuses", userls.user.status, data.dedicated);
      if (userls.user.status !== data.dedicated && data.dedicated !== "all") {
        dispatch(
          addResult({
            results: "",
            message: "You are not allowed to scan this",
          })
        );
        router.push("/dashboard");
        return;
      }
      if (userls && !userls.user.hasScanned.includes(data.name)) {
        userls.user.points += value;
        userls.user.hasScanned.push(data.name);
        let message = "";
        switch (data.name) {
          case "BeatStrike":
            message = `Feel the Pulse! ⚡️ Your heart is racing, your strength is rising. BeatStrike just pushed you one step closer to peak power!`;
            break;
          case "BeatGroove":
            message = `Feel that groove? It's all yours! 1100 points scored for mastering the BeatGroove. Keep moving to the beat!`;
            break;
          case "BeatStrong":
            message = `Strength unleashed! 💪 You're building muscle and resilience—1300 points added. Keep up the power!`;
            break;
          case "BeatFlow":
            message = `You're in perfect harmony! 🌱 Flexibility, balance, and mind-body alignment—1000 points well-earned. Keep that flow going!`;
            break;
          case "SquatKing":
          case "SquatQueen":
            message = `You've ruled the 🏆 squat throne! Power, endurance, and grit - King of Squats has crowned you a true champion!`;
            break;
          case "Penalty":
          case "Penalty1":
          case "Penalty2":
          case "Penalty3":
          case "Penalty4":
          case "Penalty5":
            message = `Uh-oh! Looks like you missed a beat or two, but there's always a comeback!`;
            break;
          default:
            message = `Hooray!`;
        }
        console.log("message", message);
        dispatch(addResult({ results: data.points, message: message }));
        dispatch(
          setUser({
            ...user,
            points: userls.user.points,
            hasScanned: userls.user.hasScanned,
          })
        );
        localStorage.setItem("user", JSON.stringify(userls));
        updateUser(
          userls.user._id,
          userls.token,
          userls.user.points,
          userls.user.hasScanned
        );
        router.push("/dashboard");
        return;
      }
      if (userls.user.hasScanned.includes(data.name)) {
        console.log("User has already scanned this QR code");
        dispatch(
          addResult({ results: "", message: "Already scanned this QR code" })
        );

        router.push("/dashboard");
        return;
      }
    }
  };
  const handleScan = async (result: any) => {
    console.log("result", result);
    let res = "";
    if (
      Array.isArray(result) &&
      result[0].rawValue.length > 0 &&
      result[0].rawValue.includes("http")
    ) {
      res = result[0].rawValue.slice(-24);
      console.log(res);
    } else {
      res = result;
    }

    if (res) {
      const fetchedData = await getQrResult(res);
      console.log(fetchedData);
      if (fetchedData && fetchedData.type === "registration") {
        await handleRegistration(fetchedData);
        return;
      } else {
        await handlePoints(fetchedData);
        return;
      }
    }
  };
  useEffect(() => {
    const userls = JSON.parse(localStorage.getItem("user") as string);
    console.log("userFromLs", userFromLs);
    setUserFromLs(userls);
  }, []);

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
