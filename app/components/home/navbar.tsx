"use client";
import React, { useState } from "react";
import { LogoComponent } from "../logo";
import Link from "next/link";
import ButtonComp from "./button";
import { MdMenuOpen } from "react-icons/md";
import { IoMdClose } from "react-icons/io";

const navItems = ["Home", "About", "Activities", "Events"];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed z-50 w-full bg-white border-b shadow-sm">
      <div className="flex items-center justify-between px-8 py-4">
        <LogoComponent />

        {/* Desktop Nav */}
        <div className="hidden lg:flex gap-8 items-center">
          {navItems.map((item, index) => (
            <Link key={index} href={`#${item}`}>
              <span className="cursor-pointer pb-2 font-bold text-lg duration-300 transition-all hover:border-b-2 hover:text-secondary hover:border-secondary">
                {item}
              </span>
            </Link>
          ))}
        </div>

        {/* Auth Buttons - Visible on Desktop */}
        <div className="hidden lg:flex gap-6 items-center">
          <Link href="/auth">
            <ButtonComp title="Login" />
          </Link>
          <Link href="/auth">
            <ButtonComp title="Sign Up" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="lg:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <IoMdClose className="text-3xl lg:text-5xl" />
          ) : (
            <MdMenuOpen className="text-3xl lg:text-5xl" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t py-4 flex flex-col items-center gap-4">
          {navItems.map((item, index) => (
            <Link
              onClick={() => setIsOpen(!isOpen)}
              key={index}
              href={`#${item}`}
            >
              <span className="cursor-pointer font-bold text-lg duration-300 transition-all hover:text-secondary">
                {item}
              </span>
            </Link>
          ))}
          <Link onClick={() => setIsOpen(!isOpen)} href="/auth">
            <ButtonComp title="Login" />
          </Link>
          <Link onClick={() => setIsOpen(!isOpen)} href="/auth">
            <ButtonComp title="Sign Up" />
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
