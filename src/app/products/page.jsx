// import ProductCard from '@/components/ProductCard';
// import { getProduct } from '@/lib/api/products';
// import React from 'react';

// const page = async () => {

//  const products = await getProduct();   


//     return (
//         <div>
//             <h2>{products.length}</h2>
//             <ProductCard product={products}></ProductCard>
//         </div>
//     );
// };

// // export default page;
// import ProductCard from "@/components/ProductCard";
// import { getProduct } from "@/lib/api/products";
// import React from "react";

// const AllProductpage = async () => {
//   const products = (await getProduct()) || [];

//   return (
//     <div>
//       {/* <h2>{products.length}</h2> */}
//       <ProductCard products={products} />
//     </div>
//   );
// };

// export default AllProductpage;
import ProductCard from "@/components/ProductCard";
import ProductFilterBar from "@/components/ProductFilterBar"; // আপনার ফিল্টার বার
import { getProduct } from "@/lib/api/products";
import React from "react";

// Next.js সার্ভার কম্পোনেন্টে searchParams প্রপস হিসেবে সরাসরি পাওয়া যায়
const AllProductpage = async ({ searchParams }) => {
  // ১. ডেটাবেজ বা এপিআই থেকে সব প্রোডাক্ট নিয়ে আসা হচ্ছে
  const allProducts = (await getProduct()) || [];

  // ২. URL এর query parameter থেকে ফিল্টারের ভ্যালুগুলো ধরা হচ্ছে
  const query = await searchParams; // Next.js 15+ এ searchParams কে await করতে হয়
  const search = query?.search || "";
  const category = query?.category || "";
  const condition = query?.condition || "";

  // 🎯 ৩. সার্ভার সাইডেই ফিল্টারিং লজিক অ্যাপ্লাই করা হচ্ছে
  const filteredProducts = allProducts.filter((product) => {
    const matchesSearch = search ? product.ProductTitle?.toLowerCase().includes(search.toLowerCase()) : true;
    const matchesCategory = category ? product.Category === category : true;
    const matchesCondition = condition ? product.Condition === condition : true;

    return matchesSearch && matchesCategory && matchesCondition;
  });

  return (
    <div className="w-full min-h-screen bg-slate-50/50 pb-12">
      {/* ফিল্টার বার কম্পোনেন্ট */}
      <ProductFilterBar />

      {/* ফিল্টার হওয়া ডাটা প্রোডাক্ট কার্ডে পাস করা হলো */}
      <ProductCard products={filteredProducts} />
    </div>
  );
};

export default AllProductpage;