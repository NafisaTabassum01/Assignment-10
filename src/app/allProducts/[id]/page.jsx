import React from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  FiPackage, 
  FiHeart, 
  FiShoppingCart, 
  FiChevronLeft, 
  FiMapPin,
  FiUser,
  FiArrowUpRight
} from "react-icons/fi";
import { getProduct } from "@/lib/api/products"; 
import BuyProduct from "@/components/BuyProduct";
// import { useSession } from "@/lib/auth-client";

const ProductDetailsPage = async ({ params }) => {

  const { id } = await params;

  // const {data:session} = useSession()
  
  const allProducts = (await getProduct()) || [];
  const product = allProducts.find((p) => p._id === id || p._id?.$oid === id);

  if (!product) {
    return (
      <div className="w-full min-h-screen bg-slate-50 flex flex-col items-center justify-center text-slate-500">
        <p className="text-sm font-semibold mb-3">Product details could not be found.</p>
        <Link href="/allProducts" className="px-4 py-2 bg-[#22577A] text-white rounded-xl text-xs font-bold">
          Back to Listings
        </Link>
      </div>
    );
  }

  const productImage = product.ImageUrl || product.imageUrl || product.image || "/placeholder.jpg";

  return (
    <div className="w-10/12 mx-auto min-h-screen bg-white pb-16 text-[#22577A] font-sans">
      <div className="w-full max-w-6xl mx-auto px-6 pt-6">
        
        {/* BACK BUTTON */}
        <Link 
          href="/allProducts" 
          className="inline-flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-[#216869] transition-colors mb-5 group"
        >
          <FiChevronLeft className="group-hover:-translate-x-0.5 transition-transform size-3.5" />
          Back to listings
        </Link>

        {/* 🎯 ১. TOP SECTION: স্লিম ও পারফেক্ট সাইজের ইমেজ (Next.js Image) */}
        <div className="relative rounded-2xl overflow-hidden shadow-sm mb-10">
          <Image
            src={productImage}
            alt={product.ProductTitle || "Product Image"}
            
            priority
            height={400}
            width={300}
            className=" mx-auto"
            sizes=""
          />
          {/* ইমেজ ব্যাজেস */}      </div>

      <div className="shadow-lg rounded-2xl p-6">
{/* 🎯 মেইন কন্টেন্ট গ্রিড - w-full এবং লার্জ স্ক্রিনে ২-কলাম ফিক্সড */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* ================= বাম পাশ: প্রোডাক্ট ডিটেইলস (8 Columns) ================= */}
          <div className="w-full lg:col-span-8 flex flex-col gap-6">
            
            {/* টাইটেল এবং প্রাইস ব্লক */}
            <div className="w-full flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 border-b border-slate-100 pb-5">
              <div className="flex flex-col gap-2">
                <h1 className="text-2xl md:text-3xl font-black text-[#22577A] tracking-tight leading-tight break-words">
                  {product.ProductTitle}
                </h1>
                <div className="flex items-center gap-1.5 text-slate-400 text-xs font-bold">
                  <FiPackage className="text-[#38A3A5] shrink-0" />
                  <span>{product.Stock || 0} Items Available</span>
                </div>
              </div>

              <div className="flex flex-col shrink-0 min-w-[120px] sm:text-right">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Price</span>
                <p className="text-3xl font-black text-[#216869] whitespace-nowrap">
                  ৳ {Number(product.Price || 0).toLocaleString()}
                </p>
              </div>
            </div>

            {/* ডেসক্রিপশন */}
             <div className="flex gap-10">
              <div>
                <h2 className="text-xs font-black uppercase text-slate-400 tracking-wider">
                Category:
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed font-medium whitespace-pre-line bg-slate-50/50 p-4 rounded-xl border border-slate-100">
                  {product.Category}
              </p>
              
              </div>
              <div>
                <h2 className="text-xs font-black uppercase text-slate-400 tracking-wider">
                Condition:
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed font-medium whitespace-pre-line bg-slate-50/50 p-4 rounded-xl border border-slate-100">
                  {product.Condition}
              </p>
              
              </div>

             </div>

            <div className="w-full flex flex-col gap-2">
              <h2 className="text-xs font-black uppercase text-slate-400 tracking-wider">
                Description:
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed font-medium whitespace-pre-line bg-slate-50/50 p-4 rounded-xl border border-slate-100 break-words">
                {product.ProductDescription || "No description provided."}
              </p>
            </div>

            {/* অ্যাকশন বাটনস */}
            <div>
              {/* <BuyProduct id={id} price={product?.Price} stock={product?.Stock} ></BuyProduct> */}
<BuyProduct
  id={id}
  price={product?.Price}
  stock={product?.Stock}
  productTitle={product?.ProductTitle}
/>              
            </div>

          </div>

          {/* ================= ডান পাশ: সেলার ইনফরমেশন কার্ড (4 Columns) ================= */}
          <div className="w-full lg:col-span-4 bg-slate-50/60 border border-slate-100 rounded-2xl p-5 shadow-sm lg:sticky lg:top-6">
            
            {/* সেলার হেডার */}
            <div className="flex items-center gap-3 border-b border-slate-200/60 pb-4 mb-4">
              <div className="relative size-11 rounded-full overflow-hidden border border-[#38A3A5]/20 bg-slate-200 shrink-0">
                <Image
                  src={product.sellerProfilePicture || "/placeholder.jpg"}
                  alt={product.sellerName || "Seller"}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col min-w-0">
                <h3 className="text-xs font-black text-[#22577A] truncate">
                  {product.sellerName || "Authorized Seller"}
                </h3>
                {/* <div className="flex items-center gap-1 text-[10px] text-slate-400 font-bold mt-0.5">
                  <FiMapPin className="text-[#38A3A5] size-3 shrink-0" />
                  <span className="truncate">Dhaka, Bangladesh</span>
                </div> */}
              </div>
            </div>

            {/* এক্সট্রা ডিটেইলস মেটা */}
            <div className="flex flex-col gap-2.5 mb-5">
              <div className="flex items-center justify-between text-[11px] font-semibold py-1 border-b border-slate-100/60">
                <span className="text-slate-400">Account Status:</span>
                <span className="text-[#38A3A5] font-bold">Verified Seller</span>
              </div>
              <div className="flex items-center justify-between text-[11px] font-semibold py-1 border-b border-slate-100/60">
                <span className="text-slate-400">Response Rate:</span>
                <span className="text-slate-600">98% Faster</span>
              </div>
            </div>

            {/* সেলার প্রোফাইল লিংক বাটন */}
            <Link
              href="/seller-profile" 
              className="w-full h-10 bg-slate-900 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 hover:bg-slate-800 transition-all shadow-sm"
            >
              <FiUser className="size-3.5" />
              View Seller Profile
              <FiArrowUpRight className="size-3 text-slate-400" />
            </Link>

          </div>

        </div>
      </div>
      </div>


      
    </div>
  );
};

export default ProductDetailsPage;

