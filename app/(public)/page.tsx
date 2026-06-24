"use client";
import Slider from "./components/heroSection/Slider";
import Category from "./components/categorySection/Category";
import BestSellers from "./components/bestSellers/BestSellers";


export default function PropharmHome() {
  return (
    <>
      {/* ── Hero Banner ── */}
      <section className="py-8 lg:py-12 relative overflow-hidden">
        <div className="absolute top-10 right-10 w-64 h-64 bg-[#2dc67b]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-20 w-48 h-48 bg-blue-100/30 rounded-full blur-2xl" />
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-10 items-center relative z-10">
          <Slider />
          <div className="relative lg:flex items-center justify-center z-200">
            {/* Product Selector Card */}
            <div className="absolute right-22 top-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-xl p-6 w-70">
              <p className="text-xs font-bold text-gray-500 mb-3 uppercase tracking-wide">
                Select a product
              </p>
              <select className="w-full bg-[#edf4f6]  rounded-full px-4 py-3 text-sm text-gray-700 mb-3 outline-none focus:border-[#2dc67b]">
                <option>Card</option>
              </select>
              <select className="w-full bg-[#edf4f6]  rounded-full px-4 py-3 text-sm text-gray-700 outline-none focus:border-[#2dc67b]">
                <option>Brand</option>
              </select>
              <p className="flex flex-col items-center text-[#56778f] text-sm font-semibold my-2">
                OR
              </p>
              <input
                type="text"
                placeholder="Search SKU..."
                className="w-full bg-[#edf4f6]  rounded-full px-4 py-3 text-sm mb-3 outline-none focus:border-[#2dc67b]"
              />
              <button className="w-full bg-[#ff6b35] text-white rounded-full py-2.5 text-sm font-bold hover:bg-[#e55d28] transition-colors">
                Shop now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Category Icons ── */}
      <Category />

      {/* ── Bestsellers ── */}
      <BestSellers />
    </>
  );
}
