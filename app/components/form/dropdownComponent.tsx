import React from "react";

function DropdownComponent({
  options,
  id,
  value,
  handleInputValue,
}: {
  id: number;
  value?: string ;
  handleInputValue: (value: string, id?: number) => void;
  options?: string[];
}) {
  return (
    <select
      value={value}
      onChange={(e) => handleInputValue(e.target.value, id)}
      className="w-40 p-2 border border-slate-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition-all duration-300"
    >
      <option value="Select" className="text-slate-400 bg-white">
        Select
      </option>
      {options?.map((item) => (
        <option
          key={item}
          value={item}
          className="text-lg text-slate-700 hover:bg-secondary hover:text-white"
        >
          {item}
        </option>
      ))}
    </select>
  );
}

export default DropdownComponent;
