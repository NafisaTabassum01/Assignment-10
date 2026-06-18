"use client";

import { Button, FieldError, Input, Label, ListBox, TextField, Select, TextArea } from '@heroui/react';
import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import { motion } from "framer-motion";
import { createProduct } from '@/lib/actions/products';
import { useRouter } from "next/navigation";
// import { redirect } from 'next/navigation';

const AddProductPage = () => {
 const router = useRouter();


  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const product = Object.fromEntries(formData.entries());

    const productData = {
      ...product,
      Price: Number(product.Price),
      Stock: Number(product.Stock),
    };

   const res = await createProduct(productData);
   if (res.insertedId){
toast.success("Product added successfully!");
    e.target.reset();
      router.push("/dashboard/seller");

   }else {
      toast.error("Failed to add product");
    }
   

    // console.log(productData);
    // toast.success("Product listing published successfully!");
  };

  useEffect(() => {
    document.title = "Add Product Listing";
  }, []);

  return (
    <div className="w-full sm:w-10/12 min-h-screen bg-slate-50/50 py-8 px-2">
      <form 
        onSubmit={handleSubmit}
        className="p-2 md:p-10 bg-white border border-gray-100 text-[#22577A] space-y-6 w-full max-w-2xl mx-auto shadow-2xl rounded-2xl"
      >
        {/* Title Block Header */}
        <div className="text-center pb-2 border-b border-slate-50">
          <p className="text-2xl text-[#22577A] font-black tracking-tight">Add New Product</p>
          <p className="text-xs text-slate-400 mt-1">Create a physical or digital asset listing live on your platform</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* 1. Product Title Input */}
          <div className="md:col-span-2">
            <TextField name="ProductTitle" isRequired>
              <Label className="text-xs font-bold text-[#216869] uppercase tracking-wider mb-2 block">
                Product Title
              </Label>
              <Input 
                placeholder="e.g. Premium Mechanical Wireless Keyboard" 
                className="rounded-xl border border-slate-200 w-full h-11 px-4 shadow-sm focus-within:border-[#38A3A5] transition-all" 
              />
              <FieldError className="text-xs text-red-500 mt-1" />
            </TextField>
          </div>

          {/* 2. Image URL Input (Embedded in main layout grid) */}
          <div className="md:col-span-2">
            <TextField name="ImageUrl" isRequired>
              <Label className="text-xs font-bold text-[#216869] uppercase tracking-wider mb-2 block">
                Product Image URL
              </Label>
              <Input
                type="url"
                placeholder="https://images.unsplash.com/your-product-image.png"
                className="rounded-xl border border-slate-200 w-full h-11 px-4 shadow-sm focus-within:border-[#38A3A5] transition-all"
              />
              <FieldError className="text-xs text-red-500 mt-1" />
            </TextField>
          </div>

          {/* 3. Category Select Menu Layer */}
          <div>
            <Select
              name="Category"
              isRequired
              className="w-full"
              placeholder="Select platform category"
            >
              <Label className="text-xs font-bold text-[#216869] uppercase tracking-wider mb-2 block">
                Category
              </Label>
              <Select.Trigger className="rounded-xl border border-slate-200 w-full h-11 px-4 shadow-sm bg-white flex items-center justify-between text-slate-700">
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover className="bg-white border border-slate-100 rounded-xl shadow-xl p-1 z-50">
                <ListBox className="p-1 flex flex-col gap-0.5">
                  <ListBox.Item id="electronics" textValue="Electronics" className="p-2 text-sm text-[#22577A] rounded-lg hover:bg-slate-50 cursor-pointer">
                    Electronics <ListBox.ItemIndicator />
                  </ListBox.Item>
                  <ListBox.Item id="clothing" textValue="Clothing & Apparel" className="p-2 text-sm text-[#22577A] rounded-lg hover:bg-slate-50 cursor-pointer">
                    Clothing & Apparel <ListBox.ItemIndicator />
                  </ListBox.Item>
                  <ListBox.Item id="home" textValue="Home & Living" className="p-2 text-sm text-[#22577A] rounded-lg hover:bg-slate-50 cursor-pointer">
                    Home & Living <ListBox.ItemIndicator />
                  </ListBox.Item>
                  <ListBox.Item id="gadgets" textValue="Gadgets & Accessories" className="p-2 text-sm text-[#22577A] rounded-lg hover:bg-slate-50 cursor-pointer">
                    Gadgets & Accessories <ListBox.ItemIndicator />
                  </ListBox.Item>
                </ListBox>
              </Select.Popover>
            </Select>
          </div>

          {/* 4. Condition Select Menu Layer */}
          <div>
            <Select
              name="Condition"
              isRequired
              className="w-full"
              placeholder="Select condition state"
            >
              <Label className="text-xs font-bold text-[#216869] uppercase tracking-wider mb-2 block">
                Item Condition
              </Label>
              <Select.Trigger className="rounded-xl border border-slate-200 w-full h-11 px-4 shadow-sm bg-white flex items-center justify-between text-slate-700">
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover className="bg-white border border-slate-100 rounded-xl shadow-xl p-1 z-50">
                <ListBox className="p-1 flex flex-col gap-0.5">
                  <ListBox.Item id="like-new" textValue="Like New" className="p-2 text-sm text-[#22577A] rounded-lg hover:bg-slate-50 cursor-pointer">
                    Like New <ListBox.ItemIndicator />
                  </ListBox.Item>
                  <ListBox.Item id="refurbished" textValue="Refurbished" className="p-2 text-sm text-[#22577A] rounded-lg hover:bg-slate-50 cursor-pointer">
                    Refurbished <ListBox.ItemIndicator />
                  </ListBox.Item>
                  <ListBox.Item id="used" textValue="Used" className="p-2 text-sm text-[#22577A] rounded-lg hover:bg-slate-50 cursor-pointer">
                    Used <ListBox.ItemIndicator />
                  </ListBox.Item>
                </ListBox>
              </Select.Popover>
            </Select>
          </div>

          {/* 5. Pricing Numerical Input */}
          <TextField name="Price" type="number" isRequired>
            <Label className="text-xs font-bold text-[#216869] uppercase tracking-wider mb-2 block">
              Price (BDT)
            </Label>
            <Input
              type="number"
              placeholder="৳ 0.00"
              className="rounded-xl border border-slate-200 w-full h-11 px-4 shadow-sm focus-within:border-[#38A3A5] transition-all"
            />
            <FieldError className="text-xs text-red-500 mt-1" />
          </TextField>

          {/* 6. Stock Numerical Input */}
          <TextField name="Stock" type="number" isRequired>
            <Label className="text-xs font-bold text-[#216869] uppercase tracking-wider mb-2 block">
              Stock Quantity
            </Label>
            <Input
              type="number"
              placeholder="Available inventory units"
              className="rounded-xl border border-slate-200 w-full h-11 px-4 shadow-sm focus-within:border-[#38A3A5] transition-all"
            />
            <FieldError className="text-xs text-red-500 mt-1" />
          </TextField>

          {/* 7. Description Block Layer with fully capitalized TextArea */}
          <div className="md:col-span-2">
            <TextField name="ProductDescription" isRequired>
              <Label className="text-xs font-bold text-[#216869] uppercase tracking-wider mb-2 block">
                Product Description
              </Label>
              <TextArea 
                placeholder="Product Description..." 
                className="rounded-xl border border-slate-200 w-full p-4 shadow-sm min-h-[110px] focus-within:border-[#38A3A5] transition-all block resize-none"
              />
              <FieldError className="text-xs text-red-500 mt-1" />
            </TextField>
          </div>

        </div>

        {/* Buttons submission wrapper with Framer motion scale metrics */}
        <div className="pt-4 border-t border-slate-50">
          <motion.div
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            <Button
              type="submit"
              className="w-full h-12 bg-[#22577A] text-white font-bold tracking-wide rounded shadow-lg transition-all duration-300 hover:opacity-95"
            >
              Publish Product Listing
            </Button>
          </motion.div>
        </div>

      </form>
    </div>
  );
};

export default AddProductPage;