// components/WidgetsSection.tsx
import React from "react";
import { FaTrophy, FaUsers, FaBriefcase } from "react-icons/fa";
import { GiPodiumWinner } from "react-icons/gi";

interface WidgetsSectionProps {
  role: string;
  selectedWidget: string | null;
  onWidgetClick: (widget: string) => void;
}

const WidgetsSection: React.FC<WidgetsSectionProps> = ({
  role,
  selectedWidget,
  onWidgetClick,
}) => {
  const roleBasedWidgets =
    role === "service_provider"
      ? [
          {
            icon: <FaBriefcase className="text-2xl " />,
            label: "Services",
          },
        ]
      : [
          {
            icon: <GiPodiumWinner className="text-2xl " />,
            label: "Events",
          },
          {
            icon: <FaBriefcase className="text-2xl " />,
            label: "Activities",
          },
          {
            icon: <FaUsers className="text-2xl " />,
            label: "Teams",
          },
        ];
        
  return (
    <div className="w-full flex flex-wrap justify-center">
      {roleBasedWidgets.map((widget, index) => (
        <div
          key={index}
          className={`flex flex-col items-center m-4 cursor-pointer `}
          onClick={() => onWidgetClick(widget.label)}
        >
          <div
            className={` ${
              selectedWidget === widget.label ? "bg-accent" : "bg-gray-200 "
            } rounded-full p-3`}
          >
            {widget.icon}
          </div>
          <p
            className={`text-sm mt-1 text-nowrap font-semibold text-center w-min ${
              selectedWidget === widget.label ? "text-secondary" : ""
            }`}
          >
            {widget.label}
          </p>
        </div>
      ))}
    </div>
  );
};

export default WidgetsSection;
