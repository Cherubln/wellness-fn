"use client";
import { useAppContext } from "@/app/context";
import { ReactNode } from "react";
import { MdClose } from "react-icons/md";

const CenterModal = ({
  children,
  id,
}: {
  children: ReactNode;
  id: string | null | undefined;
}) => {
  const { activeModalId, setActiveModalId } = useAppContext();

  const closeModal = () => {
    setActiveModalId(null);
  };

  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className={`${activeModalId ? "block absolute" : "hidden"}`}>
      {activeModalId === id && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center max-md:items-end items-center z-50"
          onClick={closeModal}
        >
          <div
            className={`bg-white rounded-lg shadow-lg p-4 sm:p-8 max-md:h-[80vh] overflow-y-scroll hide-scrollbar md:max-w-fit w-full transform transition-all duration-500 ease-out ${
              activeModalId === id ? "animate-slideUp" : "animate-slideDown"
            }`}
            onClick={handleModalClick}
          >
            <div className="text-end w-full flex items-end justify-end">
              <MdClose onClick={closeModal} className="text-xl cursor-pointer" />
            </div>

            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default CenterModal;
