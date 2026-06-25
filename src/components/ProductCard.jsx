
// // "use client";

// // import React from "react";
// // import { Card, Link } from "@heroui/react";
// // import Image from "next/image";
// // import { FiPackage } from "react-icons/fi";

// // const ProductCard = ({ products }) => {
// //   // console.log(products.ProductTitel)
// //   if (!products || products.length === 0) {
// //     return (
// //       <div className="w-full text-center py-12 text-slate-400 font-medium">
// //         No products listed at the moment.
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="w-full max-w-7xl mx-auto px-4 py-8">
// //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
// //         {products.map((product) => (
// //           <Card
// //             key={product._id}
// //             className="w-full h-[540px] bg-white border border-gray-100 shadow-xl rounded-2xl overflow-hidden flex flex-col justify-between hover:shadow-2xl transition-all duration-300 group"
// //           >
// //             {/* IMAGE AREA */}
// //             <div className="relative w-full h-56 bg-slate-100 overflow-hidden shrink-0">
// //               <Image
// //                 src={product.ImageUrl || "/placeholder.jpg"}
// //                 alt={product.ProductTitle}
// //                 fill
// //                 className="object-cover group-hover:scale-105 transition-transform duration-500"
// //                 sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
// //               />
// //               <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
// //                 <span className="px-2.5 py-1 bg-white/90 text-[#216869] font-black text-[10px] uppercase rounded-md shadow-sm">
// //                   {product.Category}
// //                 </span>
// //                 <span className="px-2.5 py-1 bg-[#38A3A5] text-white font-black text-[10px] uppercase rounded-md shadow-sm">
// //                   {product.Condition?.replace("-", " ")}
// //                 </span>
// //               </div>
// //             </div>

// //             {/* CONTENT AREA */}
// //             <Card.Header className="p-5 flex-1 flex flex-col items-start justify-start gap-2 overflow-hidden">
// //               <div className="flex items-center justify-between w-full mb-1">
// //                 <div className="flex items-center gap-2">
// //                   <div className="relative size-5 rounded-full overflow-hidden border border-[#38A3A5]/30">
// //                     <Image
// //                       src={product.sellerProfilePicture || "/placeholder.jpg"}
// //                       alt={product.sellerName || "Seller"}
// //                       fill
// //                       className="object-cover"
// //                     />
// //                   </div>
// //                   <span className="text-[11px] font-bold text-slate-400">
// //                     By {product.sellerName}
// //                   </span>
// //                 </div>
// //               </div>

// //               <Card.Title className="text-lg font-black text-[#22577A] line-clamp-1 w-full group-hover:text-[#216869] transition-colors">
// //                 {product.ProductTitle}
// //               </Card.Title>

// //               <div className="flex items-center justify-between w-full py-1">
// //                 <p className="text-2xl font-black text-[#216869]">
// //                   ৳ {Number(product.Price).toLocaleString()}
// //                 </p>
// //                 <div className="flex items-center gap-1 text-[11px] font-bold text-slate-500 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">
// //                   <FiPackage className="text-[#38A3A5]" />
// //                   <span>{product.Stock} Available</span>
// //                 </div>
// //               </div>

// //               <Card.Description className="text-xs text-slate-500 line-clamp-3 w-full pt-1 border-t border-slate-50 leading-relaxed">
// //                 {product.ProductDescription}
// //               </Card.Description>
// //             </Card.Header>

// //             {/* FOOTER AREA */}
// //             <Card.Footer className="p-5 pt-0 shrink-0">
// //               <Link
// //                 href={`/allProducts/${product._id}`}
// //                 className="w-full h-11 bg-[#22577A] text-white font-bold text-xs rounded flex items-center justify-center gap-2 hover:bg-[#216869] transition-all duration-300 shadow-md group/btn"
// //               >
// //                 View Product Details
// //                 <Link.Icon className="text-white group-hover/btn:translate-x-1 transition-transform duration-200" />
// //               </Link>
// //             </Card.Footer>
// //           </Card>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default ProductCard;


// "use client";

// import React, { useState, useEffect } from "react";
// import { Card } from "@heroui/react";
// import Image from "next/image";
// import Link from "next/link"; // Next.js standard Link ব্যবহার করা হয়েছে ভালো রাউটিংয়ের জন্য
// import { FiPackage, FiArrowRight } from "react-icons/fi";
// import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io"; // 🎯 হার্ট আইকন
// import { useSession } from "@/lib/auth-client";

// const ProductCard = ({ products }) => {
//   const { data: session } = useSession();
//   const user = session?.user;

//   // ইউজারের উইশলিস্টে থাকা সব প্রোডাক্ট আইডির লিস্ট রাখার স্টেট
//   const [wishlistedIds, setWishlistedIds] = useState([]);
//   const [wishlistLoading, setWishlistLoading] = useState(false);

//   // পেজ লোড হলে ইউজারের উইশলিস্টের প্রোডাক্ট আইডিগুলো নিয়ে আসবে
//   useEffect(() => {
//     if (user?.id) {
//       fetch(`http://localhost:5000/api/wishlist/check?userId=${user.id}`)
//         .then((res) => res.json())
//         .then((data) => {
//           if (Array.isArray(data)) {
//             setWishlistedIds(data);
//           }
//         })
//         .catch((err) => console.error("Error fetching wishlist bundle:", err));
//     }
//   }, [user?.id]);

