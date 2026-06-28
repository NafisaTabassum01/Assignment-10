export const dynamic = "force-dynamic";

import React from "react";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import ProductCard from "@/components/ProductCard";
import { getFeaturedProducts } from "@/lib/api/products";

const FeaturedProducts = async () => {
  // ব্যাকএন্ড থেকে লেটেস্ট ৬টি প্রোডাক্ট ডাটা নিয়ে আসা হচ্ছে
  const result = await getFeaturedProducts();
  const featuredProducts = result.data || [];

  return (
    <div className="w-full bg-white py-12">
      <div className="w-full max-w-7xl mx-auto px-6">
        
        {/* সেকশন হেডার এবং ভিউ অল লিংক */}
        <div className="flex items-end justify-between mb-4 border-b border-slate-100 pb-4">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-[#38A3A5]">
              Discover New
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-[#22577A] mt-1">
              Featured Products
            </h2>
          </div>
          
          {/* বর্ডার ছাড়া, থিম কালার এবং নিচে আন্ডারলাইনড লিংক */}
          <Link
            href="/allProducts"
            className="group inline-flex items-center gap-1 text-sm font-bold text-[#22577A] hover:text-[#216869] underline underline-offset-4 decoration-2 transition-colors"
          >
            View All Products
            <FiArrowUpRight className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform size-4" />
          </Link>
        </div>

        {/* প্রোডাক্ট কার্ড লিস্ট (এখানে আপনার পাঠানো ProductCard রিইউজ হচ্ছে) */}
        <div className="-mt-4">
          <ProductCard products={featuredProducts} />
        </div>

      </div>
    </div>
  );
};

export default FeaturedProducts;