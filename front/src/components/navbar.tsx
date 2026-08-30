"use client";
import Link from "next/link";
import { ThemedImage } from "./themed-image";
import { useState } from "react";
import NavbarMobileMenu from "./navbar-menu";
import NavbarDesktop from "./navbar-desktop";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className=" border-b border-border w-full h-full flex-col gap-2 md:flex">
      <div className="flex w-full justify-between p-4 md:p-8 md:px-16">
        {/* Logo */}
        <Link href="/">
          <ThemedImage
            lightSrc="/watermark-light.svg"
            darkSrc="/watermark-dark.svg"
            width={190}
            height={30}
            alt="logo"
            loading="eager"
            className="w-[160px] md:w-[210px] lg:w-[240px] h-auto"
          />
        </Link>
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="md:hidden"
        >
          <ThemedImage
            lightSrc="/icon-light.svg"
            darkSrc="/icon-dark.svg"
            width={25}
            height={25}
            alt="menu"
            loading="eager"
            className="w-[25px] h-[25px]"
          />
        </button>
        <NavbarDesktop />
      </div>
      {isOpen && <NavbarMobileMenu onNavigate={() => setIsOpen(false)} />}
    </nav>
  );
}
