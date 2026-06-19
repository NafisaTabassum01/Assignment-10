"use client";

import React, { useEffect, useState } from "react";
import { Label, ListBox, Select } from "@heroui/react";
import { useRouter, useSearchParams } from "next/navigation";
import { FiSearch, FiSliders } from "react-icons/fi";

const ProductFilterBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // URL এ অলরেডি কোনো সার্চ কোয়েরি থাকলে তা ইনিশিয়াল স্টেট হিসেবে সেট হবে
  const [searchValue, setSearchValue] = useState(searchParams.get("search") || "");

  // ইউজার টাইপ করার সাথে সাথে URL আপডেট করার জন্য useEffect
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (searchValue) {
      params.set("search", searchValue);
    } else {
      params.delete("search");
    }
    router.push(`?${params.toString()}`, { scroll: false });
  }, [searchValue, router, searchParams]);

  // ড্রপডাউন ফিল্টার চেঞ্জ হ্যান্ডেল করার ফাংশন
  const handleSelectChange = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 mt-6">
      <div className="p-4 md:p-6 bg-white border border-gray-100 shadow-xl rounded-2xl flex flex-col gap-4 text-[#22577A]">
        
        {/* Header Title */}
        <div className="flex items-center gap-2 pb-2 border-b border-slate-50">
          <FiSliders className="text-[#38A3A5] size-4" />
          <span className="text-xs font-black uppercase tracking-wider text-[#216869]">
            Search & Filter Listings
          </span>
        </div>

        {/* Filters Grid Layer */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          
          {/* ১. স্ট্যান্ডার্ড সার্চ ইনপুট (কোনো DOM Prop Conflict নেই) */}
          <div className="flex flex-col w-full">
            <Label className="text-xs font-bold text-[#216869] uppercase tracking-wider mb-2">
              Search Products
            </Label>
            <div className="relative flex items-center w-full">
              <FiSearch className="absolute left-4 text-[#38A3A5] size-4 z-10 pointer-events-none" />
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="e.g. Jamdani Saree, Smart Tv..."
                className="w-full h-11 pl-11 pr-4 rounded-xl border border-slate-200 outline-none text-sm text-slate-700 bg-white shadow-sm focus:border-[#38A3A5] transition-all"
              />
            </div>
          </div>

          {/* ২. ক্যাটাগরি সিলেক্ট ড্রপডাউন (HeroUI) */}
          <div>
            <Select 
              className="w-full" 
              placeholder="All Categories"
              defaultSelectedKeys={searchParams.get("category") ? [searchParams.get("category")] : []}
              onSelectionChange={(keys) => {
                const selected = Array.from(keys)[0] || "";
                handleSelectChange("category", selected);
              }}
            >
              <Label className="text-xs font-bold text-[#216869] uppercase tracking-wider mb-2 block">
                Category
              </Label>
              <Select.Trigger className="rounded-xl border border-slate-200 w-full h-11 px-4 shadow-sm bg-white flex items-center justify-between text-slate-700">
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover className="bg-white border border-slate-100 rounded-xl shadow-xl p-1 z-50">
                <ListBox>
                  <ListBox.Item id="" textValue="All Categories" className="p-2 text-sm text-[#22577A] rounded-lg hover:bg-slate-50 cursor-pointer">All Categories <ListBox.ItemIndicator /></ListBox.Item>
                  <ListBox.Item id="electronics" textValue="Electronics" className="p-2 text-sm text-[#22577A] rounded-lg hover:bg-slate-50 cursor-pointer">Electronics <ListBox.ItemIndicator /></ListBox.Item>
                  <ListBox.Item id="clothing" textValue="Clothing & Apparel" className="p-2 text-sm text-[#22577A] rounded-lg hover:bg-slate-50 cursor-pointer">Clothing & Apparel <ListBox.ItemIndicator /></ListBox.Item>
                  <ListBox.Item id="home" textValue="Home & Living" className="p-2 text-sm text-[#22577A] rounded-lg hover:bg-slate-50 cursor-pointer">Home & Living <ListBox.ItemIndicator /></ListBox.Item>
                  <ListBox.Item id="gadgets" textValue="Gadgets & Accessories" className="p-2 text-sm text-[#22577A] rounded-lg hover:bg-slate-50 cursor-pointer">Gadgets & Accessories <ListBox.ItemIndicator /></ListBox.Item>
                  <ListBox.Item id="instruments" textValue="Musical Instruments" className="p-2 text-sm text-[#22577A] rounded-lg hover:bg-slate-50 cursor-pointer">Musical Instruments <ListBox.ItemIndicator /></ListBox.Item>
                </ListBox>
              </Select.Popover>
            </Select>
          </div>

          {/* ৩. কন্ডিশন সিলেক্ট ড্রপডাউন (HeroUI) */}
          <div>
            <Select 
              className="w-full" 
              placeholder="All Conditions"
              defaultSelectedKeys={searchParams.get("condition") ? [searchParams.get("condition")] : []}
              onSelectionChange={(keys) => {
                const selected = Array.from(keys)[0] || "";
                handleSelectChange("condition", selected);
              }}
            >
              <Label className="text-xs font-bold text-[#216869] uppercase tracking-wider mb-2 block">
                Item Condition
              </Label>
              <Select.Trigger className="rounded-xl border border-slate-200 w-full h-11 px-4 shadow-sm bg-white flex items-center justify-between text-slate-700">
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover className="bg-white border border-slate-100 rounded-xl shadow-xl p-1 z-50">
                <ListBox>
                  <ListBox.Item id="" textValue="All Conditions" className="p-2 text-sm text-[#22577A] rounded-lg hover:bg-slate-50 cursor-pointer">All Conditions <ListBox.ItemIndicator /></ListBox.Item>
                  <ListBox.Item id="like-new" textValue="Like New" className="p-2 text-sm text-[#22577A] rounded-lg hover:bg-slate-50 cursor-pointer">Like New <ListBox.ItemIndicator /></ListBox.Item>
                  <ListBox.Item id="refurbished" textValue="Refurbished" className="p-2 text-sm text-[#22577A] rounded-lg hover:bg-slate-50 cursor-pointer">Refurbished <ListBox.ItemIndicator /></ListBox.Item>
                  <ListBox.Item id="used" textValue="Used" className="p-2 text-sm text-[#22577A] rounded-lg hover:bg-slate-50 cursor-pointer">Used <ListBox.ItemIndicator /></ListBox.Item>
                </ListBox>
              </Select.Popover>
            </Select>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductFilterBar;