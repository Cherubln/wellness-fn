"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/keyboard";
import image1 from "@/public/images/yoga2.jpeg";
import image3 from "@/public/images/yoga3.jpg";
import image2 from "@/public/images/yoga4.jpg";
import image5 from "@/public/images/yoga5.jpg";
import image4 from "@/public/images/mental.jpg";
import image6 from "@/public/images/yoga7.jpg";
import image7 from "@/public/images/yoga8.jpg";

import { EffectCards, Keyboard, Pagination } from "swiper/modules";

const Gallery = [image1, image2, image3, image4, image5, image6, image7];

export default function GalerrySection() {
  return (
    <section className="w-full flex items-center justify-center overflow-hidden">
      <Swiper
        effect={"cards"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        keyboard={{
          enabled: true,
        }}
        pagination={{ clickable: true }}
        modules={[EffectCards, Pagination, Keyboard]}
        className="mySwiper w-[90%] md:w-3/5 overflow-hidden"
      >
        {Gallery.map((image, index) => (
          <SwiperSlide key={index} className="flex items-center justify-center">
            <div className="relative w-full h-[320px] border p-4 rounded-lg">
              <Image
                src={image}
                alt="nyungwe park"
                fill={true}
                className="object-cover rounded-md"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
