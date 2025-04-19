"use client";
import { GetMemberGroup } from "@/app/api/userApi/action";
import { Card } from "@/app/components/googleFit/card";
import Button from "@/app/components/home/button";
import { WonderlandTeamType } from "@/app/type";
import { decodeJWT } from "@/app/utils/decode";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaPeopleCarry } from "react-icons/fa";
import { FaMapPin, FaTrophy, FaUsers } from "react-icons/fa6";

export default function WonderlandPage() {
  const token = localStorage.getItem("token") as string;
  const user = decodeJWT(token);
  const [group, setGroup] = useState<WonderlandTeamType[]>([]);

  useEffect(() => {
    getUserGroups();
  }, []);

  const getUserGroups = async () => {
    try {
      const result = await GetMemberGroup(user._id);

      if (result) {
        setGroup(result);
      }
    } catch (error) {}
  };

  return (
    <main className="min-h-screen ">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-16">
          <h1 className="text-2xl md:text-4xl font-bold mb-6 bg-clip-text ">
            Wellness Wonderland
          </h1>
          <p className="text-lg text-slate-500  max-w-2xl mx-auto">
            Join the ultimate treasure hunt experience! Explore local wellness
            shops, complete exciting challenges, and win amazing rewards.
          </p>
        </div>
        <div className="flex flex-col gap-8">
          <div
            className={`grid md:grid-cols-2 lg:grid-cols-3  gap-8 max-w-5xl mx-auto`}
          >
            {user.teamRole !== "member" && !(group.length > 0) && (
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col items-center text-center">
                  <FaUsers className="w-12 h-12 mb-4 text-stone-600" />
                  <h3 className="text-xl font-semibold mb-2">
                    Create Your Team
                  </h3>
                  <p className="text-slate-500 mb-4">
                    Form a team of 2-5 players and choose your team color
                  </p>
                  <Link href="/dashboard/challenges/wonderland/team">
                    <Button title="Get Started" />
                  </Link>
                </div>
              </Card>
            )}
            {group.length > 0 && (
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <FaPeopleCarry
                    className={`w-12 h-12 mb-4 text-${group[0]?.teamColor}-500`}
                  />
                  <h3 className="text-xl text-slate-500 font-semibold mb-2">
                    We are{" "}
                    <span className={"text-stone-700"}>
                      {group[0].groupName.toLocaleUpperCase()}
                    </span>
                  </h3>
                  <p className="text-slate-500 text-xl mb-4">
                    Points:
                    <span className="ml-2 font-bold text-slate-700">
                      {group[0].groupPoints.toLocaleString()}
                    </span>
                  </p>
                  {user.teamRole !== "member" && (
                    <Link href="/dashboard/challenges/wonderland/team/update">
                      <Button title="Add new user" />
                    </Link>
                  )}
                </div>
              </Card>
            )}

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex flex-col items-center text-center">
                <FaMapPin className="w-12 h-12 mb-4 text-secondary" />
                <h3 className="text-xl font-semibold mb-2">View Riddle</h3>
                <p className="text-slate-500 mb-4">
                  Follow riddles to discover shops and complete fun challenges
                </p>
                {group.length > 0 && (
                  <Link href="/dashboard/challenges/wonderland/hunt">
                    <Button title="View Hunt" />
                  </Link>
                )}
              </div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex flex-col items-center text-center">
                <FaTrophy className="w-12 h-12 mb-4 text-yellow-600" />
                <h3 className="text-xl font-semibold mb-2">Leaderboard</h3>
                <p className="text-slate-500 mb-4">
                  Earn points and compete for exciting wellness prizes
                </p>
                <Link href="/dashboard/challenges/wonderland/leaderboard">
                  <Button title="Track Your Rank" />
                </Link>
              </div>
            </Card>
          </div>

          <div className="mt-8 text-center">
            <h2 className="text-2xl font-semibold mb-8">How It Works</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3  gap-8 max-w-4xl mx-auto">
              {[
  
                {
                  step: 1,
                  title: "Solve Riddle",
                  description: "Receive unique riddles to find shops",
                },
                {
                  step: 2,
                  title: "Complete Tasks",
                  description: "Scan QR codes and complete challenges",
                },
                {
                  step: 3,
                  title: "Win Prizes",
                  description: "Earn points and claim rewards",
                },
              ].map((item) => (
                <div key={item.step} className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full text-white text-xl bg-slate-600 flex items-center justify-center font-bold mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-slate-500">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
