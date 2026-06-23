"use client";
import { PiPill } from "react-icons/pi";
import { FiSearch } from "react-icons/fi";
import { PiPhoneCallLight } from "react-icons/pi";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { useState } from "react";
import { LuGitCompareArrows } from "react-icons/lu";
import { FiHeart } from "react-icons/fi";
import { MdOutlineShoppingCart } from "react-icons/md";
import CartPopup from "../cartPopup/CartPopup";
import { Drawer, DrawerTrigger } from "@/components/ui/drawer";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const navLinks = [
    "Home",
    "Shop by Brand",
    "Shop by Category",
    "Blog",
    "Shop",
    "Elements",
    "Features",
  ];
  return (
    <header className="sticky top-0 z-50 bg-white">
      <div className="max-w-7xl mx-auto px-4 py-6 flex items-center gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2 mr-4 flex-shrink-0">
          <div className="w-9 h-9 bg-[#2dc67b] rounded-lg flex items-center justify-center">
            <span className="text-white font-black text-xl">
              <PiPill />
            </span>
          </div>
          <span className="font-bold text-2xl text-[#1a2e44] tracking-tight">
            {" "}
            MediSwift{" "}
          </span>
        </div>

        {/* Search Bar */}
        <div className="w-full max-w-5xl mx-auto">
          <form className="flex flex-col md:flex-row items-stretch gap-4 bg-[#edf4f6]  rounded-full border border-gray-200">
            {/* Category */}
            <select
              name="category"
              className="px-4 text-sm text-[#184363] outline-none w-34"
            >
              <option value="">Category</option>
              <option value="personal-care">Personal Care</option>
              <option value="grocery">Grocery</option>
              <option value="baby-accessories">Baby</option>
              <option value="beauty">Beauty</option>
              <option value="herbs">Herbs</option>
              <option value="sports-nutrition">Sports Nutrition</option>
              <option value="pets">Pets</option>
              <option value="medicines">Medicines</option>
            </select>

            {/* Search Input */}
            <div className="relative flex-1">
              <input
                type="search"
                placeholder="What are you looking for?"
                className="w-full h-12 pl-4 pr-12  outline-none text-[#184363]"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="px-5 text-xl rounded-r-full bg-[#2dc67b] text-white font-medium hover:bg-[#2dc67b]/90 transition"
            >
              <FiSearch />
            </button>
          </form>
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-3 ml-auto md:ml-4">
          <button className="hidden sm:flex flex gap-3 text-gray-600 transition-colors w-44">
            <PiPhoneCallLight className="text-2xl color-[#2dc67b]" />
            <div>
              <div className="text-xs font-medium">Sales & Service Support</div>
              <div className="text-sm font-bold text-start color-[#184363]">
                01305524434
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Nav Links */}
      <nav className="border-y border-gray-200 bg-white hidden md:block">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6 py-3">
          <div className="flex gap-2 bg-[#edf4f6] text-[#184363] items-center rounded-full px-5 py-3 text-[15px] font-semibold hover:bg-[#184363] hover:text-white transition-colors cursor-pointer">
            <AiOutlineMenuUnfold />
            <span>All Categories</span>
          </div>
          <div className="flex-1">
            <ul className="flex items-center gap-1">
              {navLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className={`px-4 py-3 text-sm font-bold block transition-colors hover:text-[#2dc67b] ${link === "Home" ? "text-[#2dc67b]" : "text-gray-700"}    `}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center gap-2">
            <button className="hidden sm:block p-2 text-gray-600 hover:text-[#2dc67b] transition-colors">
              <LuGitCompareArrows className="text-xl" />
            </button>
            <button className="p-2 text-gray-600 hover:text-[#2dc67b] transition-colors relative">
              <FiHeart className="text-xl" />
            </button>

            <Drawer direction="right">
              <DrawerTrigger asChild>
                <button
                  className="p-2 text-gray-600 hover:text-[#2dc67b] transition-colors relative"
                  onClick={() => setOpen(true)}
                >
                  <MdOutlineShoppingCart className="text-xl" />
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#2dc67b] text-white text-[9px] rounded-full flex items-center justify-center font-bold">
                    2
                  </span>
                </button>
              </DrawerTrigger>
            
            {open && <CartPopup />}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {/* {mobileMenuOpen ? <Icon.X /> : <Icon.Menu />} */}
            </button>
            </Drawer>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pb-4">
          <div className="flex items-center border border-gray-200 rounded-full overflow-hidden mt-3 mb-3">
            <input
              type="text"
              placeholder="Search..."
              className="flex-1 px-4 py-2 text-sm outline-none"
            />
            <button className="bg-[#2dc67b] text-white px-4 py-2">
              {/* <Icon.Search /> */}
            </button>
          </div>
          {navLinks.map((link) => (
            <a
              key={link}
              href="#"
              className="block py-2.5 text-sm text-gray-700 border-b border-gray-50 hover:text-[#2dc67b]"
            >
              {link}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};

export default Navbar;
