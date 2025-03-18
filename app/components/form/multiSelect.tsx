import React, { useState } from "react";

const MultiSelectComponent = ({
  id,
  options = [],
  value,
  handleInputArrayValue,
}: {
  id: number;
  value?:string[];
  options?: string[];
  handleInputArrayValue: (id: number, value?: string[]) => void;
}) => {
  const [selectedItems, setSelectedItems] = useState<string[]|undefined>(value);

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    item: string
  ) => {
    let updatedSelection = e.target.checked
      ? [...selectedItems!, item] // Add item if checked
      : selectedItems?.filter((selected) => selected !== item); // Remove if unchecked

    setSelectedItems(updatedSelection);
    handleInputArrayValue(id, updatedSelection); // Pass updated selection to parent
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      {options.map((item) => (
        <div key={item} className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={selectedItems?.includes(item)}
            onChange={(e) => handleCheckboxChange(e, item)}
            className="checkbox border-secondary [--chkbg:theme(colors.secondary)] [--chkfg:white] checked:border-primary checkbox-sm"
          />
          <span className="text-slate-500">{item}</span>
        </div>
      ))}
    </div>
  );
};

export default MultiSelectComponent;
