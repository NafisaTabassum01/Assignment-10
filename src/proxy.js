// // import { NextResponse } from "next/server";
// // import { auth } from "./lib/auth";
// // import { headers } from "next/headers";

// // export async function proxy(request) {

// //     const session = await auth.api.getSession({
// //         headers : await headers(),
// //         });

// //     // const isLoggedIn = true;
// // console.log(session)
// //     if(session){
// //        return NextResponse.next();
// //     }

// //   return NextResponse.redirect(new URL("/login", request.url))
// // }

// // export const config = {
// //   matcher: ["/dashboard"]
// // }

import { NextResponse } from "next/server";
import { auth } from "./lib/auth";
import { headers } from "next/headers";

export async function proxy(request) {
  const session = await auth.api.getSession({
        headers : await headers(),
  });

  if (!session) {
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  // const role = session.user.role;

  // user /dashboard hit korle
  // if (request.nextUrl.pathname === "/dashboard") {
  //   return NextResponse.redirect(
  //     new URL(`/dashboard/${role}`, request.url)
  //   );
  // }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    // "/allProducts/:path*/buyProduct",
  ],
};

