"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import ButtonComp from "./button";

const HeroSection = () => {
  return (
    <div className="relative w-full h-[400px] lg:h-[600px] xl:h-[700px] overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/video/bgh.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay to improve text readability */}
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40"></div>

      {/* Content Section */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "backInOut" }}
        className="absolute top-[30%] md:top-1/3 xl:left-1/4 p-4 lg:px-8 lg:py-4 text-white flex flex-col gap-4 items-center justify-center w-full md:w-4/5 xl:w-[40%] max-w-[1750px]"
      >
        <h1 className="text-lg md:text-4xl font-bold text-center">
          Building Healthier Communities Together
        </h1>
        <p className="text-sm italic max-lg:hidden">
          &quot;Join our growing community of healthcare providers,
          organizations, and individuals committed to revolutionizing healthcare
          delivery through collaborative wellness programs and preventive care
          initiatives.&quot;
        </p>
        <p className="text-sm italic lg:hidden">
          &quot;Join our community working together to enhance healthcare
          through collaboration and preventive care.&quot;
        </p>
        <div className="max-lg:hidden">
          <Link href={"/auth"}>
            <ButtonComp title="Explore More" />
          </Link>
        </div>
        <div className="lg:hidden flex gap-2">
          <Link href={"/auth"}>
            <ButtonComp title="Login" />
          </Link>
          <Link href={"/auth"}>
            <ButtonComp title="Sign up" />
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroSection;
