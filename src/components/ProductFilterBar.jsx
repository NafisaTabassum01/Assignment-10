

"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FiSearch, FiSliders } from "react-icons/fi";

const ProductFilterBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");

  const handleSearchSubmit = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (search.trim()) {
      params.set("search", search.trim());
    } else {
      params.delete("search");
    }
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const handleDropdownChange = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "") {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    if (search.trim()) {
      params.set("search", search.trim());
    }

    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 mt-6">
      {/* 🎯 আগের প্রিমিয়াম শ্যাডো ও রাউন্ডেড ডিজাইন, কিন্তু ভেতরের উপাদানগুলো এখন সম্পূর্ণ এক লাইনে অনুভূমিক (Horizontal) */}
      <div className="p-3 bg-white border border-gray-100 shadow-xl rounded-2xl flex flex-col md:flex-row gap-3 items-center">
        
        {/* আইকন সহ বাম পাশের ছোট সেকশন */}
        <div className="hidden lg:flex items-center gap-1.5 shrink-0 text-[#216869] border-r border-slate-100 pr-3 h-6">
          <FiSliders className="text-[#38A3A5] size-3.5" />
          <span className="text-[10px] font-black uppercase tracking-wider">
            Filters:
          </span>
        </div>

        {/* 🎯 সার্চ বার (১ম উপাদান) */}
        <div className="relative flex items-center border border-slate-200 rounded-xl h-10 bg-white focus-within:border-[#38A3A5] transition-all overflow-hidden w-full md:flex-[1.2]">
          <div className="pl-4 shrink-0">
            <FiSearch className="text-[#38A3A5] size-4" />
          </div>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearchSubmit()}
            className="flex-1 h-full px-3 outline-none bg-transparent text-xs text-slate-700 placeholder:text-slate-400 min-w-0"
            placeholder="Search products..."
          />
          <button
            onClick={handleSearchSubmit}
            className="h-7 p-2 mr-1.5 rounded-lg bg-[#22577A] text-white text-xs font-semibold hover:bg-[#216869] transition-colors whitespace-nowrap"
          >
            Search
          </button>
        </div>

        {/* 🎯 ক্যাটাগরি সিলেক্ট (২য় উপাদান) */}
        <div className="w-full md:w-auto md:flex-1 min-w-[140px]">
          <select
            className="w-full h-10 border border-slate-200 rounded-xl px-3 text-xs bg-white text-slate-600 outline-none focus:border-[#38A3A5] transition-all cursor-pointer shadow-sm"
            onChange={(e) => handleDropdownChange("category", e.target.value)}
            value={searchParams.get("category") || ""}
          >
            <option value="">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="clothing">Clothing</option>
            <option value="home">Home</option>
            <option value="gadgets">Gadgets</option>
            <option value="instruments">Instruments</option>
          </select>
        </div>

        {/* 🎯 কন্ডিশন সিলেক্ট (৩য় উপাদান) */}
        <div className="w-full md:w-auto md:flex-1 min-w-[130px]">
          <select
            className="w-full h-10 border border-slate-200 rounded-xl px-3 text-xs bg-white text-slate-600 outline-none focus:border-[#38A3A5] transition-all cursor-pointer shadow-sm"
            onChange={(e) => handleDropdownChange("condition", e.target.value)}
            value={searchParams.get("condition") || ""}
          >
            <option value="">All Conditions</option>
            <option value="like-new">Like New</option>
            <option value="used">Used</option>
            <option value="refurbished">Refurbished</option>
          </select>
        </div>

        {/* 🎯 প্রাইস সর্ট সিলেক্ট (৪র্থ উপাদান) */}
        <div className="w-full md:w-auto md:flex-1 min-w-[130px]">
          <select
            className="w-full h-10 border border-slate-200 rounded-xl px-3 text-xs bg-white text-slate-600 outline-none focus:border-[#38A3A5] transition-all cursor-pointer shadow-sm"
            onChange={(e) => handleDropdownChange("sort", e.target.value)}
            value={searchParams.get("sort") || ""}
          >
            <option value="">Sort By Price</option>
            <option value="low-to-high">Low to High</option>
            <option value="high-to-low">High to Low</option>
          </select>
        </div>

      </div>
    </div>
  );
};

export default ProductFilterBar;