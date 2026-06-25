// "use client";

// import React, { useEffect, useState } from "react";
// import { Button, Chip } from "@heroui/react";
// import { motion, AnimatePresence } from "framer-motion";
// import Image from "next/image";
// import { FiActivity, FiUser, FiPhone, FiMapPin, FiCheck, FiX, FiCheckSquare } from "react-icons/fi";

// // সেশন থেকে সেলার আইডি পাওয়ার ডামি ফাংশন
// const CURRENT_SELLER_ID = "seller_user_id_123";

// const ManageOrders = () => {
//   const [incomingOrders, setIncomingOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // সেলারের কাছে আসা অর্ডারগুলো রিসিভ করা
//   const fetchSellerOrders = async () => {
//     try {
//       const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/seller/orders/${CURRENT_SELLER_ID}`);
//       const data = await res.json();
//       setIncomingOrders(data);
//     } catch (err) {
//       console.error("Error fetching seller orders:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchSellerOrders();
//   }, []);

//   // অর্ডারের স্ট্যাটাস চেইঞ্জ করার মাস্টার হ্যান্ডলার (Accept / Reject / Delivered)
//   const updateStatus = async (orderId, newStatus) => {
//     try {
//       const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/orders/${orderId}/status`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ status: newStatus }),
//       });

//       if (res.ok) {
//         // লাইভ স্টেট পরিবর্তন
//         setIncomingOrders(incomingOrders.map(o => o._id === orderId ? { ...o, status: newStatus } : o));
//       }
//     } catch (err) {
//       console.error("Error updating status:", err);
//     }
//   };

//   return (
//     <div className="w-full min-h-screen bg-slate-50/50 py-12 px-4 max-w-5xl mx-auto">
//       <div className="flex items-center gap-3 pb-6 border-b border-slate-200 mb-8 text-[#22577A]">
//         <FiActivity className="text-3xl text-[#38A3A5]" />
//         <div>
//           <h1 className="text-2xl font-black tracking-tight">Incoming Buyer Orders</h1>
//           <p className="text-xs text-slate-400">Process your item checkouts and look up customer parameters</p>
//         </div>
//       </div>

//       {loading ? (
//         <p className="text-center text-slate-400 py-10">Loading manage board...</p>
//       ) : incomingOrders.length === 0 ? (
//         <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-200 text-slate-400">
//           <p className="font-medium">No customers have ordered your products yet.</p>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <AnimatePresence>
//             {incomingOrders.map((order) => (
//               <motion.div
//                 key={order._id}
//                 layout
//                 initial={{ opacity: 0, scale: 0.98 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 exit={{ opacity: 0 }}
//                 className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden"
//               >
//                 {/* প্রোডাক্ট এন্ড প্রাইস ডিটেইলস */}
//                 <div className="pb-4 border-b border-slate-100 flex justify-between items-start">
//                   <div>
//                     <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Ordered Item</span>
//                     <h3 className="font-black text-slate-700 text-base mt-0.5">{order.productTitle || "Item Deal"}</h3>
//                     <p className="text-xs font-bold text-[#38A3A5] mt-1">৳ {order.price}</p>
//                   </div>
//                   <div>
//                     <Chip className={`text-xs font-bold uppercase ${
//                       order.status === 'Pending' ? 'bg-amber-50 text-amber-600 border border-amber-200' :
//                       order.status === 'Accepted' ? 'bg-blue-50 text-blue-600 border border-blue-200' :
//                       order.status === 'Delivered' ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' :
//                       'bg-rose-50 text-rose-600 border border-rose-200'
//                     }`} variant="flat">{order.status}</Chip>
//                   </div>
//                 </div>

//                 {/* 🎯 বায়ার ইনফরমেশন কার্ড (যা আমরা প্রোফাইল থেকে এমবেড করে পাঠিয়েছিলাম) */}
//                 <div className="py-4 space-y-3 bg-slate-50/50 p-3 rounded-xl mt-3 text-xs border border-slate-100">
//                   <div className="flex items-center gap-2.5">
//                     <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-[#38A3A5]/30 shrink-0">
//                       <Image 
//                         src={order.buyerInformation?.profilePicture || "/placeholder.jpg"} 
//                         alt="buyer" 
//                         fill 
//                         className="object-cover"
//                       />
//                     </div>
//                     <div>
//                       <p className="font-bold text-[#22577A] flex items-center gap-1"><FiUser className="text-slate-400" /> {order.buyerInformation?.name}</p>
//                       <p className="text-[11px] text-slate-400">{order.buyerInformation?.email}</p>
//                     </div>
//                   </div>

