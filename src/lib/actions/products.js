'use server'

import { serverMutation } from "../core/server";

export const createProduct = async (newSellerdata) => {
  return serverMutation("/api/products", newSellerdata);
};


// const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// export const createProduct = async (newProductdata)=>{
//  const res = await fetch(`${baseUrl}/api/products` , {
//     method : 'POST' ,
//     headers : {
//         'Content-type' : 'application/json',

//     },
//     body : JSON.stringify(newProductdata)
//  });

//  return res.json();
// }