"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@heroui/react"; // 🎯 ঝামেলা করা Select, SelectItem একদম বাদ
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell, PieChart, Pie
} from "recharts";
import { 
  FiTrendingUp, FiDollarSign, FiPackage, FiShoppingBag, 
  FiArrowUpRight, FiPieChart, FiBarChart2, FiChevronDown 
} from "react-icons/fi";

// 📊 চার্ট এবং কার্ডের জন্য ফেক ডাটা (Fake Data)
const summaryCards = [
  { id: 1, title: "Total Earnings", value: "৳ 1,42,500", change: "+12.5%", icon: FiDollarSign, color: "text-[#38A3A5] bg-[#38A3A5]/10" },
  { id: 2, title: "Products Sold", value: "324 Pcs", change: "+8.2%", icon: FiPackage, color: "text-[#22577A] bg-[#22577A]/10" },
  { id: 3, title: "Total Orders", value: "186 Nos", change: "+14.3%", icon: FiShoppingBag, color: "text-emerald-500 bg-emerald-50" },
];

const monthlySalesData = [
  { name: "Jan", sales: 12000, orders: 45 },
  { name: "Feb", sales: 19000, orders: 58 },
  { name: "Mar", sales: 15000, orders: 48 },
  { name: "Apr", sales: 27000, orders: 82 },
  { name: "May", sales: 34000, orders: 110 },
  { name: "Jun", sales: 35500, orders: 115 },
];

const topProductsData = [
  { name: "Anker PowerCore 24K", sales: 420, value: 52000, color: "#22577A" },
  { name: "Logitech MX Master 3S", sales: 280, value: 36000, color: "#38A3A5" },
  { name: "Sony WH-1000XM5", sales: 190, value: 29000, color: "#57CC99" },
  { name: "Baseus GaN5 Pro Charger", sales: 150, value: 15500, color: "#80ED99" },
  { name: "Keychron K2 Keyboard", sales: 95, value: 10000, color: "#C7F9CC" },
];

const categoryData = [
  { name: "Electronics", value: 65000, color: "#22577A" },
  { name: "Accessories", value: 41500, color: "#38A3A5" },
  { name: "Audio", value: 36000, color: "#57CC99" },
];

// 🎨 অ্যানিমেশন ভেরিয়েন্ট
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
};

const SalesAnalytics = () => {
  const [timeRange, setTimeRange] = useState("6months");

  return (
    <div className="w-full min-h-screen bg-slate-50/50 py-12 px-4 max-w-6xl mx-auto">
      
      {/* 📌 হেডার সেকশন */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-slate-200 mb-8">
        <div className="flex items-center gap-3 text-[#22577A]">
          <FiTrendingUp className="text-3xl text-[#38A3A5]" />
          <div>
            <h1 className="text-2xl font-black tracking-tight">Sales Analytics</h1>
            <p className="text-xs text-slate-400">Deep dive into your store's sales performance and insights</p>
          </div>
        </div>
        
        {/* 🎯 কাস্টম এরর-ফ্রি ড্রপডাউন (HTML native select with Tailwind UI) */}
        <div className="relative w-44">
          <select 
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm font-bold text-[#22577A] appearance-none focus:outline-none focus:ring-2 focus:ring-[#38A3A5]/50 shadow-sm cursor-pointer"
          >
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="6months">Last 6 Months</option>
          </select>
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-slate-400">
            <FiChevronDown />
          </div>
        </div>
      </div>

      {/* 📌 টপ সামারি কার্ডস */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8"
      >
        {summaryCards.map((card) => {
          const IconComponent = card.icon;
          return (
            <motion.div variants={itemVariants} key={card.id}>
              <Card className="border border-slate-100 shadow-sm rounded-2xl hover:shadow-md transition-shadow">
                <div className="flex flex-row items-center justify-between p-6 w-full">
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{card.title}</p>
                    <h3 className="text-2xl font-black text-[#22577A]">{card.value}</h3>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                      <FiArrowUpRight /> {card.change}
                    </span>
                  </div>
                  <div className={`p-4 rounded-2xl ${card.color} text-2xl`}>
                    <IconComponent />
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      {/* 📌 মেইন চার্ট এরিয়া */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        
        {/* ১. Monthly Sales Trend (Area Chart) */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <Card className="border border-slate-100 shadow-sm rounded-2xl p-6 h-[400px]">
            <div className="flex items-center gap-2 mb-6">
              <FiBarChart2 className="text-xl text-[#38A3A5]" />
              <h2 className="font-bold text-[#22577A] text-lg">Monthly Sales Trend</h2>
            </div>
            <div className="w-full h-full pb-8">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlySalesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#38A3A5" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#38A3A5" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #f1f5f9", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
                    formatter={(value) => [`৳ ${value}`, "Revenue"]}
                  />
                  <Area type="monotone" dataKey="sales" stroke="#38A3A5" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>

        {/* ২. Category Distribution (Pie Chart) */}
        <motion.div variants={itemVariants}>
          <Card className="border border-slate-100 shadow-sm rounded-2xl p-6 h-[400px]">
            <div className="flex items-center gap-2 mb-4">
              <FiPieChart className="text-xl text-[#22577A]" />
              <h2 className="font-bold text-[#22577A] text-lg">Category Contribution</h2>
            </div>
            <div className="w-full h-full flex flex-col justify-center items-center pb-6">
              <ResponsiveContainer width="100%" height="80%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`৳ ${value}`, "Total Sales"]} />
                </PieChart>
              </ResponsiveContainer>
              
              {/* কাস্টম লেজেন্ড লিস্ট */}
              <div className="flex gap-4 text-xs font-semibold mt-2">
                {categoryData.map((cat, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                    <span className="text-slate-500">{cat.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* ৩. Top Selling Products (Bar Chart) */}
        <motion.div variants={itemVariants} className="lg:col-span-3 mt-2">
          <Card className="border border-slate-100 shadow-sm rounded-2xl p-6 h-[380px]">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <FiPackage className="text-xl text-[#38A3A5]" />
                <h2 className="font-bold text-[#22577A] text-lg">Top Selling Products</h2>
              </div>
              <span className="text-xs font-bold text-[#38A3A5] bg-[#38A3A5]/5 px-3 py-1 rounded-full">By Sales Unit</span>
            </div>
            <div className="w-full h-full pb-10">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topProductsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #f1f5f9" }}
                    formatter={(value, name, props) => [
                      `${value} Units (৳ ${props.payload.value})`, 
                      "Performance"
                    ]} 
                  />
                  <Bar dataKey="sales" radius={[8, 8, 0, 0]} maxBarSize={50}>
                    {topProductsData.map((entry, index) => (
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

export default SalesAnalytics;