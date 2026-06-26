"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@heroui/react";
import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import { FiFolder, FiBox, FiCheckCircle } from "react-icons/fi";

const CategoryClientPage = ({ categories, allProducts }) => {
  // ডিফল্টভাবে কোনো ক্যাটাগরি সিলেক্ট থাকবে না (অথবা চাইলে প্রথমটা দিতে পারিস)
  const [activeCategory, setActiveCategory] = useState(null);

  // সিলেক্টেড ক্যাটাগরি অনুযায়ী প্রোডাক্ট ফিল্টার করার লজিক
  const filteredProducts = activeCategory
    ? allProducts.filter(
        (p) => (p.Category || "").toLowerCase().trim() === activeCategory
      )
    : [];

  return (
    <div className="space-y-12">
      
      {/* 📊 ১. ডাইনামিক ক্যাটাগরি গ্রিড সেকশন */}
      {categories.length === 0 ? (
        <div className="text-center py-12 text-slate-400 font-medium">
          No categories or products found in the database.
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((cat, idx) => {
            const isSelected = activeCategory === cat.slug;
            
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveCategory(isSelected ? null : cat.slug)}
                className="cursor-pointer"
              >
                <Card 
                  className={`relative w-full h-40 rounded-2xl overflow-hidden border transition-all duration-300 ${
                    isSelected 
                      ? "border-[#38A3A5] ring-2 ring-[#38A3A5]/30 shadow-xl" 
                      : "border-slate-100 shadow-md hover:shadow-xl"
                  }`}
                >
                  {/* ব্যাকগ্রাউন্ড ব্লার বা ডার্ক ওভারলে কভার ইমেজ */}
                  <div className="absolute inset-0 z-0 bg-slate-900/60">
                    <Image
                      src={cat.bgImage}
                      alt={cat.name}
                      fill
                      className="object-cover opacity-30 mix-blend-overlay transition-transform duration-500 hover:scale-110"
                    />
                  </div>

                  {/* কার্ডের ভেতরের কনটেন্ট */}
                  <div className="absolute inset-0 p-5 flex flex-col justify-between z-10 text-white">
                    <div className="flex justify-between items-start">
                      <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-md text-xl">
                        <FiFolder className={isSelected ? "text-[#80ED99]" : "text-white"} />
                      </div>
                      
                      {/* সিলেক্টেড ইন্ডিকেটর */}
                      {isSelected && (
                        <motion.div 
                          initial={{ scale: 0 }} 
                          animate={{ scale: 1 }}
                          className="text-[#80ED99] text-lg bg-white rounded-full p-0.5"
                        >
                          <FiCheckCircle className="fill-white stroke-[#38A3A5]" />
                        </motion.div>
                      )}
                    </div>

                    <div>
                      <h3 className="font-black text-sm md:text-base tracking-wide line-clamp-1">
                        {cat.name}
                      </h3>
                      <p className="text-[11px] font-bold text-slate-200/90 flex items-center gap-1 mt-0.5">
                        <FiBox /> {cat.count} {cat.count > 1 ? "Products" : "Product"}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* 🛒 ২. ফিল্টারকৃত প্রোডাক্ট ডিসপ্লে সেকশন */}
      <div className="pt-6 border-t border-slate-200/60">
        <AnimatePresence mode="wait">
          {activeCategory ? (
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between px-4 mb-4">
                <h2 className="text-lg font-black text-[#22577A]">
                  Showing products for:{" "}
                  <span className="text-[#38A3A5] capitalize">
                    {activeCategory}
                  </span>
                </h2>
                <span className="text-xs font-bold bg-[#38A3A5]/10 text-[#38A3A5] px-3 py-1 rounded-full">
                  {filteredProducts.length} Items Found
                </span>
              </div>

              {/* তোর নিজস্ব কাস্টম প্রোডাক্ট কার্ড কম্পোনেন্ট ব্যবহার করা হয়েছে */}
              <ProductCard products={filteredProducts} />
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16 bg-white border border-dashed border-slate-200 rounded-3xl"
            >
              <p className="text-sm font-bold text-slate-400">
                Click on any category card above to view its available products.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
};

export default CategoryClientPage;