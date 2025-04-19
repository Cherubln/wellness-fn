"use client";

import React, { useEffect, useState } from "react";
import TitleSection from "./title";
import Loader from "../loader";
import { GetAllActivity } from "@/app/api/activity/action";
import ActivityCardPage from "./activityCardSection";
import ButtonComp from "./button";
import Link from "next/link";
import { ServiceType } from "@/app/type";

const ActivityPage = () => {
  const [activity, setActivity] = useState<ServiceType[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getActivity();
  }, []);

  const getActivity = async () => {
    setLoading(true);
    try {
      const result = await GetAllActivity();
      if (result) setActivity(result);
    } catch (error) {
      console.log("Request error", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div id="Activities" className="space-y-12">
      <TitleSection
        title="activities"
        subtitle="Prioritize your health and wellness with exciting fitness activities and affordable diagnostic services. From energizing workouts to convenient health check-ups, there's something for everyone—book now and take the first step towards a healthier you!"
      />
      <div className="flex flex-wrap items-stretch justify-center gap-4 w-full">
        {activity.slice(2, 5).map((act) => (
          <div key={act._id} className="max-sm:w-full w-[30%] sm:min-w-[400px]">
            <ActivityCardPage activity={act} />
          </div>
        ))}
      </div>
      <div className="mt-8 flex items-center justify-center w-full">
        <Link href={"/dashboard"}>
          <ButtonComp title="View more activities" />
        </Link>
      </div>
    </div>
  );
};

export default ActivityPage;
