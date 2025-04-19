import Link from "next/link";
import React from "react";

const MajiMagicFinalChallenge = () => {
  return (
    <div className="min-h-screen  flex flex-col items-center justify-start py-12 px-4 md:px-10">
      {/* Header */}
      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-6 text-center">
        The Last Task: Conquer the Course!
      </h1>
      <Link href={"/dashboard/challenges/wonderland/leaderboard"}>
        <span className="inline-block mt-4 bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition">
          View Leaderboard
        </span>
      </Link>

      {/* Message Box */}
      <div className="bg-white shadow-xl rounded-2xl p-6 md:p-10 max-w-3xl w-full text-gray-800">
        <p className="text-lg md:text-xl font-medium mb-6">
          One team member must brave the obstacle course at{" "}
          <strong>Maji Magic</strong> — speed, balance, and courage will win you
          the final bonus points!
        </p>

        <div className="space-y-4 text-base md:text-lg">
          <p className="font-semibold">Here’s what to do:</p>
          <ol className="list-decimal list-inside space-y-2 pl-2">
            <li>
              Head to <strong>Maji Magic</strong> and check in with the{" "}
              <strong>Wonderland</strong> team.
            </li>
            <li>
              Choose <strong>1 member</strong> from your team to represent you.
            </li>
            <li>
              Complete the course – <strong>the fastest teams win BIG!</strong>
            </li>
          </ol>
        </div>

        <div className="mt-6 border-t pt-4 text-blue-700 font-medium">
          🎉 Remember to cheer on your teammate, capture fun moments, and tag{" "}
          <span className="font-semibold text-secondary">@maji_magic</span> +{" "}
          <span className="font-semibold text-secondary">@apertacura</span> on
          socials!
        </div>
      </div>
    </div>
  );
};

export default MajiMagicFinalChallenge;
