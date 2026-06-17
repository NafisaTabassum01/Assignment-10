// "use client";

// import React, { useState } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation"; 
// import { 
//   Button, 
//   Dropdown, 
//   Label 
// } from "@heroui/react";
// import { 
//   FaHome, 
//   FaBoxes, 
//   FaFolderOpen, 
//   FaThLarge, 
//   FaUser, 
//   FaCog, 
//   FaShoppingBag, 
//   FaSignOutAlt, 
//   FaChevronDown 
// } from "react-icons/fa";

// export default function Navbar() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const pathname = usePathname(); 

//   // FIX: বাটনটি দেখার জন্য ডিফল্ট স্টেট null করে দেওয়া হয়েছে।
//   // প্রোফাইল দেখতে চাইলে আবার আগের মতো অবজেক্টটি বসিয়ে দিতে পারেন।
//   const [user, setUser] = useState(null);

//   const handleLogout = () => {
//     console.log("Logging out user...");
//     setUser(null);
//   };

//   const isActive = (path) => {
//     if (path === "/") {
//       return pathname === "/";
//     }
//     return pathname.startsWith(path);
//   };

//   return (
//     <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white shadow-sm h-20">
//       <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
//         {/* --- Left Side: Mobile Hamburger Menu Toggle --- */}
//         <div className="flex lg:hidden">
//           <button
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//             type="button"
//             className="inline-flex items-center justify-center p-2 rounded-md text-slate-500 hover:text-slate-700 hover:bg-slate-100 focus:outline-none"
//             aria-label="Toggle Main Menu"
//           >
//             {isMenuOpen ? (
//               <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             ) : (
//               <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
//               </svg>
//             )}
//           </button>
//         </div>

//         {/* --- Brand Logo Area --- */}
//         <div className="flex items-center">
//           <Link href="/" className="flex items-center gap-2">
//             <svg width="36" height="36" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
//               <defs>
//                 <linearGradient id="logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
//                   <stop offset="0%" stopColor="#0284c7" />
//                   <stop offset="100%" stopColor="#10b981" />
//                 </linearGradient>
//               </defs>
//               <path 
//                 d="M80 50C80 66.5685 66.5685 80 50 80C33.4315 80 20 66.5685 20 50C20 33.4315 33.4315 20 50 20C62.5 20 73.2 27.6 77.5 38.5L61 44C59 39.5 54.8 36.5 50 36.5C42.5 36.5 36.5 42.5 36.5 50C36.5 57.5 42.5 63.5 50 63.5C56.5 63.5 61.8 59 63.2 53H50V41H80V50Z" 
//                 fill="url(#logo-grad)" 
//               />
//             </svg>
//             <div className="flex flex-col">
//               <span className="font-bold text-xl tracking-tight text-slate-800 leading-none">GLOBALTECH</span>
//               <span className="text-[11px] text-slate-500 font-medium tracking-wide mt-0.5">Solutions</span>
//             </div>
//           </Link>
//         </div>

//         {/* --- Center Section: Dynamic Desktop Menu Links --- */}
//         <ul className="hidden lg:flex items-center gap-8 list-none m-0 p-0 h-full">
//           <li className="h-full flex items-center">
//             <Link 
//               href="/" 
//               className={`flex items-center gap-1.5 text-base font-medium transition-all h-full border-b-2 mt-[2px] ${
//                 isActive("/") 
//                   ? "text-[#38A3A5] border-[#38A3A5] font-semibold" 
//                   : "text-slate-600 border-transparent hover:text-[#38A3A5]"
//               }`}
//             >
//               <FaHome className={isActive("/") ? "text-[#38A3A5]" : "text-slate-400"} /> Home
//             </Link>
//           </li>
//           <li className="h-full flex items-center">
//             <Link 
//               href="/products" 
//               className={`flex items-center gap-1.5 text-base font-medium transition-all h-full border-b-2 mt-[2px] ${
//                 isActive("/products") 
//                   ? "text-[#38A3A5] border-[#38A3A5] font-semibold" 
//                   : "text-slate-600 border-transparent hover:text-[#38A3A5]"
//               }`}
//             >
//               <FaBoxes className={isActive("/products") ? "text-[#38A3A5]" : "text-slate-400"} /> Products
//             </Link>
//           </li>
//           <li className="h-full flex items-center">
//             <Link 
//               href="/categories" 
//               className={`flex items-center gap-1.5 text-base font-medium transition-all h-full border-b-2 mt-[2px] ${
//                 isActive("/categories") 
//                   ? "text-[#38A3A5] border-[#38A3A5] font-semibold" 
//                   : "text-slate-600 border-transparent hover:text-[#38A3A5]"
//               }`}
//             >
//               <FaFolderOpen className={isActive("/categories") ? "text-[#38A3A5]" : "text-slate-400"} /> Categories
//             </Link>
//           </li>
//           <li className="h-full flex items-center">
//             <Link 
//               href="/dashboard" 
//               className={`flex items-center gap-1.5 text-base font-medium transition-all h-full border-b-2 mt-[2px] ${
//                 isActive("/dashboard") 
//                   ? "text-[#38A3A5] border-[#38A3A5] font-semibold" 
//                   : "text-slate-600 border-transparent hover:text-[#38A3A5]"
//               }`}
//             >
//               <FaThLarge className={isActive("/dashboard") ? "text-[#38A3A5]" : "text-slate-400"} /> Dashboard
//             </Link>
//           </li>
//         </ul>

