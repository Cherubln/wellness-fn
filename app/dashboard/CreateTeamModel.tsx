// components/CreateTeamModal.tsx
"use client";
import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import ItemSearch from "../components/ItemSearch";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/app/store";
import { fetchAllUsers } from "@/app/store/slices/usersSlice";
import { createGroup } from "@/app/store/slices/groupsSlice";
import { RootState } from "@/app/store";

interface CreateTeamModalProps {
  isOpen: boolean;
  onClose: (boole: boolean) => void;
}

const CreateTeamModal: React.FC<CreateTeamModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [groupName, setGroupName] = useState("");
  const [groupMembers, setgroupMembers] = useState<string[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const { users, status } = useSelector((state: RootState) => state.users);
  const auth = useSelector((state: RootState) => state.auth);

  const { status: groupsStatus, error } = useSelector(
    (state: RootState) => state.groups
  );

  useEffect(() => {
    if (isOpen && status === "idle") {
      dispatch(fetchAllUsers());
    }
  }, [isOpen, status, dispatch]);

  const handleCreateGroup = async () => {
    await dispatch(
      createGroup({ admin: auth.user._id!, groupName, members: groupMembers })
    );

    if (groupsStatus === "succeeded") onClose(false);
  };

  return (
    <>
      {isOpen && (
        <div className="modal modal-open ">
          <div className="modal-box relative bg-[var(--background)]">
            <button
              className="btn btn-sm btn-circle absolute right-2 top-2"
              onClick={() => onClose(false)}
            >
              <FaTimes />
            </button>
            <h3 className="text-lg font-bold mb-4">Create a Team</h3>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Group Name</span>
              </label>
              <input
                type="text"
                placeholder="Group Name"
                className="input input-bordered"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
              />
            </div>
            <div className="form-control mb-4">
              <ItemSearch
                items={users.filter((usr) => usr._id !== auth.user._id)}
                setfilteredItems={setgroupMembers}
                filteredItems={groupMembers}
              />
            </div>

            <p className="text-red-500 text-center">{error}</p>
            <div className="modal-action">
              <button
                className={`btn btn-sm hover:bg-secondary disabled:bg-neutral/40 disabled:text-neutral bg-secondary/50 border-none`}
                onClick={handleCreateGroup}
                disabled={
                  groupMembers.length === 0 ||
                  !groupName ||
                  groupsStatus === "loading"
                }
              >
                {groupsStatus === "loading" ? "Creating" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateTeamModal;
