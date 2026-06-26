export const dynamic = "force-dynamic";

import React from "react";
import { getProduct } from "@/lib/api/products";
// import CategoryClientPage from "./CategoryClientPage";
import { FiGrid } from "react-icons/fi";
import CategoryClientPage from "@/components/CategoryClientPage";

const CategoriesPage = async () => {
  // 🛰️ DB থেকে সরাসরি সব লাইভ প্রোডাক্ট ডাটা নিয়ে আসা হচ্ছে
  const products = (await getProduct()) || [];

  // 🎯 ডাইনামিক ক্যাটাগরি লিস্ট ও কাউন্ট বের করার লজিক
  const categoryMap = {};
  
  products.forEach((product) => {
    if (product.Category) {
      // ডাটাবেজের ক্যাটাগরি নামগুলোকে স্ট্যান্ডার্ড ফরম্যাট (যেমন: Electronics) এ কনভার্ট করা
      const rawCategory = product.Category.trim();
      const normalizedCategory = rawCategory.charAt(0).toUpperCase() + rawCategory.slice(1).toLowerCase();
      
      if (!categoryMap[normalizedCategory]) {
        categoryMap[normalizedCategory] = {
          name: normalizedCategory,
          slug: rawCategory.toLowerCase(), // ফিল্টারিং এর জন্য ছোট হাতের অক্ষর
          count: 0,
          // গ্রিড সুন্দর দেখানোর জন্য ক্যাটাগরির প্রথম প্রোডাক্টের ইমেজটিকে কভার ইমেজ হিসেবে ব্যবহার করা হচ্ছে
          bgImage: product.ImageUrl || "/placeholder.jpg" 
        };
      }
      categoryMap[normalizedCategory].count += 1;
    }
  });

  // অবজেক্ট থেকে পিওর অ্যারে তৈরি
  const dynamicCategories = Object.values(categoryMap);

  return (
    <div className="w-full min-h-screen bg-slate-50/50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* 📌 হেডার টাইটেল */}
        <div className="mb-10 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2.5 text-[#22577A] mb-2">
            <FiGrid className="text-2xl text-[#38A3A5]" />
            <h1 className="text-3xl font-black tracking-tight">Explore Categories</h1>
          </div>
          <p className="text-xs text-slate-400">
            Discover {dynamicCategories.length} live categories with pre-owned premium deals collected globally.
          </p>
        </div>

        {/* ⚡ ক্লায়েন্ট কম্পোনেন্টে ডাটা পুশ করা হচ্ছে ইন্টারঅ্যাকশনের জন্য */}
        <CategoryClientPage
          categories={dynamicCategories} 
          allProducts={products} 
        />

      </div>
    </div>
  );
};

export default CategoriesPage;