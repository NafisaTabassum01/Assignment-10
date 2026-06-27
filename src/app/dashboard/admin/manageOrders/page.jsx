"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Table, Chip, Button, Spinner } from "@heroui/react";
import { FiSearch, FiSliders, FiCheckCircle, FiTruck, FiAlertCircle } from "react-icons/fi";

export default function ManageOrdersPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(searchParams.get("search") || "");

  // URL Query handling (সার্চ এবং ফিল্টার স্টেট সিঙ্ক)
  const handleSearchSubmit = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (search.trim()) params.set("search", search.trim());
    else params.delete("search");
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const handleStatusFilterChange = (value) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set("status", value);
    else params.delete("status");
    router.push(`?${params.toString()}`, { scroll: false });
  };

  // অর্ডার ডাটা ফেচ করার ফাংশন
  const fetchOrders = () => {
    setLoading(true);
    const searchUrl = searchParams.get("search") || "";
    const statusUrl = searchParams.get("status") || "";

    fetch(`http://localhost:5000/api/admin/orders?search=${searchUrl}&status=${statusUrl}`)
      .then((res) => res.json())
      .then((resData) => {
        if (resData.success) {
          setOrders(resData.data);
        }
        setLoading(false)
      })
      .catch((err) => {
        console.error("Order fetching error:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchOrders();
  }, [searchParams]);

  // অর্ডার স্ট্যাটাস আপডেট করার হ্যান্ডলার (যেমন: Delivered করা বা Dispute মিটমাট করা)
  const handleUpdateStatus = async (orderId, nextStatus) => {
    try {
      const res = await fetch(`http://localhost:5000/api/orders/${orderId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
      });
      const data = await res.json();
      if (data.success) fetchOrders();
    } catch (err) {
      console.error("Status update error:", err);
    }
  };

  return (
    <div className="w-full lg:w-11/12 mx-auto p-4 flex flex-col gap-6">
      
      {/* 📝 পেজ হেডার */}
      <div>
        <h2 className="text-2xl font-bold text-[#22577A]">Manage Orders</h2>
        <p className="text-sm text-slate-500">Monitor all system transactions, track fulfillment stages, and resolve marketplace disputes.</p>
      </div>

      


      {/* 📊 অর্ডার ট্র্যাকিং টেবিল */}
      {loading ? (
        <div className="flex justify-center py-20">
          <Spinner size="lg" className="text-teal-600" />
        </div>
      ) : (
        <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
          <Table aria-label="Global orders moderation dashboard table">
            <Table.ScrollContainer>
              <Table.Content aria-label="Platform Orders Master Database" className="min-w-[800px] p-2">
                
                <Table.Header>
                  <Table.Column isRowHeader className="bg-slate-50/80 text-[#22577A] font-bold">PRODUCT & ORDER INFO</Table.Column>
                  <Table.Column className="bg-slate-50/80 text-[#22577A] font-bold">BUYER DETAILS</Table.Column>
                  <Table.Column className="bg-slate-50/80 text-[#22577A] font-bold">SELLER INFO</Table.Column>
                  <Table.Column className="bg-slate-50/80 text-[#22577A] font-bold">AMOUNT & ESCROW</Table.Column>
                  <Table.Column className="bg-slate-50/80 text-[#22577A] font-bold">STATUS</Table.Column>
                  <Table.Column className="bg-slate-50/80 text-[#22577A] font-bold text-center">ADMIN CONTROLS</Table.Column>
                </Table.Header>

                <Table.Body>
                  {orders.length === 0 ? (
                    <Table.Row>
                      <Table.Cell colSpan={6} className="text-center py-10 text-slate-400 font-medium">
                        No platform orders recorded yet.
                      </Table.Cell>
                    </Table.Row>
                  ) : (
                    orders.map((order) => {
                      const mongoId = order._id;
                      // অর্ডার স্ট্যাটাস এবং পেমেন্ট ট্র্যাকিং ভ্যালু সেফলি রিড করা
                      const currentStatus = order.orderStatus || order.status || "processing";

                      return (
                        <Table.Row key={mongoId} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
                          
                          {/* ১. প্রোডাক্ট এবং অর্ডার ট্র্যাকিং আইডি */}
                          <Table.Cell>
                            <div className="flex flex-col">
                              <span className="text-sm font-bold text-slate-800 line-clamp-1">
                                {order.productTitle || "Premium Listing"}
                              </span>
                              <span className="text-[10px] font-mono text-slate-400">
                                ID: {mongoId}
                              </span>
                            </div>
                          </Table.Cell>
                          
                          {/* ২. বায়ার ডিটেইলস (এমবেডেড অবজেক্ট থেকে) */}
                          <Table.Cell>
                            <div className="flex flex-col">
                              <span className="text-xs font-bold text-slate-700">{order.buyerInfo?.name || "Anonymous"}</span>
                              <span className="text-[11px] text-slate-400 font-medium">{order.buyerInfo?.email || "No Email"}</span>
                            </div>
                          </Table.Cell>

                          {/* ৩. সেলার ইনফো */}
                          <Table.Cell>
                            <div className="flex flex-col">
                              <span className="text-xs font-semibold text-slate-700">{order.sellerInfo?.name || "Direct Platform"}</span>
                              <span className="text-[11px] text-slate-400">{order.sellerInfo?.email || "N/A"}</span>
                            </div>
                          </Table.Cell>

                          {/* ৪. প্রাইস এবং স্ট্রাইপ পেমেন্ট স্ট্যাটাস */}
                          <Table.Cell>
                            <div className="flex flex-col">
                              <span className="text-sm font-black text-slate-800">৳{order.price || order.amount || 0}</span>
                              <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider">
                                {order.paymentStatus || "paid"} ✅
                              </span>
                            </div>
                          </Table.Cell>

                          {/* ৫. অর্ডার ডেলিভারি/ফালফিল্মেন্ট স্ট্যাটাস চিপ */}
                          <Table.Cell>
                            <Chip
                              size="sm"
                              variant="flat"
                              className="font-black text-xs uppercase"
                              color={
                                currentStatus === "Delivered" ? "success" :
                                currentStatus === "Rejected" ? "danger" :
                                currentStatus === "Disputed" ? "warning" : "primary"
                              }
                            >
                              {currentStatus}
                            </Chip>
                          </Table.Cell>

                          {/* ৬. অ্যাডমিন মডারেশন অ্যাকশন কন্ট্রোলস */}
                          <Table.Cell>
                            <div className="flex items-center justify-center gap-1.5">
                              
                              {/* অ্যাকশন ১: অর্ডার প্রসেসিং বা এক্সেপ্টেড থাকলে অ্যাডমিন সরাসরি ডেলিভারি পুশ করতে পারবে */}
                              {(currentStatus === "processing" || currentStatus === "Accepted") && (
                                <Button
                                  size="sm"
                                  variant="light"
                                  isIconOnly
                                  className="cursor-pointer text-emerald-600 hover:bg-emerald-50"
                                  title="Force Mark As Delivered"
                                  onClick={() => handleUpdateStatus(mongoId, "Delivered")}
                                >
                                  <FiCheckCircle size={18} />
                                </Button>
                              )}

                              {/* অ্যাকশন ২: বায়ার বা সেলারের মধ্যে ঝামেলা হলে ডিস্পিউট রেইজ/রিসলভ ট্র্যাকিং */}
                              {currentStatus !== "Disputed" && currentStatus !== "Delivered" && currentStatus !== "Rejected" && (
                                <Button
                                  size="sm"
                                  variant="light"
                                  isIconOnly
                                  className="cursor-pointer text-amber-500 hover:bg-amber-50"
                                  title="Flag/Flag Dispute"
                                  onClick={() => handleUpdateStatus(mongoId, "Disputed")}
                                >
                                  <FiAlertTriangle className="size-4 text-amber-500" />
                                </Button>
                              )}

                              {/* অ্যাকশন ৩: ডিস্পিউট স্টেটে থাকলে অ্যাডমিন রিভিউ করে সেটাকে এক্সেপ্টেড ফ্লোতে ফেরত পাঠাতে পারবে */}
                              {currentStatus === "Disputed" && (
                                <>
                                  <Button
                                    size="sm"
                                    variant="flat"
                                    color="success"
                                    className="font-bold text-xs px-2.5 h-7 min-w-0"
                                    title="Resolve Dispute & Approve Delivery"
                                    onClick={() => handleUpdateStatus(mongoId, "Delivered")}
                                  >
                                    Resolve Clean
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="flat"
                                    color="danger"
                                    className="font-bold text-xs px-2.5 h-7 min-w-0"
                                    title="Cancel Order & Reject"
                                    onClick={() => handleUpdateStatus(mongoId, "Rejected")}
                                  >
                                    Cancel Order
                                  </Button>
                                </>
                              )}

                              {/* স্ট্যাটাস ডেলিভারড বা রিজেক্টেড হয়ে গেলে অর্ডার লক (অ্যাকশন বাটন হাইড থাকবে) */}
                              {(currentStatus === "Delivered" || currentStatus === "Rejected") && (
                                <span className="text-[10px] text-slate-400 italic font-medium select-none">
                                  Archived Log
                                </span>
                              )}

                            </div>
                          </Table.Cell>
                        </Table.Row>
                      );
                    })
                  )}
                </Table.Body>

              </Table.Content>
            </Table.ScrollContainer>
          </Table>
        </div>
      )}
    </div>
  );
}

// আইকন ইম্পোর্ট মিসিং ফিক্স করার জন্য কাস্টম অবজেক্ট ম্যাপিং
function FiAlertTriangle(props) {
  return <FiAlertCircle {...props} />;
}