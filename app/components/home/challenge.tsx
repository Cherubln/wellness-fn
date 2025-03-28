"use client";
import React from "react";
import TitleSection from "./title";
import { challengesData } from "../healthChallenge/challengeList";
import ChallengeCard from "../healthChallenge/challengeCard";

const ChallengeSection = () => {
  return (
    <div id="Challenges" className="space-y-12">
      <TitleSection
        title="Challenges"
        subtitle="Stay motivated and improve your well-being! Choose a challenge, track your progress, and enjoy the journey to a healthier you."
      />
      <div className="flex items-stretch justify-center flex-wrap gap-6 ">
        {challengesData.length > 0 ? (
          challengesData.map((challenge) => (
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

export default ChallengeSection;
