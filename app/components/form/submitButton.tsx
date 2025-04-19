import { motion } from "framer-motion";
import React from "react";

function SubmitButton({
  setAction,
  action,
  name,
  disable,
  loading
}: {
  action: string;
  loading:boolean,
  name: string;
  setAction: (action: string) => void;
  disable?: boolean;
}) {
  return (
    <motion.button
      key="submit-button"
      disabled={disable}
      onClick={() => setAction(action)}
      initial={{ opacity: 0, scale: 0, y: 100 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.1 }}
      className={`${
        disable
          ? "disabled:cursor-not-allowed"
          : loading? " bg-secondary" : " border-secondary  hover:bg-secondary hover:text-white hover:scale-90 cursor-pointer hover:duration-200 transition"
      } px-8 py-3 w-full md:w-1/2 mx-auto  border rounded-full font-semibold mt-8 uppercase`}
    >
      {loading ? (
        <span className="loading loading-spinner text-white loading-md"></span>
      ) : (
        name
      )}
    </motion.button>
  );
}

export default SubmitButton;
