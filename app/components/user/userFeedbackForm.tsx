"use client";
import {
  GetEmployeeSetGoals,
  PostEmployeeSetGoals,
} from "@/app/api/userApi/action";
import { WellnessDataType, WellnessFormDataType } from "@/app/utils/type";
import React, { useEffect, useState } from "react";
import Loader from "../loader";
import WellnessSummary from "./wellnessSammary";
import { motion } from "framer-motion";

const wellnessPillars = {
  physicalActivity: [
    "Gym",
    "Walking",
    "Running",
    "Swimming",
    "Hiking",
    "Other",
  ],
  mentalWellness: [
    "Nature Walks",
    "Group Activities",
    "One-on-One Sessions",
    "Other",
  ],
  nutrition: [
    "Sweet Tooth",
    "Eats a Balanced Diet",
    "Vegetarian",
    "High-Protein Diet",
    "Other",
  ],
  diagnostics: {
    checkup: ["Yes", "No"],
    deworming: [
      "Every 3 months",
      "Every 6 months",
      "Once a year",
      "Rarely/Never",
    ],
  },
};

const WellnessForm = ({ userId }: { userId?: string }) => {
  const [activeSection, setActiveSection] = useState<number | null>(1);
  const [goalSet, setGoalSet] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<WellnessFormDataType>({
    physicalActivity: [],
    otherPhysicalActivity: "",
    mentalWellness: [],
    otherMentalWellness: "",
    nutrition: "",
    otherNutrition: "",
    annualCheckup: "",
    deworming: "",
    physicalActivityGoal: "",
    mentalWellnessGoal: "",
    nutritionGoal: "",
    diagnosticsGoal: "",
  });
  const [userData, setUserData] = useState<WellnessDataType>();

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = event.target;
    const checked = (event.target as HTMLInputElement).checked;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleChangeInput = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = event.target;

    setFormData((prevData) => {
      const currentValue = prevData[name as keyof WellnessFormDataType];

      return {
        ...prevData,
        [name]: checked
          ? [...(Array.isArray(currentValue) ? currentValue : []), value]
          : Array.isArray(currentValue)
          ? currentValue.filter((item) => item !== value)
          : [],
      };
    });
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await PostEmployeeSetGoals(formData, userId);
      if (result) {
        setUserData(result);
        setGoalSet(true);
        setLoading(false);
        setFormData({
          physicalActivity: [],
          otherPhysicalActivity: "null",
          mentalWellness: [],
          otherMentalWellness: "null",
          nutrition: "",
          otherNutrition: "null",
          annualCheckup: "",
          deworming: "",
          physicalActivityGoal: "",
          mentalWellnessGoal: "",
          nutritionGoal: "",
          diagnosticsGoal: "",
        });
      }
    } catch (error) {}
  };

  const toggleSection = (section: number) => {
    setActiveSection((prev) => (prev === section ? null : section));
  };

  useEffect(() => {
    getUserGoals();
  }, []);

  const getUserGoals = async () => {
    setLoading(true);
    try {
      const result = await GetEmployeeSetGoals(userId);
      if (result.length > 0) {
        setGoalSet(true);
        setUserData(result[0]);
      } else {
        setGoalSet(false);
      }
    } catch (error) {
      console.log("something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" flex flex-col w-full bg-white shadow-md rounded-lg">
      {goalSet ? (
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setGoalSet(false)}
          className="w-fit self-end mx-8 bg-blue-900 px-4 py-3 rounded-lg text-white font-bold"
        >
          Create New Goal
        </motion.button>
      ) : (
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setGoalSet(true)}
          className="w-fit self-end mx-8 bg-blue-900 px-4 py-3 rounded-lg text-white font-bold"
        >
          View Current Goal
        </motion.button>
      )}
      {loading ? (
        <Loader />
      ) : goalSet ? (
        <WellnessSummary userData={userData} />
      ) : (
        <div className="w-full bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold text-center mb-4">
            Wellness Preferences & Goals
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {[
              {
                id: 1,
                title: "Physical Activity Preferences",
                data: wellnessPillars.physicalActivity,
                name: "physicalActivity",
                otherKey: "otherPhysicalActivity",
              },
              {
                id: 2,
                title: "Mental Wellness Preferences",
                data: wellnessPillars.mentalWellness,
                name: "mentalWellness",
                otherKey: "otherMentalWellness",
              },
              {
                id: 3,
                title: "Nutrition Preferences",
                data: wellnessPillars.nutrition,
                name: "nutrition",
                otherKey: "otherNutrition",
              },
            ].map(({ id, title, data, name, otherKey }) => (
              <div key={id} className="border rounded-lg">
                <button
                  type="button"
                  className="w-full text-left font-semibold p-6 bg-gray-100 rounded-t-lg"
                  onClick={() => toggleSection(id)}
                >
                  {title}
                </button>
                <div
                  className={`overflow-hidden transition-all duration-1000 px-6 ${
                    activeSection === id ? "max-h-[500px] p-3" : "max-h-0 p-0"
                  }`}
                >
                  {data.map((option) => (
                    <div key={option} className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <input
                          type={name === "nutrition" ? "radio" : "checkbox"}
                          name={name}
                          value={option}
                          checked={
                            Array.isArray(
                              formData[name as keyof WellnessFormDataType]
                            )
                              ? formData[
                                  name as keyof WellnessFormDataType
                                ].includes(option)
                              : formData[name as keyof WellnessFormDataType] ===
                                option
                          }
                          onChange={
                            name === "nutrition"
                              ? handleChange
                              : handleCheckboxChange
                          }
                        />
                        <label className="text-sm text-slate-500">
                          {option}
                        </label>
                      </div>

                      {/* Show input field when "Other" is selected */}
                      {option === "Other" &&
                        (Array.isArray(
                          formData[name as keyof WellnessFormDataType]
                        )
                          ? formData[
                              name as keyof WellnessFormDataType
                            ].includes("Other")
                          : formData[name as keyof WellnessFormDataType] ===
                            "Other") && (
                          <>
                            <label className="block font-medium text-sm capitalize my-2">
                              Enter your preferred option:
                            </label>
                            <input
                              type="text"
                              name={otherKey}
                              value={
                                formData[otherKey as keyof WellnessFormDataType]
                              } // Bind to correct state
                              onChange={handleChange}
                              className="w-full border rounded p-2 focus-within:outline-none focus:border-secondary text-slate-700"
                              placeholder="Enter your option here"
                            />
                          </>
                        )}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Diagnostics Section */}
            <div className="border rounded-lg">
              <button
                type="button"
                className="w-full text-left font-semibold p-6 bg-gray-100 rounded-t-lg"
                onClick={() => toggleSection(4)}
              >
                Diagnostics
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 px-6 ${
                  activeSection === 4 ? "max-h-[500px] p-3" : "max-h-0 p-0"
                }`}
              >
                <label className="block font-medium mb-2 ">
                  Annual Checkup:
                </label>
                {wellnessPillars.diagnostics.checkup.map((option) => (
                  <div
                    key={option}
                    className="flex items-center text-slate-500 gap-2"
                  >
                    <input
                      type="radio"
                      name="annualCheckup"
                      value={option}
                      checked={formData.annualCheckup === option}
                      onChange={handleChange}
                    />
                    <label className="text-sm">{option}</label>
                  </div>
                ))}
                <label className="block font-medium my-3">
                  Deworming Frequency:
                </label>
                <select
                  name="deworming"
                  value={formData.deworming}
                  onChange={handleSelectChange}
                  className="w-fit border rounded p-2 focus-within:outline-none text-sm text-slate-500"
                >
                  {wellnessPillars.diagnostics.deworming.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Wellness Goals Section */}
            <div className="border rounded-lg">
              <button
                type="button"
                className="w-full text-left font-semibold p-6 bg-gray-100 rounded-t-lg"
                onClick={() => toggleSection(5)}
              >
                Set Wellness Goals
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ${
                  activeSection === 5 ? "max-h-[500px] p-3" : "max-h-0 p-0"
                }`}
              >
                {/* Physical Activity Goal */}
                <div className="mb-3 px-4">
                  <label className="block font-medium capitalize my-2">
                    Physical Activity Goal:
                  </label>
                  <input
                    type="text"
                    name="physicalActivityGoal"
                    value={formData.physicalActivityGoal}
                    onChange={handleChangeInput}
                    className="w-full border rounded p-2 focus-within:outline-none focus:border-secondary text-slate-700"
                    placeholder="Enter your physical activity goal here"
                  />
                </div>

                {/* Mental Wellness Goal */}
                <div className="mb-3 px-4">
                  <label className="block font-medium capitalize my-2">
                    Mental Wellness Goal:
                  </label>
                  <input
                    type="text"
                    name="mentalWellnessGoal"
                    value={formData.mentalWellnessGoal}
                    onChange={handleChangeInput}
                    className="w-full border rounded p-2 focus-within:outline-none focus:border-secondary text-slate-700"
                    placeholder="Enter your mental wellness goal here"
                  />
                </div>

                {/* Nutrition Goal */}
                <div className="mb-3 px-4">
                  <label className="block font-medium capitalize my-2">
                    Nutrition Goal:
                  </label>
                  <input
                    type="text"
                    name="nutritionGoal"
                    value={formData.nutritionGoal}
                    onChange={handleChangeInput}
                    className="w-full border rounded p-2 focus-within:outline-none focus:border-secondary text-slate-700"
                    placeholder="Enter your nutrition goal here"
                  />
                </div>

                {/* Diagnostics Goal */}
                <div className="mb-3 px-4">
                  <label className="block font-medium capitalize my-2">
                    Diagnostics Goal:
                  </label>
                  <input
                    type="text"
                    name="diagnosticsGoal"
                    value={formData.diagnosticsGoal}
                    onChange={handleChangeInput}
                    className="w-full border rounded p-2 focus-within:outline-none focus:border-secondary text-slate-700"
                    placeholder="Enter your diagnostics goal here"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-6 text-center">
              <button
                type="submit"
                className="px-6 py-2 bg-green-500 text-white rounded"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default WellnessForm;