//         {/* --- Right Section: Actions Context --- */}
//         <div className="flex items-center gap-4">
          
//           {/* লার্জ স্ক্রিনে বাটন (ইউজার নাল থাকলে দেখাবে) */}
//           {!user && (
//             <div className="hidden lg:block">
//               <Link href="/login" className="bg-[#22577A] text-white py-2 px-5 rounded text-[16px] font-medium transition-opacity hover:opacity-90 block">
//                 Login/Register
//               </Link>
//             </div>
//           )}

//           {/* ইউজার লগইন করা থাকলে প্রোফাইল ড্রপডাউন দেখাবে */}
//           {user && (
//             <div>
//               <Dropdown>
//                 <Dropdown.Trigger>
//                   <div 
//                     role="button"
//                     aria-label="User Dropdown Menu" 
//                     className="p-1 rounded-md text-slate-700 bg-transparent hover:bg-slate-50 transition-colors flex items-center gap-2 cursor-pointer select-none"
//                   >
//                     <div className="relative flex items-center">
//                       {/* eslint-disable-next-line @next/next/no-img-element */}
//                       <img 
//                         src={user.photo} 
//                         alt={user.name} 
//                         className="w-9 h-9 rounded-full object-cover border border-slate-200"
//                       />
//                       <span className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-2 h-2 bg-emerald-500 border border-white rounded-full"></span>
//                       <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-2 h-2 bg-emerald-500 border border-white rounded-full"></span>
//                     </div>
//                     <div className="flex items-center gap-1">
//                       <span className="font-medium text-sm">{user.name}</span>
//                       <FaChevronDown className="text-[10px] text-slate-500" />
//                     </div>
//                   </div>
//                 </Dropdown.Trigger>
                
//                 <Dropdown.Popover>
//                   <Dropdown.Menu 
//                     aria-label="User Actions Options"
//                     className="w-48 bg-white border border-slate-100 rounded-md shadow-lg p-1"
//                     onAction={(key) => {
//                       if (key === "logout") handleLogout();
//                     }}
//                   >
//                     <Dropdown.Item id="profile" textValue="My Profile" className="hover:bg-slate-50 rounded">
//                       <Link href="/dashboard/profile" className="flex items-center gap-2.5 px-2 py-1.5 w-full text-slate-700">
//                         <FaUser className="text-slate-400 text-sm" />
//                         <Label className="cursor-pointer font-normal text-slate-700">My Profile</Label>
//                       </Link>
//                     </Dropdown.Item>

//                     <Dropdown.Item id="settings" textValue="Settings" className="hover:bg-slate-50 rounded">
//                       <Link href="/dashboard/settings" className="flex items-center gap-2.5 px-2 py-1.5 w-full text-slate-700">
//                         <FaCog className="text-slate-400 text-sm" />
//                         <Label className="cursor-pointer font-normal text-slate-700">Settings</Label>
//                       </Link>
//                     </Dropdown.Item>

//                     <Dropdown.Item id="orders" textValue="Orders" className="hover:bg-slate-50 rounded">
//                       <Link href="/dashboard/my-orders" className="flex items-center gap-2.5 px-2 py-1.5 w-full text-slate-700">
//                         <FaShoppingBag className="text-slate-400 text-sm" />
//                         <Label className="cursor-pointer font-normal text-slate-700">Orders</Label>
//                       </Link>
//                     </Dropdown.Item>

