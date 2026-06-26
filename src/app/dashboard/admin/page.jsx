"use client";

import React from "react";
import { useSession } from "@/lib/auth-client";
import { Spinner } from "@heroui/react";
import AdminDashboardStats from "@/components/dashboard/AdminDashboardStats";

const AdminDashboardPage = () => {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div className="flex flex-col items-center pt-60 gap-2">
        <Spinner size="lg" className="text-teal-900" />
      </div>
    );
  }

  const user = session?.user;

  return (
    <div className="p-6 flex flex-col gap-6">
      <div>
        <h2 className="pl-5 text-2xl font-bold text-[#22577A]">
          Admin Dashboard Overview
        </h2>
        <p className="pl-5 text-sm text-slate-500">
          The admin has full control over the platform.
        </p>
      </div>

      {/* রিয়েল-টাইম অ্যাডমিন স্ট্যাটস কার্ড */}
      <AdminDashboardStats />
    </div>
  );
};

export default AdminDashboardPage;