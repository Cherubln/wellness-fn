"use client";

import {
  CompleteTask,
  GetMemberGroup,
  GetRiddle,
} from "@/app/api/userApi/action";
import { Card } from "@/app/components/googleFit/card";
import CountdownTimer from "@/app/components/healthChallenge/challengeTimer";
import Loader from "@/app/components/loader";
import { useAppContext } from "@/app/context";
import { RiddleChallengetype, WonderlandTeamType } from "@/app/type";
import { decodeJWT } from "@/app/utils/decode";
import { getRemainingSeconds } from "@/app/utils/timeFormating";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ReactConfetti from "react-confetti";
import { FaCamera, FaMapPin } from "react-icons/fa6";
import { MdAccessTime } from "react-icons/md";

export default function Hunt() {
  const [hintVisible, setHintVisible] = useState(false);
  const [code, setCode] = useState("");
  const [timeLeft, setTimeLeft] = useState(300);
  const [group, setGroup] = useState<WonderlandTeamType[]>([]);
  const router = useRouter();
  const [loading, setloading] = useState(false);
  const [loadingGroup, setloadingGroup] = useState(false);
  const [taskLoader, setTaskloader] = useState(false);
  const [taskError, setTaskError] = useState("");
  const [taskCompletionStatus, setTaskCompletionStatus] = useState(false);
  const [riddleCompletionStatus, setRiddleCompletionStatus] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [riddleScannedStatus, setRiddleScannedStatus] = useState(false);

  const token = localStorage.getItem("token") as string;
  const user = decodeJWT(token);

  useEffect(() => {
    getUserGroups();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
    if (showConfetti) {
      const confettiTimer = setTimeout(() => {
        setShowConfetti(false);
      }, 5000);

      return () => clearTimeout(confettiTimer);
    }
  }, [showConfetti]);

  useEffect(() => {
    if (riddleScannedStatus) {
      setShowConfetti(true);
    }
  }, [riddleScannedStatus]);

  const getUserGroups = async () => {
    setloadingGroup(true);

    try {
      const result = await GetMemberGroup(user._id);
      if (result) {
        setGroup(result);
        if (result[0]?.riddles.length >= result[0].totalRiddles) {
          setRiddleCompletionStatus(true);
        }
        setRiddleScannedStatus(
          result[0].groupScans.includes(result[0].currentRiddle.id)
        );

        const remaining = getRemainingSeconds(result[0]?.currentRiddleEndTime);
        setTimeLeft(remaining);
      }
    } catch (error) {
    } finally {
      setloadingGroup(false);
    }
  };

  const getCurrentRiddle = async (id: string) => {
    setloading(true);

    try {
      const result = await GetRiddle(id);
      if (result) {
        getUserGroups();
      }
    } catch (error) {
      console.log({ error });
      setRiddleCompletionStatus(true);
    } finally {
      setloading(false);
    }
  };

  const handleCompleteTask = async () => {
    setTaskloader(true);
    const formdata = {
      groupId: group[0]?._id,
      riddleId: group[0]?.currentRiddle?.id,
      timeUsed: timeLeft,
      taskCompletionCode: Number(code),
    };
    try {
      const result = await CompleteTask(group[0]?._id, formdata);

      if (result.message) {
        setShowConfetti(true);
        if (code) {
          setTaskCompletionStatus(true);
        }
      }
    } catch (error) {
      setTaskError("Invalid Code Please enter valid code");
      console.log({ error });
    } finally {
      setHintVisible(false);
      setCode("");
      setTaskloader(false);
    }
  };

  const handleScanCode = () => {
    router.push("/scancode");
  };

  const handleGetNewRiddle = async () => {
    setRiddleScannedStatus(false);
    setTaskCompletionStatus(false);
    await getCurrentRiddle(group[0]?._id);
    await getUserGroups();
  };

  if (!group.length && loading && loadingGroup) return <Loader />;

  return (
    <>
      <motion.div
        whileHover={{ scale: 0.9 }}
        onClick={() => router.push("/dashboard/challenges/wonderland")}
        transition={{ duration: 0.1 }}
        className="px-4 py-3 mb-4 bg-slate-100 w-fit font-bold rounded-lg cursor-pointer hover:bg-slate-200"
      >
        ← Go back
      </motion.div>
      {showConfetti && <ReactConfetti />}
      <div className="container flex flex-col gap-6 mx-auto px-4 py-8">
        {!taskCompletionStatus &&
          !riddleCompletionStatus &&
          group[0]?.currentRiddle && <CountdownTimer timeLeft={timeLeft} />}

        {riddleCompletionStatus ? (
          <Card className="p-6 shadow-sm bg-green-100/30 ">
            <div className="text-center space-y-4">
              <ReactConfetti />
              <h1 className="text-2xl font-bold text-center flex flex-col text-green-700">
                <span>🎉 Congratulations</span>
                <span className="mt-4">You did it, {group[0]?.groupName}!</span>
              </h1>
              <p className="text-lg text-gray-700">
                You’ve completed the full Wellness Wonderland Treasure Hunt –
                your team just unlocked the Grand Finale Challenge at Maji
                Magic!
              </p>
              <p className="text-md text-gray-600">
                But before we crown our champions… one final splash awaits.
              </p>
              <Link href={"/dashboard/challenges/wonderland/hunt/majimagic"}>
                <span className="inline-block mt-4 bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition">
                  Conquer the Course
                </span>
              </Link>
            </div>
          </Card>
        ) : timeLeft <= 0 ? (
          <Card className="p-8 text-center border-l-4 border-red-500 bg-red-50 shadow-md max-w-xl mx-auto">
            <h1 className="text-2xl font-bold text-red-600 mb-2 flex items-center justify-center gap-2">
              ⏱️ Time's Up!
            </h1>
            {user.teamRole !== "member" ? (
              <p className="text-slate-600 mb-4">
                Time's up! Your team didn’t complete the task within the
                5-minute limit. Click 'Next' to move on to the next riddle.
              </p>
            ) : (
              <p className="text-slate-600 mb-4">
                ⚠️ Time’s up! Your team wasn’t able to complete the task within
                the 5-minute window. Please wait for your team lead to receive
                the next riddle and click the button below to proceed.
              </p>
            )}
            {user.teamRole !== "member" ? (
              <motion.button
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.05 }}
                onClick={() => {
                  handleCompleteTask();
                  handleGetNewRiddle();
                }}
                className="bg-secondary text-white hover:bg-secondary/90 py-2 px-6 mt-4 rounded-lg font-bold transition duration-300"
              >
                {taskLoader ? "Loading..." : "Get next riddle"}
              </motion.button>
            ) : (
              <motion.button
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.05 }}
                onClick={() => {
                  getUserGroups();
                }}
                className="bg-secondary text-white hover:bg-secondary/90 py-2 px-6 mt-4 rounded-lg font-bold transition duration-300"
              >
                {taskLoader ? "Loading..." : "View Next Riddle"}
              </motion.button>
            )}
          </Card>
        ) : group[0]?.riddles.length <= 0 && !group[0]?.currentRiddle ? (
          <Card className="p-6 mb-6 shadow-lg rounded-2xl border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-slate-100">
            <div className="flex flex-col justify-between items-center gap-8">
              <div>
                <h2 className="text-2xl font-bold text-center text-slate-800 mb-4">
                  Get Ready to Riddle!
                </h2>
                <p className="text-slate-600 text-sm text-center max-w-md">
                  You’re about to begin an exciting riddle hunt challenge.
                  Follow the clues, think creatively, and complete the task
                  before time runs out. Are you up for it?
                </p>
              </div>

              {user.teamRole !== "member" && (
                <button
                  onClick={() => {
                    handleGetNewRiddle();
                  }}
                  className="group flex items-center gap-2 bg-secondary text-white hover:bg-secondary/90 transition-all px-5 py-2.5 rounded-xl font-semibold shadow-md"
                >
                  <FaMapPin className="text-white group-hover:rotate-12 transition-transform duration-300" />
                  Start Hunting
                </button>
              )}
            </div>
          </Card>
        ) : taskCompletionStatus ? (
          <Card className="p-6 shadow-lg rounded-xl border border-gray-100 bg-white">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-semibold text-slate-800">
                🎉 Riddle Completed!
              </h2>
              <p className="text-slate-600 text-md">
                You've successfully completed{" "}
                <span className="font-bold text-slate-700">
                  {group[0]?.riddles.length + 1}
                </span>{" "}
                riddle{group[0]?.riddles.length > 1 ? "s" : ""}. Ready for the
                next one?
              </p>

              {user.teamRole !== "member" && (
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.1 }}
                  onClick={handleGetNewRiddle}
                  disabled={taskLoader}
                  className="bg-secondary font-bold text-white hover:bg-secondary/90 py-3 px-6 rounded-lg shadow-md disabled:opacity-60 disabled:cursor-not-allowed transition duration-300"
                >
                  {taskLoader ? "Loading..." : "🔍 Get Next Riddle"}
                </motion.button>
              )}
            </div>
          </Card>
        ) : (
          <div className="max-w-2xl mx-auto w-full">
            {/* Clue Section */}
            {!riddleScannedStatus && (
              <Card className="p-6 mb-6 shadow-md">
                <div className="flex items-center justify-between mb-4">
                  {group.length > 0 && (
                    <h2 className="text-xl font-semibold ">
                      Riddle {group[0]?.riddles.length + 1}
                    </h2>
                  )}
                  <div className="flex gap-1">
                    <label className="text-slate-500">Team label:</label>
                    {group.length > 0 && (
                      <span
                        className={`w-12 h-6 block`}
                        style={{ backgroundColor: group[0]?.teamColor }}
                      ></span>
                    )}
                  </div>
                  <div className="flex items-center text-slate-500">
                    <MdAccessTime className="w-4 h-4 mr-2" />
                    <span>5:00</span>
                  </div>
                </div>

                <p className="text-lg mb-6 text-slate-600">
                  {group[0]?.currentRiddle?.riddle}
                </p>

                <div className="flex justify-between gap-2 flex-wrap">
                  <button
                    onClick={() => setHintVisible(!hintVisible)}
                    className="group flex items-center gap-2 border border-secondary hover:bg-secondary hover:text-white duration-300 p-2 px-4 rounded-lg text-sm font-medium"
                  >
                    <FaMapPin className="text-secondary group-hover:text-white duration-300" />
                    {hintVisible ? "Hide Hint" : "View Hint"}
                  </button>
                  {user.teamRole !== "member" && (
                    <button
                      onClick={handleScanCode}
                      className="flex items-center border bg-secondary text-white p-2 px-4 rounded-lg font-medium text-sm"
                    >
                      Scan QR Code
                    </button>
                  )}
                </div>
                {hintVisible && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-3 text-slate-500 text-sm italic"
                  >
                    ⚠️ Hint: {group[0]?.currentRiddle.hint}
                  </motion.p>
                )}
              </Card>
            )}

            {/* Task Section */}
            {riddleScannedStatus && (
              <Card className="p-6 shadow-md">
                <h3 className="text-xl font-semibold mb-4 ">Current Task</h3>
                <div className="flex flex-col gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <FaCamera className="text-2xl text-secondary" />
                    <p className="text-slate-600">
                      {group[0]?.currentRiddle?.task.description}
                    </p>
                  </div>
                  {user.teamRole !== "member" && (
                    <>
                      <input
                        type="text"
                        value={code}
                        onChange={(e) => {
                          setCode(e.target.value);
                          setTaskError("");
                        }}
                        className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                        placeholder="Enter code provided"
                      />
                      {taskError && (
                        <p className="text-red-400 text-sm font-semibold">
                          {taskError}
                        </p>
                      )}
                    </>
                  )}
                </div>
                {user.teamRole !== "member" && (
                  <div className="flex justify-end">
                    <button
                      onClick={handleCompleteTask}
                      disabled={!code}
                      className={` ${
                        !code
                          ? "bg-slate-200 text-slate-300"
                          : "bg-secondary text-white hover:bg-secondary/90"
                      }  py-2 px-6 rounded-lg font-bold  transition`}
                    >
                      {taskLoader ? "Loading..." : "Complete Task"}
                    </button>
                  </div>
                )}
              </Card>
            )}
          </div>
        )}
      </div>
    </>
  );
}