//                     <Dropdown.Item id="logout" textValue="Logout" variant="danger" className="hover:bg-red-50 rounded">
//                       <Link href="/login" className="flex items-center gap-2.5 px-2 py-1.5 w-full text-red-600">
//                         <FaSignOutAlt className="text-red-400 text-sm" />
//                         <Label className="cursor-pointer font-normal text-red-600">Logout</Label>
//                       </Link>
//                     </Dropdown.Item>
//                   </Dropdown.Menu>
//                 </Dropdown.Popover>
//               </Dropdown>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* --- Mobile/Tablet Sidebar Drawer Menu --- */}
//       {isMenuOpen && (
//         <div className="lg:hidden bg-white/95 backdrop-blur-md border-b border-slate-200 w-full absolute left-0 right-0 top-20 z-40 px-6 py-4 shadow-xl">
//           <ul className="flex flex-col gap-1 list-none m-0 p-0">
//             <li>
//               <Link 
//                 href="/" 
//                 onClick={() => setIsMenuOpen(false)}
//                 className={`flex items-center gap-3 w-full py-3 text-base font-semibold border-b border-slate-100 ${
//                   isActive("/") ? "text-[#38A3A5]" : "text-slate-700"
//                 }`}
//               >
//                 <FaHome className={isActive("/") ? "text-[#38A3A5]" : "text-slate-400"} /> Home
//               </Link>
//             </li>
//             <li>
//               <Link 
//                 href="/products" 
//                 onClick={() => setIsMenuOpen(false)}
//                 className={`flex items-center gap-3 w-full py-3 text-base font-semibold border-b border-slate-100 ${
//                   isActive("/products") ? "text-[#38A3A5]" : "text-slate-700"
//                 }`}
//               >
//                 <FaBoxes className={isActive("/products") ? "text-[#38A3A5]" : "text-slate-400"} /> Products
//               </Link>
//             </li>
//             <li>
//               <Link 
//                 href="/categories" 
//                 onClick={() => setIsMenuOpen(false)}
//                 className={`flex items-center gap-3 w-full py-3 text-base font-semibold border-b border-slate-100 ${
//                   isActive("/categories") ? "text-[#38A3A5]" : "text-slate-700"
//                 }`}
//               >
//                 <FaFolderOpen className={isActive("/categories") ? "text-[#38A3A5]" : "text-slate-400"} /> Categories
//               </Link>
//             </li>
//             <li>
//               <Link 
//                 href="/dashboard" 
//                 onClick={() => setIsMenuOpen(false)}
//                 className={`flex items-center gap-3 w-full py-3 text-base font-semibold border-b border-slate-100 ${
//                   isActive("/dashboard") ? "text-[#38A3A5]" : "text-slate-700"
//                 }`}
//               >
//                 <FaThLarge className={isActive("/dashboard") ? "text-[#38A3A5]" : "text-slate-400"} /> Dashboard
//               </Link>
//             </li>

