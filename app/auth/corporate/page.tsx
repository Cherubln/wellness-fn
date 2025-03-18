"use client";
import BaselineSurveyPage from "@/app/components/corporate/baselineSurvey";
import CorporateHRSignup from "@/app/components/corporate/corporateHRSignup";
import CorporateIntroPage from "@/app/components/corporate/corporateIntroPage";
import SelectPackages from "@/app/components/corporate/selectPackages";
import { BimaComponent } from "@/app/components/logo";
import { motion } from "framer-motion";
import { useState } from "react";
import "react-international-phone/style.css";
import CorporateBtn from "./corporateBtn";

function CorporateSignup() {
  const [next, setNext] = useState("page1");
  const [showNext, setShowNext] = useState(false);

  return (
    <div
      className="relative flex items-center justify-center min-h-screen w-full hide-scrollbar overflow-auto bg-cover bg-center"
      style={{
        backgroundImage: `url('https://knowledge.wharton.upenn.edu/wp-content/uploads/2023/03/3.15.23-scott-snyder-esg-corporate-innovation-GettyImages-1410816388.png')`, // Change to your actual image path
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>

      {/* Main Content */}
      <div className="relative flex flex-col min-h-screen md:min-h-[75vh] justify-start items-center gap-4 w-full md:w-4/5 lg:3/4 xl:w-3/5 bg-white rounded-md p-4 md:p-6 xl:p-8">
        {next === "page1" && (
          <>
            <CorporateIntroPage />
            <CorporateBtn
              name="Explore Our Plans"
              page="page2"
              setNext={setNext}
              showBtn={false}
              setShowNext={setShowNext}
            />
          </>
        )}

        {next === "page2" && (
          <div className="flex flex-col items-center w-full">
            <SelectPackages setShowNext={setShowNext} />
            {showNext && (
              <CorporateBtn
                name="Proceed to Signup"
                page="page3"
                setNext={setNext}
                showBtn={false}
                setShowNext={setShowNext}
              />
            )}
          </div>
        )}
        {next === "page3" && (
          <div className="flex flex-col items-center w-full">
            <CorporateHRSignup setShowNext={setShowNext} />
            {showNext && (
              <CorporateBtn
                name="Proceed to survey"
                page="page4"
                setNext={setNext}
                showBtn={false}
                setShowNext={setShowNext}
              />
            )}
          </div>
        )}

        {next === "page4" && (
          <div className="flex flex-col gap-2 items-center w-full">
            <div className="flex flex-col items-center gap-4">
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
