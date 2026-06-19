const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";




// export const serverFetch = async (path)=>{
//         const res = await fetch(`${baseUrl}${path}` )
    
//     return res.json();
//     }

export const serverFetch = async (path) => {
  const res = await fetch(`${baseUrl}${path}`);

  const text = await res.text(); // 👈 safe first step

  try {
    return JSON.parse(text);
  } catch (err) {
    console.log("Invalid JSON from server:", text);
    return null; // prevent crash
  }
};



  
export const serverMutation = async (path, data) => {
  try {
    const res = await fetch(`${baseUrl}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    // 🔥 SAFE JSON PARSE (NO CRASH)
    let result;
    try {
      result = await res.json();
    } catch (err) {
      throw new Error("Invalid JSON response from server");
    }

    if (!res.ok) {
      return {
        success: false,
        message: result?.message || "Request failed",
        status: res.status,
      };
    }

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error("Server Mutation Error:", error);

    return {
      success: false,
      message: error.message || "Network error",
    };
  }
};