//             {/* ছোট স্ক্রিনে ড্রয়ার অন করলে বাটনটি এখানে নিচে দেখা যাবে */}
//             {!user && (
//               <li className="mt-4">
//                 <Link 
//                   href="/login" 
//                   onClick={() => setIsMenuOpen(false)}
//                   className="bg-[#22577A] text-white py-3 px-4 rounded text-[16px] font-medium text-center block transition-opacity hover:opacity-90 w-full"
//                 >
//                   Login/Register
//                 </Link>
//               </li>
//             )}
//           </ul>
//         </div>
//       )}
//     </nav>
//   );
// }
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; 
import { 
  Button, 
  Dropdown, 
  Label 
} from "@heroui/react";
import { 
  FaHome, 
  FaBoxes,         // Stable in 'fa'
  FaFolderOpen, 
  FaThLarge,       // Stable in 'fa'
  FaUser, 
  FaCog,           // Stable in 'fa'
  FaShoppingBag,   // Stable in 'fa'
  FaSignOutAlt,    // Stable in 'fa'
  FaChevronDown 
} from "react-icons/fa"; // Switched back to standard 'fa' pack for 100% stability

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname(); 
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    console.log("Logging out user...");
    setUser(null);
  };

  const isActive = (path) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white shadow-sm h-20">
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* --- Left Side: Mobile Hamburger Menu Toggle --- */}
        <div className="flex lg:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            type="button"
            className="inline-flex items-center justify-center p-2 rounded-md text-slate-500 hover:text-slate-700 hover:bg-slate-100 focus:outline-none"
            aria-label="Toggle Main Menu"
          >
            {isMenuOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* --- Brand Logo Area --- */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-linear-to-br from-[#0284c7] to-[#10b981] text-white shadow-md shadow-sky-500/20">
              <FaShoppingBag size={18} />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl tracking-tight text-[#22577A] leading-none">ReSell Hub</span>
              {/* <span className="text-[11px] text-slate-500 font-medium tracking-wide mt-0.5"></span> */}
            </div>
          </Link>
        </div>

        {/* --- Center Section: Dynamic Desktop Menu Links --- */}
        <ul className="hidden lg:flex items-center gap-8 list-none m-0 p-0 h-full">
          <li className="h-full flex items-center">
            <Link 
              href="/" 
              className={`flex items-center gap-1.5 text-base font-medium transition-all h-full border-b-2 mt-[2px] ${
                isActive("/") 
                  ? "text-[#38A3A5] border-[#38A3A5] font-semibold" 
                  : "text-slate-600 border-transparent hover:text-[#38A3A5]"
              }`}
            >
              <FaHome className={isActive("/") ? "text-[#38A3A5]" : "text-slate-400"} /> Home
            </Link>
          </li>
          <li className="h-full flex items-center">
            <Link 
              href="/products" 
              className={`flex items-center gap-1.5 text-base font-medium transition-all h-full border-b-2 mt-[2px] ${
                isActive("/products") 
                  ? "text-[#38A3A5] border-[#216869] font-semibold" 
                  : "text-slate-600 border-transparent hover:text-[#38A3A5]"
              }`}
            >
              <FaBoxes className={isActive("/products") ? "text-[#38A3A5]" : "text-slate-400"} /> Products
            </Link>
          </li>
          <li className="h-full flex items-center">
            <Link 
              href="/categories" 
              className={`flex items-center gap-1.5 text-base font-medium transition-all h-full border-b-2 mt-[2px] ${
                isActive("/categories") 
                  ? "text-[#38A3A5] border-[#38A3A5] font-semibold" 
                  : "text-slate-600 border-transparent hover:text-[#38A3A5]"
              }`}
            >
              <FaFolderOpen className={isActive("/categories") ? "text-[#38A3A5]" : "text-slate-400"} /> Categories
            </Link>
          </li>
          <li className="h-full flex items-center">
            <Link 
              href="/dashboard" 
              className={`flex items-center gap-1.5 text-base font-medium transition-all h-full border-b-2 mt-[2px] ${
                isActive("/dashboard") 
                  ? "text-[#38A3A5] border-[#38A3A5] font-semibold" 
                  : "text-slate-600 border-transparent hover:text-[#38A3A5]"
              }`}
            >
              <FaThLarge className={isActive("/dashboard") ? "text-[#38A3A5]" : "text-slate-400"} /> Dashboard
            </Link>
          </li>
        </ul>

        {/* --- Right Section: Actions Context --- */}
        <div className="flex items-center gap-4">
          
          {!user && (
            <div className="hidden lg:block">
              <Link href="/login" className="bg-[#22577A] text-white py-2 px-5 rounded text-[16px] font-medium transition-opacity hover:opacity-90 block">
                Login/Register
              </Link>
            </div>
          )}

          {user && (
            <div>
              <Dropdown>
                <Dropdown.Trigger>
                  <div 
                    role="button"
                    aria-label="User Dropdown Menu" 
                    className="p-1 rounded-md text-slate-700 bg-transparent hover:bg-slate-50 transition-colors flex items-center gap-2 cursor-pointer select-none"
                  >
                    <div className="relative flex items-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src={user.photo} 
                        alt={user.name} 
                        className="w-9 h-9 rounded-full object-cover border border-slate-200"
                      />
                      <span className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-2 h-2 bg-emerald-500 border border-white rounded-full"></span>
                      <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-2 h-2 bg-emerald-500 border border-white rounded-full"></span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="font-medium text-sm">{user.name}</span>
                      <FaChevronDown className="text-[10px] text-slate-500" />
                    </div>
                  </div>
                </Dropdown.Trigger>
                
                <Dropdown.Popover>
                  <Dropdown.Menu 
                    aria-label="User Actions Options"
                    className="w-48 bg-white border border-slate-100 rounded-md shadow-lg p-1"
                    onAction={(key) => {
                      if (key === "logout") handleLogout();
                    }}
                  >
                    <Dropdown.Item id="profile" textValue="My Profile" className="hover:bg-slate-50 rounded">
                      <Link href="/dashboard/profile" className="flex items-center gap-2.5 px-2 py-1.5 w-full text-slate-700">
                        <FaUser className="text-slate-400 text-sm" />
                        <Label className="cursor-pointer font-normal text-slate-700">My Profile</Label>
                      </Link>
                    </Dropdown.Item>

                    <Dropdown.Item id="settings" textValue="Settings" className="hover:bg-slate-50 rounded">
                      <Link href="/dashboard/settings" className="flex items-center gap-2.5 px-2 py-1.5 w-full text-slate-700">
                        <FaCog className="text-slate-400 text-sm" />
                        <Label className="cursor-pointer font-normal text-slate-700">Settings</Label>
                      </Link>
                    </Dropdown.Item>

                    <Dropdown.Item id="orders" textValue="Orders" className="hover:bg-slate-50 rounded">
                      <Link href="/dashboard/my-orders" className="flex items-center gap-2.5 px-2 py-1.5 w-full text-slate-700">
                        <FaShoppingBag className="text-slate-400 text-sm" />
                        <Label className="cursor-pointer font-normal text-slate-700">Orders</Label>
                      </Link>
                    </Dropdown.Item>

                    <Dropdown.Item id="logout" textValue="Logout" variant="danger" className="hover:bg-red-50 rounded">
                      <Link href="/login" className="flex items-center gap-2.5 px-2 py-1.5 w-full text-red-600">
                        <FaSignOutAlt className="text-red-400 text-sm" />
                        <Label className="cursor-pointer font-normal text-red-600">Logout</Label>
                      </Link>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown.Popover>
              </Dropdown>
            </div>
          )}
        </div>
      </div>

      {/* --- Mobile/Tablet Sidebar Drawer Menu --- */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-md border-b border-slate-200 w-full absolute left-0 right-0 top-20 z-40 px-6 py-4 shadow-xl">
          <ul className="flex flex-col gap-1 list-none m-0 p-0">
            <li>
              <Link 
                href="/" 
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center gap-3 w-full py-3 text-base font-semibold border-b border-slate-100 ${
                  isActive("/") ? "text-[#38A3A5]" : "text-slate-700"
                }`}
              >
                <FaHome className={isActive("/") ? "text-[#38A3A5]" : "text-slate-400"} /> Home
              </Link>
            </li>
            <li>
              <Link 
                href="/products" 
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center gap-3 w-full py-3 text-base font-semibold border-b border-slate-100 ${
                  isActive("/products") ? "text-[#38A3A5]" : "text-slate-700"
                }`}
              >
                <FaBoxes className={isActive("/products") ? "text-[#38A3A5]" : "text-slate-400"} /> Products
              </Link>
            </li>
            <li>
              <Link 
                href="/categories" 
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center gap-3 w-full py-3 text-base font-semibold border-b border-slate-100 ${
                  isActive("/categories") ? "text-[#38A3A5]" : "text-slate-700"
                }`}
              >
                <FaFolderOpen className={isActive("/categories") ? "text-[#38A3A5]" : "text-slate-400"} /> Categories
              </Link>
            </li>
            <li>
              <Link 
                href="/dashboard" 
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center gap-3 w-full py-3 text-base font-semibold border-b border-slate-100 ${
                  isActive("/dashboard") ? "text-[#38A3A5]" : "text-slate-700"
                }`}
              >
                <FaThLarge className={isActive("/dashboard") ? "text-[#38A3A5]" : "text-slate-400"} /> Dashboard
              </Link>
            </li>

            {!user && (
              <li className="mt-4">
                <Link 
                  href="/login" 
                  onClick={() => setIsMenuOpen(false)}
                  className="bg-[#22577A] text-white py-3 px-4 rounded text-[16px] font-medium text-center block transition-opacity hover:opacity-90 w-full"
                >
                  Login/Register
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}