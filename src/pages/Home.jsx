import React from "react";
import Hero from "../components/sections/Hero";
import Features from "../components/sections/Features";
import HowItWorks from "../components/sections/HowItWorks";
import Benefits from "../components/sections/Benefits";
import Pricing from "../components/sections/Pricing";
import ProductGallery from "../components/sections/ProductGallery";
import CTASection from "../components/sections/CTASection";

const Home = () => {
  return (
    <main>
      <Hero />
      <Features />
      <ProductGallery />
      <CTASection />
      <HowItWorks />
      <Benefits />
      <Pricing />
    </main>
  );
};

export default Home;
