import React from "react";

const InputComponent = ({
  type,
  error,
  value,
  handleInputValue,
  widthSize = 100,
  placeholder = "Enter you response here...",
  id
}: {
  type: string;
  value?: string;
  handleInputValue: (value: string, id?:number, type?: string) => void;
  error?: string;
  widthSize?: number;
  placeholder?: string;
  id?:number;
}) => {
 
  return (
    <div className="flex flex-col gap-1" style={{ width:`${widthSize}%` }}>
      <input
        type={type}
        value={value}
        onChange={(e) => {
          handleInputValue(e.target.value, id, type)
        }}
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
