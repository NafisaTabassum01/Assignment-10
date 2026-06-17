import React from "react";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

const ExtraSection4 = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Success Stories
          </h2>
          <p className="text-slate-400 mt-3 text-sm md:text-base max-w-2xl mx-auto">
            Real experiences from buyers and sellers who trust our platform.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Buyer */}
          <div className="p-6 rounded-2xl bg-slate-900/70 border border-white/10 shadow-md">
            
            <div className="flex items-center gap-2 text-slate-300 mb-4">
              <FaQuoteLeft className="text-[#499294]" />
              <span className="text-xs">Buyer Experience</span>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed">
              “I found exactly what I needed in minutes. The platform is smooth, fast, and very easy to use.”
            </p>

            <div className="mt-5 flex items-center justify-between">
              <div>
                <h4 className="text-white font-semibold text-sm">Rahim Ahmed</h4>
                <p className="text-xs text-slate-400">Verified Buyer</p>
              </div>

              <div className="flex text-yellow-400 gap-1">
                <FaStar size={12} />
                <FaStar size={12} />
                <FaStar size={12} />
                <FaStar size={12} />
                <FaStar size={12} />
              </div>
            </div>
          </div>

          {/* Seller */}
          <div className="p-6 rounded-2xl bg-slate-900/70 border border-white/10 shadow-md">

            <div className="flex items-center gap-2 text-slate-300 mb-4">
              <FaQuoteLeft className="text-[#499294]" />
              <span className="text-xs">Seller Success</span>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed">
              “My sales increased within weeks. Managing products and orders became much more efficient.”
            </p>

            <div className="mt-5 flex items-center justify-between">
              <div>
                <h4 className="text-white font-semibold text-sm">Nusrat Jahan</h4>
                <p className="text-xs text-slate-400">Business Owner</p>
              </div>

              <div className="flex text-yellow-400 gap-1">
                <FaStar size={12} />
                <FaStar size={12} />
                <FaStar size={12} />
                <FaStar size={12} />
                <FaStar size={12} />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ExtraSection4;