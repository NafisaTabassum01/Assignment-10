// "use client";

// import React, { useEffect, useState } from "react";
// import { Button, Chip } from "@heroui/react";
// import { motion, AnimatePresence } from "framer-motion";
// import { FiShoppingBag, FiClock, FiCheckCircle, FiXCircle, FiTruck, FiTrash2 } from "react-icons/fi";

// // 🎯 তোর ডাটাবেজ থেকে পাওয়া Lila-র রিয়েল বায়ার আইডি সেট করা হলো টেস্ট করার জন্য
// const CURRENT_BUYER_ID = "6a3800ea661ebc2ed511afe0"; 

// const MyOrders = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // অর্ডার ডাটা লোড করা
//   const fetchMyOrders = async () => {
//     try {
//       const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/buyer/orders/${CURRENT_BUYER_ID}`);
//       const data = await res.json();
//       setOrders(data);
//     } catch (err) {
//       console.error("Error fetching orders:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchMyOrders();
//   }, []);

//   // অর্ডার ক্যান্সেল করার ফাংশন
//   const handleCancelOrder = async (orderId) => {
//     if (!confirm("Are you sure you want to cancel this order?")) return;

//     try {
//       const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/orders/${orderId}/status`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ status: "Rejected" }), // ক্যান্সেল মানে স্ট্যাটাস Rejected হয়ে যাওয়া
//       });

//       if (res.ok) {
//         // লাইভ স্টেট আপডেট করা
//         setOrders(orders.map(o => o._id === orderId ? { ...o, orderStatus: "Rejected" } : o));
//       }
//     } catch (err) {
//       console.error("Error cancelling order:", err);
//     }
//   };

//   // স্ট্যাটাস অনুযায়ী ব্যাজের কালার ও আইকন হ্যান্ডেল করা
//   const getStatusBadge = (status) => {
//     switch (status?.toLowerCase()) {
//       case "pending":
//       case "processing":
//         return <Chip startContent={<FiClock />} className="bg-amber-50 text-amber-600 border border-amber-200 font-bold text-xs uppercase" variant="flat">Processing</Chip>;
//       case "accepted":
//         return <Chip startContent={<FiCheckCircle />} className="bg-blue-50 text-blue-600 border border-blue-200 font-bold text-xs uppercase" variant="flat">Accepted</Chip>;
//       case "delivered":
//         return <Chip startContent={<FiTruck />} className="bg-emerald-50 text-emerald-600 border border-emerald-200 font-bold text-xs uppercase" variant="flat">Delivered</Chip>;
//       case "rejected":
//         return <Chip startContent={<FiXCircle />} className="bg-rose-50 text-rose-600 border border-rose-200 font-bold text-xs uppercase" variant="flat">Cancelled</Chip>;
//       default:
//         return <Chip className="bg-slate-50 text-slate-600 font-bold text-xs uppercase" variant="flat">{status}</Chip>;
//     }
//   };

//   return (
//     <div className="w-full min-h-screen bg-slate-50/50 py-12 px-4 max-w-4xl mx-auto">
//       <div className="flex items-center gap-3 pb-6 border-b border-slate-200 mb-8 text-[#22577A]">
//         <FiShoppingBag className="text-3xl text-[#38A3A5]" />
//         <div>
//           <h1 className="text-2xl font-black tracking-tight">My Purchase History</h1>
//           <p className="text-xs text-slate-400">Track and manage your ordered items</p>
//         </div>
//       </div>

//       {loading ? (
//         <p className="text-center text-slate-400 py-10">Loading orders...</p>
//       ) : orders.length === 0 ? (
//         <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-200 text-slate-400">
//           <p className="font-medium">You haven't placed any orders yet!</p>
//         </div>
//       ) : (
//         <div className="space-y-4">
//           <AnimatePresence>
//             {orders.map((order) => (
//               <motion.div
//                 key={order._id}
//                 layout
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, scale: 0.95 }}
//                 className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:shadow-md transition-shadow"
//               >
//                 <div>
//                   {/* 🎯 ব্যাকএন্ডের নতুন আপডেটেড প্রোপার্টি অনুযায়ী রিয়েল প্রোডাক্ট টাইটেল দেখাবে */}
//                   <h3 className="font-bold text-[#22577A] text-lg">
//                     {order.productTitle || "Premium Product"}
//                   </h3>
                  
//                   <p className="text-xs text-slate-400 mt-0.5">
//                     Order ID: <span className="font-mono text-[11px] text-slate-500">{order._id}</span>
//                   </p>
                  
//                   {/* সেলারের নাম নাল (null) থাকলে বা না থাকলে N/A দেখাবে */}
//                   <p className="text-xs text-slate-500 mt-1">
//                     Seller: {order.sellerInfo?.name || "N/A"}
//                   </p>

//                   {/* 🎯 নতুন পেমেন্ট মেকানিজম থেকে আসা লাইভ প্রাইস বা ডিফল্ট অ্যামাউন্ট */}
//                   {order.price && (
//                     <p className="text-sm font-black text-[#38A3A5] mt-2">
//                       ৳ {order.price}
//                     </p>
//                   )}
//                 </div>

