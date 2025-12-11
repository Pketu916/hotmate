import React from "react";
import { Link } from "react-router-dom";
import Button from "../common/Button";
import Heading from "../common/Heading";
import videoSrc from "../../assets/hero-mute.mp4";

const Hero = () => {
  return (
    <section
      id="hero"
      className="relative flex flex-col justify-end overflow-hidden"
      style={{
        height: "100dvh",
      }}
    >
      {/* Background Video */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-none md:object-cover"
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70 z-10"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container text-center text-white px-5 py-8 md:py-0 mt-auto pb-16 md:pb-20">
        <Heading
          as="h1"
          size="xl"
          align="center"
          className="mb-6 md:mb-8 !text-white"
        >
          Perfect Temperature. Anytime. Anywhere.
        </Heading>
        <div className="flex flex-row gap-3 sm:gap-4 justify-center flex-wrap">
          <Link to="/pre-order">
            <Button variant="primary" size="lg">
              Pre-Order Now
            </Button>
          </Link>
          <Link to="/contact">
            <Button variant="outline" size="lg">
              Contact Us
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
