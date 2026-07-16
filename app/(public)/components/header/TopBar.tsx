"use client";

import { useRouter } from "next/navigation";
import useUser from "@/hooks/useUser";
import { FaRegUser } from "react-icons/fa";
import { MdLightMode, MdNightlight } from "react-icons/md";
import { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

export default function TopBar() {
  const router = useRouter();
  const user = useUser();

  const [darkMode, setDarkMode] = useState(false);

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/logout", {
        method: "POST",
      });
      localStorage.removeItem("user");
      if (res.ok) {
        router.refresh();
        router.push("/login");
        toast.success("Logout successfully")
      }
      
    } catch (error:any) {
      console.log(error.message);
      toast.error("Logout Faild")
    }
  };

  return (
    <div className="bg-[#2dc67b]">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 text-white">
        <span className="text-sm">
          Due to the COVID-19 pandemic, orders may be processed with a slight
          delay.
        </span>

        <div className="flex items-center gap-5">
          <button onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <MdNightlight size={20} /> : <MdLightMode size={20} />}
          </button>
          <hr className="h-5 w-0.5 bg-gray-50" />
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 font-semibold text-sm outline-none ring-0 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0">
                  <FaRegUser />
                  My Account
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-42 bg-white p-1">
                <DropdownMenuItem onClick={() => router.push("/dashboard")}>
                  Dashboard
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => router.push("/profile")}>
                  Profile
                </DropdownMenuItem>

                <DropdownMenuSeparator className=" border border-gray-100 " />

                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-red-600 hover:bg-red-100"
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <button
              onClick={() => router.push("/login")}
              className="flex items-center gap-2 font-semibold"
            >
              <FaRegUser />
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
