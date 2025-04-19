import { motion } from "framer-motion";
import React from "react";

const CorporateBtn = ({
  name,
  page,
  setNext,
  showBtn,
  setShowNext,
}: {
  name: string;
  page: string;
  showBtn:boolean;
  setNext: (next: string) => void;
  setShowNext: (showNext: boolean) => void;
}) => {
  return (
    <motion.button
      key="submit-button"
      onClick={() => {
        setNext(page), setShowNext(showBtn);
      }}
      initial={{ opacity: 0, scale: 0, y: 100 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.1 }}
      className="px-8 py-3 w-fit mx-auto border border-secondary rounded-full font-semibold mt-8 uppercase hover:bg-secondary hover:text-white hover:scale-90 cursor-pointer hover:duration-200 transition"
    >
      {name}
    </motion.button>
  );
};

export default CorporateBtn;
