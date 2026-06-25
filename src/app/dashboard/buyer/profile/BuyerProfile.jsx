"use client";

import React, { useState } from "react";
import {
  Button,
  FieldError,
  Input,
  Label,
  TextField,
  TextArea,
} from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  FiUser,
  FiMapPin,
  FiMail,
  FiPhone,
  FiEdit3,
  FiCloudLightning,
  FiUserCheck,
  FiLock,
  FiEye,
  FiEyeOff
} from "react-icons/fi";

const BuyerProfile = ({ userSession, initialProfile }) => {
  const [profile, setProfile] = useState(initialProfile);
  const [mode, setMode] = useState("view"); // modes: "view" | "create" | "edit"
  const [imagePreview, setImagePreview] = useState(profile?.profilePicture || null);
  const [loading, setLoading] = useState(false);
  
  // পাসওয়ার্ড টগলিং স্টেট
  const [showPassword, setShowPassword] = useState(false);

  // ImgBB Image Upload Function
  const uploadToImgBB = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGE}`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    if (!data.success) throw new Error("Image upload failed");
    return data.data.url;
  };

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setLoading(true);
      setImagePreview(URL.createObjectURL(file)); // Immediate preview
      const uploadedUrl = await uploadToImgBB(file);
      setImagePreview(uploadedUrl); // Final ImgBB URL
    } catch (err) {
      console.error("Image upload error:", err);
      alert("Image upload failed!");
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmission = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    
    const name = formData.get("name")?.toString();
    const phone = formData.get("phone")?.toString();
    const address = formData.get("address")?.toString();
    const password = formData.get("password")?.toString(); // New or changed password

    // 🎯 বায়ারের এই পেলোড স্ট্রাকচারটি সেলারের কাছে অর্ডারের মাধ্যমে পাঠানো যাবে সহজে
    const buyerProfilePayload = {
      buyerId: userSession?.id,
      email: userSession?.email, // সেশন থেকে ডিফল্ট ইমেইল লকড থাকবে
      name: name,
      phone: phone,
      address: address,
      profilePicture: imagePreview || "/placeholder.jpg",
      ...(password && { password: password }), // পাসওয়ার্ড ইনপুট দিলে তবেই পেলোডে যাবে
    };

    try {
      let response;
      const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/buyerProfile/${userSession.id}`;
      
      if (mode === "edit" || profile) {
        // প্রোফাইল আপডেট (PUT/PATCH)
        response = await fetch(url, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(buyerProfilePayload),
        });
      } else {
        // নতুন প্রোফাইল তৈরি (POST)
        response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/buyerProfile`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(buyerProfilePayload),
        });
      }

      if (response.ok) {
        setProfile(buyerProfilePayload);
        setMode("view");
      } else {
        alert("Failed to save profile configuration.");
      }
    } catch (error) {
      console.error("Submission Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-slate-50/50 py-12 px-4">
      <AnimatePresence mode="wait">
        
        {/* 1. EMPTY STATE PROMPT */}
        {!profile && mode === "view" && (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="p-8 md:p-10 bg-white border border-gray-100 text-center text-[#22577A] max-w-xl mx-auto shadow-2xl rounded-2xl flex flex-col items-center gap-5"
          >
            <div className="w-16 h-16 bg-[#38A3A5]/10 rounded-2xl flex items-center justify-center text-[#38A3A5] border border-[#38A3A5]/20 shadow-inner">
              <FiCloudLightning className="text-2xl" />
            </div>
            <div>
              <h2 className="text-2xl font-black tracking-tight text-[#22577A]">Setup Your Buyer Profile</h2>
              <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto leading-relaxed">
                Please complete your personal information configuration to handle swift checkout processing with sellers.
              </p>
            </div>
            <div className="w-full mt-2">
              <Button
                onClick={() => setMode("create")}
                className="w-full h-11 bg-[#22577A] text-white font-bold rounded-xl tracking-wide shadow-md hover:bg-[#216869]"
              >
                Configure Profile Now
              </Button>
            </div>
          </motion.div>
        )}

        {/* 2. VIEW PROFILE MODE */}
        {profile && mode === "view" && (
          <motion.div
            key="view"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="p-6 md:p-10 bg-white border border-gray-100 text-[#22577A] w-full max-w-2xl mx-auto shadow-2xl rounded-2xl space-y-6"
          >
            <div className="flex flex-col sm:flex-row items-center justify-between pb-5 border-b border-slate-100 gap-4">
              <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-[#38A3A5] bg-slate-100 shadow-md">
                  <Image
                    src={profile.profilePicture || "/placeholder.jpg"}
                    alt="buyer profile"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-2xl font-black tracking-tight text-[#22577A]">
                    {profile.name}
                  </h2>
                  <span className="text-[10px] font-black tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 border border-emerald-200 rounded-md uppercase inline-block mt-1">
                    Verified Buyer Account
                  </span>
                </div>
              </div>

              <Button
                onClick={() => {
                  setImagePreview(profile.profilePicture);
                  setMode("edit");
                }}
                startContent={<FiEdit3 className="size-4" />}
                className="h-9 px-4 bg-slate-50 border border-slate-200 text-slate-600 font-bold text-xs rounded-xl hover:bg-slate-100"
              >
                Edit Profile Settings
              </Button>
            </div>

            {/* Buyer Delivery Data Card */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 border border-slate-100 rounded-xl shadow-sm sm:col-span-2">
                <FiMapPin className="text-[#38A3A5] size-5 shrink-0" />
                <div className="flex flex-col min-w-0">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Shipping & Delivery Address</span>
                  <span className="text-xs font-semibold text-[#22577A] mt-0.5 leading-relaxed">{profile.address || "No address provided yet."}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 border border-slate-100 rounded-xl shadow-sm">
                <FiMail className="text-[#38A3A5] size-5 shrink-0" />
                <div className="flex flex-col min-w-0">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Account Email</span>
                  <span className="text-xs font-semibold text-[#22577A] truncate">{profile.email}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 border border-slate-100 rounded-xl shadow-sm">
                <FiPhone className="text-[#38A3A5] size-5 shrink-0" />
                <div className="flex flex-col min-w-0">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Contact Number</span>
                  <span className="text-xs font-semibold text-[#22577A] truncate">{profile.phone || "Not attached"}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* 3. MUTATION FORM (CREATE / EDIT MODE) */}
        {(mode === "create" || mode === "edit") && (
          <motion.form
            key="form"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            onSubmit={handleFormSubmission}
            className="p-8 md:p-10 bg-white border border-gray-100 text-[#22577A] space-y-6 w-full max-w-2xl mx-auto shadow-2xl rounded-2xl"
          >
            <div className="text-center pb-2 border-b border-slate-50">
              <p className="text-2xl text-[#22577A] font-black tracking-tight">
                {mode === "edit" ? "Modify Personal Information" : "Complete Registration Settings"}
              </p>
              <p className="text-xs text-slate-400 mt-1">This data will be synchronized during checkouts with sellers</p>
            </div>

            {/* IMAGE UPLOADER */}
            <div className="flex flex-col items-center justify-center p-4 border border-dashed border-slate-200 bg-slate-50/50 rounded-xl gap-4">
              <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-[#38A3A5] bg-white shadow-md shrink-0">
                {imagePreview ? (
                  <Image src={imagePreview} alt="Preview" fill className="object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-300">
                    <FiUser className="size-8" />
                  </div>
                )}
              </div>
              <div className="text-center">
                <label
                  htmlFor="buyer-file-upload"
                  className="cursor-pointer inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-slate-200 text-xs font-bold text-[#22577A] rounded-xl shadow-sm hover:bg-slate-50 transition-all"
                >
                  <FiUserCheck className="text-[#38A3A5]" /> Change Profile Image
                </label>
                <input
                  id="buyer-file-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
            </div>

            {/* INPUT CONFIGURATIONS */}
            <div className="grid grid-cols-1 gap-5">
              <TextField name="name" defaultValue={profile?.name || userSession?.name || ""} isRequired>
                <Label className="text-xs font-bold text-[#216869] uppercase tracking-wider mb-2 block">Full Name</Label>
                <Input placeholder="Enter your full name" className="rounded-xl border border-slate-200 w-full h-11 px-4 shadow-sm focus-within:border-[#38A3A5]" />
                <FieldError className="text-xs text-red-500 mt-1" />
              </TextField>

              <TextField name="phone" type="tel" defaultValue={profile?.phone || ""} isRequired>
                <Label className="text-xs font-bold text-[#216869] uppercase tracking-wider mb-2 block">Active Phone Number</Label>
                <Input placeholder="e.g. +880 17XXXXXXXX" className="rounded-xl border border-slate-200 w-full h-11 px-4 shadow-sm focus-within:border-[#38A3A5]" />
                <FieldError className="text-xs text-red-500 mt-1" />
              </TextField>

              <TextField name="address" defaultValue={profile?.address || ""} isRequired>
                <Label className="text-xs font-bold text-[#216869] uppercase tracking-wider mb-2 block">Shipping Address</Label>
                <TextArea placeholder="Provide detail house info, area, city road parameters..." className="rounded-xl border border-slate-200 w-full p-4 shadow-sm min-h-[90px] focus-within:border-[#38A3A5] block resize-none" />
                <FieldError className="text-xs text-red-500 mt-1" />
              </TextField>

              {/* 🎯 CHANGE PASSWORD FIELD */}
              <div className="pt-4 border-t border-slate-100">
                <TextField name="password" type={showPassword ? "text" : "password"}>
                  <Label className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-2 block flex items-center gap-1">
                    <FiLock /> Change Account Password (Optional)
                  </Label>
                  <div className="relative w-full">
                    <Input placeholder="Leave blank if you don't want to change password" className="rounded-xl border border-slate-200 w-full h-11 pl-4 pr-10 shadow-sm focus-within:border-[#38A3A5]" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <FiEyeOff className="size-4" /> : <FiEye className="size-4" />}
                    </button>
                  </div>
                  <FieldError className="text-xs text-red-500 mt-1" />
                </TextField>
              </div>
            </div>

            {/* ACTION TRIGGERS */}
            <div className="pt-4 border-t border-slate-50 flex flex-col sm:flex-row gap-3">
              {profile && (
                <Button
                  type="button"
                  onClick={() => setMode("view")}
                  className="w-full sm:w-1/3 h-12 bg-slate-100 text-slate-600 font-bold tracking-wide rounded-xl shadow-sm hover:bg-slate-200 transition-all"
                >
                  Cancel
                </Button>
              )}
              
              <div className="w-full">
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 bg-[#22577A] text-white font-bold tracking-wide rounded-xl shadow-lg hover:bg-[#216869] transition-all"
                >
                  {loading ? "Processing Sync..." : "Save Buyer Info"}
                </Button>
              </div>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BuyerProfile;