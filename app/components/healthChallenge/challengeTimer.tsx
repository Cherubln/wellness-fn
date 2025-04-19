"use client";

import React from "react";

type CountdownTimerProps = {
  timeLeft: number;
};

const CountdownTimer: React.FC<CountdownTimerProps> = ({ timeLeft }) => {
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="text-center text-2xl font-bold text-primaryGreen">
      {timeLeft > 0 && <p>⏳ Time left: {formatTime(timeLeft)}</p>}
    </div>
  );
};

export default CountdownTimer;
