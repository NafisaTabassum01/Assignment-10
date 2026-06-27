import { serverFetch } from "../core/server";
import { getUserSession } from "../core/session";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;


export const getProduct = async () => {
  return serverFetch("/api/products?status=approved");
};


// export const getSellerProduct = async(sellerId , status='active') =>{
//  const res = await fetch(`${baseUrl}/api/products?sellerId=${sellerId}&status=${status}`)
// return res.json();
// }


export const getSellerProduct = async (sellerId,) => {
  const res = await fetch(
    `${baseUrl}/api/products?sellerId=${sellerId}`,
    {
      cache: "no-store",
    }
  );

  const result = await res.json();

  return result.data;
};



export const getLoggedinSellerProfile = async () => {
  const user = await getUserSession();

  console.log("USER:", user);

  if (!user?.id) return null;

  const res = await fetch(
    `${baseUrl}/api/my/sellerProfile?sellerId=${user.id}`,
    {
      cache: "no-store",
    }
  );

  const seller = await res.json();

  console.log("SELLER:", seller);

  return seller;
};