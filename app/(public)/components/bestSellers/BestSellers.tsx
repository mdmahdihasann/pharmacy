"use client"
import api from "@/lib/axios";

import React, { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import ProductCard from "./_components/ProductCard";




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
            View all <IoIosArrowForward />
          </a>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-4">
          {bestSaller.map((p: any) => (
            <ProductCard key={p?.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
