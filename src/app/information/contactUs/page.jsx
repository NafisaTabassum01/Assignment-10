"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@heroui/react";
import { 
  FiMail, FiPhone, FiMapPin, FiSend, 
  FiHelpCircle, FiClock 
} from "react-icons/fi";

export default function ContactUs() {
  const [formData, setFormData] = useState({ name: "", email: "", role: "buyer", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ name: "", email: "", role: "buyer", message: "" });
  };

  return (
    <div className="w-full min-h-screen bg-slate-50/50 py-16 px-4 max-w-6xl mx-auto">
      
      {/* 📌 হেডার টাইটেল */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-3xl font-black text-[#22577A] tracking-tight">Get in Touch</h1>
        <p className="text-xs text-slate-400 mt-2">Have questions about listings, verification or payouts? We are here to help.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
        
        {/* 📞 বাম কলাম: ফেক ইনফো এবং কন্টাক্ট টাচপয়েন্টস */}
        <div className="lg:col-span-2 space-y-6">
          
          <Card className="p-6 border border-slate-100 shadow-sm rounded-2xl bg-white space-y-5">
            <h3 className="font-extrabold text-[#22577A] text-lg border-b pb-2 flex items-center gap-2">
              <FiHelpCircle className="text-[#38A3A5]" /> Support Channels
            </h3>

            {/* ইমেইল */}
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-[#22577A]/10 text-[#22577A] text-lg mt-0.5">
                <FiMail />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase">Support Email</p>
                <p className="text-sm font-semibold text-[#22577A]">support@nextmart.com</p>
                <p className="text-[11px] text-slate-400">Response within 24 hours</p>
              </div>
            </div>

            {/* ফোন */}
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-[#38A3A5]/10 text-[#38A3A5] text-lg mt-0.5">
                <FiPhone />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase">Hotline Number</p>
                <p className="text-sm font-semibold text-[#22577A]">+880 1999-888777</p>
                <p className="text-[11px] text-slate-400">Sat - Thu, 10 AM to 6 PM</p>
              </div>
            </div>

            {/* হেডকোয়ার্টার */}
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-emerald-50 text-emerald-500 text-lg mt-0.5">
                <FiMapPin />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase">Headquarters</p>
                <p className="text-sm font-semibold text-[#22577A]">Level 4, NextMart Tech Hub</p>
                <p className="text-[11px] text-slate-400">Banani, Dhaka - 1213, Bangladesh</p>
              </div>
            </div>
          </Card>

          {/* অতিরিক্ত টাইম জোন নোটিশ */}
          <div className="bg-[#22577A]/5 border border-[#22577A]/10 rounded-xl p-4 flex items-center gap-3">
            <FiClock className="text-xl text-[#22577A]" />
            <p className="text-xs text-[#22577A] font-medium leading-relaxed">
              <strong>Admin Note:</strong> Escalated tickets concerning transaction disputes or wallet frozen complaints require admin cross-checks and may consume up to 48 hours.
            </p>
          </div>

        </div>

        {/* 📝 ডান কলাম: রেসপনসিভ টাচ ফর্ম */}
        <div className="lg:col-span-3">
          <Card className="p-8 border border-slate-100 shadow-sm rounded-2xl bg-white">
            <h3 className="font-extrabold text-[#22577A] text-lg mb-6">Send Us a Direct Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* নাম */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500">Your Full Name</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="e.g. Tanvir Rahman"
                    className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-[#22577A] focus:outline-none focus:ring-2 focus:ring-[#38A3A5]/40"
                  />
                </div>
                {/* ইমেইল */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500">Email Address</label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="username@gmail.com"
                    className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-[#22577A] focus:outline-none focus:ring-2 focus:ring-[#38A3A5]/40"
                  />
                </div>
              </div>

              {/* রোল সিলেক্টর (Buyer / Seller) */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500">Identify Your Platform Role</label>
                <div className="relative">
                  <select 
                    value={formData.role}
                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                    className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-[#22577A] appearance-none focus:outline-none focus:ring-2 focus:ring-[#38A3A5]/40 cursor-pointer font-semibold"
                  >
                    <option value="buyer">I am a Registered Buyer</option>
                    <option value="seller">I am a Pre-Owned Product Seller</option>
                    <option value="visitor">Just Visiting Platform</option>
                  </select>
                </div>
              </div>

              {/* মেসেজ বডি */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500">Detail Explanation</label>
                <textarea 
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder="Describe your issue or feedback in detail..."
                  className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-[#22577A] focus:outline-none focus:ring-2 focus:ring-[#38A3A5]/40 resize-none"
                />
              </div>

              {/* সাবমিট বাটন */}
              <button 
                type="submit"
                className="w-full bg-[#22577A] hover:bg-[#1b4562] text-white font-bold text-sm py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors duration-200 shadow-sm"
              >
                <FiSend /> Dispatch Message
              </button>

              {/* সাকসেস টোস্ট বা নোটিফিকেশন */}
              {submitted && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-center"
                >
                  <p className="text-xs text-emerald-600 font-bold">
                    🚀 Message submitted successfully! Our Admin panel will review your feedback shortly.
                  </p>
                </motion.div>
              )}

            </form>
          </Card>
        </div>

      </div>

    </div>
  );
}