// // import { stripe } from "@/lib/stripe";

// // const PaymentSuccessPage = async ({ searchParams }) => {
// //       console.log(searchParams);

// //   const sessionId = await searchParams?.session_id;

// //   let paymentInfo = null;

// //   if (sessionId) {
// //     paymentInfo = await stripe.checkout.sessions.retrieve(
// //       sessionId
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen flex items-center justify-center">
// //       <div className="shadow-lg p-10 rounded-xl max-w-xl w-full">
// //         <h1 className="text-3xl font-bold text-green-600 mb-6">
// //           Payment Successful
// //         </h1>

// //         <div className="space-y-3">
// //           <p>
// //             <strong>Session ID:</strong>
// //             <br />
// //             {paymentInfo?.id}
// //           </p>

// //           <p>
// //             <strong>Payment Status:</strong>
// //             <br />
// //             {paymentInfo?.payment_status}
// //           </p>

// //           <p>
// //             <strong>Customer Email:</strong>
// //             <br />
// //             {paymentInfo?.customer_email}
// //           </p>

// //           <p>
// //             <strong>Amount:</strong>
// //             <br />
// //             ৳ {(paymentInfo?.amount_total || 0) / 100}
// //           </p>

// //           <p>
// //             <strong>Payment Intent:</strong>
// //             <br />
// //             {paymentInfo?.payment_intent}
// //           </p>
// //         </div>

// //         <hr className="my-5" />

// //         <h2 className="font-bold mb-2">
// //           Metadata
// //         </h2>

// //         <pre className="bg-gray-100 p-3 rounded text-xs overflow-auto">
// //           {JSON.stringify(paymentInfo?.metadata, null, 2)}
// //         </pre>
// //       </div>
// //     </div>
// //   );
// // };

// // export default PaymentSuccessPage;


// import { stripe } from "@/lib/stripe";

// const PaymentSuccessPage = async ({ searchParams }) => {
//   const params = await searchParams;

//   const sessionId = params?.session_id;

//   if (!sessionId) {
//     return <div>No Session ID Found</div>;
//   }

//   const session = await stripe.checkout.sessions.retrieve(
//     sessionId
//   );

//   return (
//     <div className="p-10">
//       <h1 className="text-3xl font-bold text-green-600">
//         Payment Successful
//       </h1>

//       <div className="mt-5 space-y-2">
//         <p>
//           <strong>Session ID:</strong> {session.id}
//         </p>

//         <p>
//           <strong>Payment Status:</strong>{" "}
//           {session.payment_status}
//         </p>

//         <p>
//           <strong>Amount:</strong>{" "}
//           {(session.amount_total || 0) / 100} BDT
//         </p>

//         <p>
//           <strong>Transaction ID:</strong>{" "}
//           {session.payment_intent}
//         </p>
//       </div>

//       {/* <pre className="mt-5 bg-gray-100 p-4 rounded">
//         {JSON.stringify(session.metadata, null, 2)}
//       </pre> */}
//     </div>
//   );
// };

// export default PaymentSuccessPage;

import { stripe } from "@/lib/stripe";

const PaymentSuccessPage = async ({
  searchParams,
}) => {

  const params = await searchParams;

  const sessionId =
    params?.session_id;

  const session =
    await stripe.checkout.sessions.retrieve(
      sessionId
    );

const paymentData = {
  orderId: session.id,

  stripeSessionId: session.id,

  transactionId: session.payment_intent,

  productId: session.metadata.productId,

  productTitle: session.metadata.productTitle,

  buyerId: session.metadata.userId,

  amount: Number(session.metadata.amount),

  paymentStatus: session.payment_status,

  paidAt: new Date(),
};

  await fetch(
    "http://localhost:5000/api/payments",
    {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json",
      },

      body:
        JSON.stringify(paymentData),
    }
  );

  return (
    <div>
      <h1>
        Payment Successful
      </h1>

      <p>
        Order:
        {paymentData.orderId}
      </p>

      <p>
        Transaction:
        {paymentData.transactionId}
      </p>

      <p>
        Amount:
        ৳ {paymentData.amount}
      </p>

      <p>
        Status:
        {paymentData.paymentStatus}
      </p>
    </div>
  );
};

export default PaymentSuccessPage;