import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top when route changes
    // Use Lenis if available, otherwise use native scroll
    if (typeof window !== "undefined" && window.Lenis) {
      // Find the Lenis instance (stored globally or in a ref)
      const lenisInstance = window.lenisInstance;
      if (lenisInstance) {
        lenisInstance.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "instant",
        });
      }
    } else {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant",
      });
    }
  }, [pathname]);

  return null;
};

export default ScrollToTop;
