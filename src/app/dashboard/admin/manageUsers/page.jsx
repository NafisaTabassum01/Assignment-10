"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Table, Chip, Button, Spinner } from "@heroui/react";
import { FiSearch, FiSliders, FiTrash2, FiUserCheck, FiUserX } from "react-icons/fi";

export default function ManageUsersPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(searchParams.get("search") || "");

  // URL Query State Handling (তোর ফিল্টার মেকানিজম)
  const handleSearchSubmit = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (search.trim()) params.set("search", search.trim());
    else params.delete("search");
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const handleRoleFilterChange = (value) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set("role", value);
    else params.delete("role");
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const fetchUsers = () => {
    setLoading(true);
    const searchUrl = searchParams.get("search") || "";
    const roleUrl = searchParams.get("role") || "";

    fetch(`http://localhost:5000/api/admin/users?search=${searchUrl}&role=${roleUrl}`)
      .then((res) => res.json())
      .then((resData) => {
        if (resData.success) {
          setUsers(resData.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, [searchParams]);

  // Block/Unblock Toggle Handler
  const handleToggleStatus = async (userId, currentStatus) => {
    const nextStatus = currentStatus === "Blocked" ? "Active" : "Blocked";
    try {
      const res = await fetch("http://localhost:5000/api/admin/users/status", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: userId, status: nextStatus }),
      });
      const data = await res.json();
      if (data.success) fetchUsers(); 
    } catch (err) {
      console.error(err);
    }
  };

  // Permanently Delete Handler
  const handleDeleteUser = async (userId) => {
    if (!confirm("Are you sure you want to delete this user account permanently from the platform?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/admin/users/${userId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full lg:w-11/12 mx-auto p-4 flex flex-col gap-6">
      
      {/* 📝 পেজ হেডার */}
      <div>
        <h2 className="text-2xl font-bold text-[#22577A]">Manage Users</h2>
        <p className="text-sm text-slate-500">Monitor all registered users, filter by account role, block or remove system credentials.</p>
      </div>



<div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-5 flex items-center justify-between">
  <div>
    <p className="text-sm text-slate-500 font-medium">
      Total Registered Users
    </p>

    <h2 className="text-3xl font-bold text-[#22577A] mt-1">
      {loading ? (
        <span className="text-xl">...</span>
      ) : (
        users.length
      )}
    </h2>

    <p className="text-xs text-slate-400 mt-1">
      Showing all platform accounts
    </p>
  </div>

  <div className="w-14 h-14 rounded-2xl bg-[#22577A]/10 flex items-center justify-center">
    <FiUserCheck className="text-[#22577A] text-3xl" />
  </div>
</div>



      {/* 🔍 সার্চ এবং ফিল্টার বার */}
      <div className="p-3 bg-white border border-gray-100 shadow-xl rounded-2xl flex flex-col md:flex-row gap-3 items-center">
        <div className="hidden lg:flex items-center gap-1.5 shrink-0 text-[#216869] border-r border-slate-100 pr-3 h-6">
          <FiSliders className="text-[#38A3A5] size-3.5" />
          <span className="text-[10px] font-black uppercase tracking-wider">Filters:</span>
        </div>

        {/* সার্চ ইনপুট */}
        <div className="relative flex items-center border border-slate-200 rounded-xl h-10 bg-white focus-within:border-[#38A3A5] transition-all overflow-hidden w-full md:flex-[1.5]">
          <div className="pl-4 shrink-0">
            <FiSearch className="text-[#38A3A5] size-4" />
          </div>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearchSubmit()}
            className="flex-1 h-full px-3 outline-none bg-transparent text-xs text-slate-700 placeholder:text-slate-400 min-w-0"
            placeholder="Search users by name or email..."
          />
          <button
            onClick={handleSearchSubmit}
            className="h-7 p-2 mr-1.5 rounded-lg bg-[#22577A] text-white text-xs font-semibold hover:bg-[#216869] transition-colors whitespace-nowrap"
          >
            Search
          </button>
        </div>

        {/* রোল ফিল্টার */}
        <div className="w-full md:w-auto md:flex-1 min-w-[150px]">
          <select
            className="w-full h-10 border border-slate-200 rounded-xl px-3 text-xs bg-white text-slate-600 outline-none focus:border-[#38A3A5] transition-all cursor-pointer shadow-sm"
            onChange={(e) => handleRoleFilterChange(e.target.value)}
            value={searchParams.get("role") || ""}
          >
            <option value="">All Account Roles</option>
            <option value="buyer">Buyers</option>
            <option value="seller">Sellers</option>
            <option value="admin">Admins</option>
          </select>
        </div>
      </div>

      {/* 📊 ইউজার ম্যানেজমেন্ট টেবিল */}
      {loading ? (
        <div className="flex justify-center py-20">
          <Spinner size="lg" className="text-teal-600" />
        </div>
      ) : (
        <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
          <Table aria-label="Platform main users control panel">
            <Table.ScrollContainer>
              <Table.Content aria-label="Main Users Database" className="min-w-[600px] p-2">
                
                <Table.Header>
                  <Table.Column isRowHeader className="bg-slate-50/80 text-[#22577A] font-bold">USER DETAILS</Table.Column>
                  <Table.Column className="bg-slate-50/80 text-[#22577A] font-bold">ROLE</Table.Column>
                  <Table.Column className="bg-slate-50/80 text-[#22577A] font-bold">STATUS</Table.Column>
                  <Table.Column className="bg-slate-50/80 text-[#22577A] font-bold text-center">ACTIONS</Table.Column>
                </Table.Header>

                <Table.Body>
                  {users.length === 0 ? (
                    <Table.Row>
                      <Table.Cell colSpan={4} className="text-center py-10 text-slate-400 font-medium">
                        No user accounts found in the database.
                      </Table.Cell>
                    </Table.Row>
                  ) : (
                    users.map((user) => {
                      const mongoId = user._id;

                      return (
                        <Table.Row key={String(user._id)} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
                          {/* ১. ইউজার ইনফো */}
                          <Table.Cell>
                            <div className="flex flex-col">
                              <span className="text-sm font-bold text-slate-800">{user.name || "Anonymous User"}</span>
                              <span className="text-xs text-slate-400 font-medium">{user.email}</span>
                            </div>
                          </Table.Cell>
                          
                          {/* ২. রোল চিপ */}
                          <Table.Cell>
                            <Chip
                              size="sm"
                              variant="flat"
                              className="font-bold text-xs uppercase"
                              color={
                                user.role === "admin" ? "danger" :
                                user.role === "seller" ? "secondary" : "primary"
                              }
                            >
                              {user.role || "User"}
                            </Chip>
                          </Table.Cell>

                          {/* ৩. স্ট্যাটাস চিপ */}
                          <Table.Cell>
                            <Chip
                              size="sm"
                              variant="dot"
                              className="font-semibold text-xs"
                              color={user.status === "Blocked" ? "danger" : "success"}
                            >
                                {user.status || "Active"}

                            </Chip>
                          </Table.Cell>

                          {/* ৪. অ্যাকশন কন্ট্রোল */}
                          <Table.Cell>
                            <div className="flex items-center justify-center gap-2">
                              {/* ব্লক/আনব্লক বাটন */}
                              <Button
                                size="sm"
                                variant="light"
                                isIconOnly
                                className="cursor-pointer text-slate-600 hover:text-amber-500"
                                title={user.status === "Blocked" ? "Unblock Account" : "Block Account"}
                                onClick={() => handleToggleStatus(user._id, user.status  || "Active")}
                                disabled={user.role === "admin"} // অ্যাডমিন নিজেকে নিজে ব্লক করা লক রাখলাম
                              >
                                {user.status === "Blocked" ? <FiUserCheck size={16} /> : <FiUserX size={16} />}
                              </Button>

                              {/* ডিলিট বাটন */}
                              <Button
                                size="sm"
                                variant="light"
                                isIconOnly
                                className="cursor-pointer text-slate-400 hover:text-red-500 hover:bg-red-50"
                                title="Delete User Permanently"
                                onClick={() => handleDeleteUser(user._id)}
                                disabled={user.role === "admin"} // অ্যাডমিন ডিলিট করা প্রোটেক্টেড
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