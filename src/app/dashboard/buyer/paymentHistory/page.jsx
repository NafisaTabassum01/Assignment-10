// import { getPayments } from "@/lib/api/payment";
// import { auth } from "@/lib/auth";
// import { headers } from "next/headers";

// const PaymentHistoryPage = async () => {

//   const session = await auth.api.getSession({
//     headers: await headers(),
//   });

//   const user = session?.user;

//   const payments = await getPayments(user.id);

//   return (
//     <div className="p-6">

//       <h1 className="text-2xl font-bold mb-6">
//         Payment History
//       </h1>

//       <div className="overflow-x-auto">

//         <table className="table">

//           <thead>
//             <tr>
//               <th>Order ID</th>
//               <th>Product</th>
//               <th>Amount</th>
//               <th>Status</th>
//               <th>Transaction</th>
//             </tr>
//           </thead>

//           <tbody>

//             {payments.map((payment) => (

//               <tr key={payment._id}>

//                 <td>
//                   {payment.orderId}
//                 </td>

//                 <td>
//                   {payment.productTitle}
//                 </td>

//                 <td>
//                   ৳ {payment.amount}
//                 </td>

//                 <td>
//                   {payment.paymentStatus}
//                 </td>

//                 <td>
//                   {payment.transactionId}
//                 </td>

//               </tr>

//             ))}

//           </tbody>

//         </table>

//       </div>

//     </div>
//   );
// };

// export default PaymentHistoryPage;


import { getPayments } from "@/lib/api/payment";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

import { Table, Chip } from "@heroui/react";
import { FiCreditCard } from "react-icons/fi";

const PaymentHistoryPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  const payments = await getPayments(user.id);

  return (
    <div className="w-full min-h-screen bg-slate-50/50 p-4 md:p-8">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto flex items-center gap-3 mb-8 border-b border-slate-200/60 pb-5">
        <div className="p-2.5 bg-[#38A3A5]/10 rounded-xl border border-[#38A3A5]/20 text-[#38A3A5]">
          <FiCreditCard className="size-6" />
        </div>

        <div>
          <h1 className="text-2xl font-black text-[#22577A] tracking-tight">
            Payment History
          </h1>

          <p className="text-xs text-slate-400 mt-0.5">
            View all completed payment transactions
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="max-w-7xl mx-auto bg-white border border-slate-100 rounded-2xl shadow-xl p-4 md:p-6">
        <Table variant="secondary" className="w-full">
          <Table.ScrollContainer className="rounded-xl border border-slate-100 overflow-hidden">

            <Table.Content
              aria-label="Payment history table"
              className="min-w-[900px] bg-white"
            >

              <Table.Header>
                <Table.Column    
                 isRowHeader
 className="bg-slate-50 text-slate-500 font-bold text-xs uppercase tracking-wider py-4 pl-6">
                  Order ID
                </Table.Column>

                <Table.Column className="bg-slate-50 text-slate-500 font-bold text-xs uppercase tracking-wider py-4">
                  Product
                </Table.Column>

                <Table.Column className="bg-slate-50 text-slate-500 font-bold text-xs uppercase tracking-wider py-4">
                  Amount
                </Table.Column>

                <Table.Column className="bg-slate-50 text-slate-500 font-bold text-xs uppercase tracking-wider py-4">
                  Status
                </Table.Column>

                <Table.Column className="bg-slate-50 text-slate-500 font-bold text-xs uppercase tracking-wider py-4 pr-6">
                  Transaction
                </Table.Column>
              </Table.Header>

              <Table.Body
                emptyContent={
                  <div className="text-center py-10 text-slate-400 text-sm font-medium">
                    No payment history found
                  </div>
                }
              >
                {payments.map((payment) => (
                  <Table.Row
                    key={payment._id}
                    className="border-b border-slate-100 hover:bg-slate-50/60 transition-colors"
                  >
                    {/* Order ID */}
                    <Table.Cell className="py-4 pl-6">
                      <span
                        title={payment.orderId}
                        className="font-semibold text-[#22577A]"
                      >
                        {payment.orderId?.slice(0, 12)}...
                      </span>
                    </Table.Cell>

                    {/* Product */}
                    <Table.Cell className="py-4">
                      <span className="font-medium text-slate-700">
                        {payment.productTitle}
                      </span>
                    </Table.Cell>

                    {/* Amount */}
                    <Table.Cell className="py-4">
                      <span className="font-black text-[#22577A]">
                        ৳ {payment.amount?.toLocaleString()}
                      </span>
                    </Table.Cell>

                    {/* Status */}
                    <Table.Cell className="py-4">
                      <Chip
                        size="sm"
                        variant="flat"
                        className={
                          payment.paymentStatus === "paid" ||
                          payment.paymentStatus === "success"
                            ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                            : "bg-rose-50 text-rose-600 border border-rose-200"
                        }
                      >
                        {payment.paymentStatus}
                      </Chip>
                    </Table.Cell>

                    {/* Transaction */}
                    <Table.Cell className="py-4 pr-6">
                      <span
                        title={payment.transactionId}
                        className="text-slate-600 font-medium"
                      >
                        {payment.transactionId?.slice(0, 15)}...
                      </span>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>

            </Table.Content>

          </Table.ScrollContainer>
        </Table>
      </div>
    </div>
  );
};

export default PaymentHistoryPage;