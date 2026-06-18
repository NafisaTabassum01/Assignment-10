import { DashBoardSidebar } from '@/components/dashboard/DashBoardSidebar';
import React from 'react';

const DashboardLayout = ({children}) => {
    return (
        <div className='flex min-h-screen'>
            <DashBoardSidebar></DashBoardSidebar>
            <div className='flex-1'>{children}</div>
            
        </div>
    );
};

export default DashboardLayout;