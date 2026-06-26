"use client";

import React, { useEffect, useState } from "react";
import { Card, Spinner } from "@heroui/react";
import { motion } from "framer-motion";
import { 
  Persons,     // Total Users Icon
  Boxes3,      // Total Products Icon
  ShoppingBag, // Total Orders Icon
} from "@gravity-ui/icons";

export default function AdminDashboardStats() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ব্যাকএন্ড থেকে অ্যাডমিন স্ট্যাটস ডাটা ফেচ করা
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/stats`)
      .then((res) => res.json())
      .then((resData) => {
        if (resData.success) {
          setStats(resData.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching admin stats:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center p-10">
        <Spinner size="md" className="text-teal-600" />
      </div>
    );
  }

  const adminStats = [
    {
      title: "Total Users",
      value: stats?.totalUsers || 0,
      description: "Platform buyers & sellers",
      icon: <Persons className="text-[#38A3A5] size-5" role="img" aria-label="Users icon" />,
    },
    {
      title: "Total Products",
      value: stats?.totalProducts || 0,
      description: "Active items in store",
      icon: <Boxes3 className="text-[#38A3A5] size-5" role="img" aria-label="Products icon" />,
    },
    {
      title: "Total Orders",
      value: stats?.totalOrders || 0,
      description: "Successfully placed orders",
      icon: <ShoppingBag className="text-[#38A3A5] size-5" role="img" aria-label="Orders icon" />,
    },
  ];

  return (
    <div className="w-full lg:w-11/12 mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 p-2">
      {adminStats.map((stat, index) => (
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
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#38A3A5]/5 to-[#22577A]/5 rounded-bl-full pointer-events-none transition-all group-hover:scale-110" />

            <Card.Header className="p-0 flex items-center justify-between w-full">
              <div className="p-2.5 bg-[#38A3A5]/10 border border-[#38A3A5]/20 rounded-xl flex items-center justify-center shrink-0">
                {stat.icon}
              </div>
            </Card.Header>

            <div className="flex flex-col items-center justify-center my-auto py-1 text-center">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                {stat.title}
              </span>
              <Card.Title className="text-3xl pt-1 font-black text-[#22577A] tracking-tight">
                {stat.value.toLocaleString()}
              </Card.Title>
            </div>

            <div className="w-full text-center border-t border-slate-50">
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