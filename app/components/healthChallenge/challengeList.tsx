"use client";

import Link from "next/link";
import React, { useState } from "react";
import ChallengeCard from "./challengeCard";
import {
  FaWalking,
  FaBiking,
  FaHeartbeat,
  FaAppleAlt,
  FaBrain,
  FaStethoscope,
} from "react-icons/fa";
import Steps from "@/public/images/steps1.jpg";
import Cycling from "@/public/images/cycling.png";
import Wellness from "@/public/images/wellnessChallenge.jpg";
import Nutrition from "@/public/images/nutrition.png";
import MentalWellness from "@/public/images/mental.jpg";
import Diagnostic from "@/public/images/diag.jpg";

const challengesData = [
  {
    id: 1,
    title: "Steps Challenge",
    description:
      "Join the Steps Challenge! Track your steps, set goals, and earn rewards. Stay active and compete with friends!",
    image: Steps,
    icon: <FaWalking className="text-secondary" />,
    link: "/dashboard/challenges/steps",
  },

  {
    id: 2,
    title: "Wellness Challenge",
    description:
      "Improve your overall wellness with mindful activities. Join the Wellness Challenge and take care of yourself!",
    image: Wellness,
    icon: <FaHeartbeat className="text-secondary" />,
    link: "https://www.eventbrite.com/e/1280916097529?aff=oddtdtcreator",
  },
];

const ChallengeList = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter challenges based on search input
  const filteredChallenges = challengesData.filter((challenge) =>
    challenge.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-8">
      {/* Header Section */}
      <div className="text-center mb-6">
        {/* <h1 className="text-3xl font-bold text-slate-800">
          Health & Wellness Challenges
        </h1> */}
        <p className="text-slate-500 mt-2 w-4/5 mx-auto">
          Stay motivated and improve your well-being! Choose a challenge, track
          your progress, and enjoy the journey to a healthier you.
        </p>
      </div>

      {/* Search Filter */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search for a challenge..."
          className="input input-bordered w-full max-w-md"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Challenge Cards List */}
      <div className="flex items-stretch justify-center flex-wrap gap-6">
        {filteredChallenges.length > 0 ? (
          filteredChallenges.map((challenge) => (
            <span key={challenge.id}>
              <ChallengeCard challenge={challenge} />
            </span>
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full">
            No challenges found.
          </p>
        )}
      </div>
    </div>
  );
};

export default ChallengeList;
