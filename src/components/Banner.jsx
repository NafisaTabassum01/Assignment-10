"use client";

import React from "react";
import Link from "next/link";
import bannerImage from "../assets/banner.png";
import { Button } from "@heroui/react";
import { FaArrowRight, FaUsers, FaGraduationCap, FaAward, FaHeadset, FaServer, FaBox } from "react-icons/fa";
import Image from "next/image";

export default function Banner() {
  return (
    <section className="relative overflow-hidden min-h-[85vh] flex items-center">
      {/* Decorative Radial Background Glows */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#38A3A5]/20 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#57CC99]/10 rounded-full blur-[150px] translate-x-1/4 translate-y-1/4 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* --- Left Column: Content Area --- */}
          <div className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-[#57CC99] px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-6 w-fit mx-auto lg:mx-0 border border-white/5">
               Welcome to Next-Gen Retail
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#216869] leading-none mb-6">
              Smart Solutions For <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-[#57CC99] to-[#80ED99] bg-clip-text text-transparent">
                Your Modern Business
              </span>
            </h1>
            
            <p className=" text-[18px] text-[#1a759fb6] max-w-xl mx-auto lg:mx-0 mb-8 ">
A next-generation platform that helps you list, discover, and grow faster with a smooth and secure marketplace experience.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-12">
              <Button
                as={Link}
                href="/products"
                className="w-full sm:w-auto bg-[#22577A] text-white font-semibold px-8 py-6 rounded-xl shadow-lg shadow-sky-950/50 hover:bg-[#2c8284] transition-all text-base flex items-center justify-center gap-2"
              >
                Explore Products <FaArrowRight size={14} />
              </Button>
              

            </div>

            {/* --- Integrated Statistics Row --- */}
          

          </div>

          {/* --- Right Column: Attractive Visual Section --- */}
          <div className="lg:col-span-5 relative flex items-center justify-center mb-5">
           <Image src={bannerImage} alt=""/>
          </div>

        </div>
      </div>
    </section>
  );
}