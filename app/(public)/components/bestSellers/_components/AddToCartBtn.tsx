"use client";
import { useState } from "react";
import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";

import { HiOutlineShoppingCart } from "react-icons/hi";
import { toast } from "sonner";

interface Props {
  label?: string;
  small?: boolean;
}

export default function AddToCartBtn({
  label = "Add to Cart",
  small,
  product,
}: any) {
  const [qty, setQty] = useState(0);

  const handleAddCart = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");

      const res = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user?.id,
          productId: product?.id,
        }),
      });
      const result = await res.json();
      if (result.success) {
        toast.success("Added to cart");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.log(error);

      toast.error("Something went wrong");
    }
  };

  // Add To Cart Button
  if (qty === 0) {
    return (
      <button
        onClick={() => setQty(1)}
        className={`flex items-center justify-center gap-2 rounded-full border bg-[#2dc67b] font-semibold text-white transition-all hover:bg-[#27b66f]
          ${small ? "w-full px-3 py-2 text-sm" : "w-full px-4 py-2 text-sm"}`}
      >
        <HiOutlineShoppingCart className="text-lg" />
        {label}
      </button>
    );
  }

  // Quantity Selector
  return (
    <div
      className="flex py-2 w-full items-center rounded-full border border-[#2dc67b]/30 bg-[#2dc67b]/5 overflow-hidden"
      onClick={handleAddCart}
    >
      <button
        onClick={() => {
          if (qty === 1) {
            setQty(0);
          } else {
            setQty((prev) => prev - 1);
          }
        }}
        className="flex w-11 h-9 items-center justify-center text-[#2dc67b] transition hover:bg-[#2dc67b]/10"
      >
        {qty === 1 ? <FiTrash2 size={16} /> : <FiMinus size={16} />}
      </button>

      <span className="flex-1 text-center text-sm font-bold text-[#2dc67b]">
        {qty}
      </span>

      <button
        onClick={() => setQty((prev) => prev + 1)}
        className="flex w-11 h-9 items-center justify-center text-[#2dc67b] transition hover:bg-[#2dc67b]/10"
      >
        <FiPlus size={16} />
      </button>
    </div>
  );
}
