"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { isTokenValid } from "../utils/auth";
import { logout } from "../store/slices/authSlice";
import TopSection from "./TopSection";
import PointsSection from "./PointsSection";
import WidgetsSection from "./WidgetsSection";
import Leaderboard from "./LeaderBoard";
import TeamsBoard from "./TeamsBoard";
import useAuth from "@/app/hooks/useAuth";
import { fetchAllUsers } from "@/app/store/slices/usersSlice";
import ServicesBoard from "./ServicesBoard";
import ReactConfetti from "react-confetti";
import { ToastContainer, toast } from "react-toastify";
import { Suspense } from "react";

const Dashboard = () => {
  useAuth();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector((state: RootState) => state.auth);

  const { users } = useSelector((state: RootState) => state.users);
  const { services } = useSelector((state: RootState) => state.services);
  const searchParams = useSearchParams();
  const state = searchParams.get("state");
  const alert = () => {
    toast(
      "You've ruled the 🏆 squat throne! Power, endurance, and grit - King of Squats has crowned you a true champion!",
      {
        position: "top-center",
        autoClose: 8000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        // transition: {"Bounce" as ToastTransition}
      }
    );
  };
  const display = () => {
    if (state) {
      const qrScanned = JSON.parse(decodeURIComponent(state)).qrScanned;
      if (qrScanned) {
        return (
          <div>
            <ReactConfetti tweenDuration={1000} recycle={false} />
          </div>
        );
      }
    }
  };

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  useEffect(() => {
    if (state) {
      const qrScanned = JSON.parse(decodeURIComponent(state)).qrScanned;
      if (qrScanned) {
        alert();
      }
    }
  }, [searchParams, state]);

  const leaderboardData = users;
  const [selectedWidget, setSelectedWidget] = useState<string | null>(
    auth.user.role === "user" ? "Leaderboard" : "Services"
  );

  const handleWidgetClick = (widget: string) => {
    setSelectedWidget(widget);
  };

  useEffect(() => {
    if (!isTokenValid()) {
      dispatch(logout());
      router.push("/");
    }
  }, [dispatch, router]);

  if (auth.user.role) {
    return (
      <>
        <ToastContainer />
        <div className="md:container md:mx-auto md:max-w-4xl">
          <TopSection user={auth.user} />
          <div>{display()}</div>
          <PointsSection
            user={auth.user}
            isServiceExist={services.length > 0}
          />
          <WidgetsSection
            role={auth.user.role}
            selectedWidget={selectedWidget}
            onWidgetClick={handleWidgetClick}
          />
          {selectedWidget === "Leaderboard" && (
            <Leaderboard data={leaderboardData} />
          )}
          {selectedWidget === "Teams" && <TeamsBoard userId={auth.user._id!} />}
          {(selectedWidget === "Services" ||
            selectedWidget === "Activities") && (
            <ServicesBoard providerId={auth.user._id!} role={auth.user.role} />
          )}
        </div>
      </>
    );
  } else {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }
};

const FinalDashboard = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Dashboard />
  </Suspense>
);
export default FinalDashboard;
