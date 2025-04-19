"use client";
import React, { useEffect, useState } from "react";
import { BimaComponent } from "../logo";
import { MdSelfImprovement, MdSportsKabaddi } from "react-icons/md";
import { GiShakingHands } from "react-icons/gi";
import { IoAnalyticsSharp } from "react-icons/io5";

const wellnessBenefits = [
  {
    title: "Data-Driven Insights",
    description:
      "Get real-time analytics on healthcare claims, absenteeism, and overall wellness.",
    icon: <IoAnalyticsSharp className="text-6xl text-secondary text-center" />,
  },
  {
    title: "Tangible ROI and VOI",
    description:
      "Measure the return and value of your wellness investment, including healthcare savings and improved workforce health.",
    icon: <GiShakingHands className="text-6xl text-secondary text-center" />,
  },
  {
    title: "Personalized Engagement",
    description:
      "Offer tailored health programs that meet the diverse needs of your employees.",
    icon: <MdSportsKabaddi className="text-6xl text-secondary text-center" />,
  },
  {
    title: "Continuous Improvement",
    description:
      "Track progress with our unique Wellness Index and gain actionable insights to refine your wellness strategy.",
    icon: <MdSelfImprovement className="text-6xl text-secondary text-center" />,
  },
];

const CorporateIntroPage = () => {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFade(true);
      setTimeout(() => {
        setIndex((prevIndex) => (prevIndex + 1) % wellnessBenefits.length);
        setFade(false);
      }, 1000);
    }, 5000);

    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div className="flex flex-col gap-8 items-center justify-center w-full">
      <BimaComponent width={400} height={300} />

      <div className="flex flex-col items-center gap-6">
        <h3 className="text-lg lg:text-2xl font-semibold text-center">
          The New Way of Doing Corporate Wellness.
        </h3>
        <ul className="list-disc w-full md:w-4/5 space-y-3 px-4">
          <li
            className={`flex flex-col text-center items-center gap-2 transition-opacity duration-1000 ${
              fade ? "opacity-0" : "opacity-100"
            }`}
          >
            {wellnessBenefits[index].icon}
            <span className="font-semibold text-lg">
              {wellnessBenefits[index].title}
            </span>
            <span className="self-baseline">
              {wellnessBenefits[index].description}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CorporateIntroPage;