//                   <p className="text-slate-600 font-medium flex items-center gap-1.5"><FiPhone className="text-slate-400 shrink-0" /> {order.buyerInformation?.phone || "No phone added"}</p>
//                   <p className="text-slate-600 font-medium flex items-start gap-1.5 leading-relaxed"><FiMapPin className="text-slate-400 shrink-0 mt-0.5" /> {order.buyerInformation?.address || "No shipping address specified"}</p>
//                 </div>

//                 {/* 🎯 সেলার অ্যাকশন বাটনস (Pending বা Accepted অবস্থা অনুযায়ী ডাইনামিক চেঞ্জ হবে) */}
//                 <div className="mt-5 pt-3 border-t border-slate-50 flex gap-2 w-full">
//                   {order.status === "Pending" && (
//                     <>
//                       <Button
//                         onClick={() => updateStatus(order._id, "Rejected")}
//                         startContent={<FiX />}
//                         className="w-1/2 h-10 bg-rose-50 text-rose-600 font-bold text-xs rounded-xl hover:bg-rose-100"
//                       >
//                         Reject
//                       </Button>
//                       <Button
//                         onClick={() => updateStatus(order._id, "Accepted")}
//                         startContent={<FiCheck />}
//                         className="w-1/2 h-10 bg-[#22577A] text-white font-bold text-xs rounded-xl hover:bg-[#216869]"
//                       >
//                         Accept
//                       </Button>
//                     </>
//                   )}

//                   {order.status === "Accepted" && (
//                     <Button
//                       onClick={() => updateStatus(order._id, "Delivered")}
//                       startContent={<FiCheckSquare />}
//                       className="w-full h-10 bg-emerald-600 text-white font-bold text-xs rounded-xl hover:bg-emerald-700 shadow-md"
//                     >
//                       Mark As Delivered
//                     </Button>
//                   )}

//                   {(order.status === "Delivered" || order.status === "Rejected") && (
//                     <p className="text-center w-full text-[11px] text-slate-400 font-bold py-1 bg-slate-100 rounded-lg uppercase tracking-wider">
//                       No further action needed
//                     </p>
//                   )}
//                 </div>
//               </motion.div>
//             ))}
//           </AnimatePresence>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ManageOrders;




"use client";

import React, { useEffect, useState } from "react";
import { Button, Chip } from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  FiActivity,
  FiUser,
  FiPhone,
  FiMapPin,
  FiCheck,
  FiX,
  FiCheckSquare,
} from "react-icons/fi";
import { authClient } from "@/lib/auth-client";

