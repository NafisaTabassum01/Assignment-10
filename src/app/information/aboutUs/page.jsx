"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card } from "@heroui/react";
import { 
  FiTarget, FiShield, FiTrendingUp, FiCheckCircle, 
  FiShoppingBag, FiLayers, FiUsers 
} from "react-icons/fi";

// 🎨 অ্যানিমেশন কনফিগারেশন
const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
};

export default function AboutUs() {
  return (
    <div className="w-full min-h-screen bg-slate-50/50 py-16 px-4 max-w-6xl mx-auto">
      
      {/* 🚀 হিরো সেকশন */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-2xl mx-auto mb-16"
      >
        <span className="text-xs font-bold uppercase tracking-widest text-[#38A3A5] bg-[#38A3A5]/10 px-3 py-1 rounded-full">
          About NEXTMART
        </span>
        <h1 className="text-4xl font-black text-[#22577A] mt-3 tracking-tight">
          Redefining Pre-Owned Marketplace
        </h1>
        <p className="text-slate-500 mt-4 text-sm leading-relaxed">
          NEXTMART is a secure and efficient online platform where users can buy and sell pre-owned products. 
          We believe items you no longer need shouldn't go to waste when someone else is looking for exactly that.
        </p>
      </motion.div>

      {/* 🌟 মিশন ও ভিশন (কেন আমরা নেক্সটমার্ট তৈরি করেছি) */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
      >
        <motion.div variants={itemVariants}>
          <Card className="p-6 border border-slate-100 shadow-sm h-full rounded-2xl bg-white">
            <div className="p-3 bg-[#22577A]/10 text-[#22577A] text-2xl rounded-xl w-fit mb-4">
              <FiTarget />
            </div>
            <h3 className="font-bold text-lg text-[#22577A] mb-2">Reduce Waste</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Millions of usable products end up in landfills. We extend product lifecycles by giving unused goods a second home.
            </p>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="p-6 border border-slate-100 shadow-sm h-full rounded-2xl bg-white">
            <div className="p-3 bg-[#38A3A5]/10 text-[#38A3A5] text-2xl rounded-xl w-fit mb-4">
              <FiTrendingUp />
            </div>
            <h3 className="font-bold text-lg text-[#22577A] mb-2">Earn and Save</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Sellers get opportunities to earn liquid money from dormant assets, while buyers purchase quality products at highly affordable costs.
            </p>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="p-6 border border-slate-100 shadow-sm h-full rounded-2xl bg-white">
            <div className="p-3 bg-emerald-50 text-emerald-500 text-2xl rounded-xl w-fit mb-4">
              <FiShield />
            </div>
            <h3 className="font-bold text-lg text-[#22577A] mb-2">Sustainable Ecosystem</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Promoting responsible consumption model that slows down consumer industrial carbon footprint and encourages recycling culture.
            </p>
          </Card>
        </motion.div>
      </motion.div>

      {/* ⚙️ সিস্টেম যেভাবে কাজ করে (How the System Works) */}
      <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm mb-16">
        <h2 className="text-xl font-extrabold text-[#22577A] text-center mb-10 flex items-center justify-center gap-2">
          <FiLayers className="text-[#38A3A5]" /> How the Platform Operates
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* বায়ার পার্ট */}
          <div className="space-y-6">
            <h4 className="font-black text-[#38A3A5] text-sm tracking-wider uppercase border-b pb-2">For Buyers</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <FiCheckCircle className="text-emerald-500 mt-1 flex-shrink-0" />
                <span className="text-sm text-slate-500">Browse verified listings through intelligent category filtration.</span>
              </li>
              <li className="flex items-start gap-3">
                <FiCheckCircle className="text-emerald-500 mt-1 flex-shrink-0" />
                <span className="text-sm text-slate-500">Communicate directly with sellers safely via unified portal.</span>
              </li>
              <li className="flex items-start gap-3">
                <FiCheckCircle className="text-emerald-500 mt-1 flex-shrink-0" />
                <span className="text-sm text-slate-500">Place instant secure checkout orders directly protected by Platform Escrow.</span>
              </li>
            </ul>
          </div>

          {/* সেলার পার্ট */}
          <div className="space-y-6">
            <h4 className="font-black text-[#22577A] text-sm tracking-wider uppercase border-b pb-2">For Sellers</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <FiCheckCircle className="text-[#22577A] mt-1 flex-shrink-0" />
                <span className="text-sm text-slate-500">Create a quick business profile using standard onboarding parameters.</span>
              </li>
              <li className="flex items-start gap-3">
                <FiCheckCircle className="text-[#22577A] mt-1 flex-shrink-0" />
                <span className="text-sm text-slate-500">List pre-owned products with rich details, parameters and transparent conditions.</span>
              </li>
              <li className="flex items-start gap-3">
                <FiCheckCircle className="text-[#22577A] mt-1 flex-shrink-0" />
                <span className="text-sm text-slate-500">Fulfill orders seamlessly and receive payments securely in native bank.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 👔 অ্যাডমিন এবং ট্রাস্ট ব্যানার */}
      <div className="text-center p-8 bg-[#22577A] text-white rounded-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full translate-x-8 -translate-y-8" />
        <p className="text-xs font-bold uppercase tracking-widest text-[#80ED99] mb-2 flex items-center justify-center gap-1.5">
          <FiUsers /> Admin Moderated Platform
        </p>
        <p className="text-sm max-w-xl mx-auto opacity-90 leading-relaxed">
          Every product post, user dispute, and system payload transaction is thoroughly monitored by NEXTMART administration to guarantee maximum anti-fraud parameters.
        </p>
      </div>

    </div>
  );
}