"use client";

import React from "react";
import { Card } from "@heroui/react";
import { motion } from "framer-motion";
import { 
  Boxes3,      // Total Products
  ShoppingBag, // Total Sales
  CircleDollar, // Total Revenue
  Clock        // Pending Orders
} from "@gravity-ui/icons";

export default function SellerDashboardStats() {
  const staticStats = [
    {
      title: "Total Products",
      value: "148",
      description: "Active items in store",
      icon: <Boxes3 className="text-[#38A3A5] size-5" role="img" aria-label="Products icon" />,
    },
    {
      title: "Total Sales",
      value: "1,240",
      description: "Successfully completed orders",
      icon: <ShoppingBag className="text-[#38A3A5] size-5" role="img" aria-label="Sales icon" />,
    },
    {
      title: "Total Revenue",
      value: "৳84,250",
      description: "Net platform earnings",
      icon: <CircleDollar className="text-[#38A3A5] size-5" role="img" aria-label="Revenue icon" />,
    },
    {
      title: "Pending Orders",
      value: "12",
      description: "Orders awaiting dispatch",
      icon: <Clock className="text-[#38A3A5] size-5" role="img" aria-label="Pending orders icon" />,
    },
  ];

  return (
    <div className="w-full lg:w-11/12 mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-2">
      {staticStats.map((stat, index) => (
        /* Framer Motion Wrapper for precise layout micro-interactions */
        <motion.div
          key={index}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="w-full h-full"
        >
          <Card 
            className="w-full h-[180px] p-5 border border-slate-100/80 bg-gradient-to-br from-white via-white to-slate-50 rounded-2xl shadow-sm hover:shadow-md hover:border-[#38A3A5]/30 flex flex-col justify-between relative overflow-hidden group transition-colors duration-300"
          >
            {/* Background design layer utilizing branding colors */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#38A3A5]/5 to-[#22577A]/5 rounded-bl-full pointer-events-none transition-all group-hover:scale-110" />

            {/* 1. TOP SECTION: Icon on the Left side */}
            <Card.Header className="p-0 flex items-center justify-between w-full">
              <div className="p-2.5 bg-[#38A3A5]/10 border border-[#38A3A5]/20 rounded-xl flex items-center justify-center shrink-0">
                {stat.icon}
              </div>
            </Card.Header>

            {/* 2. MIDDLE SECTION: Values aligned exactly to the center/middle area */}
            <div className="flex flex-col items-center justify-center my-auto py-1 text-center">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                {stat.title}
              </span>
              <Card.Title className="text-3xl pt-1 font-black text-[#22577A] tracking-tight">
                {stat.value}
              </Card.Title>
            </div>

            {/* 3. BOTTOM SECTION: Structured descriptions */}
            <div className="w-full text-center border-t border-slate-50 pt-">
              <Card.Description className="text-[11px] text-slate-400 leading-normal font-medium truncate block">
                {stat.description}
              </Card.Description>
            </div>

          </Card>
        </motion.div>
      ))}
    </div>
  );
}