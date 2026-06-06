"use client";
import { useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { MdLightMode } from "react-icons/md";
import { MdNightlight } from "react-icons/md";

const TopBar = () => {
    const [darkMode, setDarkMode] = useState(false);
  return (
    <div className="bg-[#2dc67b]">
      <div className="max-w-7xl mx-auto text-white text-[14px] py-3 px-4 flex flex-col sm:flex-row items-center justify-between gap-1">
        <span>
          Due to the COVID-19 pandemic, orders may be processed with a slight
          delay
        </span>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 font-semibold text-[16px]" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <MdNightlight /> : <MdLightMode />}
          </button>
          {" | "}
          <span className="flex items-center gap-2 font-semibold">
            <FaRegUser className="text-[16px]" /> My Account
          </span>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
