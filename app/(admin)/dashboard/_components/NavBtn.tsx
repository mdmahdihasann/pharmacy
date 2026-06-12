import { MdOutlineDashboardCustomize } from "react-icons/md";
import { GoPackageDependents } from "react-icons/go";
import { RiShoppingBag4Line } from "react-icons/ri";
import { LuUsers } from "react-icons/lu";
import { IoBarChartOutline } from "react-icons/io5";
import { MdOutlinePayment } from "react-icons/md";
import { MdOutlineInventory } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";

const NAV = [
  {
    icon: <MdOutlineDashboardCustomize />,
    label: "Dashboard",
    href: "/dashboard",
  },
  { icon: <GoPackageDependents />, label: "Orders", href: "/orders" },
  { icon: <RiShoppingBag4Line />, label: "Products", href: "/products" },
  { icon: <LuUsers />, label: "Category", href: "/category" },
  { icon: <IoBarChartOutline />, label: "Analytics", href: "/analytics" },
  { icon: <MdOutlinePayment />, label: "Payments", href: "/payments" },
  { icon: <MdOutlineInventory />, label: "Inventory", href: "/inventory" },
  { icon: <IoSettingsOutline />, label: "Settings", href: "/settings" },
];

export function NavBtn({ item, active, onClick }: { item: typeof NAV[number]; active: string; onClick: () => void }) {
  const isActive = active === item.label;
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-[13px] transition-all ${
        isActive
          ? "font-medium"
          : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100"
      }`}
      style={isActive ? { background:"#2dc67b14", color:"#1a9f5c" } : {}}
    >
      <span className="text-base w-4 text-center flex-shrink-0">{item.icon}</span>
      <span className="flex-1 text-left">{item.label}</span>
    
    </button>
  );
}