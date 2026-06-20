"use client";
import { useState, useEffect } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface CartItem {
  id: number;
  name: string;
  price: number;
  qty: number;
  emoji: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  justAdded?: CartItem;
  setOpen: (v: boolean) => void;
}

// ─── Free shipping threshold ──────────────────────────────────────────────────
const FREE_SHIP_AT = 100;

// ─── Component ────────────────────────────────────────────────────────────────
export default function CartPopup({ isOpen, setOpen, justAdded }: Props) {
  const [show, setShow] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [items, setItems] = useState<CartItem[]>([]);

  // ── OPEN / CLOSE ANIMATION (তোমার original logic, untouched) ──────────────
  useEffect(() => {
    if (isOpen) {
      setShow(true);
      setTimeout(() => setAnimate(true), 10);
    } else {
      setAnimate(false);
      setTimeout(() => setShow(false), 320);
    }
  }, [isOpen]);

  // ── ADD ITEM (তোমার original logic, untouched) ────────────────────────────
  useEffect(() => {
    if (justAdded) {
      setItems((prev) => {
        const exists = prev.find((i) => i.id === justAdded.id);
        if (exists) {
          return prev.map((i) =>
            i.id === justAdded.id ? { ...i, qty: i.qty + 1 } : i
          );
        }
        return [...prev, justAdded];
      });
    }
  }, [justAdded]);

  // ── Helpers ───────────────────────────────────────────────────────────────
  const updateQty = (id: number, qty: number) => {
    if (qty < 1) return;
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty } : i)));
  };

  const removeItem = (id: number) =>
    setItems((prev) => prev.filter((i) => i.id !== id));

  const subtotal  = items.reduce((s, i) => s + i.price * i.qty, 0);
  const freeShip  = subtotal >= FREE_SHIP_AT;
  const shipPct   = Math.min(100, Math.round((subtotal / FREE_SHIP_AT) * 100));
  const needMore  = (FREE_SHIP_AT - subtotal).toFixed(2);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50">

      {/* ── BACKDROP ── */}
      <div
        onClick={() => setOpen(false)}
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity duration-300"
        style={{ opacity: animate ? 1 : 0 }}
      />

      {/* ── DRAWER ── */}
      <div
        className="absolute right-0 top-0 h-full w-full max-w-[420px] bg-white dark:bg-gray-900 flex flex-col shadow-2xl transition-transform duration-300 ease-out"
        style={{ transform: animate ? "translateX(0)" : "translateX(100%)" }}
      >

        {/* ── HEADER ── */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-800 flex-shrink-0">
          <div className="flex items-center gap-2.5">
            {/* green cart icon */}
            <div className="w-8 h-8 rounded-lg bg-[#2dc67b]/12 flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-[#2dc67b]" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Your Cart</p>
              <p className="text-[11px] text-gray-400 mt-0.5">
                {items.length === 0
                  ? "No items yet"
                  : `${items.length} item${items.length !== 1 ? "s" : ""}`}
              </p>
            </div>
          </div>
          {/* close button */}
          <button
            onClick={() => setOpen(false)}
            className="w-8 h-8 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:border-gray-300 dark:hover:border-gray-600 transition-all"
            aria-label="Close cart"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* ── JUST ADDED BANNER ── */}
        {justAdded && items.length > 0 && (
          <div className="flex items-center gap-3 px-5 py-3 bg-[#2dc67b]/6 border-b border-[#2dc67b]/12 flex-shrink-0">
            <div className="w-1 h-8 rounded-full bg-[#2dc67b] flex-shrink-0" />
            <div className="w-8 h-8 rounded-lg bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 flex items-center justify-center text-lg flex-shrink-0">
              {justAdded.emoji}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-medium text-[#2dc67b] tracking-wider">JUST ADDED</p>
              <p className="text-xs font-medium text-gray-800 dark:text-gray-200 truncate mt-0.5">{justAdded.name}</p>
            </div>
            <div className="w-5 h-5 rounded-full bg-[#2dc67b] flex items-center justify-center flex-shrink-0">
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
          </div>
        )}

        {/* ── ITEMS LIST ── */}
        <div className="flex-1 overflow-y-auto px-5 py-3">
          {items.length === 0 ? (
            /* Empty state */
            <div className="flex flex-col items-center justify-center h-full gap-4 py-16">
              <div className="w-16 h-16 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" strokeWidth={1.2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Your cart is empty</p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Add some products to get started</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="px-5 py-2.5 rounded-xl bg-[#2dc67b] text-white text-sm font-medium hover:bg-[#25b36d] transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-0 divide-y divide-gray-50 dark:divide-gray-800">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-3 py-3.5 group">
                  {/* product image */}
                  <div className="w-12 h-12 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 flex items-center justify-center text-2xl flex-shrink-0">
                    {item.emoji}
                  </div>

                  {/* info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-gray-900 dark:text-gray-100 leading-snug line-clamp-1">{item.name}</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">${item.price.toFixed(2)} each</p>
                  </div>

                  {/* qty + price + delete */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {/* qty controller */}
                    <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                      <button
                        onClick={() => updateQty(item.id, item.qty - 1)}
                        className="w-7 h-7 flex items-center justify-center text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100 transition-colors text-sm font-medium"
                        aria-label="Decrease"
                      >
                        −
                      </button>
                      <span className="w-7 h-7 flex items-center justify-center text-xs font-medium text-gray-900 dark:text-gray-100 border-x border-gray-200 dark:border-gray-700">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => updateQty(item.id, item.qty + 1)}
                        className="w-7 h-7 flex items-center justify-center text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100 transition-colors text-sm font-medium"
                        aria-label="Increase"
                      >
                        +
                      </button>
                    </div>

                    {/* line price */}
                    <span className="text-xs font-medium text-gray-900 dark:text-gray-100 min-w-[44px] text-right">
                      ${(item.price * item.qty).toFixed(2)}
                    </span>

                    {/* delete */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-300 dark:text-gray-600 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950 transition-all"
                      aria-label={`Remove ${item.name}`}
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── FOOTER (only when items exist) ── */}
        {items.length > 0 && (
          <div className="flex-shrink-0 border-t border-gray-100 dark:border-gray-800 px-5 pt-4 pb-6 space-y-3">

            {/* free shipping bar */}
            <div className="flex items-center gap-2.5 px-3.5 py-2.5 bg-[#2dc67b]/6 border border-[#2dc67b]/15 rounded-xl">
              <svg className="w-4 h-4 text-[#2dc67b] flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
              </svg>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-700 dark:text-gray-300">
                  {freeShip
                    ? <span>You qualify for <strong style={{ color: "#2dc67b" }}>free shipping!</strong></span>
                    : <span>Add <strong style={{ color: "#2dc67b" }}>${needMore}</strong> more for free shipping</span>
                  }
                </p>
                <div className="mt-1.5 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#2dc67b] rounded-full transition-all duration-500"
                    style={{ width: `${shipPct}%` }}
                  />
                </div>
              </div>
            </div>

            {/* order summary */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 px-4 py-3 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500 dark:text-gray-400">Subtotal ({items.length} item{items.length !== 1 ? "s" : ""})</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500 dark:text-gray-400">Shipping</span>
                <span className="font-medium" style={{ color: "#2dc67b" }}>{freeShip ? "Free" : "$5.99"}</span>
              </div>
              <div className="h-px bg-gray-200 dark:bg-gray-700" />
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Total</span>
                <span className="text-base font-medium text-gray-900 dark:text-gray-100">
                  ${(freeShip ? subtotal : subtotal + 5.99).toFixed(2)}
                </span>
              </div>
            </div>

            {/* CTA buttons */}
            <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#2dc67b] hover:bg-[#25b36d] text-white text-sm font-medium transition-all active:scale-[.99]">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
              Proceed to Checkout
            </button>

            <div className="grid grid-cols-2 gap-2.5">
              <button
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600 transition-all"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
                Keep Shopping
              </button>
              <button className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600 transition-all">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
                View Full Cart
              </button>
            </div>

            {/* trust badge */}
            <div className="flex items-center justify-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
              <p className="text-[11px] text-gray-400 text-center">
                Secure checkout · SSL encrypted · 270% money-back guarantee
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}