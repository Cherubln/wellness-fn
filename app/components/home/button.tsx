import { motion } from "framer-motion";
import React from "react";

const ButtonComp = ({ title }: { title: string }) => {
  return (
    <div>
      <motion.button
        whileHover={{ scale: 0.9 }}
        transition={{duration:0.1}}
        className="border text-nowrap cursor-pointer border-secondary rounded-full text-secondary py-3 px-8 font-bold duration-300 transition hover:bg-secondary hover:text-white"
      >
        {title}
      </motion.button>
    </div>
  );
};

export default ButtonComp;
