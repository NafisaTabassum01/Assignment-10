"use client";

import React, { useState } from "react";
import {
  Button,
  FieldError,
  Input,
  Label,
  TextField,
  TextArea,
  Chip,
} from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  FiUser,
  FiMapPin,
  FiMail,
  FiPhone,
  FiCalendar,
  FiPackage,
  FiEdit3,
  FiCloudLightning,
  FiUserCheck,
} from "react-icons/fi";
import { createSeller } from "@/lib/actions/sellerProfile";

const SellerProfilePage = () => {
  const [sellerProfile, setSellerProfile] = useState(null);
  const [mode, setMode] = useState("view"); // modes: "view" | "create" | "edit"
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleFormSubmission = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const updatedProfilePayload = {
      name: data.name,
      bio: data.bio,
      location: data.location,
      email: data.email,
      phone: data.phone,
      joinedDate:
        sellerProfile?.joinedDate ||
        new Date().toLocaleDateString("en-US", {
          month: "long",
          year: "numeric",
        }),
      totalProducts: sellerProfile?.totalProducts || 0,
      status: sellerProfile?.status || "Pending",
      profilePicture: imagePreview || "/placeholder.jpg", 
    };

    // কনসোল লগ ট্র্যাকিং
    if (mode === "edit") {
      console.log("📝 --- EDITED PROFILE DETAILS --- 📝");
      console.log("Before Update:", sellerProfile);
      console.log("After Update Payload:", updatedProfilePayload);
    } else {
      console.log("🆕 --- NEW REGISTERED DETAILS --- 🆕");
      console.log("Registered Profile Payload:", updatedProfilePayload);
    }

    try {
      // ব্যাকএন্ড এপিআই বা সার্ভার অ্যাকশন কল করা হচ্ছে
      const response = await createSeller(updatedProfilePayload);
      console.log("Backend Response:", response);

      if (response?.insertedId || response?.message === "Profile already exists") {
        setSellerProfile(updatedProfilePayload);
        setMode("view");
      } else {
        alert(response?.message || "Something went wrong!");
      }
    } catch (error) {
      console.error("Submission Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadgeStyles = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return "bg-emerald-50 text-emerald-600 border-emerald-200";
      case "rejected":
        return "bg-rose-50 text-rose-500 border-rose-200";
      default:
        return "bg-amber-50 text-amber-600 border-amber-200";
    }
  };

  return (
    <div className="w-full min-h-screen bg-slate-50/50 py-12 px-4">
      <AnimatePresence mode="wait">
        
        {/* 1. EMPTY STATE PROMPT */}
        {!sellerProfile && mode === "view" && (
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
              <h2 className="text-2xl font-black tracking-tight text-[#22577A]">Register Your Profile</h2>
              <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto leading-relaxed">
                You haven't setup your seller marketplace portfolio account yet. Register your profile details to access dashboard features.
              </p>
            </div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full mt-2">
              <Button
                onClick={() => {
                  setImagePreview(null);
                  setMode("create");
                }}
                className="w-full h-11 bg-[#22577A] text-white font-bold rounded-xl tracking-wide shadow-md hover:bg-[#216869]"
              >
                Setup Profile
              </Button>
            </motion.div>
          </motion.div>
        )}

        {/* 2. VIEW PROFILE DETAILS DISPLAY */}
        {sellerProfile && mode === "view" && (
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
                    src={sellerProfile.profilePicture}
                    alt="profile"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start">
                    <h2 className="text-2xl font-black tracking-tight text-[#22577A]">
                      {sellerProfile.name}
                    </h2>
                    <Chip
                      size="sm"
                      variant="bordered"
                      className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md border ${getStatusBadgeStyles(
                        sellerProfile.status
                      )}`}
                    >
                      {sellerProfile.status}
                    </Chip>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5 font-medium flex items-center justify-center sm:justify-start gap-1">
                    <FiMapPin className="text-[#38A3A5]" /> {sellerProfile.location}
                  </p>
                </div>
              </div>

              <Button
                onClick={() => {
                  setImagePreview(sellerProfile.profilePicture);
                  setMode("edit");
                }}
                startContent={<FiEdit3 className="size-4" />}
                className="h-9 px-4 bg-slate-50 border border-slate-200 text-slate-600 font-bold text-xs rounded-xl hover:bg-slate-100"
              >
                Edit Profile
              </Button>
            </div>

            <div className="p-4 bg-slate-50/50 border border-slate-100 rounded-xl">
              <span className="text-[10px] font-black text-[#216869] uppercase tracking-wider block mb-1">Seller Bio</span>
              <p className="text-sm text-slate-600 font-medium leading-relaxed">{sellerProfile.bio || "No bio added yet."}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-center gap-3 p-3 border border-slate-100 rounded-xl shadow-sm">
                <FiMail className="text-[#38A3A5] size-5 shrink-0" />
                <div className="flex flex-col min-w-0">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Email Address</span>
                  <span className="text-xs font-semibold text-[#22577A] truncate">{sellerProfile.email}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 border border-slate-100 rounded-xl shadow-sm">
                <FiPhone className="text-[#38A3A5] size-5 shrink-0" />
                <div className="flex flex-col min-w-0">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Phone Contact</span>
                  <span className="text-xs font-semibold text-[#22577A] truncate">{sellerProfile.phone}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 border border-slate-100 rounded-xl shadow-sm">
                <FiCalendar className="text-[#38A3A5] size-5 shrink-0" />
                <div className="flex flex-col min-w-0">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Joined Platform</span>
                  <span className="text-xs font-semibold text-[#22577A] truncate">{sellerProfile.joinedDate}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 border border-slate-100 rounded-xl shadow-sm">
                <FiPackage className="text-[#38A3A5] size-5 shrink-0" />
                <div className="flex flex-col min-w-0">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Products</span>
                  <span className="text-xs font-black text-[#216869]">{sellerProfile.totalProducts} Live Listings</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* 3. CONSOLIDATED ACTION FORM */}
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
                {mode === "edit" ? "Edit Profile Settings" : "Fill Up Seller Account Details"}
              </p>
              <p className="text-xs text-slate-400 mt-1">Provide correct informational records to sync parameters live</p>
            </div>

            {/* PROFILE IMAGE UPLOADER */}
            <div className="flex flex-col items-center justify-center p-4 border border-dashed border-slate-200 bg-slate-50/50 rounded-xl gap-4">
              <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-[#38A3A5] bg-white shadow-md shrink-0">
                {imagePreview ? (
                  <Image
                    src={imagePreview}
                    alt="Live upload preview"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-300">
                    <FiUser className="size-8" />
                  </div>
                )}
              </div>
              <div className="text-center">
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-slate-200 text-xs font-bold text-[#22577A] rounded-xl shadow-sm hover:bg-slate-50 transition-all"
                >
                  <FiUserCheck className="text-[#38A3A5]" /> Upload Profile Picture
                </label>
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <p className="text-[10px] text-slate-400 mt-1">PNG, JPG format images up to 5MB sizes allowed</p>
              </div>
            </div>

            {/* INPUT FIELDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <TextField name="name" defaultValue={sellerProfile?.name || ""} isRequired>
                  <Label className="text-xs font-bold text-[#216869] uppercase tracking-wider mb-2 block">Seller Name</Label>
                  <Input placeholder="e.g. S.M. Tasnim Rahman" className="rounded-xl border border-slate-200 w-full h-11 px-4 shadow-sm focus-within:border-[#38A3A5] transition-all" />
                  <FieldError className="text-xs text-red-500 mt-1" />
                </TextField>
              </div>

              <div>
                <TextField name="location" defaultValue={sellerProfile?.location || ""} isRequired>
                  <Label className="text-xs font-bold text-[#216869] uppercase tracking-wider mb-2 block">Location</Label>
                  <Input placeholder="e.g. Uttara, Dhaka" className="rounded-xl border border-slate-200 w-full h-11 px-4 shadow-sm focus-within:border-[#38A3A5] transition-all" />
                  <FieldError className="text-xs text-red-500 mt-1" />
                </TextField>
              </div>

              <div>
                <TextField name="email" type="email" defaultValue={sellerProfile?.email || ""} isRequired>
                  <Label className="text-xs font-bold text-[#216869] uppercase tracking-wider mb-2 block">Email Address</Label>
                  <Input placeholder="e.g. store@domain.com" className="rounded-xl border border-slate-200 w-full h-11 px-4 shadow-sm focus-within:border-[#38A3A5] transition-all" />
                  <FieldError className="text-xs text-red-500 mt-1" />
                </TextField>
              </div>

              <div className="md:col-span-2">
                <TextField name="phone" type="tel" defaultValue={sellerProfile?.phone || ""} isRequired>
                  <Label className="text-xs font-bold text-[#216869] uppercase tracking-wider mb-2 block">Phone Number</Label>
                  <Input placeholder="e.g. +880 1XXXXXXXXX" className="rounded-xl border border-slate-200 w-full h-11 px-4 shadow-sm focus-within:border-[#38A3A5] transition-all" />
                  <FieldError className="text-xs text-red-500 mt-1" />
                </TextField>
              </div>

              <div className="md:col-span-2">
                <TextField name="bio" defaultValue={sellerProfile?.bio || ""} isRequired>
                  <Label className="text-xs font-bold text-[#216869] uppercase tracking-wider mb-2 block">Seller Bio</Label>
                  <TextArea placeholder="Tell the platform users about your storefront niches or experience..." className="rounded-xl border border-slate-200 w-full p-4 shadow-sm min-h-[110px] focus-within:border-[#38A3A5] transition-all block resize-none" />
                  <FieldError className="text-xs text-red-500 mt-1" />
                </TextField>
              </div>
            </div>

            {/* BUTTONS */}
            <div className="pt-4 border-t border-slate-50 flex flex-col sm:flex-row gap-3">
              <Button
                type="button"
                onClick={() => setMode("view")}
                className="w-full sm:w-1/3 h-12 bg-slate-100 text-slate-600 font-bold tracking-wide rounded-xl shadow-sm hover:bg-slate-200 transition-all"
              >
                Cancel
              </Button>
              
              <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} className="w-full">
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 bg-[#22577A] text-white font-bold tracking-wide rounded-xl shadow-lg hover:bg-[#216869] transition-all duration-300"
                >
                  {loading ? "Saving..." : "Save Profile"}
                </Button>
              </motion.div>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SellerProfilePage;