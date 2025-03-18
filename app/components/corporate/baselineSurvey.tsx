"use client";
import {
  PostEmployeEmails,
  PostEmployeeResponseBasicData,
  PostEmployeeResponseData,
  PostHRResponseData,
} from "@/app/api/corporateApi/Action";
import DropdownComponent from "@/app/components/form/dropdownComponent";
import InputNumber from "@/app/components/form/inputNumber";
import LikertComponent from "@/app/components/form/likertComponent";
import MultiSelectComponent from "@/app/components/form/multiSelect";
import RankingComponent from "@/app/components/form/rankingComponent";
import { decodeJWT } from "@/app/utils/decode";
import { extractEmailsFromFile } from "@/app/utils/readfile";
import {
  divideAnswersForQuestions3And4,
  EmployeeSurveyAnswers,
  HrSurveyAnswers,
  isEmployeeModuleCompleted,
  isHRModuleCompleted,
  multiplyAnswersForQuestions5And6,
  updateSurveyAnswer,
  updateSurveyAnswerArr,
} from "@/app/utils/surveyResponse";
import { BaselineSurvey } from "@/costants";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaRegCheckCircle } from "react-icons/fa";
import { GrFormPrevious } from "react-icons/gr";
import { MdOutlineNavigateNext } from "react-icons/md";
import { IoWarningOutline } from "react-icons/io5";
import { useAppContext } from "@/app/context";
import InputComponent from "../form/inputComponent";
import CenterModal from "../model/centerModel";
import { HiLightBulb } from "react-icons/hi";
import Link from "next/link";

