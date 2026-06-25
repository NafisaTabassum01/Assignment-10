// // // import { stripe } from "@/lib/stripe";

// // // const PaymentSuccessPage = async ({ searchParams }) => {
// // //       console.log(searchParams);

// // //   const sessionId = await searchParams?.session_id;

// // //   let paymentInfo = null;

// // //   if (sessionId) {
// // //     paymentInfo = await stripe.checkout.sessions.retrieve(
// // //       sessionId
// // //     );
// // //   }

// // //   return (
// // //     <div className="min-h-screen flex items-center justify-center">
// // //       <div className="shadow-lg p-10 rounded-xl max-w-xl w-full">
// // //         <h1 className="text-3xl font-bold text-green-600 mb-6">
// // //           Payment Successful
// // //         </h1>

// // //         <div className="space-y-3">
// // //           <p>
// // //             <strong>Session ID:</strong>
// // //             <br />
// // //             {paymentInfo?.id}
// // //           </p>

// // //           <p>
// // //             <strong>Payment Status:</strong>
// // //             <br />
// // //             {paymentInfo?.payment_status}
// // //           </p>

// // //           <p>
// // //             <strong>Customer Email:</strong>
// // //             <br />
// // //             {paymentInfo?.customer_email}
// // //           </p>

// // //           <p>
// // //             <strong>Amount:</strong>
// // //             <br />
// // //             ৳ {(paymentInfo?.amount_total || 0) / 100}
// // //           </p>

// // //           <p>
// // //             <strong>Payment Intent:</strong>
// // //             <br />
// // //             {paymentInfo?.payment_intent}
// // //           </p>
// // //         </div>

// // //         <hr className="my-5" />

// // //         <h2 className="font-bold mb-2">
// // //           Metadata
// // //         </h2>

// // //         <pre className="bg-gray-100 p-3 rounded text-xs overflow-auto">
// // //           {JSON.stringify(paymentInfo?.metadata, null, 2)}
// // //         </pre>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default PaymentSuccessPage;


// // import { stripe } from "@/lib/stripe";

// // const PaymentSuccessPage = async ({ searchParams }) => {
// //   const params = await searchParams;

// //   const sessionId = params?.session_id;

// //   if (!sessionId) {
// //     return <div>No Session ID Found</div>;
// //   }

// //   const session = await stripe.checkout.sessions.retrieve(
// //     sessionId
// //   );

// //   return (
// //     <div className="p-10">
// //       <h1 className="text-3xl font-bold text-green-600">
// //         Payment Successful
// //       </h1>

// //       <div className="mt-5 space-y-2">
// //         <p>
// //           <strong>Session ID:</strong> {session.id}
// //         </p>

// //         <p>
// //           <strong>Payment Status:</strong>{" "}
// //           {session.payment_status}
// //         </p>

// //         <p>
// //           <strong>Amount:</strong>{" "}
// //           {(session.amount_total || 0) / 100} BDT
// //         </p>

// //         <p>
// //           <strong>Transaction ID:</strong>{" "}
// //           {session.payment_intent}
// //         </p>
// //       </div>

// //       {/* <pre className="mt-5 bg-gray-100 p-4 rounded">
// //         {JSON.stringify(session.metadata, null, 2)}
// //       </pre> */}
// //     </div>
// //   );
// // };

// // export default PaymentSuccessPage;

// import { stripe } from "@/lib/stripe";

// const PaymentSuccessPage = async ({
//   searchParams,
// }) => {

//   const params = await searchParams;

//   const sessionId =
//     params?.session_id;

//   const session =
//     await stripe.checkout.sessions.retrieve(
//       sessionId
//     );

// const paymentData = {
//   orderId: session.id,

//   stripeSessionId: session.id,

//   transactionId: session.payment_intent,

//   productId: session.metadata.productId,

//   productTitle: session.metadata.productTitle,

//   buyerId: session.metadata.userId,

//   amount: Number(session.metadata.amount),

//   paymentStatus: session.payment_status,

//   paidAt: new Date(),
// };

//   await fetch(
//     "http://localhost:5000/api/payments",
//     {
//       method: "POST",

//       headers: {
//         "Content-Type":
//           "application/json",
//       },

//       body:
//         JSON.stringify(paymentData),
//     }
//   );

//   return (
//     <div className="w-8/12 mx-auto min-h-screen flex justify-center items-center">
// <div className="bg-gray-300 shadow-lg ">
//         <h1>
//         Payment Successful
//       </h1>

//       <p>
//         Order:
//         {paymentData.orderId}
//       </p>

//       <p>
//         Transaction:
//         {paymentData.transactionId}
//       </p>

//       <p>
//         Amount:
//         ৳ {paymentData.amount}
//       </p>

