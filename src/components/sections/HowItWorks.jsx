import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Section from "../common/Section";
import Heading from "../common/Heading";
import Text from "../common/Text";

gsap.registerPlugin(ScrollTrigger);

const HowItWorks = () => {
  const sectionRef = useRef(null);
  const stepsRef = useRef([]);
  const numberRefs = useRef([]);
  const cardRefs = useRef([]);
  const glowRefs = useRef([]);

  const steps = [
    {
      number: "01",
      title: "Pack Your Meal",
      description:
        "Place your favourite home-cooked meal into the non-stick, sealed inner tray.",
      gradient: "from-green-600 to-green-800",
      bgGradient: "from-green-50 via-emerald-50 to-teal-50",
    },
    {
      number: "02",
      title: "Choose Your Heat",
      description:
        "Use the intuitive digital interface to select your desired serving temperature.",
      gradient: "from-green-600 to-green-800",
      bgGradient: "from-green-50 via-emerald-50 to-teal-50",
    },
    {
      number: "03",
      title: "Perfectly Warm",
      description:
        "Your Hotmate maintains the ideal temperature until you're ready to eat. Open and enjoy!",
      gradient: "from-green-600 to-green-800",
      bgGradient: "from-green-50 via-emerald-50 to-teal-50",
    },
  ];

  useEffect(() => {
    const steps = stepsRef.current.filter(Boolean);
    const numbers = numberRefs.current.filter(Boolean);
    const cards = cardRefs.current.filter(Boolean);

    if (!steps.length) return;

    // Check if mobile/tablet
    const isMobile = window.innerWidth < 1024;

    steps.forEach((step, index) => {
      const number = numbers[index];
      const card = cards[index];
      const glow = glowRefs.current[index];

      // Set initial state - card scale starts at 1 for proper arrow centering
      gsap.set(step, {
        opacity: 0,
        y: 30,
      });

      gsap.set(number, {
        opacity: 0,
        scale: 0.8,
        rotation: 0,
      });

      gsap.set(card, {
        opacity: 0,
        scale: 1, // Keep scale at 1 for proper arrow centering
        rotationY: -15,
      });

      if (glow) {
        gsap.set(glow, {
          opacity: 0,
        });
      }

      // Create timeline for each step with scroll-driven animation
      // Different start/end points for mobile and desktop
      const startPoint = isMobile ? "top 85%" : "top 90%";
      const endPoint = isMobile ? "top 60%" : "top 60%";

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: step,
          start: startPoint,
          end: endPoint,
          scrub: isMobile ? 0.5 : 1, // Smoother on mobile
        },
      });

      // Animate number badge with rotation
      tl.to(number, {
        opacity: 1,
        scale: 1,
        rotation: 360,
        ease: "none",
      });

      // Animate card with 3D effect - scale stays at 1
      tl.to(
        card,
        {
          opacity: 1,
          scale: 1, // Keep at 1
          rotationY: 0,
          ease: "none",
        },
        0
      );

      // Animate step container
      tl.to(
        step,
        {
          opacity: 1,
          y: 0,
          ease: "none",
        },
        0
      );

      // Animate background glow on scroll
      if (glow) {
        tl.to(
          glow,
          {
            opacity: 0.2,
            ease: "none",
          },
          0
        );
      }
    });

    // Handle resize for responsive
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <Section id="how-it-works" padding="xl" background="light" ref={sectionRef}>
      <div className="text-center mb-16 md:mb-20">
        <Heading
          size="lg"
          align="center"
          className="mb-6 text-gray-900 text-center"
        >
          Lunch, Simplified. Ready in 3 Steps.
        </Heading>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step, index) => (
            <div
              key={index}
              ref={(el) => (stepsRef.current[index] = el)}
              className="relative group"
            >
              {/* Animated Background Glow */}
              <div
                ref={(el) => (glowRefs.current[index] = el)}
                className={`absolute -inset-4 bg-gradient-to-br ${step.gradient} opacity-0 blur-2xl rounded-3xl`}
              ></div>

              {/* Card Container */}
              <div
                ref={(el) => (cardRefs.current[index] = el)}
                className={`relative bg-gradient-to-br ${step.bgGradient} rounded-3xl p-8 md:p-10 border-2 border-white/50 backdrop-blur-sm transform-gpu transition-all duration-300 h-full flex flex-col`}
                style={{
                  perspective: "1000px",
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/30 to-transparent rounded-bl-full"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-white/20 to-transparent rounded-tr-full"></div>

                <div className="relative z-10 flex flex-col flex-grow">
                  {/* Step Number Badge */}
                  <div className="mb-8 flex justify-center">
                    <div
                      ref={(el) => (numberRefs.current[index] = el)}
                      className={`relative w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center transform-gpu`}
                      style={{
                        transform: "rotate(-5deg)",
                      }}
                    >
                      <span className="text-3xl md:text-4xl font-black text-white drop-shadow-lg">
                        {step.number}
                      </span>
                      {/* Shine effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-2xl"></div>
                    </div>
                  </div>

                  <Heading
                    as="h3"
                    size="sm"
                    className="mb-4 text-center text-green-700"
                  >
                    {step.title}
                  </Heading>
                  <div className="w-16 h-1 bg-gradient-to-r from-transparent via-[var(--color-primary)] to-transparent mx-auto mb-6 rounded-full"></div>
                  <Text
                    size="md"
                    color="primary"
                    className="text-gray-700 leading-relaxed flex-grow"
                  >
                    {step.description}
                  </Text>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default HowItWorks;
