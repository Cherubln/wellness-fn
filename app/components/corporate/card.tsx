import React from "react";

const Card = ({
  title,
  content,
  color,
  skeleton,
}: {
  title: string;
  content: number;
  color: string;
  skeleton: boolean;
}) => {
  return (
    <div
      className="flex flex-col items-center justify-end border w-full max-w-md rounded-lg p-4 min-w-44 text-white "
      style={{ backgroundColor: color }}
    >
      <span className="font-semibold capitalize">{title}</span>
      {skeleton ? (
        <span className="loading loading-dots loading-lg"></span>
      ) : (
        <span className=" p-3 text-3xl font-bold">{content}</span>
      )}
    </div>
  );
};

export default Card;
