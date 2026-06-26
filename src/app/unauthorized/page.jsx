"use client";

import React from "react";
import Link from "next/link";
import { FaLock, FaArrowLeft, FaSignInAlt } from "react-icons/fa";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-[calc(100vh-5rem)] w-full flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-100 p-8 text-center transition-all hover:shadow-2xl">
        
        {/* 🔐 Animated Gradient Icon Container */}
        <div className="mx-auto w-20 h-20 flex items-center justify-center rounded-2xl bg-gradient-to-br from-sky-600 to-emerald-500 text-white shadow-lg shadow-sky-500/20 mb-6 animate-bounce">
          <FaLock size={36} />
        </div>

        {/* 🛑 Error Code / Heading */}
        <h1 className="text-4xl font-extrabold text-[#22577A] tracking-tight mb-2">
          401
        </h1>
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Unauthorized Access
        </h2>

        {/* 📝 English Message */}
        <p className="text-slate-600 text-base leading-relaxed mb-8">
          You need to be logged in to access this page. Please sign in with your account to view this secure content.
        </p>

        {/* 🛠️ Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          
          {/* Back to Home Button */}
          <Link
            href="/"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition-all text-sm cursor-pointer"
          >
            <FaArrowLeft size={12} />
            Back to Home
          </Link>

          {/* Login Button (Matches NEXTMART primary button style) */}
          <Link
            href="/login"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#22577A] text-white font-semibold shadow-md shadow-sky-900/10 hover:bg-[#1a4461] transition-all text-sm cursor-pointer"
          >
            <FaSignInAlt size={14} />
            Login Now
          </Link>

        </div>

        {/* 🏷️ Footer brand sync */}
        <div className="mt-8 pt-6 border-t border-slate-100">
          <span className="text-xs font-bold tracking-wider text-slate-400 uppercase">
            NextMart Security Control
          </span>
        </div>

      </div>
    </div>
  );
}