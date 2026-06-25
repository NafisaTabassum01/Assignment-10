import React from 'react';
import BuyerProfile from './BuyerProfile';
import { getUserSession } from '@/lib/core/session';

// বায়ার প্রোফাইল ব্যাকএন্ড থেকে আনার ফাংশন
async function getBuyerProfileData(userId) {
  if (!userId) return null;
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/buyerProfile/${userId}`, {
      cache: 'no-store'
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.error("Error fetching buyer profile:", err);
    return null;
  }
}

const ProfilePage = async () => {
  const user = await getUserSession();
  const buyerData = await getBuyerProfileData(user?.id);

  return (
    <div>
      <BuyerProfile userSession={user} initialProfile={buyerData} />
    </div>
  );
};

export default ProfilePage;