'use client'
import { motion } from 'framer-motion';
import React from 'react'
import GalerrySection from './gallery';
import TitleSection from './title';
const slides = [
  {
    image: "/images/welcome.svg",
    content: (
      <div className="flex flex-col gap-2">
        <span className="text-center font-bold">Start your Journey now!</span>
        <p>
          Join the movement that makes health{" "}
          <span className="text-secondary font-bold">fun</span>,{" "}
          <span className="text-secondary font-bold">social</span>, and{" "}
          <span className="text-secondary font-bold">rewarding</span>.{" "}
          <span className="font-bold">Compete</span>,{" "}
          <span className="font-bold">connect</span>, and{" "}
          <span className="font-bold">create</span> healthier habits.
        </p>
      </div>
    ),
  },
  {
    image: "/images/connect.svg",

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


const AboutPage = () => {
  return (
    <div id="About" className="flex flex-col gap-8 ">
      <div className="flex flex-wrap items-center justify-between">
        <div className=" w-full lg:w-1/2 space-y-3">
          <h3 className="text-lg lg:text-2xl font-semibold text-slate-500">
            About Us
          </h3>
          <p className="text-xl lg:text-4xl font-bold">
            Welcome to{" "}
            <strong className="text-secondary">Biggest Health Challenge</strong>
          </p>
          <p className="text-sm lg:text-lg">
            The Biggest Health Challenge today is maintaining consistency in
            leading a healthy lifestyle. Many individuals struggle with staying
            motivated, accessing support, and making sustainable health
            improvements. This inconsistency often leads to preventable
            illnesses, higher healthcare costs, and reduced quality of life.
          </p>
        </div>

        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-col justify-center gap-4 w-full lg:w-1/2"
        >
          <h1 className="w-full font-semibold text-lg leading-8 tracking-normal text-primaryGreen text-center">
            Our Gallery
          </h1>
          <GalerrySection />
        </motion.div>
      </div>

      <TitleSection
        title="Prioritize Your Well-being"
        subtitle="Embrace a healthier lifestyle with engaging fitness activities and accessible diagnostic services. Whether you're looking for invigorating workouts or convenient health check-ups, we have something for everyone. Start your wellness journey today!"
      />
      <div className="flex items-stretch justify-center flex-wrap gap-4 ">
        {slides.map((slide, index) => (
          <div
            key={index}
            className="hover:shadow-lg hover:scale-105 hover:bg-white bg-gray-100 duration-300 transition flex flex-col items-center justify-center border shadow-md rounded-lg p-2  px-5 gap-10 max-w-80 min-w-80"
            style={{ width: `${100 / slides.length}%` }}
          >
            <img src={slide.image} alt={`Slide ${index}`} className="" />

            <div className="text-center pb-4">{slide.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AboutPage