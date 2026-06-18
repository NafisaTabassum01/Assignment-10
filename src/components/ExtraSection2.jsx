"use client";

import React from "react";
import { Card } from "@heroui/react";
import { motion } from "framer-motion";
import { FiGlobe, FiTrash2, FiDroplet, FiTrendingDown } from "react-icons/fi";

export default function ExtraSection2() {
  // Brand color coordinated data infrastructure matrix
  const metrics = [
    {
      title: "Carbon Footprint Saved",
      value: "15.4 kg CO₂",
      description: "Average greenhouse gas emissions avoided per pre-loved purchase.",
      icon: <FiGlobe className="text-[#38A3A5] size-6" />,
      bgIcon: "bg-[#38A3A5]/10 border-[#38A3A5]/20",
    },
    {
      title: "Waste Diverted",
      value: "4,200+ Tons",
      description: "Total volume of potential e-waste and textile landfill prevention.",
      icon: <FiTrash2 className="text-[#216869] size-6" />,
      bgIcon: "bg-[#216869]/10 border-[#216869]/20",
    },
    {
      title: "Water Conservation",
      value: "250,000 L",
      description: "Water resource savings by extending existing commodity lifetimes.",
      icon: <FiDroplet className="text-[#22577A] size-6" />,
      bgIcon: "bg-[#22577A]/10 border-[#22577A]/20",
    },
  ];

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-16 md:py-24 bg-white">
      {/* 1. Header Typography Module Segment */}
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 gap-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#38A3A5]/10 border border-[#38A3A5]/20 text-xs font-bold text-[#216869] uppercase tracking-widest">
          <FiTrendingDown className="size-3.5" /> Eco Impact Tracker
        </div>
        <h2 className="text-3xl md:text-4xl font-black text-[#22577A] tracking-tight">
          Sustainability Through Re-commerce
        </h2>
        <p className="text-sm md:text-base text-slate-400 font-medium leading-relaxed">
          Every second-hand item you discover and buy directly disrupts the linear manufacturing pipeline, reducing toxic raw resource extraction and landfill overload.
        </p>
      </div>

      {/* 2. Responsive Visualized Metric Cards Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {metrics.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.03, y: -4 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="w-full"
          >
            <Card className="w-full p-6 md:p-8 border border-slate-100 bg-linear-to-br from-white to-slate-50/50 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between h-[230px] relative overflow-hidden group">
              {/* Context brand graphical soft highlight decoration */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-linear-to-bl from-[#38A3A5]/5 to-transparent rounded-bl-full pointer-events-none" />

              {/* Icon Holder Top Layout Slot */}
              <div className="flex items-center justify-between w-full">
                <div className={`p-3 rounded-xl border flex items-center justify-center shrink-0 ${item.bgIcon}`}>
                  {item.icon}
                </div>
                {/* <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                  Verified Metric
                </span> */}
              </div>

              {/* Central Large Quantitative Analytic Block */}
              <div className="flex flex-col gap-1 my-3">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  {item.title}
                </span>
                <Card.Title className="text-2xl md:text-3xl font-black text-[#22577A] tracking-tight">
                  {item.value}
                </Card.Title>
              </div>

              {/* Subtext description mapping segment */}
              <div className="border-t border-slate-100 pt-2">
                <Card.Description className="text-xs text-slate-400 font-medium leading-normal">
                  {item.description}
                </Card.Description>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* 3. Bottom Call To Action Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="mt-12 p-6 md:p-8 bg-linear-to-r from-[#22577A] via-[#216869] to-[#38A3A5] rounded-2xl shadow-lg text-white flex flex-col md:flex-row items-center justify-between gap-6"
      >
        <div className="flex flex-col gap-1 text-center md:text-left">
          <h4 className="text-lg font-black tracking-tight">Ready to make a greener choice?</h4>
          <p className="text-xs text-white/80 max-w-xl">
            By trading within a circular market model, you help transition global economies towards net-zero structural targets. Start listing or browsing pre-loved items today!
          </p>
        </div>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white text-[#22577A] font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-xl shadow-md hover:bg-slate-50 transition-colors shrink-0"
        >
          Join Circular Network
        </motion.button>
      </motion.div>
    </section>
  );
}