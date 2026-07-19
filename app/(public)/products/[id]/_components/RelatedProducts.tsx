"use client"
import { useEffect, useState } from "react";
import useUser from "@/hooks/useUser";
import api from "@/lib/axios";
import useCart from "@/hooks/useCart";
import ProductCard from "../../../components/bestSellers/_components/ProductCard";

const RelatedProducts = ({ products }: any) => {
  
  
  const user = useUser();
  const { cartItems, fetchCart } = useCart();

  useEffect(() => {
    if (user?.id) {
      fetchCart(user?.id);
    }
  }, [user]);

 
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Related products
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {products?.map((p: any) => {
          const cart = cartItems.find((item: any) => item.productId === p.id);
          return <ProductCard key={p.id} product={p} cartQty={cart} />;
        })}
      </div>
    </div>
  );
};

export default RelatedProducts;
