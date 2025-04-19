"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { isTokenValid } from "../utils/auth";
import { logout, scanForPoints } from "../store/slices/authSlice";
import PointsSection from "./PointsSection";
import WidgetsSection from "./WidgetsSection";
import TeamsBoard from "./TeamsBoard";
import useAuth from "@/app/hooks/useAuth";
import { fetchAllUsers } from "@/app/store/slices/usersSlice";
import ServicesBoard from "./ServicesBoard";
import ReactConfetti from "react-confetti";
import { ToastContainer, toast } from "react-toastify";
import { Suspense } from "react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa6";
import { useAppContext } from "../context";
import { checkEmployeeStatusFn } from "../utils/corporate";
import ChallengeList from "../components/healthChallenge/challengeList";
import Loader from "../components/loader";

const Dashboard = () => {
  const { activeTab, setActiveTab, setActiveModalId } = useAppContext();

  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  let outsideScannedCode: string | null = null;
  let qrScanned = false;

  if (typeof window !== "undefined" && token) {
    localStorage.setItem("token", token);
    outsideScannedCode = localStorage.getItem("isScanned");
    qrScanned = JSON.parse(localStorage.getItem("qrScanned")!)?.qrScanned;
  }

  useAuth();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector((state: RootState) => state.auth);

  const { users } = useSelector((state: RootState) => state.users);

  const { services } = useSelector((state: RootState) => state.services);
  const state = searchParams.get("state");
  const [showConfetti, setShowConfetti] = useState(false);

  const alert = () => {
    toast(
      "You've ruled the 🏆 squat throne! Power, endurance, and grit - King of Squats has crowned you a true champion!",
      {
        position: "top-center",
        autoClose: 8000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        // transition: {"Bounce" as ToastTransition}
      }
    );
    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
    }, 5000);
  };

  useEffect(() => {
    const getScannedPoints = async () => {
      if (auth.user._id && outsideScannedCode) {
        const result = await dispatch(
          scanForPoints({ qrCodeID: outsideScannedCode, userID: auth.user._id })
        );
        localStorage.removeItem("isScanned");
        if (result.payload.error) {
          toast.error(result.payload.error);
        } else {
          alert();
        }
      }
    };
    if (outsideScannedCode) {
      getScannedPoints();
    }
    dispatch(fetchAllUsers());
  }, [auth.user._id, dispatch, outsideScannedCode]);

  useEffect(() => {
    if (state) {
      const qrScanned = JSON.parse(decodeURIComponent(state)).qrScanned;
      if (qrScanned) {
        alert();
      }
    }
    if (outsideScannedCode) {
      alert();
    }
  }, [searchParams, state, outsideScannedCode]);

  const [selectedWidget, setSelectedWidget] = useState<string | null>(
    auth.user.role === "user" ? activeTab : "Services"
  );

  const handleWidgetClick = (widget: string) => {
    setActiveTab(widget);
    setSelectedWidget(widget);
  };

  const statusResult = async () => {
    const result = await checkEmployeeStatusFn();
    if (result) setActiveModalId("tests");
  };

  useEffect(() => {
    setSelectedWidget(auth.user.role === "user" ? activeTab : "Services");
    if (auth.user.role === "user") statusResult();
  }, []);

  useEffect(() => {
    if (!isTokenValid()) {
      dispatch(logout());
      router.push("/auth");
    }
  }, [dispatch, router]);

  if (auth.user.role) {
    return (
      <>
        {showConfetti && <ReactConfetti />}
        <ToastContainer />
        <div className="w-full ">
          <div className="flex max-md:flex-col md:items-start justify-center gap-4 py-4 w-full ">
            <PointsSection
              user={auth.user}
              isServiceExist={services.length > 0}
            />
            {auth.user.role === "service_provider" && (
              <div className="text-center">
                <p className="font-semibold text-sm mb-2">Social Accounts</p>
                <div className="flex justify-center gap-3">
                  <div>
                    <a
                      href={auth.user.whatsappLink}
                      target="_blank"
                      className="text-green-500"
                    >
                      <FaWhatsapp className="w-8 h-8" />
                    </a>
                  </div>
                  <div>
                    <a
                      href={auth.user.instagramLink}
                      target="_blank"
                      className="text-pink-500"
                    >
                      <FaInstagram className="w-8 h-8" />
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
          <WidgetsSection
            role={auth.user.role}
            selectedWidget={selectedWidget}
            onWidgetClick={handleWidgetClick}
          />
          {selectedWidget === "Events" && <ChallengeList />}
          {selectedWidget === "Teams" && <TeamsBoard userId={auth.user._id!} />}
          {(selectedWidget === "Services" ||
            selectedWidget === "Activities") && (
            <ServicesBoard providerId={auth.user._id!} role={auth.user.role} />
          )}
        </div>
      </>
    );
  } else {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }
};

const FinalDashboard = () => (
  <Suspense fallback={<Loader />}>
    <Dashboard />
  </Suspense>
);
export default FinalDashboard;