const ManageOrders = () => {
  const [incomingOrders, setIncomingOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const { data: session } = authClient.useSession();

  const sellerId = session?.user?.id;

  const fetchSellerOrders = async () => {
    if (!sellerId) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/seller/orders/${sellerId}`
      );

      const data = await res.json();

      setIncomingOrders(data);
    } catch (err) {
      console.error("Error fetching seller orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (sellerId) {
      fetchSellerOrders();
    }
  }, [sellerId]);

  const updateStatus = async (orderId, newStatus) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/orders/${orderId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: newStatus,
          }),
        }
      );

      if (res.ok) {
        setIncomingOrders((prev) =>
          prev.map((o) =>
            o._id === orderId
              ? {
                  ...o,
                  orderStatus: newStatus,
                }
              : o
          )
        );
      }
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  return (
    <div className="w-full min-h-screen bg-slate-50/50 py-12 px-4 max-w-5xl mx-auto">
      <div className="flex items-center gap-3 pb-6 border-b border-slate-200 mb-8 text-[#22577A]">
        <FiActivity className="text-3xl text-[#38A3A5]" />
        <div>
          <h1 className="text-2xl font-black tracking-tight">
            Incoming Buyer Orders
          </h1>
          <p className="text-xs text-slate-400">
            Process your item checkouts and look up customer parameters
          </p>
        </div>
      </div>

      {loading ? (
        <p className="text-center text-slate-400 py-10">
          Loading manage board...
        </p>
      ) : incomingOrders.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-200 text-slate-400">
          <p className="font-medium">
            No customers have ordered your products yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence>
            {incomingOrders.map((order) => (
              <motion.div
                key={order._id}
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden"
              >
                <div className="pb-4 border-b border-slate-100 flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Ordered Item
                    </span>

                    <h3 className="font-black text-slate-700 text-base mt-0.5">
                      {order.productTitle || "Item Deal"}
                    </h3>

                    <p className="text-xs font-bold text-[#38A3A5] mt-1">
                      ৳ {order.price}
                    </p>
                  </div>

                  <div>
                    <Chip
                      className={`text-xs font-bold uppercase ${
                        order.orderStatus === "processing"
                          ? "bg-amber-50 text-amber-600 border border-amber-200"
                          : order.orderStatus === "Accepted"
                          ? "bg-blue-50 text-blue-600 border border-blue-200"
                          : order.orderStatus === "Delivered"
                          ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                          : "bg-rose-50 text-rose-600 border border-rose-200"
                      }`}
                      variant="flat"
                    >
                      {order.orderStatus}
                    </Chip>
                  </div>
                </div>

                <div className="py-4 space-y-3 bg-slate-50/50 p-3 rounded-xl mt-3 text-xs border border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-[#38A3A5]/30 shrink-0">
                      <Image
  src={
    order.buyerInfo?.profilePicture?.trim()
      ? order.buyerInfo.profilePicture
      : "/placeholder.jpg"
  }
  alt="buyer"
  fill
  className="object-cover"
/>
                    </div>

                    <div>
                      <p className="font-bold text-[#22577A] flex items-center gap-1">
                        <FiUser className="text-slate-400" />
                        {order.buyerInfo?.name || "Unknown Buyer"}
                      </p>

                      <p className="text-[11px] text-slate-400">
                        {order.buyerInfo?.email}
                      </p>
                    </div>
                  </div>

                  <p className="text-slate-600 font-medium flex items-center gap-1.5">
                    <FiPhone className="text-slate-400 shrink-0" />
                    {order.buyerInfo?.phone || "No phone added"}
                  </p>

                  <p className="text-slate-600 font-medium flex items-start gap-1.5 leading-relaxed">
                    <FiMapPin className="text-slate-400 shrink-0 mt-0.5" />
                    {order.buyerInfo?.address ||
                      "No shipping address specified"}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-50 flex gap-2 w-full">
                  {order.orderStatus === "processing" && (
                    <>
                      <Button
                        onClick={() =>
                          updateStatus(order._id, "Rejected")
                        }
                        className="w-1/2 h-10 bg-rose-50 text-rose-600 font-bold text-xs rounded-xl hover:bg-rose-100"
                      >
                        <FiX />
                        Reject
                      </Button>

                      <Button
                        onClick={() =>
                          updateStatus(order._id, "Accepted")
                        }
                        className="w-1/2 h-10 bg-[#22577A] text-white font-bold text-xs rounded-xl hover:bg-[#216869]"
                      >
                        <FiCheck />
                        Accept
                      </Button>
                    </>
                  )}

                  {order.orderStatus === "Accepted" && (
                    <Button
                      onClick={() =>
                        updateStatus(order._id, "Delivered")
                      }
                      className="w-full h-10 bg-emerald-600 text-white font-bold text-xs rounded-xl hover:bg-emerald-700 shadow-md"
                    >
                      <FiCheckSquare />
                      Mark As Delivered
                    </Button>
                  )}

                  {(order.orderStatus === "Delivered" ||
                    order.orderStatus === "Rejected") && (
                    <p className="text-center w-full text-[11px] text-slate-400 font-bold py-1 bg-slate-100 rounded-lg uppercase tracking-wider">
                      No further action needed
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default ManageOrders;