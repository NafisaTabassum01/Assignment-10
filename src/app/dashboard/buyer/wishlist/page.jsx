"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import Link from "next/link";
import { FiHeart, FiArrowRight, FiShoppingBag } from "react-icons/fi";
import Image from "next/image";

const BuyerWishlistPage = () => {
  const { data: session } = useSession();
  const user = session?.user;
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Wishlist fetch korar function
  const fetchWishlist = () => {
    if (user?.id) {
      fetch(`http://localhost:5000/api/wishlist/${user.id}`)
        .then((res) => res.json())
        .then((data) => {
          setWishlistItems(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Wishlist fetch error:", err);
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [user?.id]);

  // Wishlist page theke remove korar function
  const handleRemove = async (productId) => {
    try {
      await fetch("http://localhost:5000/api/wishlist/toggle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, productId }),
      });
      // List refresh hobe
      fetchWishlist();
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-sm font-semibold text-slate-400">Loading your wishlist...</div>;
  }

  return (
    <div className="w-full min-h-screen bg-slate-50/50 p-4 md:p-8 text-[#22577A]">
      <div className="max-w-5xl mx-auto">
        
        {/* PAGE HEADER */}
        <div className="flex items-center gap-2 mb-6 border-b pb-4">
          <FiHeart className="text-red-500 size-6 fill-red-500" />
          <h1 className="text-xl font-black">My Saved Wishlist</h1>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="bg-white border rounded-2xl p-12 text-center shadow-sm flex flex-col items-center justify-center gap-3">
            <FiShoppingBag className="size-10 text-slate-300" />
            <p className="text-sm font-medium text-slate-400">Your wishlist is currently empty!</p>
            <Link href="/allProducts" className="mt-2 px-4 py-2 bg-[#22577A] text-white rounded text-xs font-bold hover:bg-[#216869] transition-all">
              Discover Products
            </Link>
          </div>
        ) : (
          /* WISHLIST ITEMS GRID */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {wishlistItems.map((item) => (
              <div key={item._id} className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex flex-col justify-between relative group hover:shadow-md transition-all">
                
                <div>
                  {/* PRODUCT IMAGE & REMOVE BUTTON */}
                  <div className="w-full h-40 relative bg-slate-50 rounded-xl overflow-hidden mb-3">
                    <Image
                      width={600}
                      height={600}
                      src={item.ImageUrl || "/placeholder.jpg"}
                      alt={item.ProductTitle}
                      className="w-full h-full object-contain p-2"
                    />
                    <button
                      onClick={() => handleRemove(item.productId)}
                      className="absolute top-2 right-2 p-1.5 bg-white shadow-sm border rounded-full text-red-500 hover:bg-red-50 transition-all"
                      title="Remove from wishlist"
                    >
                      <FiHeart className="size-3.5 fill-red-500" />
                    </button>
                  </div>

                  {/* METADATA */}
                  <span className="text-[10px] uppercase font-black tracking-wider text-slate-400">{item.Category}</span>
                  <h3 className="text-xs font-bold text-[#22577A] mt-0.5 line-clamp-2 h-8">
                    {item.ProductTitle}
                  </h3>
                </div>

                {/* PRICE & SEE DETAILS BUTTON SECTION */}
                <div className="mt-4 pt-3 border-t border-slate-50 flex items-center justify-between">
                  <div>
                    <span className="text-[9px] block text-slate-400 font-bold uppercase">Price</span>
                    <span className="text-sm font-black text-[#216869]">৳{Number(item.Price).toLocaleString()}</span>
                  </div>
                  
                  {/* 🎯 CLICK KORLE DYNAMIC [id] PAGE-E NIYE JABE */}
                  <Link
                    href={`/allProducts/${item.productId}`}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-white bg-[#22577A] px-3 py-2 rounded hover:bg-[#216869] transition-all shadow-sm"
                  >
                    See Details
                    <FiArrowRight className="size-3" />
                  </Link>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyerWishlistPage;