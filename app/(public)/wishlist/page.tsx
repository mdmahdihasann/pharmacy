"use client";

import Image from "next/image";
import Link from "next/link";
import { FiShoppingCart, FiTrash2 } from "react-icons/fi";
import BestSellers from "../components/bestSellers/BestSellers";
import ProductCard from "../components/bestSellers/_components/ProductCard";
import useWishlist from "@/hooks/useWishlist";

const WishlistPage = () => {
  const { wishItems } = useWishlist();

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">My Wishlist ❤️</h1>
            <p className="mt-1 text-gray-500">{wishItems.length} Items</p>
          </div>

          <Link
            href="/shop"
            className="rounded-lg bg-[#2dc67b] px-5 py-2 text-white transition hover:bg-green-600"
          >
            Continue Shopping
          </Link>
        </div>

        {/* Empty */}
        {wishItems.length === 0 && (
          <div className="rounded-xl bg-white p-16 text-center shadow">
            <div className="mb-4 text-6xl">❤️</div>

            <h2 className="text-2xl font-semibold">Your Wishlist is Empty</h2>

            <p className="mt-2 text-gray-500">
              Save your favorite products and buy them later.
            </p>

            <Link
              href="/shop"
              className="mt-6 inline-block rounded-lg bg-[#2dc67b] px-6 py-3 text-white"
            >
              Start Shopping
            </Link>
          </div>
        )}

        {/* Wishlist */}
        {wishItems.length > 0 && (
          <div className="grid grid-cols-5 gap-4">
            {wishItems.map((item: any) => (
              <ProductCard key={item.id} product={item.product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
