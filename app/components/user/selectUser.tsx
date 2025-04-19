"use client";
import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";

export interface UserInfo {
  id: string;
  fullname: string;
  email: string;
}

interface SelectUserProps {
  allUsers: UserInfo[];
  onSelect: (selected: UserInfo[]) => void;
  selectedUsers?: UserInfo[];
  placeholder?: string;
}

const SelectUser: React.FC<SelectUserProps> = ({
  allUsers,
  onSelect,
  selectedUsers = [],
  placeholder = "Search users...",
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filtered, setFiltered] = useState<UserInfo[]>([]);
  const [selected, setSelected] = useState<UserInfo[]>(selectedUsers);

  useEffect(() => {
    const filteredResults = allUsers.filter((user) =>
      user.fullname.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFiltered(filteredResults);
  }, [searchTerm, allUsers]);

  const handleAdd = (user: UserInfo) => {
    if (!selected.find((u) => u.email === user.email)) {
      const updated = [...selected, user];
      setSelected(updated);
      onSelect(updated);
      setSearchTerm("");
    }
  };

  const handleRemove = (email: string) => {
    const updated = selected.filter((user) => user.email !== email);
    setSelected(updated);
    onSelect(updated);
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="relative">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={placeholder}
          className="p-3 border border-gray-300 focus:outline-none focus:border-blue-500 rounded-lg w-full"
        />
        {searchTerm && (
          <div className="absolute z-10 bg-white border shadow-sm w-full top-full rounded-md max-h-[250px] overflow-y-scroll hide-scrollbar">
            {filtered.length > 0 ? (
              <ul className="text-sm text-gray-700">
                {filtered.map((user) => (
                  <li
                    key={user.id}
                    onClick={() => handleAdd(user)}
                    className="hover:bg-slate-100 py-2 px-4 cursor-pointer"
                  >
                    {user.fullname} ({user.email})
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-3 text-red-500 text-sm text-center">
                No user found
              </div>
            )}
          </div>
        )}
      </div>

      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2 max-h-[200px] overflow-y-scroll hide-scrollbar p-3 bg-slate-50 rounded-lg">
          {selected.map((user, index) => (
            <div
              key={user.email}
              className="flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
            >
              {`${index + 1}. ${user.fullname} (${user.email})`}
              <button
                onClick={() => handleRemove(user.email)}
                className="hover:text-red-600"
              >
                <IoClose size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectUser;
