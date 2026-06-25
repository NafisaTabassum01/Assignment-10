// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";

// const EditProductForm = ({ product }) => {
//   const router = useRouter();

//   const [formData, setFormData] = useState({
//     ProductTitle: product.ProductTitle,
//     ProductDescription: product.ProductDescription,
//     Category: product.Category,
//     Condition: product.Condition,
//     Price: product.Price,
//     Stock: product.Stock,
//     ImageUrl: product.ImageUrl,
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     await fetch(
//       `${env.process.NEXT_PUBLIC_BASE_URL}/api/products/${product._id}`,
//       {
//         method: "PATCH",
//         headers: {
//           "Content-Type":
//             "application/json",
//         },
//         body: JSON.stringify(formData),
//       }
//     );

//     router.push(
//       "/dashboard/seller/my-products"
//     );

//     router.refresh();
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//     >
//       <input
//         defaultValue={
//           product.ProductTitle
//         }
//       />

//       <button type="submit">
//         Update Product
//       </button>
//     </form>
//   );
// };

// export default EditProductForm;


"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  FiPackage, 
  FiChevronLeft, 
  FiEdit3, 
  FiTag, 
  FiLayers, 
  FiDollarSign, 
  FiInbox, 
  FiImage 
} from "react-icons/fi";

const EditProductForm = ({ product }) => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    ProductTitle: product.ProductTitle,
    ProductDescription: product.ProductDescription,
    Category: product.Category,
    Condition: product.Condition,
    Price: product.Price,
    Stock: product.Stock,
    ImageUrl: product.ImageUrl,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${product._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    router.push("/dashboard/seller/products");
    router.refresh();
  };

  return (
    <div className="w-full min-h-screen bg-slate-50/50 p-4 md:p-8 text-[#22577A] font-sans">
      <div className="max-w-3xl mx-auto">
        
        {/* BACK BUTTON */}
        <Link 
          href="/dashboard/seller/my-products" 
          className="inline-flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-[#216869] transition-colors mb-5 group"
        >
          <FiChevronLeft className="group-hover:-translate-x-0.5 transition-transform size-3.5" />
          Back to Inventory
        </Link>

        {/* HEADER */}
        <div className="flex items-center gap-3 mb-8 border-b border-slate-200/60 pb-5">
          <div className="p-2.5 bg-[#22577A]/10 rounded-xl border border-[#22577A]/20 flex items-center justify-center text-[#22577A]">
            <FiEdit3 className="size-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-[#22577A] tracking-tight">Edit Product Details</h1>
            <p className="text-xs text-slate-400 mt-0.5">Modify your existing inventory metadata information seamlessly</p>
          </div>
        </div>

        {/* FORM MODULE CONTAINER */}
        <form onSubmit={handleSubmit} className="bg-white border border-slate-100 rounded-2xl shadow-xl p-6 md:p-8 flex flex-col gap-6">
          
          {/* 1. Product Title Input */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-black uppercase text-slate-400 tracking-wider flex items-center gap-1">
              <FiTag className="text-[#38A3A5]" /> Product Title
            </label>
            <input
              type="text"
              name="ProductTitle"
              value={formData.ProductTitle}
              onChange={handleChange}
              placeholder="e.g., Premium Wireless Headphones"
              className="w-full h-11 px-4 text-xs font-semibold bg-slate-50 border border-slate-200/80 rounded-xl focus:outline-none focus:border-[#38A3A5] focus:bg-white transition-all"
              required
            />
          </div>

          {/* 2. Grid for Category & Condition */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-black uppercase text-slate-400 tracking-wider flex items-center gap-1">
                <FiLayers className="text-[#38A3A5]" /> Category
              </label>
              <input
                type="text"
                name="Category"
                value={formData.Category}
                onChange={handleChange}
                placeholder="e.g., Electronics"
                className="w-full h-11 px-4 text-xs font-semibold bg-slate-50 border border-slate-200/80 rounded-xl focus:outline-none focus:border-[#38A3A5] focus:bg-white transition-all"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-black uppercase text-slate-400 tracking-wider flex items-center gap-1">
                <FiLayers className="text-[#38A3A5]" /> Condition
              </label>
              <input
                type="text"
                name="Condition"
                value={formData.Condition}
                onChange={handleChange}
                placeholder="e.g., fresh, light-used"
                className="w-full h-11 px-4 text-xs font-semibold bg-slate-50 border border-slate-200/80 rounded-xl focus:outline-none focus:border-[#38A3A5] focus:bg-white transition-all"
                required
              />
            </div>
          </div>

          {/* 3. Grid for Price & Stock */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-black uppercase text-slate-400 tracking-wider flex items-center gap-1">
                <FiDollarSign className="text-[#38A3A5]" /> Price (BDT)
              </label>
              <input
                type="number"
                name="Price"
                value={formData.Price}
                onChange={handleChange}
                placeholder="0.00"
                className="w-full h-11 px-4 text-xs font-semibold bg-slate-50 border border-slate-200/80 rounded-xl focus:outline-none focus:border-[#38A3A5] focus:bg-white transition-all"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-black uppercase text-slate-400 tracking-wider flex items-center gap-1">
                <FiInbox className="text-[#38A3A5]" /> Stock Quantity
              </label>
              <input
                type="number"
                name="Stock"
                value={formData.Stock}
                onChange={handleChange}
                placeholder="0"
                className="w-full h-11 px-4 text-xs font-semibold bg-slate-50 border border-slate-200/80 rounded-xl focus:outline-none focus:border-[#38A3A5] focus:bg-white transition-all"
                required
              />
            </div>
          </div>

          {/* 4. Product Image URL Input */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-black uppercase text-slate-400 tracking-wider flex items-center gap-1">
              <FiImage className="text-[#38A3A5]" /> Image URL
            </label>
            <input
              type="text"
              name="ImageUrl"
              value={formData.ImageUrl}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className="w-full h-11 px-4 text-xs font-semibold bg-slate-50 border border-slate-200/80 rounded-xl focus:outline-none focus:border-[#38A3A5] focus:bg-white transition-all"
              required
            />
          </div>

          {/* 5. Product Description Input */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-black uppercase text-slate-400 tracking-wider flex items-center gap-1">
              <FiPackage className="text-[#38A3A5]" /> Product Description
            </label>
            <textarea
              name="ProductDescription"
              value={formData.ProductDescription}
              onChange={handleChange}
              rows={5}
              placeholder="Write detailed specifications about the item..."
              className="w-full p-4 text-xs font-semibold bg-slate-50 border border-slate-200/80 rounded-xl focus:outline-none focus:border-[#38A3A5] focus:bg-white transition-all resize-none leading-relaxed"
              required
            />
          </div>

          {/* ACTION TRIGGER BUTTONS */}
          <div className="w-full flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <Link
              href="/dashboard/seller/my-products"
              className="h-11 px-6 border border-slate-200 text-slate-400 hover:text-[#22577A] hover:bg-slate-50 transition-all font-bold text-xs rounded-xl flex items-center justify-center"
            >
              Cancel
            </Link>
            
            <button
              type="submit"
              className="h-11 px-8 bg-[#22577A] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 hover:bg-[#216869] transition-all shadow-sm"
            >
              Update Product
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default EditProductForm;