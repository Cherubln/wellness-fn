import React from "react";

const InputComponent = ({
  type,
  error,
  value,
  handleInputValue,
  widthSize = 100,
  placeholder = "Enter you response here...",
}: {
  type: string;
  value?: string;
  handleInputValue: (value: string, type: string) => void;
  error?: string;
  placeholder?: string;
  widthSize?: number;
}) => {

  return (
    <div className="flex flex-col gap-1" style={{ width:`${widthSize}%` }}>
      <input
        type={type}
        value={value}
        onChange={(e) => handleInputValue(e.target.value, type)}
        name=""
        required
        placeholder={placeholder}
        className="py-2 px-4 rounded-md border focus:outline-secondary/30"
      />
      {error && <span className="text-red-500 pl-2 text-sm">{error}</span>}
    </div>
  );
};

export default InputComponent;
