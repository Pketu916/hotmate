import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "../common/Button";
import videoSrc from "../../assets/cta.mp4";

gsap.registerPlugin(ScrollTrigger);

const CTASection = () => {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    const content = contentRef.current;

    if (!section || !video || !content) return;

    // Set initial video state
    gsap.set(video, {
      scale: 0.5,
      opacity: 0.8,
    });

    // Set initial content state
    gsap.set(content, {
      opacity: 0,
      y: 50,
    });

    // Calculate scroll range
    const scrollRange = 2000;

    // Create timeline with pinning and animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: `+=${scrollRange}`,
        scrub: 1,
        pin: true,
        pinSpacing: true,
      },
    });

    // Animate video scale from 0.5 to 1 (first part of scroll)
    tl.to(
      video,
      {
        scale: 1,
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      },
      0
    );

    // Animate content fade in
    tl.to(
      content,
      {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.out",
      },
      0.1
    );

    // Play video automatically
    video.play().catch((error) => {
      console.log("Video autoplay prevented:", error);
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars && trigger.vars.trigger === section) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Video */}
      <div className="absolute inset-0 z-0 flex items-center justify-center md:p-8 p-4">
        <div className="relative w-full h-full overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full rounded-3xl object-none md:object-cover"
            style={{
              transformOrigin: "center center",
            }}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        </div>
      </div>

      {/* Content Overlay */}
      <div
        ref={contentRef}
        className="relative z-10 container text-center px-5"
      >
        {/* Handwriting Style Brand Name */}
        <h2
          className="text-5xl md:text-6xl lg:text-8xl xl:text-9xl font-bold mb-6 md:mb-8 text-white"
          style={{
            fontFamily:
              "'Dancing Script', 'Pacifico', 'Brush Script MT', cursive",
            textShadow:
              "3px 3px 10px rgba(0,0,0,0.6), 0 0 20px rgba(0,0,0,0.3)",
            letterSpacing: "0.02em",
            fontWeight: 700,
          }}
        >
          hotmate
        </h2>

        {/* CTA Button */}
        <div className="flex justify-center">
          <Link to="/pre-order">
            <Button variant="primary" className="text-lg px-5 py-3">
              Pre-Order Now
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
