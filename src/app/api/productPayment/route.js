// import { NextResponse } from "next/server";
// import { headers } from 'next/headers'
// import { stripe } from "@/lib/stripe";


// export async function POST() {
//   try {
//     const headersList = await headers()
//     const origin = headersList.get('origin')
//     // const body =  await rew.json()
//     // console.log(body)
//     // // NextResponsenjson({})
//     // // return;

//     // Create Checkout Sessions from body params.
//     const session = await stripe.checkout.sessions.create({
//       line_items: [
//         {
//           // Provide the exact Price ID (for example, price_1234) of the product you want to sell
//           price: 'price_1Tlo22Jinv3WpVeTVeCfS8mV',
//           quantity: 1,
//         },
//       ],
//       mode: 'payment',
//       success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
//     });
//     return NextResponse.redirect(session.url, 303)
//   } catch (err) {
//     return NextResponse.json(
//       { error: err.message },
//       { status: err.statusCode || 500 }
//     )
//   }
// }


// export async function GET(){
//     return NextResponse.json({
//         message : "hello from stripe"
//     })
// }

// // import { NextResponse } from "next/server";
// // import { headers } from "next/headers";
// // import { stripe } from "@/lib/stripe";

// // export async function POST(req) {
// //   try {
// //     const body = await req.json();

// //     const {
// //       productId,
// //       userId,
// //       amount,
// //     } = body;

// //     const headersList = await headers();
// //     const origin = headersList.get("origin");

// //     const session = await stripe.checkout.sessions.create({
// //       payment_method_types: ["card"],

// //       line_items: [
// //         {
// //           price_data: {
// //             currency: "usd",

// //             product: "prod_UlKhWqRJBlaPUL",

// //             unit_amount: amount * 100,
// //           },

// //           quantity: 1,
// //         },
// //       ],

// //       mode: "payment",

// //       metadata: {
// //         productId,
// //         userId,
// //       },

// //       success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,

// //       cancel_url: `${origin}/cancel`,
// //     });

// //     return NextResponse.json({
// //       url: session.url,
// //     });

// //   } catch (err) {
// //     return NextResponse.json(
// //       {
// //         error: err.message,
// //       },
// //       {
// //         status: 500,
// //       }
// //     );
// //   }
// // }

import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      productId,
      userId,
      amount,
      productTitle,
    } = body;

    const headersList = await headers();
    const origin = headersList.get("origin");

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "bdt",

            unit_amount: Number(amount) * 100,

            product_data: {
              name: productTitle,
            },
          },

          quantity: 1,
        },
      ],

      metadata: {
        productId,
        userId,
        amount,
        productTitle,
      },

      mode: "payment",

      success_url: `${origin}/payment-success?session_id={CHECKOUT_SESSION_ID}`,

      cancel_url: `${origin}/cancel`,
    });

    return NextResponse.json({
      url: session.url,
    });

  } catch (err) {
    return NextResponse.json(
      {
        error: err.message,
      },
      {
        status: err.statusCode || 500,
      }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: "hello from stripe",
  });
}