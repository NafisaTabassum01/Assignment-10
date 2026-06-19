"use client";

import React from "react";
import { Button } from "@heroui/react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FiHome, FiAlertCircle } from "react-icons/fi";

export default function NotFound() {
  return (
    <div className="w-full min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 overflow-hidden relative">
      
      {/* Attractive Illustration with Animated Spinner Background */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full h-[260px] flex items-center justify-center mb-6"
      >
        {/* Previous Requested Spinner Back Layer */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
          className="absolute border-2 border-dashed border-[#216869]/20 w-[240px] h-[240px] rounded-full pointer-events-none z-0"
        />

        {/* 404 Large Shadow Text */}
        <span className="absolute text-[120px] font-black tracking-tighter bg-gradient-to-b from-[#22577A]/10 to-transparent bg-clip-text text-transparent select-none z-0">
          404
        </span>

        {/* Floating Card UI */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="p-6 bg-white border border-slate-100 rounded-2xl shadow-xl w-56 flex flex-col gap-3 relative z-10 text-center"
        >
          <div className="flex items-center justify-center gap-2 text-rose-500 font-bold text-xs uppercase">
            <FiAlertCircle className="size-4" /> Page Not Found
          </div>
          <div className="w-full h-2 bg-slate-100 rounded" />
          <div className="w-3/4 h-2 bg-slate-100 rounded mx-auto" />
        </motion.div>
      </motion.div>

      {/* Main Text Content */}
      <div className="text-center flex flex-col gap-2 max-w-sm px-4 z-10">
        <h1 className="text-2xl font-black text-[#22577A]">
          Page Not Found
        </h1>
        <p className="text-sm text-slate-400 font-medium">
          The page you are looking for doesn't exist or has been moved.
        </p>
      </div>

      {/* Back To Home Button */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="mt-8 w-full max-w-[200px] z-10"
      >
        <Link
          href="/dashboard/seller"
          className="w-full p-4 bg-[#22577A] text-white font-bold h-12 rounded shadow-md"
        >
          Back To Home
        </Link>
      </motion.div>

    </div>
  );
}