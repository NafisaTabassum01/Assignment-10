
export const dynamic = "force-dynamic";

import ProductCard from "@/components/ProductCard";
import ProductFilterBar from "@/components/ProductFilterBar";
import { getProduct } from "@/lib/api/products";
import React from "react";

const AllProductpage = async ({ searchParams }) => {
const result = await getProduct();

console.log(result);

const products = result.data || [];

console.log(products);
console.log(Array.isArray(products));
  

  // Next.js 15 searchParams await
  const resolvedSearchParams = await searchParams;

  const searchTerm = (resolvedSearchParams?.search || "").toLowerCase().trim();
  const categoryTerm = (resolvedSearchParams?.category || "").toLowerCase().trim();
  const conditionTerm = (resolvedSearchParams?.condition || "").toLowerCase().trim();
  const sortTerm = resolvedSearchParams?.sort || ""; 

  let filteredProducts = products.filter((product) => {
    const title = (product.ProductTitle || "").toLowerCase();
    const desc = (product.ProductDescription || "").toLowerCase();
    const category = (product.Category || "").toLowerCase().trim();
    const condition = (product.Condition || "").toLowerCase().trim();

    const matchSearch =
      !searchTerm ||
      title.includes(searchTerm) ||
      desc.includes(searchTerm);

    const matchCategory =
      !categoryTerm || category === categoryTerm;

    const matchCondition =
      !conditionTerm || condition === conditionTerm;

    return matchSearch && matchCategory && matchCondition;
  });

  if (sortTerm === "low-to-high") {
    filteredProducts.sort((a, b) => Number(a.Price) - Number(b.Price));
  } else if (sortTerm === "high-to-low") {
    filteredProducts.sort((a, b) => Number(b.Price) - Number(a.Price));
  }

  return (
    <div className="w-full min-h-screen bg-slate-50/50 pb-12">
      <ProductFilterBar />
      <ProductCard products={filteredProducts} />
    </div>
  );
};

export default AllProductpage;