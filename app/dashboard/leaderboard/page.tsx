"use client";
import React, { useEffect } from "react";
import Leaderboard from "../LeaderBoard";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { fetchAllUsers } from "@/app/store/slices/usersSlice";

const LeaderBoardPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  return (
    <div className="p-6 max-w-4xl mx-auto text-center">
      <h1 className="text-3xl font-bold text-slate-700">🏆 Leaderboard</h1>
      <p className="text-slate-500 w-4/5 mx-auto mt-2">
        Compete with your friends and fellow participants! Keep pushing your
        limits, climb the ranks, and stay active. The more you engage, the
        higher you rise!
      </p>
      <div className="mt-6">
        <Leaderboard data={users} />
      </div>
    </div>
  );
};

export default LeaderBoardPage;
