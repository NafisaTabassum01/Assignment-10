
// "use client";

// import { useSession } from "@/lib/auth-client";
// import Link from "next/link";
// import React from "react";
// import { FiHeart, FiShoppingCart } from "react-icons/fi";

// const BuyProduct = ({ id ,price , stock}) => {
//   const { data: session, isPending } = useSession();
//   const user = session?.user;



//   if (isPending) {
//     return (
//       <div className="w-5/12 border-2 bg-gray-200 text-lg rounded text-gray-600 font-semibold p-3 text-center">
//         Loading...
//       </div>
//     );
//   }
//   const handleBuyingProduct = async ()=>{
//     const buyingData = {
//   productId: id,
//   userId: user._id || user.id,   // session theke
//   amount: price,           // UI ba DB theke
//   // orderId: `order_${Date.now()}`, // temporary order id
//   paymentStatus: "pending",       // start e pending
//   transactionId: null,           // payment complete hole ashbe

//     }

//     const res = await fetch("/api/productPayment", {
//         method:"POST" , 
//         headers :{
//             "Content-Type": "application/json"
//         },
//         body:JSON.stringify(buyingData)
//     })
//     const data =await res.json();
//     if(data?url){
//       window.location.href = data.url;
//     }
//   }

//   return (
//     <div>
//       {/* NOT LOGGED IN */}
//       {!user ? (
//         <div className="w-5/12 border-2 bg-[#22577A] text-lg rounded text-white font-semibold p-3 text-center cursor-pointer" >
//           <Link href={'/login'}>Login to buy a product.</Link>
//         </div>
//       ) : /* LOGGED IN + BUYER */ user.role === "buyer" ? (
//         <div className="flex items-center gap-3 w-full max-w-sm mt-2">
//           <Link
//             href={`${id}/buyProduct`}
//             className="flex-1 h-11 p-3 bg-[#22577A] text-white font-bold text-xs rounded flex items-center justify-center gap-1.5 hover:bg-[#216869] transition-all duration-200 shadow-sm"
//           >
//             <FiShoppingCart className="size-3.5" />
//             Buy Now
//           </Link>

//           <button
//             type="button"
//             className="h-11 px-5 border border-slate-200 bg-white rounded text-slate-400 hover:text-red-500 hover:border-red-200 transition-all flex items-center justify-center gap-1.5 font-bold text-xs group shrink-0"
//           >
//             <FiHeart className="size-3.5 group-hover:scale-105 transition-transform" />
//             <span>Wishlist</span>
//           </button>
//         </div>
//       ) : (
//         /* LOGGED IN BUT NOT BUYER */
//         <div className="w-5/12 border-2 bg-[#22577A] text-lg rounded text-white font-semibold p-3 text-center">
//           {user.role.toUpperCase()} cannot buy a product.
//         </div>
//       )}
//     </div>
//   );
// };

// export default BuyProduct;

"use client";

import { useSession } from "@/lib/auth-client";
import React from "react";
import { FiHeart, FiShoppingCart } from "react-icons/fi";
import Link from "next/link";

const BuyProduct = ({
  id,
  price,
  stock,
  productTitle,
}) => {
  const { data: session, isPending } = useSession();

  const user = session?.user;

  if (isPending) {
    return null;
  }

  const handleBuyingProduct = async () => {
    try {
      const paymentData = {
        productId: id,
        userId: user?.id,
        amount: Number(price),
        productTitle,
      };

      const res = await fetch("/api/productPayment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),
      });

      const data = await res.json();

      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {!user ? (
        <div className="w-5/12 border-2 bg-[#22577A] text-lg rounded text-white font-semibold p-3 text-center">
          <Link href="/login">
            Login to buy a product.
          </Link>
        </div>
      ) : user.role === "buyer" ? (
  <div className="flex items-center gap-3 w-full max-w-sm mt-2">
    <button
      onClick={handleBuyingProduct}
      disabled={Number(stock) <= 0}
      className={`flex-1 h-11 p-3 text-white font-bold text-xs rounded flex items-center justify-center gap-1.5 transition-all duration-200 shadow-sm
        ${
          Number(stock) <= 0
            ? "bg-red-500 cursor-not-allowed"
            : "bg-[#22577A] cursor-pointer hover:bg-[#216869]"
        }`}
    >
      <FiShoppingCart className="size-3.5" />

      {Number(stock) <= 0
        ? "Stock Out"
        : `Buy Now (${stock} left)`}
    </button>

    <button
      type="button"
      className="h-11 px-5 border border-slate-200 bg-white rounded text-slate-400 hover:text-red-500 hover:border-red-200 transition-all flex items-center justify-center gap-1.5 font-bold text-xs group shrink-0"
    >
      <FiHeart className="size-3.5 group-hover:scale-105 transition-transform" />
      <span>Wishlist</span>
    </button>
  </div>
)
       : (
        <div className="w-5/12 border-2 bg-[#22577A] text-lg rounded text-white font-semibold p-3 text-center">
          {user.role.toUpperCase()} cannot buy a product.
        </div>
      )}
    </div>
  );
};

export default BuyProduct;