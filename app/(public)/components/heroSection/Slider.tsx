"use client";

import Image from "next/image";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectFade } from "swiper/modules";

import { LuArrowUpRight } from "react-icons/lu";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const slides = [
  {
    id: 1,
    subtitle: "Pyridoxine Vitamin B6",
    title: "Vitamins & Supplements",
    bg: "/images/slider/slide2-bg.jpg",
    image1: "/images/slider/slider-1.png",
    image2: "/images/slider/slider-2.png",
    image3: "/images/slider/label-green-big.png",
    buttonLink: "/shop",
  },
  {
    id: 2,
    subtitle: "For all family members",
    title: "Cold & Flu Protection",
    bg: "/images/slider/slider.jpg",
    image1: "/images/slider/slider-1.png",
    image2: "/images/slider/slider-2.png",
    image3: "/images/slider/label-green-big.png",
    buttonLink: "/shop",
  },
  {
    id: 3,
    subtitle: "New Formula",
    title: "Ultra Organic Face Cream",
    bg: "/images/slider/slide-3-bg.jpg",
    image1: "/images/slider/slider-1.png",
    image2: "/images/slider/slider-2.png",
    image3: "/images/slider/label-green-big.png",
    buttonLink: "/shop",
  },
];

const Slider = () => {
  return (
    <div className="w-full">
      
      <Swiper
        modules={[Navigation, Autoplay, EffectFade]}
        navigation
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        slidesPerView={1}
        className="w-[1240px] rounded-xl"
      >
        {slides.map((slide) => (

            
          <SwiperSlide key={slide.id}>
            <section
              className="relative min-h-[500px]"
              style={{
                backgroundImage: `url(${slide.bg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: "1rem",
              }}
            >
              <div className="container mx-auto px-18 h-full">
                <div className="grid lg:grid-cols-2 items-center min-h-[500px] w-[700px]">
                  {/* Left */}
                  <div>
                    <p className="text-md text-slate-500 mb-2">
                      {slide.subtitle}
                    </p>

                    <h1 className="text-4xl font-bold text-[#184363] leading-tight">
                      {slide.title}
                    </h1>

                    <Link
                      href={slide.buttonLink}
                      className="inline-flex items-center gap-2 mt-6 bg-white px-6 py-3 rounded-full font-bold text-[#184363] shadow hover:bg-[#184363] hover:text-white transition-colors  "
                    >
                      Buy it now <LuArrowUpRight />
                    </Link>
                  </div>

                  {/* Right */}
                  <div className="relative hidden lg:block h-full">
                    <Image
                      src={slide.image1}
                      alt={slide.title}
                      width={200}
                      height={200}
                      className="absolute bottom-46 left-[-50px]"
                    />
                    <Image
                      src={slide.image3}
                      alt={slide.title}
                      width={90}
                      height={90}
                      className="absolute top-52 left-30 z-10"
                    />
                    <Image
                      src={slide.image2}
                      alt={slide.title}
                      width={200}
                      height={200}
                      className="absolute bottom-16 left-38"
                    />
                  </div>
                </div>
              </div>
            </section>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
