// "use client"

import {Bars, House, Magnifier, Person} from "@gravity-ui/icons";
import {Button, Drawer} from "@heroui/react";
import { IoMdAdd } from "react-icons/io";
import { AiOutlineProduct } from "react-icons/ai";
// import { MdManageHistory } from "react-icons/md";
import { IoMdStats } from "react-icons/io";
import Link from "next/link";
import { FaShoppingBag } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { FaRegHeart } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { MdManageAccounts } from "react-icons/md";
import { MdManageHistory } from "react-icons/md";
import { HiOutlineShoppingBag } from "react-icons/hi2";




export async function DashBoardSidebar() {
    // const { data: session, isPending } = useSession();
    //   const user = session?.user ?? null;
    //   console.log(user)
    const session = await auth.api.getSession({
      headers : await headers()
    })
    const user = session?.user
    const role= user?.role || 'buyer'
          console.log(user)


    const dashboardItem = {
      seller : [
      {icon: House, href:"/dashboard/seller" ,label: "Overview"},
    {icon: Person, href:"/dashboard/seller/sellerProfile" , label: "Profile"},
    // {icon: Magnifier, href:"/Search" ,  label: "Search"},
    {icon: IoMdAdd , href:"/dashboard/seller/addProducts" ,  label: "Add Product"},
    {icon: AiOutlineProduct , href:"/dashboard/seller/products" , label: "My Products"},
    {icon: MdManageHistory, href:"/dashboard/seller/manageOrder" ,label: "Manage Orders"},
    {icon: IoMdStats, href:"/dashboard/seller/salesAnalytics", label: "Sales Analytics"},

      ],
      buyer : [
      {icon: House, href:"/dashboard/buyer" ,label: "Overview"},
    {icon: Person, href:"/dashboard/buyer/profile" , label: "Profile"},
    // {icon: Magnifier, href:"/Search" ,  label: "Search"},
    {icon: FaCartShopping , href:"/dashboard/buyer/myOrder" ,  label: "My Orders"},
    {icon: FaRegHeart , href:"/dashboard/buyer/wishlist" , label: "Wishlist"},
    {icon: MdManageHistory, href:"/dashboard/buyer/paymentHistory" ,label: "Payment History"},
    // {icon: IoMdStats, href:"/salesAnalytics", label: "Sales Analytics"},

      ],
      admin : [
      {icon: House, href:"/dashboard/admin" ,label: "Overview"},
    {icon: MdManageAccounts, href:"/dashboard/admin/manageUsers" , label: "Manage Users"},
    // {icon: Magnifier, href:"/Search" ,  label: "Search"},
    {icon: MdManageHistory , href:"/dashboard/admin/manageOrders" ,  label: "Manage Orders"},
    {icon: HiOutlineShoppingBag , href:"/dashboard/admin/manageProduct" , label: "Manage Product"},
    {icon: IoMdStats, href:"/dashboard/admin/salesAnalytics", label: "Platform Analytics"},
    // {icon: MdManageHistory, href:"/paymentHistory" ,label: "Payment History"},

      ]
    }
  const navItems= dashboardItem[role]





  // const navItems= [
  //   {icon: House, href:"/dashboard/seller" ,label: "Home"},
  //   {icon: Person, href:"/dashboard/seller/sellerProfile" , label: "Profile"},
  //   {icon: Magnifier, href:"/Search" ,  label: "Search"},
  //   {icon: IoMdAdd , href:"/dashboard/seller/addProducts" ,  label: "Add Product"},
  //   {icon: AiOutlineProduct , href:"/dashboard/seller/products" , label: "My Products"},
  //   {icon: MdManageHistory, href:"/manageOrders" ,label: "Manage Orders"},
  //   {icon: IoMdStats, href:"/salesAnalytics", label: "Sales Analytics"},

  // ];

  const navContent = <nav className="flex flex-col gap-1">

                <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-sky-600 to-emerald-500 text-white">
            <FaShoppingBag />
          </div>
          <span className="font-bold text-xl text-[#22577A]">
            NEXTMART
          </span>
        </Link>

                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
                    href={item.href}
                  >
                    <item.icon className="size-5 text-muted" />
                    {item.label}
                  </Link>
                ))}
              </nav>


  return (
    <>
   <aside className="hidden lg:block w-64 shrink-0 border-r border-default p-4">{navContent}</aside>

    <Drawer>
      <Button className="lg:hidden" variant="secondary">
        <Bars />
        Sidebar
      </Button>
      <Drawer.Backdrop>
        <Drawer.Content placement="left">
          <Drawer.Dialog>
            <Drawer.CloseTrigger />
            <Drawer.Header>
              <Drawer.Heading> Navigation</Drawer.Heading>
            </Drawer.Header>
            <Drawer.Body>
            
         {navContent}

            </Drawer.Body>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
    </>
  );
}