import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Section from "../common/Section";
import Heading from "../common/Heading";
import Text from "../common/Text";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import img1 from "../../assets/Hotmate 1.webp";
import img2 from "../../assets/Hotmate 2.webp";
import img3 from "../../assets/Hotmate 3.webp";
import img4 from "../../assets/Hotmate 4.webp";

const ProductGallery = () => {
  const swiperRef = useRef(null);

  const productImages = [
    {
      image: img1,
      title: "Hotmate Smart Lunchbox",
      description: "Advanced temperature control with precision heating",
    },
    {
      image: img2,
      title: "Compact Design",
      description: "Featherlight build perfect for daily commute",
    },
    {
      image: img3,
      title: "Digital Interface",
      description: "Intuitive touch screen for easy temperature control",
    },
    {
      image: img4,
      title: "Premium Quality",
      description: "Aerospace-grade materials for durability",
    },
  ];

  return (
    <Section
      id="gallery"
      padding="xl"
      background="default"
      containerClassName="!px-0"
    >
      <div className="container px-5">
        <div className="text-center mb-16">
          <Heading size="lg" align="center" className="mb-6 text-white">
            Explore Hotmate
          </Heading>
          <Text
            size="lg"
            align="center"
            color="primary"
            className="max-w-2xl mx-auto text-white"
          >
            Discover the innovative features and premium design of Hotmate smart
            lunchbox
          </Text>
        </div>
      </div>

      <div className="max-w-6xl mx-auto relative">
        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          modules={[Pagination, Autoplay]}
          spaceBetween={15}
          slidesPerView={1.2}
          centeredSlides={true}
          loop={true}
          // loopedSlides={2}
          speed={600}
          touchRatio={1}
          touchAngle={45}
          resistance={true}
          resistanceRatio={0.85}
          preventClicks={true}
          preventClicksPropagation={true}
          watchOverflow={true}
          pagination={{
            clickable: true,
            bulletClass: "swiper-pagination-bullet-custom",
            bulletActiveClass: "swiper-pagination-bullet-active-custom",
          }}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
            waitForTransition: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2.2,
              spaceBetween: 15,
              centeredSlides: true,
              // loopedSlides: 3,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
              centeredSlides: false,
              // loopedSlides: 3,
            },
          }}
          className="product-swiper"
        >
          {productImages.map((item, index) => (
            <SwiperSlide key={index} className="h-auto">
              <div className="relative aspect-square rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                {/* Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70"></div>

                {/* Content - Absolute Centered */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-6 z-10">
                  <Heading
                    as="h3"
                    size="sm"
                    className="mb-2 !text-white text-center"
                  >
                    {item.title}
                  </Heading>
                  <Text
                    size="sm"
                    color="primary"
                    className="text-white max-w-xs"
                  >
                    {item.description}
                  </Text>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Navigation Buttons - Below Center (All Devices) */}
      <div className="flex justify-center gap-4 mt-8 container px-5">
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="bg-gray-800 text-white shadow-lg rounded-full w-12 h-12 flex items-center justify-center hover:bg-orange-500 transition-all duration-300 focus:outline-none"
          aria-label="Previous slide"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="bg-gray-800 text-white shadow-lg rounded-full w-12 h-12 flex items-center justify-center hover:bg-orange-500 transition-all duration-300 focus:outline-none"
          aria-label="Next slide"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </Section>
  );
};

export default ProductGallery;
