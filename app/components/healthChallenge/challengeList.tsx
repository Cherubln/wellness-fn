"use client";

import React, { useState } from "react";
import ChallengeCard from "./challengeCard";
import { FaWalking, FaHeartbeat } from "react-icons/fa";
import Steps from "@/public/images/steps1.jpg";
import hunts from "@/public/images/wonderland.png";
import Wellness from "@/public/images/mentalChallenge.jpg";

import { MdOutlineGames } from "react-icons/md";

export const challengesData = [
  {
    id: 2,
    title: "Wellness Wonderland",
    description:
      "Join the ultimate treasure hunt experience! Explore local wellness shops, complete exciting tasks, and win amazing rewards!",
    image: hunts,
    icon: <MdOutlineGames className="text-secondary" />,
    link: "/dashboard/challenges/wonderland",
  },
  {
    id: 1,
    title: "Steps Event",
    description:
      "Join the Steps Event! Track your steps, set goals, and earn rewards. Stay active and compete with friends!",
    image: Steps,
    icon: <FaWalking className="text-secondary" />,
    link: "/dashboard/challenges/steps",
  },
  {
    id: 3,
    title: "Wellness Event",
    description:
      "Improve your overall wellness with mindful activities. Join the Wellness Event and take care of yourself!",
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
          Stay motivated and improve your well-being! Choose an event, track
          your progress, and enjoy the journey to a healthier you.
        </p>
      </div>

      {/* Search Filter */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search an event..."
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
            Event is not Available.
          </p>
        )}
      </div>
    </div>
  );
};

export default ChallengeList;
