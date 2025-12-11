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
        {/* Custom Navigation Buttons */}
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full w-12 h-12 items-center justify-center hover:bg-orange-500 hover:text-white transition-all duration-300 -ml-6 hidden md:flex"
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
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full w-12 h-12 items-center justify-center hover:bg-orange-500 hover:text-white transition-all duration-300 -mr-6 hidden md:flex"
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

        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          modules={[Pagination, Autoplay]}
          spaceBetween={15}
          slidesPerView={1.2}
          centeredSlides={true}
          loop={true}
          pagination={{
            clickable: true,
            bulletClass: "swiper-pagination-bullet-custom",
            bulletActiveClass: "swiper-pagination-bullet-active-custom",
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2.2,
              spaceBetween: 15,
              centeredSlides: true,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
              centeredSlides: false,
            },
          }}
          className="product-swiper"
        >
          {productImages.map((item, index) => (
            <SwiperSlide key={index} className="h-auto">
              <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow h-full flex flex-col">
                <div className="aspect-square overflow-hidden bg-gray-100 flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <Heading as="h3" size="sm" className="mb-2 text-black">
                    {item.title}
                  </Heading>
                  <Text
                    size="sm"
                    color="primary"
                    className="text-gray-900 flex-grow"
                  >
                    {item.description}
                  </Text>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Mobile Navigation Buttons - Below Center */}
      <div className="flex justify-center gap-4 mt-8 md:hidden container px-5">
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="bg-white shadow-lg rounded-full w-12 h-12 flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all duration-300"
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
          className="bg-white shadow-lg rounded-full w-12 h-12 flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all duration-300"
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
