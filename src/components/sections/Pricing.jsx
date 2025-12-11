import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Section from "../common/Section";
import Heading from "../common/Heading";
import Text from "../common/Text";
import Button from "../common/Button";

gsap.registerPlugin(ScrollTrigger);

const Pricing = () => {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardRefs = useRef([]);

  const models = [
    {
      name: "Basic Hotmate Model",
      tagline: "Perfect for Daily Use & Essential Warmth.",
      preOrderPrice: "₹1200",
      originalPrice: "₹1600",
      features: [
        "Standard 5-Hour Battery",
        "Precise Digital Display",
        "Single Tray Insert (Non-stick)",
      ],
      cta: "Pre-Order Basic Now",
      modelId: "basic",
    },
    {
      name: "Premium Hotmate Model",
      tagline: "Maximum Power, Features & Compartmentalized Meals.",
      preOrderPrice: "₹1800",
      originalPrice: "₹2500",
      features: [
        "Extended 8-Hour Battery",
        "OLED Touch Screen Display",
        "Dual-Compartment Tray",
      ],
      cta: "Pre-Order Premium Now",
      featured: true,
      modelId: "premium",
    },
  ];

  const handlePreOrder = (modelId) => {
    navigate("/pre-order", { state: { model: modelId } });
  };

  useEffect(() => {
    const heading = headingRef.current;
    const cards = cardRefs.current.filter(Boolean);

    if (!heading || !cards.length) return;

    // Check if mobile
    const isMobile = window.innerWidth < 1024;
    const startPoint = isMobile ? "top 85%" : "top 90%";
    const endPoint = isMobile ? "top 60%" : "top 60%";

    // Set initial state
    gsap.set([heading, ...cards], {
      opacity: 0,
      y: 50,
    });

    // Animate heading
    gsap.to(heading, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: heading,
        start: startPoint,
        toggleActions: "play none none reverse",
      },
    });

    // Animate cards with stagger
    cards.forEach((card, index) => {
      gsap.to(card, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        delay: index * 0.2,
        scrollTrigger: {
          trigger: card,
          start: startPoint,
          toggleActions: "play none none reverse",
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <Section
      id="pricing"
      padding="xl"
      background="light"
      ref={sectionRef}
      className="pt-24 md:pt-28 scroll-mt-20 md:scroll-mt-24"
    >
      <div className="text-center mb-16">
        <Heading
          ref={headingRef}
          size="lg"
          align="center"
          className="mb-6 text-black text-center"
        >
          Choose Your Perfect Hotmate.
        </Heading>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
        {models.map((model, index) => (
          <div
            key={index}
            ref={(el) => (cardRefs.current[index] = el)}
            className={`bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all h-full flex flex-col justify-between ${
              model.featured
                ? "border-2 border-[var(--color-primary)] scale-105"
                : "border border-gray-200"
            }`}
          >
            <div>
              {model.featured && (
                <div className="bg-[var(--color-primary)] text-white text-sm font-semibold px-4 py-1 rounded-full inline-block mb-4">
                  MOST POPULAR
                </div>
              )}
              <Heading as="h3" size="sm" className="mb-2 text-gray-900">
                {model.name}
              </Heading>
              <Text color="primary" className="text-gray-900 mb-6">
                {model.tagline}
              </Text>

              <div className="mb-6">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--color-primary)]">
                    {model.preOrderPrice}
                  </span>
                  <span className="text-lg text-gray-500 line-through">
                    {model.originalPrice}
                  </span>
                </div>
                <Text size="sm" color="primary" className="text-gray-900">
                  Pre-Order Price
                </Text>
              </div>

              <ul className="space-y-3">
                {model.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-2">
                    <span className="text-[var(--color-primary)] font-bold mt-1">
                      ✓
                    </span>
                    <Text color="primary" className="text-gray-700">
                      {feature}
                    </Text>
                  </li>
                ))}
              </ul>
            </div>

            <Button
              variant={model.featured ? "primary" : "outline"}
              size="md"
              className="w-full mt-8"
              onClick={() => handlePreOrder(model.modelId)}
            >
              {model.cta}
            </Button>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default Pricing;
