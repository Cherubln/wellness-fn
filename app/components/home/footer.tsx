import React from "react";
import { LogoComponent } from "../logo";
import Link from "next/link";
import { AiFillInstagram } from "react-icons/ai";
import { FaFacebook, FaXTwitter, FaLinkedin, FaAngleRight } from "react-icons/fa6";

const LinksArr = [
  {
    link: "/",
    title: "Home",
  },
  {
    link: "#About",
    title: "About",
  },
  {
    link: "#Activities",
    title: "Activities",
  },
  {
    link: "#Events",
    title: "Events",
  },
  {
    link: "/terms-of-service",
    title: "Terms and Condition",
  },
  {
    link: "/privacy-policy",
    title: "Privacy Policy",
  },
];

const FooterPage = () => {
  return (
    <div className="p-8 bg-slate-950 text-white flex items-start flex-wrap gap-4 justify-between">
      <div className="max-sm:hidden overflow-hidden rounded-2xl">
        <LogoComponent width={450} height={400} />
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="text-lg font-bold pb-2">Quick Links</h1>
        {LinksArr.map((item, index) => (
          <Link
            key={index}
            href={item.link}
            className="flex items-center gap-2 hover:text-secondary duration-300"
          >
            <FaAngleRight />
            <span className="text-sm">{item.title}</span>
          </Link>
        ))}
      </div>
      <div>
        <h1 className="text-lg font-bold pb-2">Contact us</h1>
        <div className="space-y-3 mb-3 text-sm">
          
          <p className="">
            <strong>Email:</strong> info@apertacura.com
          </p>
          <p>
            <strong>Address 1:</strong> Norrsken House, Kigali, Rwanda
            <br />
          </p>
          <p>
            <strong>Address 2:</strong> Kamburu Drive, Building: Pine Tree
            Plaza, Nairobi Kenya
          </p>
        </div>
        <div className="flex gap-4 text-3xl">
          <Link href={"#"}>
            <AiFillInstagram className="hover:text-secondary duration-300 transition-all" />
          </Link>
          <Link href={"#"}>
            <FaFacebook className="hover:text-secondary duration-300 transition-all" />
          </Link>
          <Link href={"#"}>
            <FaXTwitter className="hover:text-secondary duration-300 transition-all" />
          </Link>
          <Link href={"#"}>
            <FaLinkedin className="hover:text-secondary duration-300 transition-all" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FooterPage;
