import api from "@/lib/axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FiHeart } from "react-icons/fi";
import { GoHeartFill } from "react-icons/go";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { IoIosArrowForward } from "react-icons/io";





function AddToCartBtn({ label = "Add to cart", small }: any) {
  return (
    <button
      className={`flex items-center justify-center gap-1.5 bg-[#2dc67b] hover:bg-[#50cc90] text-white transition-all rounded-xl font-bold ${small ? "text-sm px-3 py-2.5 w-full" : "text-sm px-4 py-2.5 w-full"}`}
    >
      <HiOutlineShoppingCart className="text-lg"/>
      {label}
    </button>
  );
}

function ProductCard({ product, size = "md" } : any) {
  const [wished, setWished] = useState(false);
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group relative flex flex-col overflow-hidden p-2.5">
      
      <button
        onClick={() => setWished(!wished)}
        className="absolute top-3 right-3 z-10 text-gray-300 hover:text-red-500 transition-colors"
        aria-label="Wishlist"
      >
        {wished ? <GoHeartFill className="text-red-500"/> : <FiHeart/> }
      </button>
      <div className="flex justify-center h-full text-5xl mb-3 overflow-hidden ">
        <Image
          src={product.images}
          width={200}
          height={100}
          alt={product.name}
          className="w-full rounded-lg"
        />
      </div>
      
      <p className="text-md text-gray-800 font-bold mb-1.5 flex-1">
        {product.name}
      </p>
      <p className="text-sm text-gray-400 font-medium mb-1.5 flex-1">
        {product.manufacturer}
      </p>
      
      <div className="flex items-center gap-2 mb-3">
        <span className="text-2xl font-semibold text-[#1A7247]">
          ৳ {product.price}
        </span>
        {product.salePrice > 0 && (
          <span className="text-md text-gray-400 line-through font-semibold text-red-500">
            ৳{product.salePrice}
          </span>
        )}
      </div>
      {product.options ? (
        <button className="flex items-center justify-center gap-1.5 border transition-all rounded-full text-xs px-4 py-1.5 w-full font-semibold">
          Select options
        </button>
      ) : (
        <AddToCartBtn small />
      )}
    </div>
  );
}

const BestSellers = () => {
  const [bestSaller, setBestSaller] = useState([]);
  
  useEffect(() => {
    const bestSaller = async () => {
      const data = await api.get("products");
      setBestSaller(data.data);
    };
    bestSaller();
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
            View all <IoIosArrowForward  />
          </a>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {bestSaller.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
