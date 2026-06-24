
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