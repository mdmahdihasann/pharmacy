"use client";
import useCart from "@/hooks/useCart";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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
  cartQty,
}: any) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { addCart, decreseCart, increseCart, fetchCart  } = useCart();

  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "null")
      : null;

  const handleAddCart = async () => {
    if (!user) {
      router.push("/login");
      return;
    }
    try {
      const result = await addCart({
        userId: user.id,
        productId: product.id,
      });
      if (result) {
        toast.success("Product add successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const increments = async () => {
    try {
      const inc = await increseCart({
        userId: user.id,
        productId: product.id,
      });
      
      if (inc) {
        toast.success("Cart increased successfully");
        await fetchCart(user.id);
      }
    } catch (error) {
      console.log(error);
      toast.error("Cart increase failed");
    }
  };

  const decrements = async () => {
    try {
      const dec = await decreseCart({
        userId: user.id,
        productId: product.id,
      });
      if(dec){
        toast.success("Cart decreased successfully");
        await fetchCart(user.id);
      }
      
    } catch (error) {
      console.log(error);
      toast.error("Cart decreased failed");
    }
  };

  // Add To Cart Button
  if (cartQty?.quantity === 0) {
    return (
      <button
        onClick={handleAddCart}
        className={`flex items-center justify-center gap-2 rounded-full border bg-[#2dc67b] font-semibold text-white transition-all hover:bg-[#27b66f]
          ${small ? "w-full px-3 py-2 text-sm" : "w-full px-4 py-2 text-sm"}`}
      >
        <HiOutlineShoppingCart className="text-lg" />
        {loading ? "adding.." : label}
      </button>
    );
  }

  // Quantity Selector
  return (
    <div className="flex py-1 w-full items-center rounded-full border border-[#2dc67b]/30 bg-[#2dc67b]/5 overflow-hidden">
      <button
        className="flex w-11 h-9 items-center justify-center text-[#2dc67b] transition hover:bg-[#2dc67b]/10"
        onClick={decrements}
      >
        {cartQty?.quantity === 1 ? (
          <FiTrash2 size={16} />
        ) : (
          <FiMinus size={16} />
        )}
      </button>

      <span className="flex-1 text-center text-sm font-bold text-[#2dc67b]">
        {cartQty?.quantity}
      </span>

      <button
        onClick={increments}
        className="flex w-11 h-9 items-center justify-center text-[#2dc67b] transition hover:bg-[#2dc67b]/10"
      >
        <FiPlus size={16} />
      </button>
    </div>
  );
}
