'use server'

import { serverMutation } from "../core/server";

export const createProduct = async (newSellerdata) => {
  return serverMutation("/api/products", newSellerdata);
};



export const getProduct = async () => {
  console.log("PRODUCT API FILE LOADED");
  const res = await fetch("http://localhost:5000/api/products", {
    cache: "no-store",
  });

  const result = await res.json();

  return result.data;
};