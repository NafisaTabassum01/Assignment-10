
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Dropdown,
  Label,
} from "@heroui/react";

import {
  FaHome,
  FaBoxes,
  FaFolderOpen,
  FaThLarge,
  FaUser,
  FaCog,
  FaShoppingBag,
  FaSignOutAlt,
  FaChevronDown,
} from "react-icons/fa";

import { useSession, authClient } from "@/lib/auth-client";

/* ---------------- CLIENT ONLY WRAPPER ---------------- */
function ClientOnly({ children }) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return children;
}

/* ---------------- NAVBAR ---------------- */
export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const pathname = usePathname();

  const { data: session, isPending } = useSession();

  if (pathname.includes("dashboard")) {
    return null;
  }

  const user = session?.user ?? null;
  const role = user?.role; // 'seller', 'buyer', 'admin' ইত্যাদি আসবে

  const handleLogout = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
window.location.href = `/dashboard/${userRole}`;          },
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  const isActive = (path) =>
    path === "/" ? pathname === "/" : pathname.startsWith(path);

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white shadow-sm h-20">
      <div className="max-w-7xl mx-auto h-full px-4 flex items-center justify-between">

        {/* ---------------- LOGO ---------------- */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-sky-600 to-emerald-500 text-white">
            <FaShoppingBag />
          </div>
          <span className="font-bold text-xl text-[#22577A]">
            NEXTMART
          </span>
        </Link>

        {/* ---------------- MENU (DESKTOP) ---------------- */}
        <ul className="hidden lg:flex items-center gap-8">

          <li>
            <Link href="/" className={`flex items-center gap-2 ${isActive("/") ? "text-[#22577af5] underline underline-offset-4" : "text-[#22577af5]"}`}>
              <FaHome /> Home
            </Link>
          </li>

          <li>
            <Link href="/allProducts" className={`flex items-center gap-2 ${isActive("/allProducts") ? "text-[#22577af5] underline underline-offset-4" : "text-[#22577af5]"}`}>
              <FaBoxes /> Products
            </Link>
          </li>

          <li>
            <Link href="/categories" className={`flex items-center gap-2 ${isActive("/categories") ? "text-[#22577af5] underline underline-offset-4" : "text-[#22577af5]"}`}>
              <FaFolderOpen /> Categories
            </Link>
          </li>

          {/* 🔐 DYNAMIC ROLE-BASED DASHBOARD FOR DESKTOP */}
          {user && role && (
            <li>
              <Link href={`/dashboard/${role}`} className={`flex items-center gap-2 ${isActive("/dashboard") ? "text-[#22577af5] underline underline-offset-4" : "text-[#22577af5]"}`}>
                <FaThLarge /> Dashboard
              </Link>
            </li>
          )}
        </ul>

        {/* ---------------- RIGHT SIDE ---------------- */}
        <div className="flex items-center gap-4">

          {/* AUTH SECTION */}
          {!user ? (
            <div className="hidden lg:flex border rounded overflow-hidden">
              <Link
                href="/login"
                className={`px-4 py-2 border-r transition-all ${
                  pathname === "/login"
                    ? "bg-[#22577af5] text-white"
                    : "bg-white text-[#22577A] hover:bg-slate-50"
                }`}
              >
                Login
              </Link>

              <Link
                href="/register"
                className={`px-4 py-2 transition-all ${
                  pathname === "/register"
                    ? "bg-[#22577af5] text-white"
                    : "bg-white text-[#22577A] hover:bg-slate-50"
                }`}
              >
                Register
              </Link>
            </div>
          ) : (
            /* USER LOGGED IN */
            <Dropdown>
              <Dropdown.Trigger>
                <div className="flex items-center gap-2 cursor-pointer">

                  <div className="w-8 h-8 rounded-full bg-[#22577A] flex items-center justify-center text-white text-xs font-bold">
                    {user.name?.charAt(0)?.toUpperCase()}
                  </div>

                  <div className="flex flex-col leading-tight">
                    <span className="text-sm font-semibold">
                      {user.name}
                    </span>
                    <span className="text-xs text-slate-500">
                      account ({role})
                    </span>
                  </div>

                  <FaChevronDown className="text-xs" />
                </div>
              </Dropdown.Trigger>

              <Dropdown.Popover>
                <Dropdown.Menu
                  onAction={(key) => {
                    if (key === "logout") handleLogout();
                  }}
                >
                  <Dropdown.Item id="profile">
                    <Link href="/dashboard/profile" className="flex items-center gap-2">
                      <FaUser /> Profile
                    </Link>
                  </Dropdown.Item>

                  <Dropdown.Item id="settings">
                    <Link href="/dashboard/settings" className="flex items-center gap-2">
                      <FaCog /> Settings
                    </Link>
                  </Dropdown.Item>

                  <Dropdown.Item id="logout">
                    <div className="flex items-center gap-2 text-red-500">
                      <FaSignOutAlt /> Logout
                    </div>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown.Popover>
            </Dropdown>
          )}

          {/* 📱 MOBILE HAMBURGER TOGGLE */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-[#22577A] focus:outline-none"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

      </div>

      {/* ---------------- MOBILE MENU ---------------- */}
      {isMenuOpen && (
        <div className="lg:hidden border-t bg-white p-4 flex flex-col gap-3 absolute top-20 left-0 w-full shadow-lg z-50">

          <Link href="/" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2 py-1 text-[#22577A]">
            <FaHome /> Home
          </Link>

          <Link href="/allProducts" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2 py-1 text-[#22577A]">
            <FaBoxes /> Products
          </Link>

          <Link href="/categories" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2 py-1 text-[#22577A]">
            <FaFolderOpen /> Categories
          </Link>

          {/* 🔐 DYNAMIC ROLE-BASED DASHBOARD FOR MOBILE */}
          {user && role && (
            <Link href={`/dashboard/${role}`} onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2 py-1 text-[#22577A] font-semibold">
              <FaThLarge /> Dashboard
            </Link>
          )}

          <div className="border-t my-1"></div>

          {!user ? (
            <div className="flex flex-col gap-2">
              <Link href="/login" onClick={() => setIsMenuOpen(false)} className="text-center py-2 rounded border border-[#22577A] text-[#22577A]">
                Login
              </Link>
              <Link href="/register" onClick={() => setIsMenuOpen(false)} className="text-center py-2 rounded bg-[#22577A] text-white">
                Register
              </Link>
            </div>
          ) : (
            <button
              onClick={() => {
                handleLogout();
                setIsMenuOpen(false);
              }}
              className="text-red-500 flex items-center gap-2 py-2 text-left w-full font-medium"
            >
              <FaSignOutAlt /> Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}