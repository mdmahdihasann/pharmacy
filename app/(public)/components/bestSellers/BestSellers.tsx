"use client";

import { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import ProductCard from "./_components/ProductCard";
import useUser from "@/hooks/useUser";
import useCart from "@/hooks/useCart";
import api from "@/lib/axios";

const BestSellers = () => {
  const user = useUser();
  const [bestSeller, setBestSeller] = useState<any[]>([]);
  const { cartItems, fetchCart } = useCart();

  useEffect(() => {
    if (user?.id) {
      fetchCart(user?.id);
    }
  }, [user]);

  useEffect(() => {
    const getProducts = async () => {
      const res = await api.get("/products");
      setBestSeller(res.data);
    };

    getProducts();
  }, []);

  return (
    <section className="py-14 bg-gradient-to-b from-white via-gray-200 to-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-[#1a2e44]">Bestsellers</h2>
          <a
            href="#"
            className="text-[#2dc67b] text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all"
          >
            View all <IoIosArrowForward />
          </a>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-4">
          {bestSeller?.map((p: any) => {
            const cart = cartItems.find((item: any) => item.productId === p.id);
            return <ProductCard key={p.id} product={p} cartQty={cart} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
