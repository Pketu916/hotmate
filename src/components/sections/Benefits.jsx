import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Section from "../common/Section";
import Heading from "../common/Heading";
import Text from "../common/Text";

gsap.registerPlugin(ScrollTrigger);

const Benefits = () => {
  const sectionRef = useRef(null);
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const hotmateBenefits = [
    "Always Hot & Fresh: Enjoy a delicious, restaurant-quality warm meal, regardless of when you eat.",
    "Hygienic Control: Consistent temperature prevents bacterial growth and keeps ingredients safe.",
    "Total Flexibility: Eat on your schedule—in the car, at the park, or at your desk.",
  ];

  const traditionalPainPoints = [
    "Cold & Bland: Food loses flavour and freshness after an hour at room temperature.",
    "Safety Risk: Risk of spoiling, especially with dairy or protein-rich meals.",
    "Inconvenient: Relies on microwaves, creating long queues and uneven reheating.",
  ];

  useEffect(() => {
    const card1 = card1Ref.current;
    const card2 = card2Ref.current;

    if (!card1 || !card2) return;

    // Set initial state
    gsap.set([card1, card2], {
      opacity: 0,
      y: 50,
    });

    // Check if mobile
    const isMobile = window.innerWidth < 1024;
    const startPoint = isMobile ? "top 90%" : "top 85%";

    // Animate card 1 (Traditional Pain Points)
    gsap.to(card1, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: card1,
        start: startPoint,
        toggleActions: "play none none reverse",
      },
    });

    // Animate card 2 (Hotmate Advantage) with slight delay
    gsap.to(card2, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
      delay: 0.2,
      scrollTrigger: {
        trigger: card2,
        start: startPoint,
        toggleActions: "play none none reverse",
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <Section id="benefits" padding="xl" background="dark" ref={sectionRef}>
      <div className="text-center mb-16">
        <Heading
          size="lg"
          align="center"
          className="mb-6 text-white text-center"
        >
          Why Hotmate Beats the Traditional Box.
        </Heading>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Traditional Pain Points - First Card */}
        <div
          ref={card1Ref}
          className="bg-gray-800/50 p-4 md:p-8 rounded-xl border-2 border-gray-600"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-gray-600 flex items-center justify-center text-white text-xl font-bold">
              ✗
            </div>
            <Heading as="h3" size="sm" className="text-white">
              Traditional Lunchbox Pain Points
            </Heading>
          </div>
          <ul className="space-y-4">
            {traditionalPainPoints.map((point, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-gray-400 font-bold mt-1">✗</span>
                <Text color="white" className="text-gray-300">
                  {point}
                </Text>
              </li>
            ))}
          </ul>
        </div>

        {/* Hotmate Advantage - Second Card */}
        <div
          ref={card2Ref}
          className="bg-gradient-to-br from-blue-900/50 to-blue-800/50 p-4 md:p-8 rounded-xl border-2 border-[var(--color-primary)]"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-white text-xl font-bold">
              ✓
            </div>
            <Heading as="h3" size="sm" className="text-white">
              Hotmate Advantage
            </Heading>
          </div>
          <ul className="space-y-4">
            {hotmateBenefits.map((benefit, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-[var(--color-secondary)] font-bold mt-1">
                  ✓
                </span>
                <Text color="white" className="text-gray-200">
                  {benefit}
                </Text>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
};

export default Benefits;
