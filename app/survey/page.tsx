"use client";
import BaselineSurveyPage from "@/app/components/corporate/baselineSurvey";
import "react-international-phone/style.css";
import { BimaComponent } from "../components/logo";
import { useState } from "react";
import CorporateBtn from "../auth/corporate/corporateBtn";
import EmplyoyeeSignup from "./userInfo";

function CorporateEmployeeSignup() {
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

      <div className="relative flex flex-col gap-4 w-full sm:4/5 md:w-2/4  h-full  min-h-[75vh] bg-white drop-shadow-md rounded-md p-2 md:p-4 xl:p-8">
        <div className="flex flex-col items-center gap-4 justify-center">
          <BimaComponent width={150} height={100} />
          <p className="max-sm:hidden w-4/5 text-center">
            Your feedback helps us understand how to improve leadership,
            culture, and your overall work experience. This survey should take
            about 5-10 minutes. Your responses will remain confidential, and we
            will only share generalized employee data
          </p>
        </div>

        {next === "page1" && (
          <>
            {!showNext && <EmplyoyeeSignup setShowNext={setShowNext} />}
            {showNext && (
              <CorporateBtn
                name="Continue"
                page="page2"
                setNext={setNext}
                showBtn={showNext}
                setShowNext={setShowNext}
              />
            )}
          </>
        )}

        {next === "page2" && (
          <div className="flex flex-col gap-2 min-h-[50vh] items-center w-full">
            <BaselineSurveyPage user={1} employee={true} />
          </div>
        )}
      </div>
    </div>
  );
}

export default CorporateEmployeeSignup;
