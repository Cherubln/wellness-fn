import { Question } from "@/costants";
import React, { useState } from "react";

const arr = [1, 2, 3, 4, 5];

const LikertComponent = ({
  quest,
  handleInputValue,
  likertRange,
}: {
  quest: Question;
  handleInputValue: (value: string, id?: number) => void;
  likertRange?: string[];
}) => {
  const { id, question } = quest;
  const [selected, setSelected] = useState<number | null>(Number(quest.answer));

  return (
    <div className="flex gap-3 max-sm:flex-wrap items-center">
      <label htmlFor={""} className="text-slate-500 w-full xl:w-[60%]">
        {id}. {question}
      </label>
      <div className="w-full xl:w-[40%] max-w-md">
        <div className="flex items-center justify-between my-2 flex-wrap gap-2">
          {arr.map((item) => (
            <span
              key={item}
              onClick={() => {
                setSelected(item);
                handleInputValue(String(item), quest.id);
              }}
              className={`w-8 h-8 flex items-center justify-center rounded-full border cursor-pointer transition-all duration-300 ${
                selected !== null && item <= selected
                  ? "bg-secondary text-white border-secondary"
                  : "border-gray-400 text-gray-600"
              }`}
            >
              {item}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between text-slate-500 font-semibold text-xs">
          <span>{likertRange && likertRange[0]}</span>
          <span>{likertRange && likertRange[1]}</span>
        </div>
      </div>
    </div>
  );
};

export default LikertComponent;
