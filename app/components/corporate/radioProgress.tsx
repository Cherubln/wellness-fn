import { useEffect, useState } from "react";

const RadialProgress = ({ progress }: { progress?: number }) => {
  const [animatedProgress, setAnimatedProgress] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimatedProgress(Number(progress));
    }, 700);

    return () => clearTimeout(timeout);
  }, [progress]);

  return (
    <div
      className="radial-progress text-secondary text-3xl font-bold transition-all duration-1000 ease-in-out"
      style={
        {
          "--value": animatedProgress * 100,
          "--size": "12rem",
          "--thickness": "16px",
          transform: "scale(1)",
          transition: "transform 0.5s ease-in-out, opacity 0.8s ease-in-out",
        } as React.CSSProperties
      }
      role="progressbar"
    >
      {Math.round(animatedProgress * 100) || 0}%
    </div>
  );
};

export default RadialProgress;
