"use client";
import { useState } from "react";

// ─── Types ──────────────────────────────────────────────────────────────────
type Status = "Delivered" | "Pending" | "Processing" | "Cancelled";
interface Order { id: string; initials: string; name: string; product: string; amount: string; status: Status; }
interface StockItem { name: string; count: number; max: number; }

// ─── Static data ─────────────────────────────────────────────────────────────
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const REVENUE = [42,58,47,63,55,71,68,84,73,79,91,84];
const MAX_REV  = Math.max(...REVENUE);

const ORDERS: Order[] = [
  { id:"RU", initials:"RU", name:"Rahim Uddin",    product:"Vitamin C 500mg",      amount:"$45.00",  status:"Delivered"  },
  { id:"NA", initials:"NA", name:"Nasrin Akter",   product:"Protein Chocolate",    amount:"$89.90",  status:"Processing" },
  { id:"KH", initials:"KH", name:"Karim Hossain",  product:"Montelukast 10mg",     amount:"$37.10",  status:"Pending"    },
  { id:"FB", initials:"FB", name:"Fatema Begum",   product:"Liver Detox",          amount:"$32.00",  status:"Delivered"  },
  { id:"SA", initials:"SA", name:"Sakib Ahmed",    product:"Amazonia Protein",     amount:"$59.50",  status:"Cancelled"  },
];

const STOCK: StockItem[] = [
  { name:"Vitamin C 500mg",   count:240, max:500 },
  { name:"Montelukast 10mg",  count:45,  max:300 },
  { name:"Protein Chocolate", count:180, max:200 },
  { name:"Apple Cider Vinegar", count:12, max:150 },
  { name:"Honey Elixoro",     count:320, max:400 },
  { name:"Face Mask Pack",    count:68,  max:250 },
];

const STATS = [
  { label:"Total Revenue",  value:"$84,250", delta:"+12.5%", up:true,  icon:"💰", accent:"#2dc67b" },
  { label:"Total Orders",   value:"3,842",   delta:"+8.2%",  up:true,  icon:"📦", accent:"#2563eb" },
  { label:"Customers",      value:"12,640",  delta:"+5.1%",  up:true,  icon:"👥", accent:"#f59e0b" },
  { label:"Return Rate",    value:"2.4%",    delta:"-0.8%",  up:false, icon:"↩️", accent:"#ef4444" },
];

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

// ─── Tiny helpers ─────────────────────────────────────────────────────────────
const statusStyle: Record<Status, string> = {
  Delivered:  "bg-emerald-50  text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
  Processing: "bg-blue-50     text-blue-700    dark:bg-blue-950    dark:text-blue-300",
  Pending:    "bg-amber-50    text-amber-700   dark:bg-amber-950   dark:text-amber-300",
  Cancelled:  "bg-red-50      text-red-700     dark:bg-red-950     dark:text-red-300",
};

