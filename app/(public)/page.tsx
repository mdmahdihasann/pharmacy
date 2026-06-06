"use client";
import { useState } from "react";


import TopBar from "./components/header/TopBar";
import Navbar from "./components/header/Navbar";
import Slider from "./components/heroSection/Slider";
import Category from "./components/categorySection/Category";
import BestSellers from "./components/bestSellers/BestSellers";


// ─── Icons (inline SVG) ───────────────────────────────────────────────────────
const Icon = {
  Cart: () => (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
      />
    </svg>
  ),
  Search: () => (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <circle cx="11" cy="11" r="8" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-4.35-4.35"
      />
    </svg>
  ),
  User: () => (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z"
      />
    </svg>
  ),
  Heart: () => (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
      />
    </svg>
  ),
  Star: ({ filled }) => (
    <svg
      className="w-3.5 h-3.5"
      fill={filled ? "#f59e0b" : "none"}
      stroke="#f59e0b"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
      />
    </svg>
  ),
  ChevronRight: () => (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  ),
  ChevronLeft: () => (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
  ),
  Phone: () => (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
      />
    </svg>
  ),
  Truck: () => (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10M13 16H9m4 0h3m3 0h1M13 6h3l3 4v6h-1M9 8H6"
      />
    </svg>
  ),
  Shield: () => (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
      />
    </svg>
  ),
  RefreshCcw: () => (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
      />
    </svg>
  ),
  Menu: () => (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  ),
  X: () => (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  ),
  Mail: () => (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  ),
  MapPin: () => (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  ),
};


export default function PropharmHome() {
  
  const [activeTab, setActiveTab] = useState("Supplements");
  const [email, setEmail] = useState("");

  

  return (
    <div className="min-h-screen bg-white font-sans ">
      {/* ── Top Bar ── */}
      <TopBar />

      {/* ── Navbar ── */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

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
              <p className="flex flex-col items-center text-[#56778f] text-sm font-semibold my-2">OR</p>
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
      <Category/>

      {/* ── Bestsellers ── */}
      <BestSellers/>

     

      {/* ── Footer ── */}
      <footer className="bg-[#1a2e44] text-white py-14">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-[#2dc67b] rounded-xl flex items-center justify-center">
                <span className="text-white font-black text-sm">P+</span>
              </div>
              <span className="font-black text-xl">Propharm</span>
            </div>
            <div className="space-y-2 text-sm text-gray-400">
              <p className="flex items-center gap-2 text-[#2dc67b] font-bold">
                9876 788 - HGGY - 888
              </p>
              <p className="flex items-center gap-2">
                <Icon.Mail />
                <span>info@propharm.com</span>
              </p>
              <p className="flex items-start gap-2">
                <Icon.MapPin />
                <span>
                  45 Washington Square S, New York, NY 10012, United States
                </span>
              </p>
            </div>
          </div>

          {[
            {
              title: "Information",
              links: [
                "About us",
                "Delivery information",
                "Privacy Policy",
                "Brands",
                "Terms & Conditions",
              ],
            },
            {
              title: "Account",
              links: [
                "Dashboard",
                "My orders",
                "Account details",
                "Returns",
                "Wishlist",
              ],
            },
            {
              title: "Popular",
              links: [
                "Herbs",
                "Medicine",
                "Sports Nutrition",
                "Protein",
                "Vitamins",
              ],
            },
            {
              title: "Useful",
              links: ["Career", "FAQ", "Contact us", "Tracker", "Referrals"],
            },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="font-black text-sm uppercase tracking-wider mb-4 text-white">
                {col.title}
              </h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-gray-400 hover:text-[#2dc67b] transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer Bottom */}
        <div className="max-w-7xl mx-auto px-4 mt-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6 text-xs text-gray-500">
            {[
              { icon: "🛡️", text: "270% Money back" },
              { icon: "🚚", text: "Non-constant shipping" },
              { icon: "📦", text: "Free delivery over $100" },
            ].map((b) => (
              <div key={b.text} className="flex items-center gap-1.5">
                <span>{b.icon}</span>
                <span>{b.text}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">We accept:</span>
            {["💳", "🏦", "💰"].map((icon, i) => (
              <span
                key={i}
                className="w-10 h-6 bg-white/10 rounded flex items-center justify-center text-sm"
              >
                {icon}
              </span>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 mt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-[#2dc67b] rounded-lg flex items-center justify-center">
              <span className="text-white font-black text-xs">P+</span>
            </div>
            <span className="font-black text-sm">Propharm</span>
          </div>
          <p className="text-xs text-gray-500">
            Copyright © Propharm, all rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
