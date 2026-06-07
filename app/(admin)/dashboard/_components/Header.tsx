import { useState } from "react";

const Header = () => {
  const [search, setSearch] = useState("");
  const [sideOpen, setSide] = useState(false);
  return (
    <header className="flex items-center gap-3 px-5 lg:px-7 py-4.5 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 flex-shrink-0">
      <button
        onClick={() => setSide(true)}
        className="lg:hidden p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        aria-label="Open menu"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>
      <div>
        <p className="font-medium text-gray-900 dark:text-gray-100">
          Dashboard
        </p>
        <p className="text-[11px] text-gray-400">Sunday, June 07 2026</p>
      </div>
      <div className="hidden sm:flex flex-1 max-w-xs ml-auto items-center gap-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 focus-within:border-[#2dc67b] transition-colors">
        <svg
          className="w-3.5 h-3.5 text-gray-400 flex-shrink-0"
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
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search anything..."
          className="bg-transparent outline-none text-xs text-gray-700 dark:text-gray-300 placeholder-gray-400 w-full"
        />
      </div>
      <div className="flex items-center gap-2 ml-auto sm:ml-2">
        <button
          className="relative p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          aria-label="Notifications"
        >
          <svg
            className="w-4.5 h-4.5"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
            />
          </svg>
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
        </button>
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium text-white cursor-pointer"
          style={{ background: "#2dc67b" }}
        >
          AD
        </div>
      </div>
    </header>
  );
};

export default Header;
