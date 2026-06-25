

import { getLoggedinSellerProfile, getSellerProduct } from '@/lib/api/products';
import { Table, Button, Chip } from "@heroui/react";
import React from 'react';
import Image from 'next/image';
import { FiEdit2, FiTrash2, FiShoppingBag } from 'react-icons/fi';
import Link from 'next/link';
import DeleteProductButton from '@/components/DeleteProductButton';

const MyProductPage = async () => {

const seller = await getLoggedinSellerProfile();
   


    let products = [];
    try {
        products = await getSellerProduct(seller._id) || [];
    } catch (error) {
        console.error("Error fetching seller products:", error);
    }

    return (
        <div className="w-full min-h-screen bg-slate-50/50 p-4 md:p-8">
            
            {/* Page Sub-Header Grid Context System */}
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-slate-200/60 pb-5">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-[#38A3A5]/10 rounded-xl border border-[#38A3A5]/20 flex items-center justify-center text-[#38A3A5]">
                        <FiShoppingBag className="size-6" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-[#22577A] tracking-tight">My Products</h1>
                        <p className="text-xs text-slate-400 mt-0.5">Manage all live product inventories created and maintained by your seller profile</p>
                    </div>
                </div>
            </div>

            {/* Core Inventory Management Table Interface Module */}
            <div className="max-w-7xl mx-auto bg-white border border-slate-100 rounded-2xl shadow-xl p-4 md:p-6">
                <Table variant="secondary"  className="w-full">
                    <Table.ScrollContainer className="rounded-xl border border-slate-100 overflow-hidden">
             <Table.Content aria-label="Seller listed inventories dashboard configuration matrix" className="min-w-[800px] bg-white">
                 
          {/* Table Column Headers Schema Definitions */}
          <Table.Header>
              <Table.Column isRowHeader className="bg-slate-50 text-slate-500 font-bold text-xs uppercase tracking-wider py-4 pl-6">Product</Table.Column>
              <Table.Column className="bg-slate-50 text-slate-500 font-bold text-xs uppercase tracking-wider py-4">Category</Table.Column>
              <Table.Column className="bg-slate-50 text-slate-500 font-bold text-xs uppercase tracking-wider py-4">Condition</Table.Column>
              <Table.Column className="bg-slate-50 text-slate-500 font-bold text-xs uppercase tracking-wider py-4">Price</Table.Column>
              <Table.Column className="bg-slate-50 text-slate-500 font-bold text-xs uppercase tracking-wider py-4">Stock</Table.Column>
              <Table.Column className="bg-slate-50 text-slate-500 font-bold text-xs uppercase tracking-wider py-4 text-center">Edit</Table.Column>
              <Table.Column className="bg-slate-50 text-slate-500 font-bold text-xs uppercase tracking-wider py-4 text-center pr-6">Delete</Table.Column>
                        </Table.Header>
                            {/* Dynamic Data Model Execution Loops */}
       <Table.Body emptyContent={<div className="text-center py-10 text-slate-400 text-sm font-medium">No inventory elements created. Start by adding a product!</div>}>
           {products.map((product) => (
               <Table.Row key={product._id || product.id} className="border-b border-slate-100 hover:bg-slate-50/60 transition-colors">
                   
                   {/* Product Title and Visual Media Slot Grid Cell */}
                   <Table.Cell className="py-4 pl-6">
                       <div className="flex items-center gap-4">
                           <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-slate-100 bg-slate-50 shrink-0">
                               <Image 
                                   src={product.ImageUrl || product.imageUrl || "/placeholder.jpg"} 
                                   alt={product.ProductTitle || "Product thumbnail"} 
                                   fill
                                   sizes="48px"
                                   className="object-cover"
                               />
                           </div>
                           <div className="flex flex-col gap-0.5 max-w-[220px]">
                               <span className="text-sm font-bold text-[#22577A] truncate block">
                                                    {product.ProductTitle || product.name}
                                                </span>
                                              <span className="text-[11px] text-slate-400 truncate block">
                                                  {product.ProductDescription || product.description}
                                              </span>
                                          </div>
                                      </div>
                                  </Table.Cell>
                                  {/* Category Structural Metadata Layer */}
                                  <Table.Cell className="text-sm font-medium text-slate-600 py-4">
                                      {product.Category || product.category || "General"}
                                  </Table.Cell>
                                  {/* Status Condition Badging Utility Context Chips */}
                                      <Table.Cell className="py-4">
                                          <Chip 
                                              size="sm" 
                                              variant="flat" 
                                              className="capitalize font-bold text-[11px] px-2.5 bg-[#216869]/10 text-[#216869] border border-[#216869]/20 rounded-lg"
                                          >
                                              {product.Condition || product.condition || "New"}
                                          </Chip>
                                      </Table.Cell>
                                      {/* Numerical Evaluation Parameters Price Processing */}
                                      <Table.Cell className="text-sm font-black text-[#22577A] py-4">
                                          ৳{(product.Price || product.price || 0).toLocaleString()}
                                      </Table.Cell>

                                        {/* Stock Volume Metric Parameters Layout */}
                                        <Table.Cell className="py-4">
                                            <span className={`text-xs font-bold px-2 py-1 rounded-md ${Number(product.Stock || product.stock) > 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-500'}`}>
                                                {product.Stock || product.stock || 0} Units
                                            </span>
                                        </Table.Cell>

                                        {/* Edit Interface Controls Functional Action Triggers */}
                                        <Table.Cell className="text-center py-4">
                                <Link
                                  href={`/dashboard/seller/products/${product._id}/edit`}
                                >
                                  <Button
                                    isIconOnly
                                    size="sm"
                                    variant="light"
                                    className="text-[#38A3A5]"
                                  >
                                    <FiEdit2 />
                                  </Button>
                                </Link>   </Table.Cell>

                                        {/* Delete Management Infrastructure Interface Controls */}
                                        <Table.Cell className="text-center py-4 pr-6">
                                            {/* <Button 
                                                isIconOnly 
                                                size="sm" 
                                                variant="light" 
                                                aria-label="Delete product from live registry"
                                                className="text-rose-500 hover:bg-rose-50 rounded-lg"
                                            >
                                                <FiTrash2 className="size-4" />
                                            </Button> */}
                                            <DeleteProductButton
                                         productId={product._id}
                                         title={product.ProductTitle}/>
                                        </Table.Cell>

                                    </Table.Row>
                                ))}
                            </Table.Body>

                        </Table.Content>
                    </Table.ScrollContainer>
                </Table>
            </div>
        </div>
    );
};

export default MyProductPage;



