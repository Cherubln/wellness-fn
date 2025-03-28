import React from "react";

const TitleSection = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-2">
      <span className="text-lg lg:text-3xl text-slate-700 font-bold uppercase">
        {title}
      </span>
      <span className="text-sm lg:text-base text-slate-500 text-center max-sm:w-full w-4/5 lg:w-1/2">
        {subtitle}
      </span>
    </div>
  );
};

export default TitleSection;
