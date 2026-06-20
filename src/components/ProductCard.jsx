
"use client";

import React from "react";
import { Card, Link } from "@heroui/react";
import Image from "next/image";
import { FiPackage } from "react-icons/fi";

const ProductCard = ({ products }) => {
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
        {products.map((product) => (
          <Card
            key={product._id}
            className="w-full h-[540px] bg-white border border-gray-100 shadow-xl rounded-2xl overflow-hidden flex flex-col justify-between hover:shadow-2xl transition-all duration-300 group"
          >
            {/* IMAGE AREA */}
            <div className="relative w-full h-56 bg-slate-100 overflow-hidden shrink-0">
              <Image
                src={product.ImageUrl || "/placeholder.jpg"}
                alt={product.ProductTitle}
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
            </div>

            {/* CONTENT AREA */}
            <Card.Header className="p-5 flex-1 flex flex-col items-start justify-start gap-2 overflow-hidden">
              <div className="flex items-center justify-between w-full mb-1">
                <div className="flex items-center gap-2">
                  <div className="relative size-5 rounded-full overflow-hidden border border-[#38A3A5]/30">
                    <Image
                      src={product.sellerProfilePicture || "/placeholder.jpg"}
                      alt={product.sellerName || "Seller"}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span className="text-[11px] font-bold text-slate-400">
                    By {product.sellerName}
                  </span>
                </div>
              </div>

              <Card.Title className="text-lg font-black text-[#22577A] line-clamp-1 w-full group-hover:text-[#216869] transition-colors">
                {product.ProductTitle}
              </Card.Title>

              <div className="flex items-center justify-between w-full py-1">
                <p className="text-2xl font-black text-[#216869]">
                  ৳ {Number(product.Price).toLocaleString()}
                </p>
                <div className="flex items-center gap-1 text-[11px] font-bold text-slate-500 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">
                  <FiPackage className="text-[#38A3A5]" />
                  <span>{product.Stock} Available</span>
                </div>
              </div>

              <Card.Description className="text-xs text-slate-500 line-clamp-3 w-full pt-1 border-t border-slate-50 leading-relaxed">
                {product.ProductDescription}
              </Card.Description>
            </Card.Header>

            {/* FOOTER AREA */}
            <Card.Footer className="p-5 pt-0 shrink-0">
              <Link
                href={`/allProducts/${product._id}`}
                className="w-full h-11 bg-[#22577A] text-white font-bold text-xs rounded flex items-center justify-center gap-2 hover:bg-[#216869] transition-all duration-300 shadow-md group/btn"
              >
                View Product Details
                <Link.Icon className="text-white group-hover/btn:translate-x-1 transition-transform duration-200" />
              </Link>
            </Card.Footer>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProductCard;