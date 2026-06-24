// lib/api/payments.js

export const getPayments =
async (buyerId) => {

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/payments/${buyerId}`
  );

  return res.json();
};