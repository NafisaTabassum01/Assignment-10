import DashBoardNavbar from '@/components/dashboard/DashBoardNavbar';
import { DashBoardSidebar } from '@/components/dashboard/DashBoardSidebar';
import React from 'react';

const DashboardLayout = ({children}) => {
    return (
        <div className='flex min-h-screen'>
            <DashBoardSidebar></DashBoardSidebar>
            <div className='flex-1'>
                <DashBoardNavbar></DashBoardNavbar>
                
                {children}</div>
            
        </div>
    );
};

export default DashboardLayout;