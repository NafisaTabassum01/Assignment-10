"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@heroui/react"; 
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell, LineChart, Line, Legend
} from "recharts";
import { 
  FiActivity, FiUsers, FiShoppingBag, FiGrid, 
  FiArrowUpRight, FiTrendingUp, FiLayers, FiChevronDown 
} from "react-icons/fi";

// 📊 অ্যাডমিন প্ল্যাটফর্মের জন্য প্রিমিয়াম ফেক ডাটা (Fake Data)
const platformSummary = [
  { id: 1, title: "Total Platform Users", value: "12,480", change: "+18.2%", icon: FiUsers, color: "text-[#22577A] bg-[#22577A]/10" },
  { id: 2, title: "Platform Revenue", value: "৳ 8,34,900", change: "+24.5%", icon: FiTrendingUp, color: "text-[#38A3A5] bg-[#38A3A5]/10" },
  { id: 3, title: "Total Monthly Orders", value: "3,120 Nos", change: "+11.3%", icon: FiShoppingBag, color: "text-emerald-500 bg-emerald-50" },
  { id: 4, title: "Active Categories", value: "14 Sectors", change: "Stable", icon: FiGrid, color: "text-amber-500 bg-amber-50" },
];

// ১. User Growth Chart Data (Line Chart)
const userGrowthData = [
  { month: "Jan", Buyers: 4000, Sellers: 400 },
  { month: "Feb", Buyers: 5500, Sellers: 480 },
  { month: "Mar", Buyers: 7000, Sellers: 590 },
  { month: "Apr", Buyers: 8800, Sellers: 710 },
  { month: "May", Buyers: 10500, Sellers: 880 },
  { month: "Jun", Buyers: 12480, Sellers: 1050 },
];

// ২. Monthly Orders & Revenue Trend Data (Area Chart)
const monthlyOrdersData = [
  { month: "Jan", orders: 1200, revenue: 220000 },
  { month: "Feb", orders: 1900, revenue: 380000 },
  { month: "Mar", orders: 1500, revenue: 310000 },
  { month: "Apr", orders: 2400, revenue: 520000 },
  { month: "May", orders: 2800, revenue: 690000 },
  { month: "Jun", orders: 3120, revenue: 834900 },
];

// ৩. Category Performance & Top Categories Data (Bar Chart)
const categoryPerformanceData = [
  { name: "Smartphones", orders: 940, revenue: 350000, color: "#22577A" },
  { name: "Laptop Acc.", orders: 720, revenue: 210000, color: "#38A3A5" },
  { name: "Audio Gear", orders: 610, revenue: 140000, color: "#57CC99" },
  { name: "Power Banks", orders: 530, revenue: 85000, color: "#80ED99" },
  { name: "Smart Watches", orders: 320, revenue: 49900, color: "#C7F9CC" },
];

// 🎨 অ্যানিমেশন ভেরিয়েন্ট
const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 90 } }
};