//       <p>
//         Status:
//         {paymentData.paymentStatus}
//       </p>

// </div>

//     </div>
//   );
// };

// export default PaymentSuccessPage;

import { stripe } from "@/lib/stripe";
import Link from "next/link";
import { 
  FiCheckCircle, 
  FiArrowRight, 
  FiShoppingBag, 
  FiHash, 
  FiCheck,
  FiInfo
} from "react-icons/fi";

const PaymentSuccessPage = async ({ searchParams }) => {
  const params = await searchParams;
  const sessionId = params?.session_id;

  // কোনো সেশন আইডি না থাকলে সেফটি রিটার্ন
  if (!sessionId) {
    return (
      <div className="w-full min-h-screen bg-slate-50 flex flex-col items-center justify-center text-slate-500 font-sans">
        <FiInfo className="size-8 text-amber-500 mb-2" />
        <p className="text-sm font-semibold mb-3">No active payment session found.</p>
        <Link href="/" className="px-4 py-2 bg-[#22577A] text-white rounded-xl text-xs font-bold shadow-sm hover:bg-[#216869] transition-all">
          Go Home
        </Link>
      </div>
    );
  }

  const session = await stripe.checkout.sessions.retrieve(sessionId);

  const paymentData = {
    orderId: session.id,
    stripeSessionId: session.id,
    transactionId: session.payment_intent,
    productId: session.metadata?.productId,
    productTitle: session.metadata?.productTitle,
    buyerId: session.metadata?.userId,
    amount: Number(session.metadata?.amount || 0),
    paymentStatus: session.payment_status,
    paidAt: new Date(),
  };

  // আপনার বিদ্যমান API কলটি যেভাবে ছিল ঠিক সেভাবেই রাখা হলো
  await fetch("http://localhost:5000/api/payments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(paymentData),
  });

  return (
    <div className="w-full min-h-screen bg-slate-50/50 flex justify-center items-center p-4 font-sans text-[#22577A]">
      <div className="w-full max-w-lg bg-white rounded-2xl border border-slate-100 shadow-xl overflow-hidden p-6 md:p-8 flex flex-col items-center text-center">
        
        {/* Success Icon Header */}
        <div className="size-16 bg-emerald-50 rounded-full flex items-center justify-center mb-4 border border-emerald-100 animate-bounce-slow">
          <FiCheckCircle className="size-10 text-emerald-500" />
        </div>

        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full uppercase tracking-wider mb-2">
          Receipt Generated
        </span>
        
        <h1 className="text-2xl font-black text-[#22577A] tracking-tight mb-1">
          Payment Successful
        </h1>
        <p className="text-xs text-slate-400 font-medium mb-6">
          Thank you for your purchase! Your order is being processed.
        </p>

        {/* Invoice details body */}
        <div className="w-full bg-slate-50/70 border border-slate-100 rounded-xl p-4 flex flex-col gap-3.5 text-left mb-6">
          
          {/* Order ID */}
          <div className="flex flex-col gap-1 border-b border-slate-200/50 pb-2.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <FiHash className="text-[#38A3A5]" /> Order ID
            </span>
            <span className="text-xs font-semibold text-[#22577A] break-all font-mono">
              {paymentData.orderId}
            </span>
          </div>

          {/* Transaction ID */}
          <div className="flex flex-col gap-1 border-b border-slate-200/50 pb-2.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <FiShoppingBag className="text-[#38A3A5]" /> Transaction
            </span>
            <span className="text-xs font-semibold text-slate-600 break-all font-mono">
              {paymentData.transactionId}
            </span>
          </div>

          {/* Amount & Status Grid */}
          <div className="grid grid-cols-2 gap-4 pt-0.5">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Amount Paid</span>
              <p className="text-xl font-black text-[#216869] mt-0.5">
                ৳ {Number(paymentData.amount).toLocaleString()}
              </p>
            </div>
            
            <div className="flex flex-col items-end justify-end text-right">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Status</span>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-md mt-1 capitalize">
                <FiCheck className="size-3" />
                {paymentData.paymentStatus}
              </span>
            </div>
          </div>

        </div>

        {/* Action Button Links */}
        <div className="w-full flex flex-col sm:flex-row items-center gap-3">
          <Link
            href="/allProducts"
            className="w-full h-11 border border-slate-200 bg-white text-slate-500 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 hover:bg-slate-50 hover:text-[#22577A] transition-all"
          >
            Continue Shopping
          </Link>
          
          <Link
            href="/dashboard/buyer"
            className="w-full h-11 bg-[#22577A] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 hover:bg-[#216869] transition-all shadow-sm group"
          >
            <span>Go to Dashboard</span>
            <FiArrowRight className="size-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

      </div>
    </div>
  );
};

export default PaymentSuccessPage;