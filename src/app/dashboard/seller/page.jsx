"use client"
import SellerDashboardStats from '@/components/dashboard/SellerDashboardStats';
import { useSession } from '@/lib/auth-client';
import { Spinner } from '@heroui/react';
// import { div } from 'framer-motion/client';
import React from 'react';
// import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";


const SellerDashboardPage = () => {

  const { data: session, isPending } = useSession();

  if(isPending) {
    return <div>      <div className="flex flex-col items-center pt-60 gap-2">
        <Spinner size="lg" className='text-teal-900'/>
      </div>
</div>
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