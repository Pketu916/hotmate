import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Section from "../common/Section";
import Heading from "../common/Heading";
import Text from "../common/Text";
import productImage from "../../assets/Hotmate 1.webp";

gsap.registerPlugin(ScrollTrigger);

const Features = () => {
  const cardsContainerRef = useRef(null);
  const cardsRef = useRef([]);
  const cardInnersRef = useRef([]);

  const features = [
    {
      title: "Precision Control",
      description:
        "Dial in the exact warmth you need, from a gentle reheat to piping hot, with a simple touch interface.",
      icon: "🎛️",
      gradient: "from-orange-50 via-red-50 to-pink-50",
    },
    {
      title: "All-Day Power",
      description:
        "An optimized power cell keeps your food warm for up to 8 hours on a single charge. USB-C rechargeable.",
      icon: "🔋",
      gradient: "from-green-50 via-emerald-50 to-teal-50",
    },
    {
      title: "Featherlight Build",
      description:
        "Crafted from aerospace-grade, durable materials. Hotmate adds virtually no bulk to your daily commute.",
      icon: "✨",
      gradient: "from-green-50 via-emerald-50 to-teal-50",
    },
    {
      title: "Intelligent Safety",
      description:
        "Built-in sensors prevent overheating and ensure stable, even heating without hot spots. FDA approved materials.",
      icon: "🛡️",
      gradient: "from-green-50 via-emerald-50 to-teal-50",
    },
  ];

  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean);
    const cardInners = cardInnersRef.current.filter(Boolean);

    if (!cards.length || !cardInners.length) return;

    // GSAP animations for scale and brightness effects
    cards.forEach((card, index) => {
      // Skip animation for the last card
      if (index === cards.length - 1) return;

      const cardInner = cardInners[index];
      if (!cardInner) return;

      const nextCard = cards[index + 1];

      ScrollTrigger.create({
        trigger: nextCard,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const toScale = 1 - (cards.length - 1 - index) * 0.1;
          const currentScale = gsap.utils.interpolate(1, toScale, progress);
          const currentBrightness = gsap.utils.interpolate(1, 0.6, progress);

          gsap.set(cardInner, {
            scale: currentScale,
            filter: `brightness(${currentBrightness})`,
          });
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars && trigger.vars.trigger) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <Section id="features" padding="lg" background="light">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
        {/* Left Side - Sticky Heading and Product Image */}
        <div className="lg:sticky h-max top-8 lg:top-20 self-start">
          <Heading size="lg" align="left" className="mb-6 text-black">
            Unlock the Future of Lunch.
          </Heading>
          <div className="mt-8">
            <img
              src={productImage}
              alt="Product"
              className="w-full h-auto rounded-lg shadow-lg object-cover"
            />
          </div>
        </div>

        {/* Right Side - Sticky Content */}
        <div className="relative">
          <div ref={cardsContainerRef} className="w-full space-y-10 md:pt-36">
            {features.map((feature, index) => (
              <div
                key={index}
                ref={(el) => (cardsRef.current[index] = el)}
                className="sticky top-8 lg:top-60 features-card"
              >
                <div
                  ref={(el) => (cardInnersRef.current[index] = el)}
                  className={`features-card-inner p-4 md:p-5 rounded-xl bg-gradient-to-br ${feature.gradient} flex flex-col gap-3 items-center md:items-start`}
                >
                  <div className="features-card-icon">
                    <div className="text-4xl sm:text-5xl md:text-6xl">
                      {feature.icon}
                    </div>
                  </div>
                  <div className="features-card-content">
                    <Heading
                      as="h3"
                      size="sm"
                      align="center"
                      className="md:text-left features-card-title text-gray-900 mb-2"
                    >
                      {feature.title}
                    </Heading>
                    <Text
                      size="sm"
                      color="primary"
                      align="center"
                      className="md:text-left features-card-description text-gray-700"
                    >
                      {feature.description}
                    </Text>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Features;
