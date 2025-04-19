import { SessionTypeResponse } from "@/app/type";
import { ExtractDateTime } from "@/app/utils/convertDate";
import { isValidDate } from "@/app/utils/filters";
import { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { WiTime3 } from "react-icons/wi";

import { RxUpdate } from "react-icons/rx";

export const DetailBox = ({
  title,
  content,
  setSelectedSession,
  setSelectedSessionId,
}: {
  title: string;
  content: SessionTypeResponse[];
  setSelectedSession: (selectedSection: string) => void;
  setSelectedSessionId: (selectedSectionid: string) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("Select session slot");
  const dropdownRef = useRef<HTMLDivElement>(null);

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
      {/* Toggle Dropdown */}
      <div className="cursor-pointer" onClick={() => setOpen((prev) => !prev)}>
        <div className="flex items-center justify-between gap-4 cursor-pointer">
          <h2 className="text-sm text-gray-600 font-semibold">{title}</h2>
          <IoIosArrowDown
            className={`transition-transform duration-300 ${
              open ? "rotate-180" : "rotate-0"
            }`}
          />
        </div>
        <h2 className="text-sm text-slate-600 mt-2">
          {selected === "Select session slot"
            ? "Select session slot"
            : isValidDate(selected)
            ? ExtractDateTime(selected).date
            : selected}
        </h2>
      </div>

      {/* Dropdown Content */}
      {open && (
        <div className="absolute top-[70px] left-0 border w-full rounded-md bg-white p-4 shadow-lg z-30">
          {content.map((item, index) => (
            <section key={index}>
              {!item.recurring ? (
                <div
                  key={index}
                  onClick={() => {
                    setSelected(item.sessionDate);
                    setSelectedSession(item.sessionDate);
                    setSelectedSessionId(item._id);
                    setOpen(false);
                  }}
                  className="text-sm font-medium cursor-pointer hover:bg-slate-100 p-2 rounded-lg border mb-2 duration-300"
                >
                  <span className="flex items-center gap-1">
                    {" "}
                    <WiTime3 className="text-green-600 text-xl" />
                    <span className="text-slate-600">
                      Session Happening on:{" "}
                    </span>
                    <span className="font-bold">
                      {" "}
                      {ExtractDateTime(item.sessionDate).date}
                    </span>
                  </span>
                </div>
              ) : (
                <div className="mb-2 border rounded-lg p-2">
                  <h1 className=" flex items-center gap-2 border-b pb-2 mb-2 text-sm font-semibold">
                    <RxUpdate className="text-yellow-600 text-lg" /> Recurring
                    session – choose your day.
                  </h1>
                  {item.recurringPattern?.daysOfWeek.map((days, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        setSelected(days);
                        setSelectedSession(days);
                        setSelectedSessionId(item._id);
                        setOpen(false);
                      }}
                      className="text-sm font-medium duration-300 cursor-pointer hover:bg-slate-100 p-2 rounded-lg"
                    >
                      {days}
                    </div>
                  ))}
                </div>
              )}
            </section>
          ))}
          {/* Clear Selection */}
          <div
            className="text-sm font-bold text-center w-fit py-2 cursor-pointer bg-red-100 px-4 rounded-md mt-4 hover:bg-red-200"
            onClick={() => {
              setSelected("Select session slot");
              setOpen(false);
            }}
          >
            Clear Filter
          </div>
        </div>
      )}
    </div>
  );
};
