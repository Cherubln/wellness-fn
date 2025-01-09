import React, { ChangeEvent, useState } from "react";

const ItemSearch = ({
  items,
  filteredItems,
  setfilteredItems,
}: {
  items: { fullname: string; id: string }[];
  filteredItems: string[];
  setfilteredItems: (items: string[]) => void;
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleUserClick = (user: string) => {
    if (filteredItems.includes(user)) {
      setfilteredItems(filteredItems.filter((u) => u !== user));
    } else {
      setfilteredItems([...filteredItems, user]);
    }
  };

  const filteredUsers = items.filter((user) =>
    user.fullname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        className="input input-bordered w-full "
        placeholder="Search users..."
      />
      {searchTerm && (
        <ul className="absolute bg-white border w-full mt-2 max-h-60 overflow-y-auto rounded-lg shadow-md">
          {filteredUsers.length === 0 ? (
            <li className="p-2 label-text-alt text-red-400">Not found</li>
          ) : (
            filteredUsers.map((user) => (
              <li
                key={user.id}
                onClick={() => handleUserClick(user.id)}
                className={`p-2 cursor-pointer text-black ${
                  filteredItems.includes(user.fullname) ? "bg-blue-100" : ""
                }`}
              >
                {user.fullname}
                {filteredItems.includes(user.fullname) && (
                  <span className="ml-2 text-green-500">✔</span>
                )}
              </li>
            ))
          )}
        </ul>
      )}
      <div className="flex flex-wrap gap-2 mt-4">
        {filteredItems.map((user) => {
          return (
            <span key={user} className="badge bg-secondary/50 p-3">
              {items.find((u) => u.id === user)?.fullname}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default ItemSearch;
