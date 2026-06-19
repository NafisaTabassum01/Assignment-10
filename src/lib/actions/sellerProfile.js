// 'use server'

// const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// export const createSeller = async (newSellerdata)=>{
//  const res = await fetch(`${baseUrl}/api/sellerProfile` , {
//     method : 'POST' ,
//     headers : {
//         'Content-type' : 'application/json',

//     },
//     body : JSON.stringify(newSellerdata)
//  });

//  return res.json();
// }

'use server'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export const createSeller = async (newSellerdata) => {
  try {
    const res = await fetch(`${baseUrl}/api/sellerProfile`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newSellerdata)
    });

    if (!res.ok) {
       throw new Error(`HTTP error! status: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Fetch API Error:", error);
    return { message: "Failed to communicate with database server." };
  }
}