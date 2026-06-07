"use client";

import { useState } from "react";
import Header from "./dashboard/_components/Header";
import Sidebar from "./dashboard/_components/Sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
   const [sideOpen, setSide] = useState(false);
  return (
    <div className="h-full">
      <main className="h-full">
        <div className="flex h-screen bg-gray-50 dark:bg-gray-950 font-sans overflow-hidden text-sm">
          {/* ── Sidebar ── */}
          <Sidebar />

          {/* Overlay */}
          {sideOpen && (
            <div
              className="fixed inset-0 z-30 bg-black/30 lg:hidden"
              onClick={() => setSide(false)}
            />
          )}

          {/* ── Main ── */}
          <div className="flex-1 flex flex-col min-w-0 lg:ml-56 overflow-hidden">
            {/* Topbar */}
            <Header />

            {/* Scrollable body */}
            <main className="flex-1 overflow-y-auto px-5 lg:px-7 py-5 space-y-4">
              {children}

              <p className="text-center text-xs text-gray-300 dark:text-gray-700 pb-1 pt-2">
                © 2026  MediSwift Design & Development by Mahdi Hasan Sojibe. All rights reserved.
              </p>
            </main>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
