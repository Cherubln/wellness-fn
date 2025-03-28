"use client";
import { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

export const AddingDetailBox = ({
  title,
  setTotalSelected,
}: {
  title: string;
  setTotalSelected: (totalSelected: number) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(1);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTotalSelected(count);
  }, [count]);


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={dropdownRef}
      className="relative border rounded-lg p-3 bg-gray-50"
    >
      <div className="cursor-pointer" onClick={() => setOpen((prev) => !prev)}>
        <div className="flex items-center justify-between gap-4 cursor-pointer">
          <h2 className="text-sm font-semibold text-gray-600">{title}</h2>
          <IoIosArrowDown
            className={`transition-transform duration-300 ${
              open ? "rotate-180" : "rotate-0"
            }`}
          />
        </div>
        <h2 className="text-sm text-slate-500 mt-2">
          <span className="font-bold">People: </span>
          {count}
        </h2>
      </div>

      {open && (
        <div className="absolute top-[70px] left-0 border w-full rounded-lg bg-white shadow-2xl z-30">
          <div className="flex gap-2 items-center justify-between hover:bg-slate-200 px-4 py-3">
            <span className="text-sm">People</span>

            <div className="w-1/2 flex gap-2 items-center justify-between py-2 px-4 rounded-full border bg-white">
              <span
                onClick={() => setCount((prev) => (prev > 1 ? prev - 1 : 1))}
                className="cursor-pointer"
              >
                -
              </span>
              <span>{count}</span>
              <span
                onClick={() => setCount((prev) => (prev < 10 ? prev + 1 : 10))}
                className="cursor-pointer"
              >
                +
              </span>
            </div>
          </div>
          <div className="text-sm text-center border-t p-2 w-full">
            Min:1 and Max:10
          </div>
        </div>
      )}
    </div>
  );
};
