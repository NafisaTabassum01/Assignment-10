

"use client";

import { useState } from "react";
import { useSession } from "@/lib/auth-client";


const BuyProductForm = ({ product }) => {
    const { data: session } = useSession();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

//   const handleBuy = async () => {
// const paymentData = {
//   productId: product._id,
//   productTitle: product.ProductTitle,
//   amount: Number(product.Price),

//   buyerName: formData.name,
//   buyerPhone: formData.phone,
//   buyerAddress: formData.address,
// };


// const res = await fetch("/api/productPayment", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify(paymentData)
//     });

//     const data = await res.json();

//     if (data.url) {
//       window.location.href = data.url;
//     }
//   };


const handleBuy = async () => {
  const paymentData = {
    productId: product._id,
    userId: session?.user?.id,

    productTitle: product.ProductTitle,
    amount: Number(product.Price),

    buyerName: formData.name,
    buyerPhone: formData.phone,
    buyerAddress: formData.address,
  };

  const res = await fetch("/api/productPayment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(paymentData),
  });

  const data = await res.json();

  if (data.url) {
      window.location.href = data.url;
  }
};

  return (
    <div className="max-w-md mx-auto mt-10 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden my-8">
      {/* Header / Product Info Summary */}
      <div className="bg-linear-to-br from-[#0284c7] to-[#22577A] text-white p-6 text-center">
        <h2 className="text-xl font-bold tracking-wide">Checkout Details</h2>
        <p className="text-sm opacity-90 mt-1">Complete your purchase for</p>
        <div className="mt-2 inline-block bg-white/20 px-4 py-1.5 rounded-full text-sm font-semibold backdrop-blur-sm">
          {product?.ProductTitle || "Product"} — {product?.Price ? `${product.Price} TK` : ""}
        </div>
      </div>

      {/* Form Fields */}
      <div className="p-6 space-y-5">
        {/* Name Input */}
        <div className="form-control w-full">
          <label className="label pt-0">
            <span className="label-text font-medium text-gray-700 dark:text-gray-300">Full Name</span>
          </label>
          <input
            type="text"
            name="name"
            placeholder="Enter your full name"
            onChange={handleChange}
            className="input input-bordered w-full focus:border-[#22577A] focus:ring-2 focus:ring-[#22577A]/20 transition-all duration-200"
            required
          />
        </div>

        {/* Phone Input */}
        <div className="form-control w-full">
          <label className="label pt-0">
            <span className="label-text font-medium text-gray-700 dark:text-gray-300">Phone Number</span>
          </label>
          <input
            type="tel"
            name="phone"
            placeholder="e.g., 017XXXXXXXX"
            onChange={handleChange}
            className="input input-bordered w-full focus:border-[#22577A] focus:ring-2 focus:ring-[#22577A]/20 transition-all duration-200"
            required
          />
        </div>

        {/* Address Input */}
        <div className="form-control w-full">
          <label className="label pt-0">
            <span className="label-text font-medium text-gray-700 dark:text-gray-300">Delivery Address</span>
          </label>
          <textarea
            name="address"
            placeholder="Write your full delivery address"
            onChange={handleChange}
            className="textarea textarea-bordered w-full h-24 focus:border-[#22577A] focus:ring-2 focus:ring-[#22577A]/20 transition-all duration-200 resize-none"
            required
          />
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <button
            onClick={handleBuy}
            className="btn w-full bg-[#22577A] cursor-pointer py-2 rounded hover:bg-[#1b4561] text-white border-none shadow-md hover:shadow-lg transition-all duration-300 transform active:scale-[0.98]"
          >
            Confirm Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyProductForm;