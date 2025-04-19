"use client";
import BaselineSurveyPage from "@/app/components/corporate/baselineSurvey";
import "react-international-phone/style.css";

function CorporateSignup() {


  return (
    <div className="flex items-center justify-center h-full md:h-[80vh] w-full pt-12">
      <div className="flex flex-col gap-4 w-full max-md:h-[70vh] h-full bg-white drop-shadow-md rounded-md p-2 md:p-4 xl:p-8">
        <BaselineSurveyPage user={1} />
      </div>
    </div>
  );
}

export default CorporateSignup;
