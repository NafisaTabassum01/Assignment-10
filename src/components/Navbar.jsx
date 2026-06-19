
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
  FaBoxes,         
  FaFolderOpen, 
  FaThLarge,       
  FaUser, 
  FaCog,           
  FaShoppingBag,   
  FaSignOutAlt,    
  FaChevronDown 
} from "react-icons/fa"; 
import { useSession, authClient } from "@/lib/auth-client";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname(); 
  
  // BetterAuth state session integration
  
  const { data: session, isPending } = useSession();
  const user = session?.user;

  // Real secure BetterAuth signout mechanism
  const handleLogout = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            setIsMenuOpen(false);
            window.location.href = "/login"; // Logout er por page auto fully redirected refresh hobe
          },
        },
      });
    } catch (error) {
      console.error("Logout runtime context failure:", error);
    }
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
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#0284c7] to-[#10b981] text-white shadow-md shadow-sky-500/20">
              <FaShoppingBag size={18} />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl tracking-tight text-[#22577A] leading-none">NEXTMART</span>
            </div>
          </Link>
        </div>

        {/* --- Center Section: Desktop Menu Links --- */}
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
                  ? "text-[#38A3A5] border-[#38A3A5] font-semibold" 
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

        {/* --- Right Section: Desktop Actions Context --- */}
        <div className="flex items-center gap-4">
          
          {/* Loading dynamic bypass fallback placeholder state */}
          {!isPending && !user && (
            <div className="hidden lg:block">
              <div className="flex items-center border border-[#22577A] rounded overflow-hidden">
                <Link 
                  href="/login" 
                  className={`py-2 px-5 text-[16px] font-medium transition-all block border-r border-[#22577A] ${
                    pathname === "/login" 
                      ? "bg-[#22577A] text-white" 
                      : "bg-white text-[#22577A] hover:bg-slate-50"
                  }`}
                >
                  Login
                </Link>
                <Link 
                  href="/register" 
                  className={`py-2 px-5 text-[16px] font-medium transition-all block ${
                    pathname === "/register" 
                      ? "bg-[#22577A] text-white" 
                      : "bg-white text-[#22577A] hover:bg-slate-50"
                  }`}
                >
                  Register
                </Link>
              </div>
            </div>
          )}

          {!isPending && user && (
            <div>
              <Dropdown>
                <Dropdown.Trigger>
                  <div 
                    role="button"
                    aria-label="User Dropdown Menu" 
                    className="p-1 rounded-md text-slate-700 bg-transparent hover:bg-slate-50 transition-colors flex items-center gap-2 cursor-pointer select-none"
                  >
                    <div className="relative flex items-center">
                      {/* <img 
                        src={user.image || "https://api.dicebear.com/7.x/avataaars/svg"} 
                        alt={user.name} 
                        className="w-9 h-9 rounded-full object-cover border border-slate-200"
                      /> */}
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
                      <div className="flex items-center gap-2.5 px-2 py-1.5 w-full text-red-600 cursor-pointer">
                        <FaSignOutAlt className="text-red-400 text-sm" />
                        <Label className="cursor-pointer font-normal text-red-600">Logout</Label>
                      </div>
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

            {/* If user logged out on Mobile: Show Login / Register */}
            {!isPending && !user && (
              <li className="mt-4 pt-4 border-t border-slate-100">
                <div className="flex w-full border border-[#22577A] rounded overflow-hidden">
                  <Link 
                    href="/login" 
                    onClick={() => setIsMenuOpen(false)}
                    className={`w-1/2 py-3 text-[16px] font-medium text-center transition-all block border-r border-[#22577A] ${
                      pathname === "/login" 
                        ? "bg-[#22577A] text-white" 
                        : "bg-white text-[#22577A] active:bg-slate-50"
                    }`}
                  >
                    Login
                  </Link>
                  <Link 
                    href="/register" 
                    onClick={() => setIsMenuOpen(false)}
                    className={`w-1/2 py-3 text-[16px] font-medium text-center transition-all block ${
                      pathname === "/register" 
                        ? "bg-[#22577A] text-white" 
                        : "bg-white text-[#22577A] active:bg-slate-50"
                    }`}
                  >
                    Register
                  </Link>
                </div>
              </li>
            )}

            {/* If user logged in on Mobile: Show User Profile Info & Logout option */}
            {!isPending && user && (
              <li className="mt-4 pt-4 border-t border-slate-100 flex flex-col gap-4">
                <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl">
                  {/* <img 
                    src={user.image || "https://api.dicebear.com/7.x/avataaars/svg"} 
                    alt={user.name} 
                    className="w-10 h-10 rounded-full object-cover border border-slate-200"
                  /> */}
                  <div className="flex flex-col">
                    <span className="font-semibold text-sm text-slate-800">{user.name}</span>
                    <span className="text-xs text-slate-500 truncate max-w-[180px]">{user.email}</span>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full py-3 rounded-xl bg-red-50 text-red-600 font-semibold text-sm transition-all hover:bg-red-100 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <FaSignOutAlt size={14} /> Secure Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}