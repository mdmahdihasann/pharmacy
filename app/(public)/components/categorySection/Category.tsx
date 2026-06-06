"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";

const categories = [
  { name: "Baby", icon: "🍼", color: "bg-blue-50 text-blue-600" },
  { name: "Beauty", icon: "💄", color: "bg-pink-50 text-pink-600" },
  { name: "Luxury", icon: "✨", color: "bg-yellow-50 text-yellow-600" },
  { name: "Health", icon: "🏥", color: "bg-green-50 text-green-600" },
  { name: "Herbs", icon: "🌿", color: "bg-emerald-50 text-emerald-600" },
  { name: "Medicines", icon: "💊", color: "bg-red-50 text-red-600" },
];

const Category = () => {
  return (
    <section className="mt-[-100px] pb-0 border-gray-100 z-20 relative">
      <div className="max-w-6xl mx-auto px-4 overflow-hidden">
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={true}
          spaceBetween={16}
          slidesPerView={6}
          pagination={{
            clickable: true,
          }}
          className="h-[140px]"
        >
          {categories.map((cat) => (
            <SwiperSlide key={cat.name}>
              <div className="flex flex-col items-center gap-1 group w-full shadow-[0_4px_18px_rgba(0,0,0,0.1)] p-4 rounded-2xl bg-white transition-colors cursor-pointer">
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl transition-transform`}
                >
                  {cat.icon}
                </div>

                <span className="text-md font-bold text-[#184363] group-hover:text-[#2dc67b] transition-colors">
                  {cat.name}
                </span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Category;
