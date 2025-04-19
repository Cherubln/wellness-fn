"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/googleFit/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/googleFit/tabs";
import { motion } from "framer-motion";
import {
  FaRunning,
  FaTrophy,
  FaMedal,
  FaUsers,
  FaCog,
  FaChartLine,
  FaAward,
  FaRedo,
  FaCalendarAlt,
  FaClock,
  FaChevronDown,
  FaChevronUp,
  FaCheck,
} from "react-icons/fa";

import { Progress } from "@/app/components/googleFit/progress";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  mockDailySteps,
  mockLeaderboard,
  mockMonthlySteps,
  mockWeeklySteps,
} from "@/costants";
import { decodeJWT } from "@/app/utils/decode";
import { GetUserStepsData } from "@/app/api/stepsApi/action";

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [dailySteps, setDailySteps] = useState<number>(0);
  const [weeklySteps, setWeeklySteps] = useState<number>(0);
  const [userData, setUserData] = useState({
    todaySteps: 5000,
    weeklySteps: 0,
    monthlySteps: 0,
    goal: 5000,
    points: 0,
    streak: 0,
  });

  useEffect(() => {
    // Simulate loading data from Google Fit API
    const timer = setTimeout(() => {
      setUserData({
        todaySteps: dailySteps,
        weeklySteps: 62345,
        monthlySteps: 267890,
        goal: 5000,
        points: 215,
        streak: 7,
      });
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    getUserDailySteps();
    getUserWeeklySteps();
  }, []);

  const token = localStorage.getItem("token") as string;
  const userId = decodeJWT(token);

  const getUserWeeklySteps = async () => {
    try {
      const result = await GetUserStepsData("week", null, userId?._id);
      if (result) setWeeklySteps(result.steps);
    } catch (error) {
      console.log("Request denied", error);
    }
  };

  const getUserDailySteps = async () => {
    try {
      const result = await GetUserStepsData("today", null, userId?._id);
      if (result) setDailySteps(result.steps);
    } catch (error) {
      console.log("Request denied", error);
    }
  };

  const goalProgress = (dailySteps / userData.goal) * 100;
  const generateRandomColor = (): string => {
    return `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")}`;
  };

  const updateUserSteps = () => {
    const updatedLeaderboard = mockLeaderboard.map((user) =>
      user.name === "You" ? { ...user, steps: weeklySteps } : user
    );

    return updatedLeaderboard
      .sort((a, b) => b.steps - a.steps)
      .map((user, index) => ({
        ...user,
        rank: index + 1,
      }));
  };

  const newLeaderboard = updateUserSteps();

  // min - h - screen; addd on first div
  return (
    <div className=" bg-background flex items-center flex-col max-lg:px-4">
      <main className="flex-1 container py-10">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="gap-5">
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <div className="flex flex-row-reverse gap-2 items-center">
                  <CardTitle className="text-sm font-medium">
                    Today's Steps
                  </CardTitle>
                  <FaRunning className="h-4 w-4 text-secondary" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {isLoading ? "..." : dailySteps.toLocaleString()}
                </div>
                <p className="text-xs text-slate-400">
                  Goal: {userData.goal.toLocaleString()} steps
                </p>
                <Progress value={goalProgress} className="h-2 mt-4" />
                <p className="text-xs text-slate-400 mt-2">
                  {goalProgress >= userData.goal
                    ? "Goal achieved! 🎉"
                    : `${Math.round(goalProgress)}% of daily goal`}
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="flex flex-row-reverse gap-2 items-center">
                  <CardTitle className="text-sm font-medium">
                    Weekly Steps
                  </CardTitle>
                  <FaCalendarAlt className="h-4 w-4 text-secondary" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {isLoading ? "..." : weeklySteps.toLocaleString()}
                </div>
                <p className="text-xs text-slate-400">
                  Avg:{" "}
                  {isLoading
                    ? "..."
                    : Math.round(weeklySteps / 7).toLocaleString()}{" "}
                  steps/day
                </p>
                <div className="h-[45px] mt-4">
                  {!isLoading && (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={mockDailySteps}
                        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                      >
                        <Bar
                          dataKey="steps"
                          fill="hsl(var(--chart-1))"
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="flex flex-row-reverse gap-2 items-center">
                  <CardTitle className="text-sm font-medium">Rewards</CardTitle>
                  <FaAward className="h-4 w-4 text-secondary" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {isLoading
                    ? "..."
                    : Math.floor(weeklySteps / 1000).toLocaleString()}
                </div>
                <p className="text-xs text-slate-400">Points earned</p>
                <div className="mt-4 flex items-center space-x-2">
                  <div className="flex-1 bg-secondary h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-secondary h-full rounded-full"
                      style={{
                        width: `${
                          ((Math.floor(weeklySteps / 1000) % 100) / 100) * 100
                        }%`,
                      }}
                    ></div>
                  </div>
                  <span className="text-xs text-slate-400">
                    {100 - (Math.floor(weeklySteps / 1000) % 100)} until next
                    reward
                  </span>
                </div>
                <div className="mt-1">
                  <button className="w-full text-sm">Redeem Rewards</button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* <div className="mt-6">
          <Tabs defaultValue="daily">
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="daily">Daily</TabsTrigger>
                <TabsTrigger value="weekly">Weekly</TabsTrigger>
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
              </TabsList>
              <div className="flex items-center space-x-2">
                <button>
                  <FaChartLine className="h-4 w-4 mr-2" />
                  Analytics
                </button>
              </div>
            </div>

            <TabsContent value="daily" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Daily Steps</CardTitle>
                  <CardDescription>
                    Your step count for the past 7 days
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    {!isLoading && (
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                          data={mockDailySteps}
                          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                        >
                          <defs>
                            <linearGradient
                              id="colorSteps"
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="1"
                            >
                              <stop
                                offset="5%"
                                stopColor="hsl(var(--chart-1))"
                                stopOpacity={0.8}
                              />
                              <stop
                                offset="95%"
                                stopColor="hsl(var(--chart-1))"
                                stopOpacity={0}
                              />
                            </linearGradient>
                          </defs>
                          <XAxis dataKey="day" />
                          <YAxis />
                          <CartesianGrid strokeDasharray="3 3" />
                          <Tooltip />
                          <Area
                            type="monotone"
                            dataKey="steps"
                            stroke="hsl(var(--chart-1))"
                            fillOpacity={1}
                            fill="url(#colorSteps)"
                          />
                          <Line
                            type="monotone"
                            dataKey="goal"
                            stroke="hsl(var(--chart-2))"
                            strokeDasharray="5 5"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="weekly" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Steps</CardTitle>
                  <CardDescription>
                    Your step count for the past 4 weeks
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    {!isLoading && (
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                          data={mockWeeklySteps}
                          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                        >
                          <defs>
                            <linearGradient
                              id="colorSteps"
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="1"
                            >
                              <stop
                                offset="5%"
                                stopColor="hsl(var(--chart-1))"
                                stopOpacity={0.8}
                              />
                              <stop
                                offset="95%"
                                stopColor="hsl(var(--chart-1))"
                                stopOpacity={0}
                              />
                            </linearGradient>
                          </defs>
                          <XAxis dataKey="week" />
                          <YAxis />
                          <CartesianGrid strokeDasharray="3 3" />
                          <Tooltip />
                          <Area
                            type="monotone"
                            dataKey="steps"
                            stroke="hsl(var(--chart-1))"
                            fillOpacity={1}
                            fill="url(#colorSteps)"
                          />
                          <Line
                            type="monotone"
                            dataKey="goal"
                            stroke="hsl(var(--chart-2))"
                            strokeDasharray="5 5"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="monthly" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Steps</CardTitle>
                  <CardDescription>
                    Your step count for the past 6 months
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    {!isLoading && (
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                          data={mockMonthlySteps}
                          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                        >
                          <defs>
                            <linearGradient
                              id="colorSteps"
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="1"
                            >
                              <stop
                                offset="5%"
                                stopColor="hsl(var(--chart-1))"
                                stopOpacity={0.8}
                              />
                              <stop
                                offset="95%"
                                stopColor="hsl(var(--chart-1))"
                                stopOpacity={0}
                              />
                            </linearGradient>
                          </defs>
                          <XAxis dataKey="month" />
                          <YAxis />
                          <CartesianGrid strokeDasharray="3 3" />
                          <Tooltip />
                          <Area
                            type="monotone"
                            dataKey="steps"
                            stroke="hsl(var(--chart-1))"
                            fillOpacity={1}
                            fill="url(#colorSteps)"
                          />
                          <Line
                            type="monotone"
                            dataKey="goal"
                            stroke="hsl(var(--chart-2))"
                            strokeDasharray="5 5"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div> */}

        <div className="grid gap-6 md:grid-cols-2 mt-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FaTrophy className="h-5 w-5 mr-2 text-yellow-500" />
                  Leaderboard
                </CardTitle>
                <CardDescription>
                  See how you rank against other users
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {!isLoading &&
                    newLeaderboard.map((user, index) => (
                      <div
                        key={user.id}
                        className={`flex items-center p-2 rounded-lg ${
                          user.name === "You" ? "bg-slate-200" : ""
                        }`}
                      >
                        <div className="flex items-center justify-center h-8 w-8 rounded-full font-semibold text-slate-700 mr-4">
                          {index + 1}.
                        </div>
                        <div
                          className="h-10 w-10 flex items-center text-white font-bold justify-center rounded-full overflow-hidden mr-4"
                          style={{
                            backgroundColor: generateRandomColor(),
                          }}
                        >
                          {user.name.slice(0, 1)}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-slate-400">
                            {user.steps.toLocaleString()} steps
                          </p>
                        </div>
                        {user.name === "You" && (
                          <FaMedal className="h-5 w-5 text-yellow-500" />
                        )}
                      </div>
                    ))}
                </div>
              </CardContent>
              <CardFooter>
                <button className="w-full flex items-center">
                  <FaUsers className="h-4 w-4 mr-2" />
                  View Full Leaderboard
                </button>
              </CardFooter>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FaClock className="h-5 w-5 mr-2" />
                  Activity Streak
                </CardTitle>
                <CardDescription>
                  Your current streak and achievements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center mb-6">
                  <div className="text-center">
                    <div className="text-5xl font-bold">
                      {isLoading ? "..." : userData.streak}
                    </div>
                    <p className="text-sm text-slate-400 mt-1">Days in a row</p>
                  </div>
                </div>

                <div className="grid grid-cols-7 gap-2 mb-6">
                  {Array.from({ length: 7 }).map((_, i) => (
                    <div
                      key={i}
                      className={`h-10 rounded-md flex items-center justify-center ${
                        i < userData.streak
                          ? "bg-secondary text-slate-700"
                          : "bg-muted"
                      }`}
                    >
                      {i < userData.streak && <FaCheck className="h-5 w-5" />}
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">7-Day Streak</p>
                      <p className="text-sm text-slate-400">+50 bonus points</p>
                    </div>
                    {userData.streak >= 7 ? (
                      <div className="h-8 w-8 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center">
                        <FaCheck className="h-5 w-5" />
                      </div>
                    ) : (
                      <div className="text-sm text-slate-400">
                        {7 - userData.streak} days left
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">30-Day Streak</p>
                      <p className="text-sm text-slate-400">
                        +200 bonus points
                      </p>
                    </div>
                    {userData.streak >= 30 ? (
                      <div className="h-8 w-8 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center">
                        <FaCheck className="h-5 w-5" />
                      </div>
                    ) : (
                      <div className="text-sm text-slate-400">
                        {30 - userData.streak} days left
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
