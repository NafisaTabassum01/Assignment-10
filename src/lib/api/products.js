import { serverFetch } from "../core/server";
import { getUserSession } from "../core/session";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;


export const getProduct = async ()=>{
  return serverFetch('/api/products')
}



export const getSellerProduct = async(sellerId , status='active') =>{
 const res = await fetch(`${baseUrl}/api/products?sellerId=${sellerId}&status=${status}`)
return res.json();
}

export const getLoggedinUserProfile = async()=> {
        const user = await getUserSession()
        return getSellerProduct(user?.id)
}

export const getLoggedinSellerProfile = async () => {
  const user = await getUserSession();

  const res = await fetch(
    `${baseUrl}/api/my/sellerProfile?sellerId=${user?.id}`
  );

  return res.json();
};