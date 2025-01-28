/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MdOutlineHealthAndSafety } from "react-icons/md";
import { FaArrowsDownToPeople } from "react-icons/fa6";
import { RiVerifiedBadgeLine } from "react-icons/ri";
import { LiaAwardSolid } from "react-icons/lia";

const slides = [
  {
    image: "/images/welcome.svg",
    title: (
      <span>
        Welcome To The Biggest Health Challenge
        <MdOutlineHealthAndSafety className="inline -mt-0.5 text-3xl" />
      </span>
    ),
    content: (
      <p>
        Join the movement that makes health{" "}
        <span className="text-secondary font-bold">fun</span>,{" "}
        <span className="text-secondary font-bold">social</span>, and{" "}
        <span className="text-secondary font-bold">rewarding</span>.{" "}
        <span className="font-bold">Compete</span>,{" "}
        <span className="font-bold">connect</span>, and{" "}
        <span className="font-bold">create</span> healthier habits.
      </p>
    ),
  },
  {
    image: "/images/connect.svg",
    title: (
      <span>
        Connect
        <FaArrowsDownToPeople className="inline ml-1.5 -mt-2 text-3xl" />
      </span>
    ),
    content: (
      <div className="flex flex-col gap-2">
        <span className="text-center font-bold">Team Up or Go Solo!</span>
        <p>
          Join a community of wellness enthusiasts. Compete on the live{" "}
          <span className="font-semibold">leaderboard</span> as an{" "}
          <span className="font-semibold">individual</span> or with your{" "}
          <span className="font-semibold">team</span>.
        </p>
      </div>
    ),
  },
  {
    image: "/images/gym.svg",
    title: (
      <span>
        Get Active <RiVerifiedBadgeLine className="inline -mt-0.5 text-3xl" />
      </span>
    ),
    content: (
      <div className="flex flex-col gap-2">
        <span className="text-center font-bold">Your Health, Your Way!</span>
        <p>
          Discover activities you will love across{" "}
          <span className="font-semibold">Physical Activity</span>,{" "}
          <span className="font-semibold">Mental Wellness</span>,{" "}
          <span className="font-semibold">Nutrition</span>, and{" "}
          <span className="font-semibold">Diagnostics</span>.
        </p>
      </div>
    ),
  },
  {
    image: "/images/prize.svg",
    title: (
      <span>
        Earn Points
        <LiaAwardSolid className="inline ml-0.5 -mt-0.5 text-3xl " />
      </span>
    ),
    content: (
      <div className="flex flex-col gap-2">
        <span className="text-center font-bold">Wellness That Pays Off!</span>
        <p>
          Turn your health journey into a rewarding adventure. Stay active,{" "}
          <span className="font-semibold">earn points</span>, and{" "}
          <span className="font-semibold">redeem</span> them for exciting
          rewards.
        </p>
      </div>
    ),
  },
];

const SlideShow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (currentSlide < slides.length - 1) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => prev + 1);
      }, 5000); // 10 seconds delay
      return () => clearInterval(timer);
    }
  }, [currentSlide]);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide((prev) => prev + 1);
    }
  };

  const goToLogin = () => {
    router.push("/auth");
  };

  return (
    <div className="relative w-full h-screen overflow-hidden ">
      <div
        className="absolute top-0 left-0 bottom-0 flex transition-transform duration-1000 transform"
        style={{
          width: `${slides.length * 100}%`,
          transform: `translateX(-${currentSlide * (100 / slides.length)}%)`,
        }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center container m-auto h-full bg-white flex-shrink-0 px-5 gap-10 max-w-full sm:max-w-96"
            style={{ width: `${100 / slides.length}%` }}
          >
            <h1 className="text-2xl font-semibold text-center">
              {slide.title}
            </h1>
            <img
              src={slide.image}
              alt={`Slide ${index}`}
              className="max-w-full sm:max-w-96 h-auto"
            />

            <div className="text-center max-w-full sm:max-w-96">
              {slide.content}
            </div>
            {currentSlide < slides.length - 1 ? (
              <button
                className="btn bg-secondary/60 hover:bg-secondary w-full sm:w-80"
                onClick={nextSlide}
              >
                Next
              </button>
            ) : (
              <button
                className="btn bg-secondary/60 hover:bg-secondary w-full sm:w-80"
                onClick={goToLogin}
              >
                Login
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SlideShow;
