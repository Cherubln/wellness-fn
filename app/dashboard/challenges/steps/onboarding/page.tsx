"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/googleFit/card";
import { motion, AnimatePresence } from "framer-motion";
import { Progress } from "@/app/components/googleFit/progress";
import { FaArrowLeft, FaArrowRight, FaCheck } from "react-icons/fa6";
import { MdLocationOn, MdOutlineFileDownload } from "react-icons/md";
import { LuSmartphone } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import { FiAward, FiTarget } from "react-icons/fi";
import googleFit from "@/public/images/googleFitIcon.webp";
import { FaHeartbeat, FaSyncAlt, FaWalking } from "react-icons/fa";
import createAccountIcon from "@/public/images/createAccount.jpg";
import SetSteps from "@/public/images/steps1.jpg";
import { useAppContext } from "@/app/context";
import { useRouter, useSearchParams } from "next/navigation";
import {
  CreateStepsGoal,
  GetUserStepsData,
  MessageType,
} from "@/app/api/stepsApi/action";
import { decodeJWT } from "@/app/utils/decode";
import { GiStairsGoal } from "react-icons/gi";
import { HiOutlineLightBulb } from "react-icons/hi";
import { stepMessages } from "@/costants";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const steps = [
  {
    id: 1,
    title: "Download Google Fit",
    description:
      "First, download the Google Fit app on your smartphone from the Google Play Store.",
    icon: <MdOutlineFileDownload className="h-12 w-12 text-secondary" />,
    image: googleFit,
  },
  {
    id: 2,
    title: "Create an Account",
    description:
      "Open Google Fit and create an account or sign in with your existing Google account.",
    icon: <LuSmartphone className="h-12 w-12 text-secondary" />,
    image: createAccountIcon,
  },
  {
    id: 3,
    title: "Enable Step Tracking",
    description:
      "In Google Fit, make sure step tracking is enabled in the settings.",
    icon: <IoSettingsOutline className="h-12 w-12 text-secondary" />,
    image: SetSteps,
  },
  {
    id: 4,
    title: "Give us Permissions",
    description:
      "Request permission to access your data in Google Fit and other health apps to set and track your daily step goals, as well as monitor your physical activities like walking, running, and cycling.",
    icon: <FiTarget className="h-12 w-12 text-secondary" />,
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    permissions: [
      {
        title: "Track Physical Activities",
        description:
          "Grant permission to track your physical activities (walking, running) to help monitor your fitness progress.",
        icon: <FaWalking />,
      },
      {
        title: "Access Google Fit Data",
        description:
          "Allow access to your Google Fit data to sync steps information from various apps and fitness devices.",
        icon: <FaHeartbeat />,
      },
      {
        title: "Enable Background Data Access",
        description:
          "Enable background data access so we can continuously update and track your activities without interruption.",
        icon: <FaSyncAlt />,
      },
    ],
  },
  {
    id: 5,
    title: "Set Weekly Goals",
    description:
      "Earn points every time you reach new step milestones and stay motivated on your fitness journey.",
    icon: <GiStairsGoal className="h-12 w-12 text-secondary" />,
    image:
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    title: "Connect to Our App",
    description:
      "Connect Google Fit to our app to sync your steps and earn rewards.",
    icon: <FiAward className="h-12 w-12 text-secondary" />,
    image:
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
];

const StepsRange = [
  "1-5,000",
  "5,001-10,000",
  "10,001-15,000",
  "15,001-20,000",
  "20,001-25,000",
  "25,001-30,000",
  "30,001-35,000",
  "35,001-40,000",
  "40,001-50,000",
  "50,001+",
  "Other",
];

export default function OnboardingPage() {
  const [isConnecting, setIsConnecting] = useState(false);
  const [loading, setLoading] = useState(false);
  const { connectTab } = useAppContext();
  const [currentStep, setCurrentStep] = useState(connectTab ? connectTab : 0);
  const searchParams = useSearchParams();
  const router = useRouter();
  const code = searchParams.get("code");
  const [selectedSteps, setSelectedSteps] = useState("");
  const [myGoal, setMyGoals] = useState("");
  const [error, setError] = useState(false);
  const [settingGoalResult, setSettingGoalResult] =
    useState<MessageType | null>(null);

  useEffect(() => {
    if (code) setCurrentStep(4);
  }, [code]);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const token = localStorage.getItem("token") as string;
  const userId = decodeJWT(token);

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      const steps = await GetUserStepsData("today", code, userId?._id);

      if (steps) {
        router.push("/dashboard/challenges/steps/analytics");
      }
      setIsConnecting(false);
    } catch (error) {
      console.log("Request denied", error);
    }
  };

  const handleSetGoals = async () => {
    const StepsGoal = selectedSteps === "Other" ? myGoal : selectedSteps;

    if (!StepsGoal || StepsGoal.trim() === "") {
      setError(true);
      return;
    }
    try {
      setLoading(true);
      const result = await CreateStepsGoal(userId, StepsGoal);
      if (result.message) {
        setSettingGoalResult(result);
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      // setMyGoals("");
      // setSelectedSteps("");
      setLoading(false);
    }
  };

  const getMessage = () => {
    const StepsGoal =
      selectedSteps === "Other"
        ? Number(myGoal)
        : selectedSteps === "50,001+"
        ? 50001
        : parseInt(selectedSteps.split("-")[1].replace(/,/g, ""), 10);
    return (
      stepMessages.find(
        ({ range }) => StepsGoal >= range[0] && StepsGoal <= range[1]
      )?.message || "Keep moving!"
    );
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-background flex flex-col items-center px-4">
      <main className="flex-1 container py-10">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-slate-400 mt-2">
              Step {currentStep + 1} of {steps.length}
            </p>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="border-2 border-primary/20">
                <CardHeader>
                  <div className="flex items-center justify-center mb-4">
                    {steps[currentStep].icon}
                  </div>
                  <CardTitle className="text-2xl md:text-3xl text-center">
                    {steps[currentStep].title}
                  </CardTitle>
                  <CardDescription className="text-lg text-center">
                    {steps[currentStep].description}
                  </CardDescription>
                </CardHeader>

                {steps[currentStep].id === 4 ? (
                  <div className="w-[96%] md:w-3/4 mx-auto py-4 ">
                    {steps[currentStep].permissions?.map((item, index) => (
                      <div
                        key={index}
                        className="flex gap-4 items-start border-b py-2"
                      >
                        <span className="text-2xl text-secondary pt-2">
                          {item.icon}
                        </span>
                        <span>
                          <h2 className="text-lg font-bold">{item.title}</h2>
                          <p className="text-sm text-slate-500">
                            {item.description}
                          </p>
                        </span>
                      </div>
                    ))}
                    <Link href={`${apiUrl}/api/users/google-fit/auth`}>
                      <div className="flex w-full items-center justify-center sm:flex-row gap-4 mt-5">
                        <motion.button
                          whileHover={{ scale: 0.9 }}
                          whileTap={{ scale: 0.95 }}
                          className="text-secondary hover:text-white hover:bg-secondary duration-300 transition bg-white border border-secondary px-4 py-2 w-3/5 rounded-full font-semibold"
                        >
                          Allow Access
                        </motion.button>
                      </div>
                    </Link>
                  </div>
                ) : steps[currentStep].id === 5 ? (
                  // setting Goals
                  <>
                    {settingGoalResult ? (
                      <div className=" max-w-md p-6 mx-auto my-12 bg-secondary/5  rounded-lg shadow-md">
                        <span className="text-slate-400 font-semibold text-2xl flex items-center justify-center w-full gap-2">
                          <HiOutlineLightBulb className="" /> Did you know?
                        </span>
                        <div className="flex gap-4  items-center">
                          <FaWalking className="text-stone-400 text-8xl" />
                          <p className="text-slate-700 text-base text-center mt-4">
                            {getMessage()}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-8 w-full h-[30vh] items-center justify-center py-4">
                        <span className="flex flex-col items-start gap-2 flex-wrap px-4">
                          <label className="text-slate-500">
                            Select number of weekly steps you want to achieve:
                          </label>
                          <select
                            value={selectedSteps}
                            onChange={(e) => {
                              setSelectedSteps(e.target.value), setError(false);
                            }}
                            className="min-w-[50%] p-2 border rounded-lg bg-white text-gray-700 focus:outline-none focus:border-secondary"
                          >
                            <option value="" disabled className="text-gray-400">
                              Select Steps
                            </option>
                            {StepsRange.map((step, index) => (
                              <option
                                key={index}
                                value={step}
                                className="text-gray-700"
                              >
                                {step}
                              </option>
                            ))}
                          </select>

                          {selectedSteps === "Other" && (
                            <input
                              value={myGoal}
                              onChange={(e) => setMyGoals(e.target.value)}
                              type="number"
                              className="border p-2 rounded-lg min-w-[80%] focus:outline-none focus:border-secondary"
                              placeholder="Set your goals"
                            />
                          )}
                          {error && (
                            <p className="text-sm text-red-400">
                              Select steps you want to achieve
                            </p>
                          )}
                        </span>

                        <button
                          onClick={() => handleSetGoals()}
                          className={`${
                            myGoal.length > 0 || selectedSteps.length > 0
                              ? "border-secondary text-secondary hover:text-white hover:bg-secondary/70 "
                              : "cursor-not-allowed text-slate-400"
                          } font-semibold border rounded-full px-6 py-2 duration-500 `}
                        >
                          {loading ? "Setting Goal..." : "Set Goal"}
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <CardContent>
                    <div className="relative h-80 w-full overflow-hidden rounded-lg">
                      <Image
                        src={steps[currentStep].image}
                        alt={steps[currentStep].title}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                  </CardContent>
                )}

                <CardFooter className="flex justify-between border-t pt-6">
                  <button
                    className={` ${
                      currentStep > 0
                        ? "hover:bg-secondary hover:text-white cursor-pointer border-secondary"
                        : "cursor-not-allowed text-slate-300 border-slate-300"
                    } duration-300 transition flex items-center px-3 py-2 border rounded-md`}
                    onClick={prevStep}
                  >
                    <FaArrowLeft className="mr-2 h-4 w-4" />
                    Previous
                  </button>

                  {currentStep < steps.length - 1 ? (
                    <div className="flex gap-4">
                      <button
                        onClick={() => setCurrentStep(3)}
                        className=" cursor-default hover:bg-secondary hover:text-white duration-300 transition flex items-center px-3 py-2 border border-secondary rounded-md"
                      >
                        Skip
                      </button>

                      <button
                        onClick={nextStep}
                        className=" cursor-default hover:bg-secondary hover:text-white duration-300 transition flex items-center px-3 py-2 border border-secondary rounded-md"
                      >
                        Next
                        <FaArrowRight className="ml-2 h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={handleConnect}
                      disabled={isConnecting}
                      className=" cursor-default hover:bg-secondary hover:text-white duration-300 transition flex items-center px-3 py-2 border border-secondary rounded-md"
                    >
                      {isConnecting ? (
                        <>Connecting...</>
                      ) : (
                        <>
                          Connect Google Fit
                          <FaCheck className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </button>
                  )}
                </CardFooter>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