//   // উইশলিস্ট টগল করার ফাংশন
//   const handleWishlistToggle = async (e, productId) => {
//     e.preventDefault(); // যেন কার্ডের নিচের লিংকে ক্লিক না লেগে যায়
//     if (!user?.id || wishlistLoading) return;

//     setWishlistLoading(true);
//     try {
//       const res = await fetch("http://localhost:5000/api/wishlist/toggle", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           userId: user.id,
//           productId: productId,
//         }),
//       });
//       const data = await res.json();

//       // স্টেট আপডেট: যদি অ্যাড হয় তবে এরিট করো, রিমুভ হলে ফিল্টার করো
//       if (data.isWishlisted) {
//         setWishlistedIds((prev) => [...prev, productId]);
//       } else {
//         setWishlistedIds((prev) => prev.filter((id) => id !== productId));
//       }
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setWishlistLoading(false);
//     }
//   };

//   if (!products || products.length === 0) {
//     return (
//       <div className="w-full text-center py-12 text-slate-400 font-medium">
//         No products listed at the moment.
//       </div>
//     );
//   }

//   return (
//     <div className="w-full max-w-7xl mx-auto px-4 py-8">
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//         {products.map((product) => {
//           const isWishlisted = wishlistedIds.includes(product._id);

//           return (
//             <Card
//               key={product._id}
//               className="w-full h-[510px] bg-white border border-gray-100 shadow-xl rounded-2xl overflow-hidden flex flex-col justify-between hover:shadow-2xl transition-all duration-300 group"
//             >
//               {/* IMAGE AREA */}
//               <div className="relative w-full h-56 bg-slate-100 overflow-hidden shrink-0">
//                 <Image
//                   src={product.ImageUrl || "/placeholder.jpg"}
//                   alt={product.ProductTitle || "Product"}
//                   fill
//                   className="object-cover group-hover:scale-105 transition-transform duration-500"
//                   sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//                 />
                
//                 {/* ক্যাটাগরি ও কন্ডিশন ব্যাজ */}
//                 <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
//                   <span className="px-2.5 py-1 bg-white/90 text-[#216869] font-black text-[10px] uppercase rounded-md shadow-sm">
//                     {product.Category}
//                   </span>
//                   <span className="px-2.5 py-1 bg-[#38A3A5] text-white font-black text-[10px] uppercase rounded-md shadow-sm">
//                     {product.Condition?.replace("-", " ")}
//                   </span>
//                 </div>

//                 {/* 🎯 উইশলিস্ট (হার্ট) বাটন - শুধুমাত্র Buyer এর জন্য দৃশ্যমান */}
//                 {user && user.role === "buyer" && (
//                   <button
//                     onClick={(e) => handleWishlistToggle(e, product._id)}
//                     className="absolute top-3 right-3 z-20 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-all group/heart"
//                     title="Toggle Wishlist"
//                   >
//                     {isWishlisted ? (
//                       <IoIosHeart className="text-red-500 size-4 scale-110" />
//                     ) : (
//                       <IoIosHeartEmpty className="text-red-500 size-4 group-hover/heart:scale-110 transition-transform" />
//                     )}
//                   </button>
//                 )}
//               </div>

//               {/* CONTENT AREA (🎯 টাইটেল ফিক্সড করা হয়েছে স্ট্যান্ডার্ড HTML ট্যাগ দিয়ে) */}
//               <div className="p-5 flex-1 flex flex-col items-start justify-start gap-2 overflow-hidden">
//                 {/* সেলার ইনফো */}
//                 <div className="flex items-center gap-2 mb-1">
//                   <div className="relative size-5 rounded-full overflow-hidden border border-[#38A3A5]/30">
//                     <Image
//                       src={product.sellerProfilePicture || "/placeholder.jpg"}
//                       alt={product.sellerName || "Seller"}
//                       fill
//                       className="object-cover"
//                     />
//                   </div>
//                   <span className="text-[11px] font-bold text-slate-400">
//                     By {product.sellerName || "Authorized Seller"}
//                   </span>
//                 </div>

//                 {/* 🎯 প্রোডাক্ট টাইটেল (ফিক্সড) */}
//                 <h2 className=" font-black text-[#22577A] w-full group-hover:text-[#216869] transition-colors">
//                   {product.ProductTitle}
//                   hhh
//                 </h2>
                            


//                 {/* দাম এবং স্টক কাউন্ট */}
//                 <div className="flex items-center justify-between w-full py-1">
//                   <p className="text-lg font-black text-[#216869]">
//                     ৳ {Number(product.Price).toLocaleString()}
//                   </p>
//                   <div className="flex items-center gap-1 text-[11px] font-bold text-slate-500 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">
//                     <FiPackage className="text-[#38A3A5]" />
//                     <span>{product.Stock} Available</span>
//                   </div>
//                 </div>

//                 {/* প্রোডাক্ট ডেসক্রিপশন */}
//                 <p className="text-xs text-slate-500 line-clamp-3 w-full pt-2 border-t border-slate-100/60 leading-relaxed">
//                   {product.ProductDescription || "No description available for this item."}
//                 </p>
//               </div>

//               {/* FOOTER AREA */}
//               <div className="p-5 pt-0 shrink-0">
//                 <Link
//                   href={`/allProducts/${product._id}`}
//                   className="w-full h-11 bg-[#22577A] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 hover:bg-[#216869] transition-all duration-300 shadow-md group/btn"
//                 >
//                   View Product Details
//                   <FiArrowRight className="text-white group-hover/btn:translate-x-1 transition-transform duration-200 size-3.5" />
//                 </Link>
//               </div>
//             </Card>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default ProductCard;



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