tsx
"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Dog Walking", href: "/dogwalking" },
  { label: "Dog Grooming", href: "/dog-grooming" },
  { label: "Events", href: "/events" },
  { label: "Near Me", href: "/near-me" },
  { label: "Food", href: "/food" },
  { label: "Learn", href: "/learn" },
  { label: "Dog Breeds", href: "/dog-breeds" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Navbar */}
      <nav className="flex justify-between items-center w-full px-6 py-4 shadow-sm bg-white fixed top-0 z-50">
        {/* Logo */}
        <Link href="/" className="text-orange-600 font-bold text-2xl">
          Marshee
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-6 text-lg font-medium">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-orange-600 transition text-black"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Download Button */}
        <a
          href="#"
          className="hidden md:inline-block bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-full text-sm font-semibold italic transition"
        >
          Download App
        </a>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-black"
          onClick={() => setMenuOpen(true)}
        >
          <Menu size={28} />
        </button>
      </nav>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-40 transition-opacity duration-300 ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-4/5 bg-white z-50 transform transition-transform duration-300 p-6 pt-8 flex flex-col ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Top Row */}
        <div className="flex justify-between items-center mb-6">
          <span className="text-orange-600 font-bold text-2xl">Marshee</span>
          <button onClick={() => setMenuOpen(false)}>
            <X size={28} />
          </button>
        </div>

        {/* Nav Links */}
        <div className="flex flex-col gap-5 text-lg font-medium text-black">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="hover:text-orange-600 transition"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Login Button */}
        <button className="mt-auto w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold text-center">
          LOGIN
        </button>
      </div>
    </>
  );
}