import React, { useState } from "react";
import { motion } from "framer-motion";
import { BimaComponent } from "../logo";
import { useAppContext } from "@/app/context";
import {
  BasicPackage,
  PackagePeriod,
  PackagePlans,
  PremiumPacakage,
} from "@/costants";

const SelectPackages = ({
  setShowNext,
}: {
  setShowNext: (showNext: boolean) => void;
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState("Quarterly");
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [selectedEmployees, setSelectedEmployees] = useState<{
    [key: string]: string;
  }>({});

  const { setSelectetPackage } = useAppContext();

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col gap-6 items-center justify-center w-full"
      >
        <BimaComponent width={400} height={300} />

        {selectedPlan ? (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="p-6 border w-full md:w-3/4 space-y-4 rounded-lg shadow-lg bg-white"
          >
            <h1 className="text-xl font-semibold text-center">
              {selectedPlan === "Basic Package" ? (
                <span>
                  ✅ Thank you for choosing the BimaFlow {selectedPeriod} Basic
                  Package!
                  <br /> Here’s what happens next:
                </span>
              ) : (
                <>
                  ✅ Welcome to the BimaFlow {selectedPeriod} Premium Package!
                  <br /> Here’s what happens next:
                </>
              )}
            </h1>
            {selectedPlan === "Basic Package" ? (
              <ul className="text-base pl-8 text-gray-700 space-y-1">
                {BasicPackage.map((step, index) => (
                  <li key={index} className="list-disc">
                    {step}
                  </li>
                ))}
              </ul>
            ) : (
              <ul className="text-base pl-8 text-gray-700 space-y-1">
                {PremiumPacakage.map((step, index) => (
                  <li key={index} className="list-disc">
                    {step}
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        ) : (
          <>
            <div className="text-center">
              <h1 className="text-2xl font-semibold">
                Tailored Pricing Packages
              </h1>
              <p className="text-gray-500">
                Choose the plan that best fits your company's needs
              </p>
            </div>

            <div className="flex gap-1 items-center p-1 bg-gray-200 rounded-full w-fit text-sm">
              {PackagePeriod.map((item) => (
                <motion.span
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedPeriod(item)}
                  key={item}
                  className={`cursor-pointer py-2 px-4 rounded-full transition-all duration-500 font-semibold ${
                    item === selectedPeriod
                      ? "bg-white shadow"
                      : "text-gray-500"
                  }`}
                >
                  {item}
                </motion.span>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              {PackagePlans.find((p) => p.period === selectedPeriod)?.data.map(
                (plan, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    className="border w-80 rounded-xl p-6 space-y-4 shadow-md bg-white flex flex-col justify-between"
                  >
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-bold">{plan.name}</h2>
                      {plan.popular && (
                        <span className="bg-secondary text-white text-xs px-2 py-1 rounded">
                          Popular
                        </span>
                      )}
                    </div>

                    <p className="text-gray-600 text-sm">{plan.description}</p>
                    {/* pricing */}
                    <div className="flex items-center justify-between flex-wrap-reverse">
                      <span className="text-xl font-bold">
                        {plan.pricing[
                          (selectedEmployees[plan.name] ||
                            "1-50 Employees") as keyof typeof plan.pricing
                        ] === "Custom Pricing"
                          ? "Custom Pricing"
                          : `$${(
                              plan.pricing[
                                (selectedEmployees[plan.name] ||
                                  "1-50 Employees") as keyof typeof plan.pricing
                              ] as number
                            ).toLocaleString()}`}
                      </span>

                      {!(
                        plan.name === "Basic Package" &&
                        selectedPeriod === "Quarterly"
                      ) && (
                        <span className="text-sm">
                          <select
                            value={
                              selectedEmployees[plan.name] || "1-50 Employees"
                            }
                            onChange={(e) => {
                              const selectedValue = e.target.value;

                              setSelectedEmployees((prev) => ({
                                ...prev,
                                [plan.name]: selectedValue,
                              }));
                            }}
                            className="select-sm w-fit rounded-lg border border-gray-200 focus-within:border-secondary/40 focus-within:outline-none focus-within:ring-0"
                          >
                            {Object.keys(plan.pricing).map((det, i) => (
                              <option key={i}>{det}</option>
                            ))}
                          </select>
                        </span>
                      )}
                    </div>

                    <ul className="text-sm pl-4 text-gray-700 space-y-1">
                      {plan.features.map((feat: string, i) => (
                        <li key={i} className="list-disc">
                          {feat}
                        </li>
                      ))}
                    </ul>

                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        const selectedPrice =
                          plan.pricing[
                            (selectedEmployees[plan.name] ||
                              "1-50 Employees") as keyof typeof plan.pricing
                          ];

                        setSelectedPlan(plan.name);
                        setShowNext(true);
                        setSelectetPackage({
                          packageDuration: selectedPeriod,
                          packagename: plan.name,
                          packageSize:
                            selectedEmployees[plan.name] || "1-50 Employees",
                          price:
                            selectedPrice === "Custom Pricing"
                              ? "Custom Pricing"
                              : String(selectedPrice),
                        });
                      }}
                      className="mt-auto block w-full py-2 text-center font-semibold border border-secondary text-secondary rounded-full hover:bg-secondary hover:text-white transition"
                    >
                      Select Plan
                    </motion.button>
                  </motion.div>
                )
              )}
            </div>

            <p className="text-gray-400 text-sm w-3/4 text-center">
              Pricing may vary based on location and custom requirements.
            </p>
          </>
        )}
      </motion.div>
    </>
  );
};

export default SelectPackages;
