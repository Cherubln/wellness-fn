import { motion } from "framer-motion";
import React from "react";
export interface PlanType {
  name: string;
  price: number;
  duration: string;
  popular: boolean;
  description: string;
  features: string[];
  details: string[];
}
const TieredPricing = ({ plan }: { plan: PlanType }) => {
  return (
    <div className="flex flex-col justify-center gap-4 items-center">
      <h1 className="text-2xl font-semibold text-center">{plan.name}</h1>
      <h2 className="text-lg font-semibold text-center">
        💰 Tiered Pricing (Based on Employee Count)
      </h2>
      <motion.ul
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.5 }}
        className="text-base text-gray-700 self-center mt-2 space-y-1"
      >
        {plan.details.map((feat, i) => (
          <li key={i} className="list-disc">
            {feat}
          </li>
        ))}
      </motion.ul>
    </div>
  );
};

export default TieredPricing;
