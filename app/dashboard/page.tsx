"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { isTokenValid } from "../utils/auth";
import { IUser, logout } from "../store/slices/authSlice";
import TopSection from "./TopSection";
import PointsSection from "./PointsSection";
import WidgetsSection from "./WidgetsSection";
import Leaderboard from "./LeaderBoard";
import TeamsBoard from "./TeamsBoard";
import useAuth from "@/app/hooks/useAuth";
import { fetchAllUsers } from "@/app/store/slices/usersSlice";
import ServicesBoard from "./ServicesBoard";

const Dashboard = () => {
  useAuth();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector((state: RootState) => state.auth);

  const { users } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const isAuth = auth.isAuthenticated;

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

  if (isAuth) {
    return (
      <div className="md:container md:mx-auto md:max-w-4xl">
        <TopSection user={auth.user} />
        {auth.user.role === "user" && (
          <PointsSection user={auth.user as IUser} />
        )}
        <WidgetsSection
          role={auth.user.role}
          selectedWidget={selectedWidget}
          onWidgetClick={handleWidgetClick}
        />
        {selectedWidget === "Leaderboard" && (
          <Leaderboard data={leaderboardData} />
        )}
        {selectedWidget === "Teams" && <TeamsBoard userId={auth.user._id!} />}
        {selectedWidget === "Services" && (
          <ServicesBoard providerId={auth.user._id!} />
        )}
      </div>
    );
  } else {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }
};

export default Dashboard;
