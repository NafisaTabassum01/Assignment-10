"use client"
import SellerDashboardStats from '@/components/dashboard/SellerDashboardStats';
import { useSession } from '@/lib/auth-client';
import { div } from 'framer-motion/client';
import React from 'react';

const SellerDashboardPage = () => {

  const { data: session, isPending } = useSession();

  if(isPending) {
    return <div>Loading...</div>
  }
  const user = session?.user;

    return (
        <div>
            <h2 className='pl-5 text-2xl font-semibold'>Welcome back, {user?.name}</h2>
            <SellerDashboardStats></SellerDashboardStats>
        </div>
    );
};

export default SellerDashboardPage;