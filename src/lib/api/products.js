const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export const getSellerProduct = async(sellerId , status='active') =>{
 const res = await fetch(`${baseUrl}/api/products?sellerId=${sellerId}&status=${status}`)
return res.json();
}