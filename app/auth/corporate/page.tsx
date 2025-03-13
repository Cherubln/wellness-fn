"use client";
import BaselineSurveyPage from "@/app/components/corporate/baselineSurvey";
import CorporateHRSignup from "@/app/components/corporate/corporateHRSignup";
import CorporateIntroPage from "@/app/components/corporate/corporateIntroPage";
import { BimaComponent } from "@/app/components/logo";
import { motion } from "framer-motion";
import { useState } from "react";
import "react-international-phone/style.css";

function CorporateSignup() {
  const [next, setNext] = useState("page1");
  const [showNext, setShowNext] = useState(false);

  return (
    <div className="flex items-center justify-center h-full bg-gray-50 md:h-screen w-full">
      <div className="flex flex-col justify-center items-center gap-4 md:border-b w-full md:w-4/5 lg:w-3/4 2xl:w-3/5 md:drop-shadow-md md:border h-[90%] bg-white rounded-md p-2 md:p-4 xl:p-8">
        {next === "page1" && (
          <>
            <CorporateIntroPage />
            <motion.button
              key="submit-button"
              onClick={() => setNext("page2")}
              initial={{ opacity: 0, scale: 0, y: 100 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.1 }}
              className="px-8 py-3 w-1/2 mx-auto border border-secondary rounded-full font-semibold mt-8 uppercase hover:bg-secondary hover:text-white hover:scale-90 cursor-pointer hover:duration-200 transition"
            >
              Next
            </motion.button>
          </>
        )}

        {next === "page2" && (
          <div className="flex flex-col items-center h-full justify-center">
            <CorporateHRSignup setShowNext={setShowNext} />
            {showNext && (
              <motion.button
                key="submit-button"
                onClick={() => setNext("page3")}
                initial={{ opacity: 0, scale: 0, y: 100 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.1 }}
                className="px-8 py-3 w-full md:w-1/3 mx-auto border border-secondary rounded-full font-semibold mt-8 uppercase hover:bg-secondary hover:text-white hover:scale-90 cursor-pointer hover:duration-200 transition"
              >
                Next
              </motion.button>
            )}
          </div>
        )}

        {next === "page3" && (
          <div className="flex flex-col gap-2 items-center justify-between h-full w-full  ">
            <div className="flex flex-col items-center gap-4 justify-center">
              <BimaComponent width={150} height={100} />
              <p className="max-sm:hidden w-4/5 text-center">
                In this first module, we’ll gather corporate-level information
                about your organization’s wellness goals, claims data, and
                absenteeism. This will help us tailor our approach and measure
                your ROI and VOI accurately.
              </p>
            </div>

            <BaselineSurveyPage user={0} />
          </div>
        )}
      </div>
    </div>
  );
}

export default CorporateSignup;
