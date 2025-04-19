"use client";
import { Bubble } from "@typebot.io/nextjs";
import TopSection from "./TopSection";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import router from "next/router";
import { Suspense, useEffect, useState } from "react";
import { logout } from "../store/slices/authSlice";
import { isTokenValid } from "../utils/auth";
import { useRouter } from "next/navigation";
import Loader from "../components/loader";
import { IsAuthorised } from "../utils/corporate";
import ContextProvider from "../context";
import CenterModal from "../components/model/centerModel";
import RightModal from "../components/model/rightSideModel";
import CheckEmployeeStatus from "../components/corporate/checkEmployeeStatus";
import useAuth from "../hooks/useAuth";

const typebotUrl = process.env.NEXT_PUBLIC_TYPEBOT_LINK;

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const auth = useSelector((state: RootState) => state.auth);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  useEffect(() => {
    if (!isTokenValid()) {
      dispatch(logout());
      router.push("/auth");
    }
  }, [dispatch, router]);

  useAuth();
  useEffect(() => {
    const checkAuth = async () => {
      if (!IsAuthorised("user")) {
        router.replace("/auth");
      } else {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (loading) return <Loader />;

  return (
    <>
      <div className="md:container md:mx-auto md:max-w-4xl ">
        <TopSection user={auth.user} />
      </div>
      <ContextProvider>
        <main className="py-24 md:container md:mx-auto md:max-w-4xl">
          <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        </main>
        <CenterModal children={<CheckEmployeeStatus />} id={"tests"} />
        <RightModal
          children={<h1> More Details About This Room</h1>}
          id={"test"}
        />
      </ContextProvider>
      <Bubble
        typebot={`${typebotUrl}`}
        previewMessage={{
          message: "We value your feedback !",
          autoShowDelay: 5000,
          avatarUrl:
            "https://s3.typebot.io/public/workspaces/cm0e2rygi001bjy9sb9r7l5sd/typebots/cm6epanxr0001mqnco92cqbd5/hostAvatar?v=1739523130990",
        }}
        theme={{
          button: { backgroundColor: "#2d7331", size: "medium" },
          previewMessage: {
            backgroundColor: "#2d7331",
            textColor: "#FFFFFF",
            closeButtonBackgroundColor: "#FFFFFF",
            closeButtonIconColor: "#598E71",
          },
        }}
      />
    </>
  );
}
