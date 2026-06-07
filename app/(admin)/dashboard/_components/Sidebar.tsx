import { useState } from "react";
import Link from "next/link";
import { NavBtn } from "./NavBtn";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { GoPackageDependents } from "react-icons/go";
import { RiShoppingBag4Line } from "react-icons/ri";
import { LuUsers } from "react-icons/lu";
import { IoBarChartOutline } from "react-icons/io5";
import { MdOutlinePayment } from "react-icons/md";
import { MdOutlineInventory } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { PiPill } from "react-icons/pi";

const NAV = [
  {
    icon: <MdOutlineDashboardCustomize />,
    label: "Dashboard",
    href: "/dashboard",
  },
  { icon: <GoPackageDependents />, label: "Orders", href: "/orders" },
  { icon: <RiShoppingBag4Line />, label: "Products", href: "/products" },
  { icon: <LuUsers />, label: "Customers", href: "/customers" },
  { icon: <IoBarChartOutline />, label: "Analytics", href: "/analytics" },
  { icon: <MdOutlinePayment />, label: "Payments", href: "/payments" },
  { icon: <MdOutlineInventory />, label: "Inventory", href: "/inventory" },
  { icon: <IoSettingsOutline />, label: "Settings", href: "/settings" },
];

const Sidebar = () => {
  const [sideOpen, setSide] = useState(false);
  const [active, setActive] = useState("Dashboard");
  return (
    <aside
      className={`
        fixed inset-y-0 left-0 z-40 flex flex-col bg-white dark:bg-gray-900
        border-r border-gray-100 dark:border-gray-800 transition-all duration-300
        ${sideOpen ? "w-56" : "w-0 lg:w-56"} overflow-hidden
      `}
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 py-5 border-b border-gray-100 dark:border-gray-800 flex-shrink-0">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: "#2dc67b" }}
        >
          <span className="text-white font-medium text-xl"><PiPill /></span>
        </div>
        <div>
          <p className="font-medium text-sm text-gray-900 dark:text-gray-100 leading-tight mb-1">
            MediSwift
          </p>
          <p
            className="text-[9px] tracking-widest font-medium"
            style={{ color: "#2dc67b" }}
          >
            ADMIN PANEL
          </p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto space-y-0.5">
        <p className="text-[10px] text-gray-400 dark:text-gray-600 uppercase tracking-widest px-2 pb-2 pt-1">
          Main
        </p>
        {NAV.slice(0, 4).map((n) => (
          <Link key={n.label} href={n.href} onClick={() => setSide(false)}>
            <NavBtn
              item={n}
              active={active}
              onClick={() => setActive(n.label)}
            />
          </Link>
        ))}
        <p className="text-[10px] text-gray-400 dark:text-gray-600 uppercase tracking-widest px-2 pb-2 pt-4">
          Insights
        </p>
        {NAV.slice(4, 7).map((n) => (
          <Link key={n.label} href={n.href} onClick={() => setSide(false)}>
            <NavBtn
              item={n}
              active={active}
              onClick={() => setActive(n.label)}
            />
          </Link>
        ))}
        <p className="text-[10px] text-gray-400 dark:text-gray-600 uppercase tracking-widest px-2 pb-2 pt-4">
          System
        </p>
        {NAV.slice(7).map((n) => (
          <Link key={n.label} href={n.href} onClick={() => setSide(false)}>
            <NavBtn
              item={n}
              active={active}
              onClick={() => setActive(n.label)}
            />
          </Link>
        ))}
      </nav>

      {/* User */}
      <div className="flex items-center gap-2.5 px-4 py-4 border-t border-gray-100 dark:border-gray-800 flex-shrink-0">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium text-white flex-shrink-0"
          style={{ background: "#2dc67b" }}
        >
          AD
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-gray-900 dark:text-gray-100 truncate">
            Admin User
          </p>
          <p className="text-[10px] text-gray-400 truncate">
            admin@propharm.com
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
