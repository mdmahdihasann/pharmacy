
import { FiHeart } from "react-icons/fi";
import { GoHeartFill } from "react-icons/go";
import Image from "next/image";
import { useState } from "react";
import AddToCartBtn from "./AddToCartBtn";

export default function ProductCard({ product, size = "md" }: any) {
  const [wished, setWished] = useState(false);
  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group relative flex flex-col overflow-hidden p-2.5">
      <button
        onClick={() => setWished(!wished)}
        className="absolute top-3 right-3 z-10 text-gray-300 hover:text-red-500 transition-colors"
        aria-label="Wishlist"
      >
        {wished ? <GoHeartFill className="text-red-500" /> : <FiHeart />}
      </button>
      <div className="flex justify-center h-full text-5xl p-6 overflow-hidden ">
        <Image
          src={product.images}
          width={200}
          height={100}
          alt={product.name}
          className="w-full rounded-lg"
        />
      </div>

      <p className="text-sm text-gray-800 font-semibold mb-1.5 flex-1">
        {product.name}
      </p>
      <p className="text-xs text-gray-400 font-medium mb-1 flex-1">
        {product.manufacturer}
      </p>

      <div className="flex items-center gap-2 mb-2">
        <span className="text-lg font-semibold text-[#1A7247]">
          ৳ {product.price}
        </span>
        {product.salePrice > 0 && (
          <span className="text-xs text-gray-400 line-through font-semibold text-red-500">
            ৳{product.salePrice}
          </span>
        )}
      </div>
      {product.options ? (
        <button className="flex items-center justify-center gap-1.5 border transition-all rounded-full text-xs px-4 py-1.5 w-full font-semibold">
          Select options
        </button>
      ) : (
        <AddToCartBtn small product={product}/>
      )}
    </div>
  );
}