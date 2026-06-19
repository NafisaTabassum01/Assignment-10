import { serverFetch } from "../core/server";




export const getSellerProfile = async (sellerId) => {
  return serverFetch(`/api/my/sellerProfile?sellerId=${sellerId}`);
};