function StatusDot({ status }: { status: Status }) {
  const dot: Record<Status, string> = {
    Delivered:"bg-emerald-500", Processing:"bg-blue-500",
    Pending:"bg-amber-500",     Cancelled:"bg-red-500",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium ${statusStyle[status]}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dot[status]}`} />
      {status}
    </span>
  );
}

function Avatar({ initials, color="emerald" }: { initials: string; color?: string }) {
  return (
    <div className={`w-7 h-7 rounded-full bg-${color}-100 dark:bg-${color}-900 flex items-center justify-center text-[10px] font-medium text-${color}-700 dark:text-${color}-300 flex-shrink-0 select-none`}>
      {initials}
    </div>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────
export default function Dashboard() {
  const [active, setActive]   = useState("Dashboard");
  const [sideOpen, setSide]   = useState(false);
  const [search, setSearch]   = useState("");

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950 font-sans overflow-hidden text-sm">

      {/* ── Sidebar ── */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 flex flex-col bg-white dark:bg-gray-900
        border-r border-gray-100 dark:border-gray-800 transition-all duration-300
        ${sideOpen ? "w-56" : "w-0 lg:w-56"} overflow-hidden
      `}>

        {/* Logo */}
        <div className="flex items-center gap-2.5 px-5 py-5 border-b border-gray-100 dark:border-gray-800 flex-shrink-0">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background:"#2dc67b" }}>
            <span className="text-white font-medium text-xs">P+</span>
          </div>
          <div>
            <p className="font-medium text-sm text-gray-900 dark:text-gray-100 leading-tight">Propharm</p>
            <p className="text-[9px] tracking-widest font-medium" style={{ color:"#2dc67b" }}>ADMIN PANEL</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto space-y-0.5">
          <p className="text-[10px] text-gray-400 dark:text-gray-600 uppercase tracking-widest px-2 pb-2 pt-1">Main</p>
          {NAV.slice(0,4).map(n => (
            <NavBtn key={n.label} item={n} active={active} onClick={() => { setActive(n.label); setSide(false); }} />
          ))}
          <p className="text-[10px] text-gray-400 dark:text-gray-600 uppercase tracking-widest px-2 pb-2 pt-4">Insights</p>
          {NAV.slice(4,7).map(n => (
            <NavBtn key={n.label} item={n} active={active} onClick={() => { setActive(n.label); setSide(false); }} />
          ))}
          <p className="text-[10px] text-gray-400 dark:text-gray-600 uppercase tracking-widest px-2 pb-2 pt-4">System</p>
          {NAV.slice(7).map(n => (
            <NavBtn key={n.label} item={n} active={active} onClick={() => { setActive(n.label); setSide(false); }} />
          ))}
        </nav>

        {/* User */}
        <div className="flex items-center gap-2.5 px-4 py-4 border-t border-gray-100 dark:border-gray-800 flex-shrink-0">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium text-white flex-shrink-0" style={{ background:"#2dc67b" }}>AD</div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-gray-900 dark:text-gray-100 truncate">Admin User</p>
            <p className="text-[10px] text-gray-400 truncate">admin@propharm.com</p>
          </div>
        </div>
      </aside>

      {/* Overlay */}
      {sideOpen && <div className="fixed inset-0 z-30 bg-black/30 lg:hidden" onClick={() => setSide(false)} />}

      {/* ── Main ── */}
      <div className="flex-1 flex flex-col min-w-0 lg:ml-56 overflow-hidden">

        {/* Topbar */}
        <header className="flex items-center gap-3 px-5 lg:px-7 py-3.5 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 flex-shrink-0">
          <button
            onClick={() => setSide(true)}
            className="lg:hidden p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            aria-label="Open menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
          <div>
            <p className="font-medium text-gray-900 dark:text-gray-100">Dashboard</p>
            <p className="text-[11px] text-gray-400">Sunday, June 07 2026</p>
          </div>
          <div className="hidden sm:flex flex-1 max-w-xs ml-auto items-center gap-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 focus-within:border-[#2dc67b] transition-colors">
            <svg className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8"/><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35"/>
            </svg>
            <input
              type="text" value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search anything..."
              className="bg-transparent outline-none text-xs text-gray-700 dark:text-gray-300 placeholder-gray-400 w-full"
            />
          </div>
          <div className="flex items-center gap-2 ml-auto sm:ml-2">
            <button className="relative p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors" aria-label="Notifications">
              <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
              </svg>
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
            </button>
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium text-white cursor-pointer" style={{ background:"#2dc67b" }}>AD</div>
          </div>
        </header>

        {/* Scrollable body */}
        <main className="flex-1 overflow-y-auto px-5 lg:px-7 py-5 space-y-4">

          {/* Stat cards */}
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
            {STATS.map(s => (
              <div key={s.label} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-4 flex flex-col gap-3 hover:border-gray-200 dark:hover:border-gray-700 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center text-lg" style={{ background:`${s.accent}18` }}>
                    {s.icon}
                  </div>
                  <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${s.up ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300" : "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300"}`}>
                    {s.delta}
                  </span>
                </div>
                <div>
                  <p className="text-xl font-medium text-gray-900 dark:text-gray-100">{s.value}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{s.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Revenue + Donut */}
          <div className="grid lg:grid-cols-3 gap-4">
            {/* Bar chart */}
            <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-5">
              <div className="flex items-start justify-between mb-5">
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">Revenue overview</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">Monthly · 2026</p>
                </div>
                <button className="text-[11px] font-medium text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 border border-gray-200 dark:border-gray-700 rounded-lg px-2.5 py-1 transition-colors">
                  View report →
                </button>
              </div>
              {/* Bars */}
              <div className="flex items-end gap-1.5 h-28">
                {REVENUE.map((v, i) => {
                  const pct = Math.round((v / MAX_REV) * 100);
                  const isCurrent = i === 7;
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
                      <div
                        className={`w-full rounded-t-md transition-all duration-500 cursor-pointer ${isCurrent ? "" : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"}`}
                        style={{ height:`${pct}%`, ...(isCurrent ? { background:"#2dc67b" } : {}) }}
                        title={`$${v}k`}
                      />
                      <span className={`text-[9px] font-medium ${isCurrent ? "text-[#2dc67b]" : "text-gray-400"}`}>{MONTHS[i]}</span>
                    </div>
                  );
                })}
              </div>
              {/* Summary */}
              <div className="grid grid-cols-3 gap-0 pt-4 mt-4 border-t border-gray-100 dark:border-gray-800">
                {[
                  { lbl:"This month", val:"$84k" },
                  { lbl:"Last month", val:"$74k" },
                  { lbl:"Of target",  val:"93.6%" },
                ].map(s => (
                  <div key={s.lbl} className="text-center px-2">
                    <p className="font-medium text-gray-900 dark:text-gray-100">{s.val}</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">{s.lbl}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Donut */}
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-5">
              <p className="font-medium text-gray-900 dark:text-gray-100">Sales by category</p>
              <p className="text-[11px] text-gray-400 mb-4 mt-0.5">This month</p>
              <div className="flex justify-center mb-4">
                <svg width="110" height="110" viewBox="0 0 110 110" role="img" aria-label="Category donut chart">
                  <circle cx="55" cy="55" r="40" fill="none" stroke="#f3f4f6" strokeWidth="16"/>
                  <circle cx="55" cy="55" r="40" fill="none" stroke="#2dc67b" strokeWidth="16"
                    strokeDasharray="105.5 251.3" strokeDashoffset="0" strokeLinecap="butt" transform="rotate(-90 55 55)"/>
                  <circle cx="55" cy="55" r="40" fill="none" stroke="#1a2e44" strokeWidth="16"
                    strokeDasharray="70.4 251.3" strokeDashoffset="-105.5" strokeLinecap="butt" transform="rotate(-90 55 55)"/>
                  <circle cx="55" cy="55" r="40" fill="none" stroke="#f59e0b" strokeWidth="16"
                    strokeDasharray="45.2 251.3" strokeDashoffset="-175.9" strokeLinecap="butt" transform="rotate(-90 55 55)"/>
                  <circle cx="55" cy="55" r="40" fill="none" stroke="#e5e7eb" strokeWidth="16"
                    strokeDasharray="30.2 251.3" strokeDashoffset="-221.1" strokeLinecap="butt" transform="rotate(-90 55 55)"/>
                  <text x="55" y="51" textAnchor="middle" fontSize="13" fontWeight="500" fill="currentColor">$84k</text>
                  <text x="55" y="63" textAnchor="middle" fontSize="10" fill="#9ca3af">total</text>
                </svg>
              </div>
              <div className="space-y-2.5">
                {[
                  { label:"Supplements",     pct:"42%", color:"#2dc67b" },
                  { label:"Medicines",       pct:"28%", color:"#1a2e44" },
                  { label:"Herbs & Natural", pct:"18%", color:"#f59e0b" },
                  { label:"Others",          pct:"12%", color:"#e5e7eb" },
                ].map(c => (
                  <div key={c.label} className="flex items-center justify-between py-2 border-b border-gray-50 dark:border-gray-800 last:border-none">
                    <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                      <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background:c.color }} />
                      {c.label}
                    </div>
                    <span className="text-xs font-medium text-gray-900 dark:text-gray-100">{c.pct}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Orders + Stock */}
          <div className="grid lg:grid-cols-2 gap-4">
            {/* Orders */}
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800">
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-800">
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">Recent orders</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">Latest transactions</p>
                </div>
                <button className="text-[11px] font-medium" style={{ color:"#2dc67b" }}>View all →</button>
              </div>
              <div>
                {ORDERS.map((o, i) => (
                  <div key={o.id} className={`flex items-center gap-3 px-5 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${i < ORDERS.length - 1 ? "border-b border-gray-50 dark:border-gray-800" : ""}`}>
                    <Avatar initials={o.initials} />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-900 dark:text-gray-100 truncate">{o.name}</p>
                      <p className="text-[11px] text-gray-400 truncate">{o.product}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1 flex-shrink-0">
                      <span className="text-xs font-medium text-gray-900 dark:text-gray-100">{o.amount}</span>
                      <StatusDot status={o.status} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Inventory */}
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800">
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-800">
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">Stock status</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">Inventory levels</p>
                </div>
                <button className="text-[11px] font-medium" style={{ color:"#2dc67b" }}>Manage →</button>
              </div>
              <div className="px-5 py-4 space-y-4">
                {STOCK.map(s => {
                  const pct = Math.round((s.count / s.max) * 100);
                  const low = pct < 20;
                  const mid = pct < 50;
                  return (
                    <div key={s.name}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{s.name}</span>
                        <span className={`text-[11px] font-medium ${low ? "text-red-500" : mid ? "text-amber-500" : "text-gray-400"}`}>
                          {s.count} / {s.max}
                        </span>
                      </div>
                      <div className="h-1 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{
                            width:`${pct}%`,
                            background: low ? "#ef4444" : mid ? "#f59e0b" : "#2dc67b"
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mx-5 mb-5 flex items-center gap-3 px-4 py-3 bg-red-50 dark:bg-red-950 border border-red-100 dark:border-red-900 rounded-lg">
                <span className="text-red-500 text-base flex-shrink-0">⚠</span>
                <div className="flex-1">
                  <p className="text-xs font-medium text-red-700 dark:text-red-300">2 items need restocking</p>
                  <p className="text-[11px] text-red-500 dark:text-red-400">Place reorder to avoid stockout</p>
                </div>
                <button className="text-[11px] font-medium text-red-600 dark:text-red-400 whitespace-nowrap hover:underline">Reorder →</button>
              </div>
            </div>
          </div>

          <p className="text-center text-[11px] text-gray-300 dark:text-gray-700 pb-2">
            © 2026 Propharm Admin · v2.0
          </p>
        </main>
      </div>
    </div>
  );
}

// ─── NavBtn helper ─────────────────────────────────────────────────────────────
function NavBtn({ item, active, onClick }: { item: typeof NAV[number]; active: string; onClick: () => void }) {
  const isActive = active === item.label;
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs transition-all ${
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