function BaselineSurveyPage({
  user = 0,
  employee = false,
}: {
  user: number;
  employee?: boolean;
}) {
  const [active, setActive] = useState(0);
  const [page, setPage] = useState(user);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(BaselineSurvey);
  const [file, setFile] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const { setActiveTab, setActiveModalId, employeeData, SelectetPackage } =
    useAppContext();
  const router = useRouter();
  const [answer34, setAnswer34] = useState<string | null>(null);
  const [answer56, setAnswer56] = useState<number | null>(null);

  const searchParams = useSearchParams();
  const corporateId = searchParams.get("corporate");

  const linkUrlPremium = process.env.NEXT_PUBLIC_LINK_URL;
  const linkUrlBasic = process.env.NEXT_PUBLIC_EMPLOYEE_LINK_URL;

  const handlePreviuos = () => {
    setActiveModalId(null);
    if (active < 1) return;
    setActive((prev) => prev - 1);
  };

  const handleNext = () => {
    setActiveModalId(null);
    if (data[page].sections.length > active + 1) setActive((prev) => prev + 1);
  };

  const handleInputValue = (value: string, id?: number, type?: string) => {
    const response = updateSurveyAnswer(data, value, id);
    setData(response);
  };

  const handleInputArrayValue = (id?: number, value?: string[]) => {
    const response = updateSurveyAnswerArr(data, value, id);
    setData(response);
  };

  useEffect(() => {
    if (page === 0) {
      const errorFound = isHRModuleCompleted(data);
      const metricks = divideAnswersForQuestions3And4(data, 3, 4);
      if (metricks && active === 1) {
        setActiveModalId("question3&4");
        setAnswer34(metricks);
      }
      const lostDays = multiplyAnswersForQuestions5And6(data, 5, 6);
      if (lostDays && active === 2) {
        setActiveModalId("question5&6");
        setAnswer56(lostDays);
      }

      setError(errorFound);
    } else if (page === 1) {
      const errorFound = isEmployeeModuleCompleted(data);
      setError(errorFound);
    }
  }, [data, active]);

  const handleSubmit = async () => {
    const token = localStorage.getItem("token") as string;
    const userId = decodeJWT(token);
    const hrData = HrSurveyAnswers(data);
    const employeeResponses = EmployeeSurveyAnswers(data);

    try {
      setLoading(true);
      if (page === 0) {
        const result = await PostHRResponseData(hrData, userId.corporate._id);
        const emailResult = await PostEmployeEmails(
          {
            employeeList: file,
            linkUrl: `${
              SelectetPackage.packagename === "Premium Package"
                ? linkUrlPremium
                : `${linkUrlBasic}?corporate=${userId.corporate._id}`
            }`,
          },
          userId.corporate._id
        );
        if (result && emailResult) {
          router.push("/corporate");
        }
        setLoading(false);
      } else if (page === 1) {

        if (!corporateId) {
          const result = await PostEmployeeResponseData(
            employeeResponses,
            userId?._id
          );

          setLoading(false);
          if (result) {
            setSubmitted(true);
          }
        } else {
          const mergedEmployee = { ...employeeResponses, ...employeeData };
          const result = await PostEmployeeResponseBasicData(
            mergedEmployee,
            String(corporateId)
          );

          setLoading(false);
          if (result) {
            setSubmitted(true);
          }
        }
      }
    } catch (error) {
      console.error("Submission failed:", error);
    }
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files?.[0]) {
      try {
        const emails = await extractEmailsFromFile(event.target.files[0]);
        setFile(emails);
      } catch (error) {
        console.error("File processing error:", error);
      }
    }
  };

  const handleGoBack = () => {
    setActiveTab("Activities");
    router.push("/dashboard");
  };
  

  const questionVariants = {
    hidden: { opacity: 1, y: 100 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const progressCount = ((active + 1) / data[page].sections.length) * 100;

  return (
    <>
      <div className="flex flex-col w-full h-full overflow-y-scroll">
        {loading ? (
          <div className="h-full w-full flex justify-center items-center">
            <span className="loading loading-ring text-secondary loading-lg"></span>
          </div>
        ) : submitted && page === 1 ? (
          <div className="w-full h-full flex items-center justify-center ">
            <div className="w-4/5 flex flex-col items-center gap-4 lg:w-3/5 border border-secondary rounded-2xl p-4">
              <FaRegCheckCircle className="text-center text-5xl text-secondary " />
              <p className="  text-center text-slate-600  leading-6  ">
                Thank you for your input! Your responses will help shape the
                <strong> wellness programs </strong> and{" "}
                <strong>resources.</strong> Interact with wellness activities on
                the platform and <strong>transform your health </strong>
                one habit at a time.
              </p>
              {!corporateId ? (
                <AnimatePresence mode="popLayout">
                  <motion.button
                    key="submit-button"
                    onClick={handleGoBack}
                    whileTap={{ scale: 0.8 }}
                    transition={{ duration: 0.1 }}
                    className="px-8 py-3 border border-secondary rounded-full font-semibold text-nowrap uppercase hover:bg-secondary hover:text-white hover:scale-95 cursor-pointer hover:duration-2300 transition"
                  >
                    Go Back Home
                  </motion.button>
                </AnimatePresence>
              ) : (
                <AnimatePresence mode="popLayout">
                  <Link href={"https://www.apertacura.com/"}>
                    <motion.button
                      key="submit-button"
                      whileTap={{ scale: 0.8 }}
                      transition={{ duration: 0.1 }}
                      className="px-8 py-3 border border-secondary rounded-full font-semibold text-nowrap uppercase hover:bg-secondary hover:text-white hover:scale-95 cursor-pointer hover:duration-2300 transition"
                    >
                      Explore more about us
                    </motion.button>
                  </Link>
                </AnimatePresence>
              )}
            </div>
          </div>
        ) : (
          <>
            {/* progress bar */}
            <div className="w-full h-1 block bg-gray-300 rounded-full mt-2">
              <span
                className="h-1 block bg-secondary rounded-full transition-all duration-500"
                style={{
                  width: `${progressCount}%`,
                }}
              ></span>
            </div>

            <div className="flex flex-col items-center w-full justify-between gap-3 h-full ">
              {/* question  */}
              <div className="flex items-center flex-col gap-8 pt-4 w-[90%] lg:w-4/5 mx-auto">
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={data[page].sections[active].section}
                    initial={{ opacity: 1, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-lg font-semibold w-fit"
                  >
                    {data[page].sections[active].section}
                  </motion.span>
                  <motion.span
                    key={data[page].sections[active].Details}
                    initial={{ opacity: 1, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="italic font-light pb-2 text-center relative bottom-5 text-slate-500 border-b border-slate-600 w-fit"
                  >
                    ({data[page].sections[active].Details})
                  </motion.span>
                </AnimatePresence>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={questionVariants}
                    className="flex flex-col gap-8 w-full"
                  >
                    {data[page].sections[active].questions.map((quest) => (
                      <span
                        key={quest.id}
                        className="flex flex-col justify-center gap-4"
                      >
                        {quest.type === "likert" ? (
                          // like component
                          <>
                            <LikertComponent
                              quest={quest}
                              handleInputValue={handleInputValue}
                              likertRange={quest.range}
                            />
                          </>
                        ) : (
                          <>
                            <label htmlFor={""} className="text-slate-500">
                              {quest.id}. {quest.question}
                            </label>
                            {/* file component */}
                            {quest.type === "file" && (
                              <input
                                type="file"
                                onChange={(e) => handleFileUpload(e)}
                                accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                                className="file-input focus-within:ring-0 focus-within:outline-none focus-within:border-gray-400 file-input-md file-input-secondary w-full max-w-xs"
                              />
                            )}
                            {/* number input component */}
                            {quest.type === "number" && (
                              <InputNumber
                                type={quest.type}
                                id={quest.id}
                                value={quest.answer}
                                handleInputValue={handleInputValue}
                              />
                            )}
                            {/* text input component */}
                            {quest.type === "text" && (
                              <InputComponent
                                type="text"
                                id={quest.id}
                                placeholder="Write your answer here..."
                                handleInputValue={handleInputValue}
                                value={quest.answer}
                              />
                            )}
                            {/* sorting data component */}
                            {quest.type === "ranking" && (
                              <RankingComponent
                                handleInputArrayValue={handleInputArrayValue}
                                value={quest.answerArr}
                                quest={quest}
                              />
                            )}
                            {/* checkbox component */}
                            {quest.type === "multi-select" && (
                              <MultiSelectComponent
                                id={quest.id}
                                value={quest.answerArr}
                                handleInputArrayValue={handleInputArrayValue}
                                options={quest.options}
                              />
                            )}
                            {/* dropdown component */}
                            {quest.type === "dropdown" && (
                              <DropdownComponent
                                options={quest.options}
                                id={quest.id}
                                value={quest.answer}
                                handleInputValue={handleInputValue}
                              />
                            )}
                          </>
                        )}
                      </span>
                    ))}
                  </motion.div>
                </AnimatePresence>

                <AnimatePresence mode="popLayout">
                  {active + 1 === data[page].sections.length &&
                    (!error && (page === 0 || page === 1) ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0, y: 100 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="w-4/5 flex flex-col items-center gap-4 lg:w-3/5 border border-yellow-500 rounded-2xl p-4"
                      >
                        <IoWarningOutline className="text-center text-4xl text-yellow-500 " />
                        <p className="  text-center text-slate-600  leading-6  ">
                          You must complete all survey questions before
                          submitting.
                        </p>
                      </motion.div>
                    ) : (
                      <motion.button
                        key="submit-button"
                        onClick={handleSubmit}
                        whileTap={{ scale: 0.9 }}
                        initial={{ opacity: 0, scale: 0, y: 100 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="px-8 py-3 border border-secondary rounded-full font-semibold w-3/4 mt-8 uppercase hover:bg-secondary hover:text-white hover:scale-95 cursor-pointer hover:duration-2300 transition"
                      >
                        Submit
                      </motion.button>
                    ))}
                </AnimatePresence>
              </div>

              {/* pagination */}
              <div className="w-full flex gap-3 justify-center items-center z-50 bg-white ">
                <span
                  onClick={handlePreviuos}
                  className={`${
                    active < 1
                      ? "cursor-not-allowed hover:scale-100 hover:text-black"
                      : "hover:bg-secondary hover:text-white hover:scale-90 cursor-pointer"
                  } w-12 h-12 rounded-full bg-secondary/30  flex items-center justify-center  hover:duration-100  transition`}
                >
                  <GrFormPrevious className="text-3xl font-bold" />
                </span>
                <span
                  onClick={() => setActive(data[page].sections.length - 1)}
                  className={`${
                    active + 2 > data[page].sections.length
                      ? "cursor-not-allowed hover:scale-100 hover:text-black"
                      : "hover:bg-secondary hover:text-white hover:scale-90 cursor-pointer"
                  } w-12 h-10 rounded-md px-8 py-2  bg-secondary/30  flex items-center justify-center  hover:duration-100  transition`}
                >
                  Skip
                </span>
                <span
                  onClick={handleNext}
                  className={`${
                    active + 2 > data[page].sections.length
                      ? "cursor-not-allowed hover:scale-100 hover:text-black"
                      : "hover:bg-secondary hover:text-white hover:scale-90 cursor-pointer"
                  } w-12 h-12 rounded-full bg-secondary/30  flex items-center justify-center  hover:duration-100  transition`}
                >
                  <MdOutlineNavigateNext className="text-3xl font-bold" />
                </span>
              </div>
            </div>
          </>
        )}
      </div>
      <CenterModal
        id={"question3&4"}
        children={
          <motion.div
            className="p-6 bg-white flex flex-col items-center w-full max-w-lg mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-center gap-2 text-yellow-500 text-2xl">
              <HiLightBulb />
              <h1 className="text-lg font-semibold text-gray-800">
                Did you know?
              </h1>
            </div>
            <motion.div className="mt-4 text-slate-500 text-base text-center">
              <p>
                On average your employees{" "}
                <strong className="text-slate-900">each</strong> used
              </p>
              <p className="text-red-500 font-bold text-3xl p-2">
                ${answer34?.toLocaleString()}
              </p>
              <p>for hospital visits.</p>
            </motion.div>
          </motion.div>
        }
      ></CenterModal>
      <CenterModal
        id={"question5&6"}
        children={
          <motion.div
            className="p-6 bg-white flex flex-col items-center w-full max-w-lg mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-center gap-2 text-yellow-500 text-2xl">
              <HiLightBulb />
              <h1 className="text-lg font-semibold text-gray-800">
                Did you know?
              </h1>
            </div>
            <motion.div className="mt-4 text-slate-500 text-base text-center">
              <p>You lost </p>
              <p className="text-red-500 font-bold text-3xl p-2">
                ${answer56?.toLocaleString()}
              </p>

              <p> in productivity due to absenteeism</p>
            </motion.div>
          </motion.div>
        }
      ></CenterModal>
    </>
  );
}

export default BaselineSurveyPage;
