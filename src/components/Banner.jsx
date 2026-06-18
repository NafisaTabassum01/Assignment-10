"use client";

import React from "react";
import Link from "next/link";
import bannerImage from "../assets/banner.png";
import { Button } from "@heroui/react";
import { FaArrowRight } from "react-icons/fa";
import Image from "next/image";
import { motion } from "motion/react";

export default function Banner() {
  // Jey text-ti alphabet-by-alphabet animated hobe
  const titleText = "Smart Solutions For";

  // Parent Container Variant: Jeta bhetorer shob alphabet-er moddhe delay (stagger) toiri korbe
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08, // Protiti alphabet-er majhe 0.08s er gap thakbe
      },
    },
  };

  // Child Variant: Protiti alada alphabet/akshor-er animation style
  const letterVariants = {
    hidden: { opacity: 0, y: 15 }, // Shuru-te invisible thakbe ebong thora niche thakbe
    visible: {
      opacity: 1,
      y: 0, // Animated hoye upore uthbe
      transition: { type: "spring", damping: 12, stiffness: 200 },
    },
  };

  return (
    <section className="relative overflow-hidden min-h-[85vh] flex items-center bg-white">
      {/* Decorative Radial Background Glows */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#38A3A5]/20 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#57CC99]/10 rounded-full blur-[150px] translate-x-1/4 translate-y-1/4 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* --- Left Column: Content Area --- */}
          <div className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left">
            
            {/* Motion Badge Layout */}
            <motion.div 
              initial={{ scale: 0 }} 
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="inline-flex items-center gap-3 bg-slate-100/80 backdrop-blur-md text-[#216869] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6 w-fit mx-auto lg:mx-0 border border-slate-200/50"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#57CC99] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#38A3A5]"></span>
              </span>
              Welcome to Next-Gen Retail
            </motion.div>
            
            {/* --- Animated Heading Row --- */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#216869] leading-tight mb-6">
              
              {/* Alphabet-by-Alphabet Animated Container */}
              <motion.span
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="inline-block"
              >
                {titleText.split("").map((char, index) => (
                  <motion.span
                    key={index}
                    variants={letterVariants}
                    className="inline-block"
                    // Normal space jeno HTML-e collapse na hoy sheijonno condition
                    style={{ display: char === " " ? "inline" : "inline-block" }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </motion.span>

              <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-[#38A3A5] to-[#57CC99] bg-clip-text text-transparent">
                Your Modern Business
              </span>
            </h1>
            
            <p className="text-[18px] text-[#1a759f]/80 max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
              A next-generation platform that helps you list, discover, and grow faster with a smooth and secure marketplace experience.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-12">
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto"
              >
                <Button
                  as={Link}
                  href="/products"
                  className="w-full sm:w-auto bg-[#22577A] text-white font-semibold h-14 px-8 rounded-xl shadow-lg shadow-sky-950/20 hover:bg-[#1a4461] transition-all text-base flex items-center justify-center gap-2 cursor-pointer"
                >
                  Explore Products <FaArrowRight size={14} />
                </Button>
              </motion.div>
            </div>

            {/* --- Integrated Statistics Row --- */}
            

          </div>

          {/* --- Right Column: Static Visual Section --- */}
          <div className="lg:col-span-5 relative flex items-center justify-center w-full">
            <div className="relative w-full max-w-[450px] lg:max-w-none">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#38A3A5]/10 to-[#57CC99]/10 rounded-2xl blur-2xl -z-10 transform scale-95" />
              <Image 
                src={bannerImage} 
                alt="NextMart Hero Analytics Illustration Banner"
                priority
                className="w-full h-auto object-contain drop-shadow-2xl selection:bg-transparent"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}