//                 <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
//                   {/* ব্যাকএন্ডের 'orderStatus' ট্র্যাক করা হচ্ছে */}
//                   {getStatusBadge(order.orderStatus)}

//                   {/* অর্ডার স্ট্যাটাস প্রসেসিং বা পেন্ডিং থাকলে বায়ার ক্যান্সেল করতে পারবে */}
//                   {(order.orderStatus?.toLowerCase() === "pending" || order.orderStatus?.toLowerCase() === "processing") && (
//                     <Button
//                       onClick={() => handleCancelOrder(order._id)}
//                       isIconOnly
//                       className="bg-rose-50 text-rose-500 hover:bg-rose-100 border border-rose-100 rounded-xl size-9"
//                       title="Cancel Order"
//                     >
//                       <FiTrash2 />
//                     </Button>
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

// export default MyOrders;


"use client";

import React, { useEffect, useState } from "react";
import { Button, Chip } from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiShoppingBag,
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiTruck,
  FiTrash2,
} from "react-icons/fi";
import { useSession } from "@/lib/auth-client";

const MyOrders = () => {
  const { data: session } = useSession();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyOrders = async () => {
    if (!session?.user?.id) {
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/buyer/orders/${session.user.id}`
      );

      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyOrders();
  }, [session]);

  const handleCancelOrder = async (orderId) => {
    if (!confirm("Are you sure you want to cancel this order?")) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/orders/${orderId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: "Rejected",
          }),
        }
      );

      if (res.ok) {
        setOrders((prev) =>
          prev.map((order) =>
            order._id === orderId
              ? { ...order, orderStatus: "Rejected" }
              : order
          )
        );
      }
    } catch (err) {
      console.error("Error cancelling order:", err);
    }
  };

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
      case "processing":
        return (
          <Chip
            className="bg-amber-50 text-amber-600 border border-amber-200 font-bold text-xs uppercase"
            variant="flat"
          >
            <span className="flex items-center gap-1">
              <FiClock />
              Processing
            </span>
          </Chip>
        );

      case "accepted":
        return (
          <Chip
            className="bg-blue-50 text-blue-600 border border-blue-200 font-bold text-xs uppercase"
            variant="flat"
          >
            <span className="flex items-center gap-1">
              <FiCheckCircle />
              Accepted
            </span>
          </Chip>
        );

      case "delivered":
        return (
          <Chip
            className="bg-emerald-50 text-emerald-600 border border-emerald-200 font-bold text-xs uppercase"
            variant="flat"
          >
            <span className="flex items-center gap-1">
              <FiTruck />
              Delivered
            </span>
          </Chip>
        );

      case "rejected":
        return (
          <Chip
            className="bg-rose-50 text-rose-600 border border-rose-200 font-bold text-xs uppercase"
            variant="flat"
          >
            <span className="flex items-center gap-1">
              <FiXCircle />
              Cancelled
            </span>
          </Chip>
        );

      default:
        return (
          <Chip
            className="bg-slate-50 text-slate-600 font-bold text-xs uppercase"
            variant="flat"
          >
            {status}
          </Chip>
        );
    }
  };

  return (
    <div className="w-full min-h-screen bg-slate-50/50 py-12 px-4 max-w-4xl mx-auto">
      <div className="flex items-center gap-3 pb-6 border-b border-slate-200 mb-8 text-[#22577A]">
        <FiShoppingBag className="text-3xl text-[#38A3A5]" />

        <div>
          <h1 className="text-2xl font-black tracking-tight">
            My Purchase History
          </h1>

          <p className="text-xs text-slate-400">
            Track and manage your ordered items
          </p>
        </div>
      </div>

      {loading ? (
        <p className="text-center text-slate-400 py-10">
          Loading orders...
        </p>
      ) : orders.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-200 text-slate-400">
          <p className="font-medium">
            You haven't placed any orders yet!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <AnimatePresence>
            {orders.map((order) => (
              <motion.div
                key={order._id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:shadow-md transition-shadow"
              >
                <div>
                  <h3 className="font-bold text-[#22577A] text-lg">
                    {order.productTitle || "Premium Product"}
                  </h3>

                  <p className="text-xs text-slate-400 mt-0.5">
                    Order ID:{" "}
                    <span className="font-mono text-[11px] text-slate-500">
                      {order._id}
                    </span>
                  </p>

                  <p className="text-xs text-slate-500 mt-1">
                    Seller: {order.sellerInfo?.name || "N/A"}
                  </p>

                  {order.price && (
                    <p className="text-sm font-black text-[#38A3A5] mt-2">
                      ৳ {order.price}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                  {getStatusBadge(order.orderStatus)}

                  {(order.orderStatus?.toLowerCase() === "pending" ||
                    order.orderStatus?.toLowerCase() === "processing") && (
                    <Button
                      onClick={() => handleCancelOrder(order._id)}
                      isIconOnly
                      className="bg-rose-50 text-rose-500 hover:bg-rose-100 border border-rose-100 rounded-xl size-9"
                      title="Cancel Order"
                    >
                      <FiTrash2 />
                    </Button>
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

export default MyOrders;