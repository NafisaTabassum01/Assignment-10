"use client";

import React, { useState } from "react";
import Link from "next/link"; 
import { Button, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import { FaUser, FaLock, FaMapMarkerAlt, FaCheckCircle, FaExclamationCircle, FaEye, FaEyeSlash } from "react-icons/fa";
import { FaBagShopping, FaArrowRight, FaEnvelope } from "react-icons/fa6";
import { authClient } from "@/lib/auth-client";

// Bangladesh-er shobgula major locations dynamic list mapping
const POPULAR_LOCATIONS = [
  { value: "dhaka", label: "Dhaka" },
  { value: "chittagong", label: "Chittagong" },
  { value: "sylhet", label: "Sylhet" },
  { value: "khulna", label: "Khulna" },
  { value: "rajshahi", label: "Rajshahi" },
  { value: "barisal", label: "Barisal" },
  { value: "rangpur", label: "Rangpur" },
  { value: "mymensingh", label: "Mymensingh" },
  { value: "comilla", label: "Comilla" },
  { value: "gazipur", label: "Gazipur" },
  { value: "narayanganj", label: "Narayanganj" },
  { value: "bogra", label: "Bogra" }
];

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [formStatus, setFormStatus] = useState({ type: null, message: "" });
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setFormStatus({ type: null, message: "" }); 

    const formData = new FormData(e.currentTarget);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    try {
      const { data: session, error } = await authClient.signUp.email({
        email: data.email,
        password: data.password,
        name: data.name,
        location: data.location, 
      });

      if (error) {
        throw new Error(error.message || "Registration failed. Try again.");
      }

      setFormStatus({
        type: "success",
        message: "Account created successfully! Redirecting...",
      });

      setTimeout(() => {
        window.location.href = "/";
      }, 1500);

    } catch (error) {
      setFormStatus({
        type: "error",
        message: error.message || "Something went wrong. Please check your network.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[90vh] bg-slate-50/60 flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[#38A3A5]/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#57CC99]/10 rounded-full blur-[100px] translate-x-1/4 translate-y-1/4 pointer-events-none" />

      <div className="w-full max-w-[480px] bg-white rounded-2xl border border-slate-200/80 shadow-xl p-6 sm:p-8 relative z-10">
        
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-[#38A3A5] to-[#57CC99] text-white shadow-md">
              <FaBagShopping size={18} />
            </div>
            <span className="font-bold text-lg tracking-tight text-[#216869]">NEXTMART</span>
          </Link>
          <h2 className="text-2xl font-black text-[#216869] tracking-tight">Create your account</h2>
          <p className="text-sm text-slate-500 mt-1">Join us today to discover next-gen retail</p>
        </div>

        {/* Form component validation layout handler wrapper */}
        <Form validationBehavior="native" onSubmit={handleSubmit} className="flex flex-col gap-5">
          
          {/* Full Name Field */}
          <TextField isRequired name="name" type="text" className="w-full">
            <Label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">Full Name</Label>
            <div className="relative w-full">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400 z-20"><FaUser size={14} /></span>
              <Input placeholder="Enter your name" className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus-visible:outline-none focus-visible:border-[#38A3A5] text-slate-800 transition-all" />
            </div>
            <FieldError className="text-xs text-red-500 mt-1" />
          </TextField>

          {/* Email Field */}
          <TextField
            isRequired
            name="email"
            type="email"
            validate={(value) => !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value) ? "Please enter a valid email address" : null}
          >
            <Label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">Email Address</Label>
            <div className="relative w-full">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400 z-20"><FaEnvelope size={14} /></span>
              <Input placeholder="you@example.com" className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus-visible:outline-none focus-visible:border-[#38A3A5] text-slate-800 transition-all" />
            </div>
            <FieldError className="text-xs text-red-500 mt-1" />
          </TextField>

          {/* Password Field */}
          <TextField
            isRequired
            minLength={8}
            name="password"
            type={showPassword ? "text" : "password"}
            validate={(value) => {
              if (value.length < 8) return "Password must be at least 8 characters";
              if (!/[A-Z]/.test(value)) return "Password must contain an uppercase letter";
              if (!/[0-9]/.test(value)) return "Password must contain a number";
              return null;
            }}
          >
            <Label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">Password</Label>
            <div className="relative w-full">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400 z-20"><FaLock size={14} /></span>
              <Input placeholder="Choose a password" className="w-full pl-10 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus-visible:outline-none focus-visible:border-[#38A3A5] text-slate-800 transition-all" />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 hover:text-[#38A3A5] transition-colors cursor-pointer z-30"
              >
                {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
              </button>
            </div>
            <FieldError className="text-xs text-red-500 mt-1" />
          </TextField>

          {/* Location Dropdown */}
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="location" className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">Select Your Location</label>
            <div className="relative w-full">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400 pointer-events-none"><FaMapMarkerAlt size={14} /></span>
              <select id="location" name="location" required defaultValue="" className="w-full pl-10 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#38A3A5] text-slate-800 appearance-none cursor-pointer transition-all">
                <option value="" disabled hidden>Choose your city...</option>
                {POPULAR_LOCATIONS.map((loc) => (<option key={loc.value} value={loc.value}>{loc.label}</option>))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>
          </div>

          {/* Status Message Display */}
          {formStatus.type && (
            <div 
              className={`p-3.5 rounded-xl border flex items-start gap-3 transition-all duration-300 ${
                formStatus.type === "success" 
                  ? "bg-emerald-50 border-emerald-200 text-emerald-800" 
                  : "bg-rose-50 border-rose-200 text-rose-800"
              }`}
            >
              {formStatus.type === "success" ? (
                <FaCheckCircle className="w-5 h-5 shrink-0 mt-0.5 text-emerald-600" />
              ) : (
                <FaExclamationCircle className="w-5 h-5 shrink-0 mt-0.5 text-rose-600" />
              )}
              <span className="text-sm font-medium leading-normal">{formStatus.message}</span>
            </div>
          )}

          {/* Action Button */}
          <Button
            type="submit"
            isLoading={isLoading}
            className={`w-full text-white font-semibold py-3 rounded shadow-md transition-all text-base flex items-center justify-center gap-2 mt-1 cursor-pointer select-none active:scale-[0.98] ${
              isLoading ? "bg-[#22577A]/70" : "bg-[#22577A] hover:bg-[#1a4461]"
            }`}
          >
            {isLoading ? "Creating account..." : "Sign Up"} {!isLoading && <FaArrowRight size={14} />}
          </Button>

        </Form>

        <div className="text-center mt-6 pt-5 border-t border-slate-100">
          <p className="text-sm text-slate-500">
            Already have an account?{" "}
            <Link href="/login" className="text-[#38A3A5] font-semibold hover:underline">Log In</Link>
          </p>
        </div>

      </div>
    </div>
  );
}