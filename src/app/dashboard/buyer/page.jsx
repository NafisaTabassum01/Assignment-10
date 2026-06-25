"use client";

import React, { useEffect, useState } from "react";
import { Card } from "@heroui/react";
import { motion } from "framer-motion";
import { authClient } from "@/lib/auth-client";
import {
  ShoppingBag,
  Heart,
  Clock,
} from "@gravity-ui/icons";

const BuyerDashboardPage = () => {
  const { data: session } = authClient.useSession();

  const buyerId = session?.user?.id;

  const [orders, setOrders] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!buyerId) return;

    const fetchDashboardData = async () => {
      try {
        const [ordersRes, wishlistRes] = await Promise.all([
          fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/buyer/orders/${buyerId}`
          ),
          fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/wishlist/${buyerId}`
          ),
        ]);

        const ordersData = await ordersRes.json();
        const wishlistData = await wishlistRes.json();

        setOrders(Array.isArray(ordersData) ? ordersData : []);
        setWishlist(Array.isArray(wishlistData) ? wishlistData : []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [buyerId]);

  const recentPurchases =
    orders.length > 0
      ? orders
          .slice(0, 3)
          .map((item) => item.productTitle)
          .join(", ")
      : "No Purchases";

  const stats = [
    {
      title: "Total Orders",
      value: orders.length,
      description: "Total number of orders placed",
      icon: (
        <ShoppingBag
          className="text-[#38A3A5] size-5"
          role="img"
          aria-label="orders"
        />
      ),
    },
    {
      title: "Wishlist Count",
      value: wishlist.length,
      description: "Products saved in wishlist",
      icon: (
        <Heart
          className="text-[#38A3A5] size-5"
          role="img"
          aria-label="wishlist"
        />
      ),
    },
    {
      title: "Recent Purchases",
      value: recentPurchases,
      description: "Latest purchased products",
      icon: (
        <Clock
          className="text-[#38A3A5] size-5"
          role="img"
          aria-label="recent purchases"
        />
      ),
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-60">
        Loading...
      </div>
    );
  }

  return (
    <div className="w-full lg:w-11/12 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-2">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="w-full h-full"
        >
          <Card className="w-full h-[180px] p-5 border border-slate-100/80 bg-gradient-to-br from-white via-white to-slate-50 rounded-2xl shadow-sm hover:shadow-md hover:border-[#38A3A5]/30 flex flex-col justify-between relative overflow-hidden group transition-colors duration-300">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#38A3A5]/5 to-[#22577A]/5 rounded-bl-full pointer-events-none transition-all group-hover:scale-110" />

            <Card.Header className="p-0 flex items-center justify-between w-full">
              <div className="p-2.5 bg-[#38A3A5]/10 border border-[#38A3A5]/20 rounded-xl flex items-center justify-center shrink-0">
                {stat.icon}
              </div>
            </Card.Header>

            <div className="flex flex-col items-center justify-center my-auto py-1 text-center">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                {stat.title}
              </span>

              {typeof stat.value === "number" ? (
                <Card.Title className="text-3xl font-black text-[#22577A] tracking-tight">
                  {stat.value}
                </Card.Title>
              ) : (
                <Card.Title className="text-base font-bold text-[#22577A] leading-6 line-clamp-2">
                  {stat.value}
                </Card.Title>
              )}
            </div>

            <div className="w-full text-center border-t border-slate-50 pt-3">
              <Card.Description className="text-[11px] text-slate-400 leading-normal font-medium">
                {stat.description}
              </Card.Description>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default BuyerDashboardPage;