"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Table, Chip, Button, Spinner } from "@heroui/react";
import { FiSearch, FiSliders, FiTrash2, FiCheckCircle, FiXCircle } from "react-icons/fi";

export default function ManageProductsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(searchParams.get("search") || "");

  // URL Query handling
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

  const fetchProducts = () => {
    setLoading(true);
    const searchUrl = searchParams.get("search") || "";
    const statusUrl = searchParams.get("status") || "";

    fetch(`http://localhost:5000/api/admin/products?search=${searchUrl}&status=${statusUrl}`)
      .then((res) => res.json())
      .then((resData) => {
        if (resData.success) {
          setProducts(resData.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, [searchParams]);

  // Approve Handler
  const handleApprove = async (productId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/admin/products/approve/${productId}`, {
        method: "PATCH",
      });
      const data = await res.json();
      if (data.success) fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  // Reject Handler
  const handleReject = async (productId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/admin/products/reject/${productId}`, {
        method: "PATCH",
      });
      const data = await res.json();
      if (data.success) fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  // Delete Handler
  const handleDelete = async (productId) => {
    if (!confirm("Are you sure you want to permanently delete this product listing?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/products/${productId}`, {
        method: "DELETE",
      });
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full lg:w-11/12 mx-auto p-4 flex flex-col gap-6">
      
      {/* 📝 পেজ হেডার */}
      <div>
        <h2 className="text-2xl font-bold text-[#22577A]">Manage Products</h2>
        <p className="text-sm text-slate-500">Review, moderate, approve, or reject seller product listings across the marketplace.</p>
      </div>



      {/* 📊 প্রোডাক্ট টেবিল component */}
      {loading ? (
        <div className="flex justify-center py-20">
          <Spinner size="lg" className="text-teal-600" />
        </div>
      ) : (
        <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
          <Table aria-label="Products moderation panel">
            <Table.ScrollContainer>
              <Table.Content aria-label="Product Listings" className="min-w-[700px] p-2">
                
                <Table.Header>
                  <Table.Column isRowHeader className="bg-slate-50/80 text-[#22577A] font-bold">PRODUCT DETAILS</Table.Column>
                  <Table.Column className="bg-slate-50/80 text-[#22577A] font-bold">SELLER NAME</Table.Column>
                  <Table.Column className="bg-slate-50/80 text-[#22577A] font-bold">PRICE</Table.Column>
                  <Table.Column className="bg-slate-50/80 text-[#22577A] font-bold">STATUS</Table.Column>
                  <Table.Column className="bg-slate-50/80 text-[#22577A] font-bold text-center">MODERATION ACTIONS</Table.Column>
                </Table.Header>

                <Table.Body>
                  {products.length === 0 ? (
                    <Table.Row>
                      <Table.Cell colSpan={5} className="text-center py-10 text-slate-400 font-medium">
                        No product listings found.
                      </Table.Cell>
                    </Table.Row>
                  ) : (
                    products.map((product) => {
                      const mongoId = product._id;
                      // ডেটাবেজ ভ্যালু সেফলি হ্যান্ডেল করা (lowercase এ কনভার্ট করে ম্যাচিং সহজ করা)
                      const currentStatus = (product.status || "pending").toLowerCase();

                      return (
                        <Table.Row key={mongoId} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
                          
                          {/* ১. প্রোডাক্ট ইনফো (তোর DB স্পেলিং: ImageUrl, ProductTitle, Category) */}
                          <Table.Cell>
                            <div className="flex items-center gap-3">
                              {product.ImageUrl && (
                                <img 
                                  src={product.ImageUrl} 
                                  alt={product.ProductTitle} 
                                  className="w-10 h-10 object-cover rounded-lg border border-slate-100 shrink-0"
                                />
                              )}
                              <div className="flex flex-col">
                                <span className="text-sm font-bold text-slate-800 line-clamp-1">{product.ProductTitle || "Untitled Product"}</span>
                                <span className="text-xs text-slate-400 font-medium uppercase">{product.Category || "General"}</span>
                              </div>
                            </div>
                          </Table.Cell>
                          
                          {/* ২. সেলার নাম (তোর DB ফিল্ড: sellerName) */}
                          <Table.Cell>
                            <span className="text-xs font-semibold text-slate-600">{product.sellerName || "Unknown Seller"}</span>
                          </Table.Cell>

                          {/* ৩. প্রাইস (তোর DB ফিল্ড: Price) */}
                          <Table.Cell>
                            <span className="text-sm font-bold text-slate-700">৳{product.Price}</span>
                          </Table.Cell>

                          {/* ৪. স্ট্যাটাস চিপ */}
                          <Table.Cell>
                            <Chip
                              size="sm"
                              variant="flat"
                              className="font-bold text-xs uppercase"
                              color={
                                currentStatus === "approved" ? "success" :
                                currentStatus === "rejected" ? "danger" : 
                                currentStatus === "active" ? "primary" : "warning"
                              }
                            >
                              {product.status || "pending"}
                            </Chip>
                          </Table.Cell>

                          {/* ৫. অ্যাকশন বাটন কন্ট্রোল */}
                          <Table.Cell>
                            <div className="flex items-center justify-center gap-2">
                              
                              {/* কন্ডিশন ১: Pending অথবা পুরাতন active ডেটা হলে দুইটাই দেখাবে */}
                              {(currentStatus === "pending" || currentStatus === "active") && (
                                <>
                                  <Button
                                    size="sm"
                                    variant="light"
                                    isIconOnly
                                    className="cursor-pointer text-emerald-600 hover:bg-emerald-50"
                                    title="Approve Product"
                                    onClick={() => handleApprove(mongoId)}
                                  >
                                    <FiCheckCircle size={18} />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="light"
                                    isIconOnly
                                    className="cursor-pointer text-rose-500 hover:bg-rose-50"
                                    title="Reject Product"
                                    onClick={() => handleReject(mongoId)}
                                  >
                                    <FiXCircle size={18} />
                                  </Button>
                                </>
                              )}

                              {/* কন্ডিশন ২: Approved থাকলে শুধু Reject বাটন দেখাবে */}
                              {currentStatus === "approved" && (
                                <Button
                                  size="sm"
                                  variant="light"
                                  isIconOnly
                                  className="cursor-pointer text-rose-500 hover:bg-rose-50"
                                  title="Reject Product"
                                  onClick={() => handleReject(mongoId)}
                                >
                                  <FiXCircle size={18} />
                                </Button>
                              )}

                              {/* কন্ডিশন ৩: Rejected থাকলে শুধু Approve বাটন দেখাবে */}
                              {currentStatus === "rejected" && (
                                <Button
                                  size="sm"
                                  variant="light"
                                  isIconOnly
                                  className="cursor-pointer text-emerald-600 hover:bg-emerald-50"
                                  title="Approve Product"
                                  onClick={() => handleApprove(mongoId)}
                                >
                                  <FiCheckCircle size={18} />
                                </Button>
                              )}

                              {/* ডিলিট বাটন সবসময় থাকবে */}
                              <Button
                                size="sm"
                                variant="light"
                                isIconOnly
                                className="cursor-pointer text-slate-400 hover:text-red-500 hover:bg-red-50"
                                title="Delete Listing Permanently"
                                onClick={() => handleDelete(mongoId)}
                              >
                                <FiTrash2 size={16} />
                              </Button>

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