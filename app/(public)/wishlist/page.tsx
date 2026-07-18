"use client";

import ProductCard from "../components/bestSellers/_components/ProductCard";
import useWishlist from "@/hooks/useWishlist";
import useUser from "@/hooks/useUser";
import useCart from "@/hooks/useCart";
import { useEffect } from "react";

const WishlistPage = () => {
  const user = useUser();

  const { wishItems, fetchWishlist } = useWishlist();

  const { cartItems, fetchCart } = useCart();

  useEffect(() => {
    if (!user?.id) return;

    fetchWishlist(user.id);
    fetchCart(user.id);
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-800">My Wishlist</h1>
            <p className="mt-1 text-gray-500 text-sm">
              {wishItems.length} Items
            </p>
          </div>
        </div>

        {/* Empty */}
        {wishItems.length === 0 && (
          <div className="rounded-xl p-16 text-center">
            <div className="mb-4 text-4xl">❤️</div>

            <h2 className="text-xl font-semibold">Your Wishlist is Empty</h2>
          </div>
        )}

        {/* Wishlist */}
        {wishItems.length > 0 && (
          <div className="grid grid-cols-5 gap-4">
            {wishItems?.map((p: any) => {
              const cart = cartItems.find(
                (item: any) => item.productId === p.productId,
              );
              
              return <ProductCard key={p.id} product={p?.product} cartQty={cart} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
