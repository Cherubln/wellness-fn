"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { isTokenValid } from "../utils/auth";
import { logout } from "../store/slices/authSlice";
import TopSection from "./TopSection";
import PointsSection from "./PointsSection";
import WidgetsSection from "./WidgetsSection";
import Leaderboard from "./LeaderBoard";
import TeamsBoard from "./TeamsBoard";
import ServiceCard from "./ServiceCard";
import useAuth from "@/app/hooks/useAuth";
import { fetchAllUsers } from "@/app/store/slices/usersSlice";

const Dashboard = () => {
  useAuth();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector((state: RootState) => state.auth);

  const user = useSelector((state: RootState) => state.user);

  const { users } = useSelector((state: RootState) => state.allusers);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, []);

  const isAuth = auth.isAuthenticated || user.isAuthenticated;

  console.log({ user, auth });

  const leaderboardData = users;
  const [selectedWidget, setSelectedWidget] = useState<string | null>(
    "Leaderboard"
  );

  const teamboardData = [
    { name: "Team 1", points: 1000 },
    { name: "Team 2", points: 900 },
    { name: "Team 3", points: 800 },
  ]; // Replace with actual team data

  const services = [
    { id: 1, name: "Physical Activities" },
    { id: 2, name: "Diagnostic services" },
    { id: 3, name: "Mental wellness" },
    { id: 4, name: "Reward partners" },
    { id: 5, name: "Nutrition" },
  ];

  const handleWidgetClick = (widget: string) => {
    setSelectedWidget(widget);
  };

  useEffect(() => {
    if (!isTokenValid()) {
      dispatch(logout());
      router.push("/");
    }
  });

  if (isAuth) {
    return (
      <div>
        <TopSection
          username={auth.user.name! || user.user.name!}
          role={auth.role! || user.role!}
        />
        <PointsSection value={100} role={auth.role! || user.role!} />
        <WidgetsSection
          role={auth.role! || user.role!}
          selectedWidget={selectedWidget}
          onWidgetClick={handleWidgetClick}
        />
        {selectedWidget === "Leaderboard" && (
          <Leaderboard data={leaderboardData} />
        )}
        {selectedWidget === "Teams" && <TeamsBoard data={teamboardData} />}
        {selectedWidget === "Services" && (
          <div>
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                serviceName={service.name}
                onEdit={() => {}}
              />
            ))}
          </div>
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
