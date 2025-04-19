"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/googleFit/card";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/app/context";
import { decodeJWT } from "@/app/utils/decode";
import Loader from "@/app/components/loader";

const cardData = [
  {
    title: "Already using Google Fit?",
    description:
      "Seamlessly sync data from Google Fit, Samsung Health, Fitbit, and more.",
    content:
      " Connect once to sync all your health and fitness data through Health Connect.",
    buttonText: "Connect",
    buttonLink: "steps/onboarding",
  },
];

export default function StepsActivity() {
  const [isConnected, setIsConnected] = useState(false);
  const { setConnectTab } = useAppContext();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const HandleNavigation = (link: string) => {
    if (link === "steps/onboarding") {
      setConnectTab(3);
      router.push(link);
    } else router.push(link);
  };
  const token = localStorage.getItem("token") as string;
  const steps = decodeJWT(token);

  useEffect(() => {
    if (steps && steps?.steps > 0) {
      router.push("/dashboard/challenges/steps/analytics");
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [steps]);

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen flex flex-col">
      <main className="container ">
        <section className="flex flex-col gap-8 p-8 ">
          <div className="flex w-full text-center flex-col gap-4">
            <h1 className="text-xl md:text-3xl font-bold leading-tight tracking-tighter lg:leading-[1.1]">
              Track your steps, earn rewards, stay healthy
            </h1>
            <p className="max-w-[750px] md:text-lg text-slate-700 lg:text-xl">
              Connect with Google Fit and other health apps to automatically
              track your steps and earn points for rewards.
            </p>
          </div>
          <Link href="/dashboard/challenges/steps/onboarding">
            <div className="flex w-full items-center justify-center sm:flex-row gap-4">
              <motion.button
                onClick={() => setConnectTab(null)}
                whileHover={{ scale: 0.9 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="text-secondary hover:text-white hover:bg-secondary duration-300 transition bg-white border border-secondary px-4 py-3 rounded-full max-md:w-4/5 md:w-1/2 lg:w-1/3 font-semibold"
              >
                Get Started
              </motion.button>
            </div>
          </Link>
        </section>
        <section className="py-8 max-lg:px-4">
          <div className="grid gap-8 w-4/5 sm:w-2/3 mx-auto">
            {cardData.map((section, index) => (
              <div
                key={index}
                className="rounded-lg border  shadow-sm flex flex-col justify-between"
              >
                <div className="">
                  <CardHeader className="p-0">
                    <CardTitle className="text-center">
                      {section.title}
                    </CardTitle>
                    <CardDescription className="pt-4 text-center">
                      {section.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-700">{section.content}</p>
                  </CardContent>
                </div>
                <div className="flex w-full items-center justify-center sm:flex-row gap-4">
                  <motion.button
                    whileHover={{ scale: 0.9 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => HandleNavigation(section.buttonLink)}
                    className="text-secondary hover:text-white hover:bg-secondary duration-300 transition bg-white border border-secondary px-4 py-2 w-4/5 lg:w-2/5 mb-4 rounded-full font-semibold"
                  >
                    {section.buttonText}
                  </motion.button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
