

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




buyerId: session.metadata?.userId,
    buyerName: session.metadata?.buyerName,     // স্ট্রাইপ সেশন তৈরি করার সময় এটা পাস করবি
    buyerEmail: session.metadata?.buyerEmail,   // স্ট্রাইpe পাস করা ইমেইল
    
    sellerId: session.metadata?.sellerId,       // প্রোডাক্ট থেকে পাওয়া সেলার আইডি
    sellerName: session.metadata?.sellerName,   // সেলারের নাম
    sellerEmail: session.metadata?.sellerEmail, // সেলারের ইমেইল




  };

  // আপনার বিদ্যমান API কলটি যেভাবে ছিল ঠিক সেভাবেই রাখা হলো
  await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/payments`, {
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