import React from "react";
import Navbar from "./navbar";
import HeroSection from "./heroSection";
import FooterPage from "./footer";
import AboutPage from "./about";
import ActivityPage from "./activity";
import ChallengeSection from "./challenge";

const LandingPage = () => {
  return (
    <div className="relative">
      {/* nav */}
      <Navbar />
      <div className="pt-20">
        {/* hero */}
        <HeroSection />
        {/* body */}
        <div className="flex flex-col gap-6 lg:gap-12 p-6 lg:p-12 max-w-[1750px] mx-auto">
          <AboutPage />
          <ActivityPage />
          <ChallengeSection />
        </div>
        {/* footer */}
        <FooterPage />
      </div>
    </div>
  );
};

export default LandingPage;
