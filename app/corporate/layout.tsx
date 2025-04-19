"use client";
import { useEffect, useState } from "react";
import CorporateNavBar from "../components/corporate/navbar";
import { IsAuthorised } from "../utils/corporate";
import { useRouter } from "next/navigation";
import Loader from "../components/loader";

export default function CorporateLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      if (!IsAuthorised("corporate")) {
        router.replace("/auth");
      } else {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (loading) return <Loader />;

  return (
    <section className="md:container md:mx-auto md:max-w-6xl">
      <CorporateNavBar />
      <main className="py-28">{children}</main>
    </section>
  );
}
