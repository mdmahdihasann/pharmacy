
const NAV = [
  { icon:"⊞",  label:"Dashboard",  badge:null },
  { icon:"🛍", label:"Orders",     badge:12   },
  { icon:"💊", label:"Products",   badge:null },
  { icon:"👥", label:"Customers",  badge:null },
  { icon:"📊", label:"Analytics",  badge:null },
  { icon:"💳", label:"Payments",   badge:null },
  { icon:"📦", label:"Inventory",  badge:null },
  { icon:"⚙", label:"Settings",   badge:null },
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
      {item.badge && (
        <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full text-white" style={{ background:"#2dc67b" }}>
          {item.badge}
        </span>
      )}
    </button>
  );
}