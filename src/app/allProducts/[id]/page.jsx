// import React from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { 
//   FiPackage, 
//   FiHeart, 
//   FiShoppingCart, 
//   FiChevronLeft, 
//   FiMapPin,
//   FiUser,
//   FiArrowUpRight
// } from "react-icons/fi";
// import { getProduct } from "@/lib/api/products"; 

// const ProductDetailsPage = async ({ params }) => {
//   const { id } = await params;
  
//   const allProducts = (await getProduct()) || [];
//   const product = allProducts.find((p) => p._id === id || p._id?.$oid === id);

//   if (!product) {
//     return (
//       <div className="w-full min-h-screen bg-slate-50 flex flex-col items-center justify-center text-slate-500">
//         <p className="text-sm font-semibold mb-3">Product details could not be found.</p>
//         <Link href="/allProducts" className="px-4 py-2 bg-[#22577A] text-white rounded-xl text-xs font-bold">
//           Back to Listings
//         </Link>
//       </div>
//     );
//   }

//   const productImage = product.ImageUrl || product.imageUrl || product.image || "/placeholder.jpg";

//   return (
//     <div className="w-10/12 mx-auto min-h-screen bg-white pb-16 text-[#22577A] font-sans">
//       <div className="w-full max-w-6xl mx-auto px-6 pt-6">
        
//         {/* BACK BUTTON */}
//         <Link 
//           href="/allProducts" 
//           className="inline-flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-[#216869] transition-colors mb-5 group"
//         >
//           <FiChevronLeft className="group-hover:-translate-x-0.5 transition-transform size-3.5" />
//           Back to listings
//         </Link>

//         {/* 🎯 ১. TOP SECTION: স্লিম ও পারফেক্ট সাইজের ইমেজ (Next.js Image) */}
//         <div className="bg-red-500 relative rounded-2xl overflow-hidden shadow-sm mb-10">
//           <Image
//             src={productImage}
//             alt={product.ProductTitle || "Product Image"}
            
//             priority
//             height={400}
//             width={300}
//             className=" mx-auto"
//             sizes=""
//           />
//           {/* ইমেজ ব্যাজেস */}      </div>

//       <div>
//         <div className="product bg-red-600">hhhhhh</div>
//         <div className="seller bg-green-500">lllllllll</div>

//       </div>
//       </div>


      
//     </div>
//   );
// };

// export default ProductDetailsPage;


import React from 'react';

const page = () => {
    return (
        <div>
            hh
<div className="bg-red-600 p-5">
  TEST DIV
</div>

<div className="p-10 border-4 border-blue-500">
  Test
</div>

<div className="bg-[#ff0000] text-white p-5">
  TEST
</div>
            
        </div>
    );
};

export default page;