"use client";

import React from "react";
import Link from "next/link";
import { 
  FaFacebookF, 
  FaTwitter, 
  FaLinkedinIn, 
  FaInstagram, 
  FaMapMarkerAlt, 
  FaPhoneAlt, 
  FaEnvelope, 
  FaShoppingBag
} from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#22577A] text-white border-t border-slate-700/30">
      {/* --- Main Footer Grid Content --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* 1. Brand Information */}
          <div className="flex flex-col gap-4">
           
           <Link href="/" className="flex items-center gap-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-linear-to-br from-[#0284c7] to-[#10b981] text-white shadow-md shadow-sky-500/20">
              <FaShoppingBag size={18} />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-2xl tracking-tight text-white leading-none">NEXTMART</span>
            </div>
          </Link>
            <p className="text-slate-200 text-sm leading-relaxed mt-2">
It is a second-Hand Marketplace Platform where users can buy, sell, and discover quality pre-owned items at affordable prices.            </p>
            
            {/* 4. Social Media Links */}
            <div className="flex items-center gap-3 mt-2">
              <a href="#" className="w-8 h-8 rounded bg-white/10 flex items-center justify-center text-white hover:bg-[#57CC99] hover:text-[#22577A] transition-all" aria-label="Facebook">
                <FaFacebookF size={14} />
              </a>
              <a href="#" className="w-8 h-8 rounded bg-white/10 flex items-center justify-center text-white hover:bg-[#57CC99] hover:text-[#22577A] transition-all" aria-label="Twitter">
                <FaTwitter size={14} />
              </a>
              <a href="#" className="w-8 h-8 rounded bg-white/10 flex items-center justify-center text-white hover:bg-[#57CC99] hover:text-[#22577A] transition-all" aria-label="LinkedIn">
                <FaLinkedinIn size={14} />
              </a>
              <a href="#" className="w-8 h-8 rounded bg-white/10 flex items-center justify-center text-white hover:bg-[#B54241] transition-all" aria-label="Instagram">
                <FaInstagram size={14} />
              </a>
            </div>
          </div>

          {/* 2. Quick Links */}
          <div>
            <h3 className="text-base font-bold text-white uppercase tracking-wider mb-4 border-b-2 border-[#57CC99] w-fit pb-1">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-2.5 text-sm list-none p-0 m-0">
              <li>
                <Link href="/" className="text-slate-200 hover:text-[#57CC99] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-slate-200 hover:text-[#57CC99] transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-slate-200 hover:text-[#57CC99] transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-slate-200 hover:text-[#57CC99] transition-colors">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Extra Support Links */}
          <div>
            <h3 className="text-base font-bold text-white uppercase tracking-wider mb-4 border-b-2 border-[#57CC99] w-fit pb-1">
              Support & Legal
            </h3>
            <ul className="flex flex-col gap-2.5 text-sm list-none p-0 m-0">
              <li>
                <Link href="/about" className="text-slate-200 hover:text-[#57CC99] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-slate-200 hover:text-[#57CC99] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-slate-200 hover:text-[#57CC99] transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-200 hover:text-[#57CC99] transition-colors">
                  Support Center
                </Link>
              </li>
            </ul>
          </div>

          {/* 3. Contact Information */}
          <div>
            <h3 className="text-base font-bold text-white uppercase tracking-wider mb-4 border-b-2 border-[#57CC99] w-fit pb-1">
              Contact Us
            </h3>
            <ul className="flex flex-col gap-3.5 text-sm list-none p-0 m-0">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-[#57CC99] text-base shrink-0 mt-0.5" />
                <span className="text-slate-200 leading-relaxed">
                  Level 4, Gulshan Avenue, <br />Dhaka-1212, Bangladesh.
                </span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhoneAlt className="text-[#57CC99] text-sm shrink-0" />
                <a href="tel:+880123456789" className="text-slate-200 hover:text-[#57CC99] transition-colors">
                  +880 1234-567890
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-[#57CC99] text-sm shrink-0" />
                <a href="mailto:info@globaltech.com" className="text-slate-200 hover:text-[#57CC99] transition-colors">
                  info@nextmart.com
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* --- 5. Copyright Section --- */}
      <div className="bg-black/20 border-t border-white/5 py-5 text-center text-xs text-slate-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:items-center justify-between gap-3">
          <p>© {currentYear} <span className="font-semibold text-white">NEXTMART Solutions</span>. All rights reserved.</p>
          
        </div>
      </div>
    </footer>
  );
}