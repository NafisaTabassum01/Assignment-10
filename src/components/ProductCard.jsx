
"use client";

import React, { useState, useEffect } from "react";
import { Card } from "@heroui/react";
import Image from "next/image";
import Link from "next/link"; 
import { FiPackage, FiArrowRight } from "react-icons/fi";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io"; 
import { useSession } from "@/lib/auth-client";

const ProductCard = ({ products }) => {
  const { data: session } = useSession();
  const user = session?.user;

  const [wishlistedIds, setWishlistedIds] = useState([]);
  const [wishlistLoading, setWishlistLoading] = useState(false);

  useEffect(() => {
    if (user?.id) {
      fetch(`http://localhost:5000/api/wishlist/check?userId=${user.id}`)
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setWishlistedIds(data);
          }
        })
        .catch((err) => console.error("Error fetching wishlist bundle:", err));
    }
  }, [user?.id]);

  const handleWishlistToggle = async (e, productId) => {
    e.preventDefault(); 
    if (!user?.id || wishlistLoading) return;

    setWishlistLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/wishlist/toggle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, productId: productId }),
      });
      const data = await res.json();

      if (data.isWishlisted) {
        setWishlistedIds((prev) => [...prev, productId]);
      } else {
        setWishlistedIds((prev) => prev.filter((id) => id !== productId));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setWishlistLoading(false);
    }
  };

  if (!products || products.length === 0) {
    return (
      <div className="w-full text-center py-12 text-slate-400 font-medium">
        No products listed at the moment.
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => {
          const isWishlisted = wishlistedIds.includes(product._id);

          return (
            <Card
              key={product._id}
              /* 🎯 উচ্চতা বাড়ানো হয়েছে এবং flex-col স্ট্রিক্ট করা হয়েছে */
              className="w-full h-[540px] bg-white border border-gray-100 shadow-lg rounded-2xl overflow-hidden flex flex-col justify-between hover:shadow-2xl transition-all duration-300 group"
            >
              {/* IMAGE AREA */}
              <div className="relative w-full h-52 bg-slate-50 overflow-hidden shrink-0">
                <Image
                  src={product.ImageUrl || "/placeholder.jpg"}
                  alt={product.ProductTitle || "Product"}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
                  <span className="px-2.5 py-1 bg-white/90 text-[#216869] font-black text-[10px] uppercase rounded-md shadow-sm">
                    {product.Category}
                  </span>
                  <span className="px-2.5 py-1 bg-[#38A3A5] text-white font-black text-[10px] uppercase rounded-md shadow-sm">
                    {product.Condition?.replace("-", " ")}
                  </span>
                </div>

                {user && user.role === "buyer" && (
                  <button
                    onClick={(e) => handleWishlistToggle(e, product._id)}
                    className="absolute top-3 right-3 z-20 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-all"
                  >
                    {isWishlisted ? (
                      <IoIosHeart className="text-red-500 size-4 scale-110" />
                    ) : (
                      <IoIosHeartEmpty className="text-red-500 size-4" />
                    )}
                  </button>
                )}
              </div>

              {/* CONTENT AREA */}
              {/* 🎯 flex-1 দিয়ে বাকি স্পেসকে সমান ভাগে ভাগ করা হয়েছে */}
              <div className="p-5 flex-1 flex flex-col justify-between min-w-0 overflow-hidden">
                
                {/* Top Section: Seller and Title */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="relative size-5 rounded-full overflow-hidden border border-[#38A3A5]/30">
                      <Image
                        src={product.sellerProfilePicture || "/placeholder.jpg"}
                        alt={product.sellerName || "Seller"}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="text-[11px] font-bold text-slate-400 truncate max-w-[180px]">
                      By {product.sellerName || "Authorized Seller"}
                    </span>
                  </div>

                  {/* 🎯 টাইটেল ফিক্সড ১ লাইনে আসবে */}
                  <h2 className="text-base font-black text-[#22577A] truncate w-full group-hover:text-[#216869] transition-colors">
                    {product.ProductTitle}
                  </h2>
                </div>

                {/* Middle Section: Description */}
                {/* 🎯 line-clamp-2 করে জায়গা বাঁচানো হয়েছে যেন প্রাইস নিচে না নামে */}
                <p className="text-xs text-slate-500 line-clamp-2 w-full my-2 text-justify leading-relaxed">
                  {product.ProductDescription || "No description available for this item."}
                </p>

                {/* Bottom Section: Price & Stock */}
                {/* 🎯 এটি এখন সবসময় নির্দিষ্ট জায়গায় লক থাকবে */}
                <div className="flex items-center justify-between w-full pt-2 border-t border-slate-100/80 bg-white">
                  <p className="text-lg font-black text-[#216869] whitespace-nowrap">
                    ৳ {Number(product.Price).toLocaleString()}
                  </p>
                  <div className="flex items-center gap-1 text-[10px] font-bold text-slate-500 bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
                    <FiPackage className="text-[#38A3A5]" />
                    <span className="whitespace-nowrap">{product.Stock} Available</span>
                  </div>
                </div>

              </div>

              {/* FOOTER AREA */}
              <div className="p-5 pt-0 shrink-0">
                <Link
                  href={`/allProducts/${product._id}`}
                  className="w-full h-11 bg-[#22577A] text-white font-bold text-xs rounded flex items-center justify-center gap-2 hover:bg-[#216869] transition-all duration-300 shadow-md group/btn"
                >
                  View Product Details
                  <FiArrowRight className="text-white group-hover/btn:translate-x-1 transition-transform duration-200 size-3.5" />
                </Link>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export   default ProductCard;