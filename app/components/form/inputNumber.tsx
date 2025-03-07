import React from "react";

const InputNumber = ({
  type,
  error,
  value,
  id,
  handleInputValue,
}: {
  type: string;
  id:number;
  handleInputValue: (value: string, id?:number) => void;
  value?: string;
  error?: string;
}) => {
  return (
    <div className="flex flex-col md:w-48 gap-1">
      <input
        type={type}
        value={value}
        onChange={(e) => handleInputValue(e.target.value, id)}
        name=""
        min={0}
        placeholder="0"
        className="py-2 px-4  rounded-md border focus:outline-secondary/30 "
        style={{
          appearance: "textfield",
          MozAppearance: "textfield",
          WebkitAppearance: "none",
        }}
      />
      {error && <span className="text-red-500 pl-2">{error}</span>}
    </div>
  );
};

export default InputNumber;