const PlatformAnalytics = () => {
  const [reportType, setReportType] = useState("all");

  return (
    <div className="w-full min-h-screen bg-slate-50/50 py-12 px-4 max-w-6xl mx-auto">
      
      {/* 📌 হেডার সেকশন */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-slate-200 mb-8">
        <div className="flex items-center gap-3 text-[#22577A]">
          <FiActivity className="text-3xl text-[#38A3A5]" />
          <div>
            <h1 className="text-2xl font-black tracking-tight">Platform Analytics</h1>
            <p className="text-xs text-slate-400">Overall business insights, user trends, and market metrics</p>
          </div>
        </div>
        
        {/* কাস্টম এরর-ফ্রি ড্রপডাউন */}
        <div className="relative w-48">
          <select 
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm font-bold text-[#22577A] appearance-none focus:outline-none focus:ring-2 focus:ring-[#38A3A5]/50 shadow-sm cursor-pointer"
          >
            <option value="all">Full Platform Overview</option>
            <option value="users">User Metrics Only</option>
            <option value="sales">Financial Metrics</option>
          </select>
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-slate-400">
            <FiChevronDown />
          </div>
        </div>
      </div>

      {/* 📌 ৪ কলামের অ্যাডমিন ওভারভিউ কার্ডস (সেলার পেজ থেকে আলাদা লেআউট) */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8"
      >
        {platformSummary.map((card) => {
          const IconComponent = card.icon;
          return (
            <motion.div variants={itemVariants} key={card.id}>
              <Card className="border border-slate-100 shadow-sm rounded-2xl hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex flex-col p-5 w-full space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{card.title}</span>
                    <div className={`p-2.5 rounded-xl ${card.color} text-xl`}>
                      <IconComponent />
                    </div>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-2xl font-black text-[#22577A]">{card.value}</h3>
                    {card.change !== "Stable" && (
                      <span className="inline-flex items-center gap-0.5 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                        <FiArrowUpRight /> {card.change}
                      </span>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      {/* 📌 মেইন চার্ট ম্যাট্রিক্স গ্রিড */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        
        {/* ১. User Growth Chart (Line Chart - মডার্ন ডুয়াল ট্রেন্ড) */}
        <motion.div variants={itemVariants}>
          <Card className="border border-slate-100 shadow-sm rounded-2xl p-6 h-[380px]">
            <div className="flex items-center gap-2 mb-6">
              <FiUsers className="text-xl text-[#22577A]" />
              <div>
                <h2 className="font-bold text-[#22577A] text-base">User Growth Chart</h2>
                <p className="text-[11px] text-slate-400">Registration scale of Buyers vs Sellers</p>
              </div>
            </div>
            <div className="w-full h-full pb-12">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={userGrowthData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #f1f5f9" }} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: "12px", pt: 10 }} />
                  <Line type="monotone" dataKey="Buyers" stroke="#38A3A5" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                  <Line type="monotone" dataKey="Sellers" stroke="#22577A" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>

        {/* ২. Monthly Orders & Revenue Trend (Area Chart) */}
        <motion.div variants={itemVariants}>
          <Card className="border border-slate-100 shadow-sm rounded-2xl p-6 h-[380px]">
            <div className="flex items-center gap-2 mb-6">
              <FiShoppingBag className="text-xl text-[#38A3A5]" />
              <div>
                <h2 className="font-bold text-[#22577A] text-base">Monthly Orders & Revenue</h2>
                <p className="text-[11px] text-slate-400">Total processed platform checkouts</p>
              </div>
            </div>
            <div className="w-full h-full pb-12">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyOrdersData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="adminRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22577A" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#22577A" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #f1f5f9" }}
                    formatter={(value, name) => name === "revenue" ? [`৳ ${value}`, "Revenue"] : [value, "Orders"]}
                  />
                  <Area type="smooth" dataKey="revenue" stroke="#22577A" strokeWidth={2.5} fillOpacity={1} fill="url(#adminRevenue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>

        {/* ৩. Category Performance & Top Categories Chart (বড় কম্বো বার চার্ট - ২ কলাম জুড়ে থাকবে) */}
        <motion.div variants={itemVariants} className="lg:col-span-2 mt-2">
          <Card className="border border-slate-100 shadow-sm rounded-2xl p-6 h-[380px]">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <FiLayers className="text-xl text-[#57CC99]" />
                <div>
                  <h2 className="font-bold text-[#22577A] text-base">Category Performance & Top Sectors</h2>
                  <p className="text-[11px] text-slate-400">Overview of order distributions per niche</p>
                </div>
              </div>
              <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">Live Market Share</span>
            </div>
            
            <div className="w-full h-full pb-12">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryPerformanceData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #f1f5f9" }}
                    formatter={(value, name, props) => [
                      `${value} Orders (Volume: ৳ ${props.payload.revenue})`, 
                      "Category Share"
                    ]} 
                  />
                  <Bar dataKey="orders" radius={[10, 10, 0, 0]} maxBarSize={60}>
                    {categoryPerformanceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>

      </motion.div>
    </div>
  );
};

export default PlatformAnalytics;