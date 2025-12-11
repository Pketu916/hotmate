import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "../common/Button";
import logo from "../../assets/logo.png";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";
  const isContactPage = location.pathname === "/contact";
  const isPricingPage =
    location.pathname === "/pricing" || location.hash === "#pricing";
  const isPreOrderPage = location.pathname === "/pre-order";
  const isStaticNavbar = isContactPage || isPricingPage || isPreOrderPage;

  useEffect(() => {
    // For static navbar pages, always keep it visible
    if (isStaticNavbar) {
      setIsVisible(true);
      return;
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);

      // Get viewport height to check if we're in hero section
      const viewportHeight = window.innerHeight;

      if (isHomePage) {
        // Home page: Only show navbar on reverse scroll if in hero section (first section)
        const isInHeroSection = currentScrollY < viewportHeight;

        if (isInHeroSection) {
          // In hero section: hide when scrolling down, show when scrolling up
          if (currentScrollY > lastScrollY && currentScrollY > 100) {
            setIsVisible(false);
          } else {
            setIsVisible(true);
          }
        } else {
          // After hero section: hide on scroll down, don't show on reverse scroll
          if (currentScrollY > lastScrollY && currentScrollY > 100) {
            setIsVisible(false);
          } else if (currentScrollY < lastScrollY) {
            // On reverse scroll after hero section, keep it hidden
            setIsVisible(false);
          } else if (currentScrollY <= 100) {
            // Show only when at top
            setIsVisible(true);
          }
        }
      } else {
        // Other pages: always hide on scroll down, don't show on reverse scroll
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          setIsVisible(false);
        } else if (currentScrollY < lastScrollY) {
          // On reverse scroll, keep it hidden for non-home pages
          setIsVisible(false);
        } else if (currentScrollY <= 100) {
          // Show only when at top
          setIsVisible(true);
        }
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, isHomePage, isStaticNavbar]);

  const navItems = [
    { label: "Features", href: "#features", id: "features" },
    { label: "How It Works", href: "#how-it-works", id: "how-it-works" },
    { label: "Pricing", href: "#pricing", id: "pricing" },
    { label: "Contact", href: "/contact", isRoute: true },
  ];

  const handleSectionClick = (e, item) => {
    if (item.isRoute) return; // Let Link handle route navigation

    e.preventDefault();
    const targetId = item.id || item.href.replace("#", "");

    if (isHomePage) {
      // On home page, scroll to section
      const scrollToSection = () => {
        const element = document.getElementById(targetId);
        if (element) {
          const lenisInstance = window.lenisInstance;
          if (lenisInstance) {
            lenisInstance.scrollTo(`#${targetId}`, { offset: -80 });
          } else {
            const headerHeight = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition =
              elementPosition + window.pageYOffset - headerHeight;
            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth",
            });
          }
        } else {
          // Retry if element not found
          setTimeout(scrollToSection, 100);
        }
      };
      setTimeout(scrollToSection, 50);
    } else {
      // On other pages, navigate to home with hash
      navigate(`/${item.href}`);
      // Wait for navigation, then scroll
      setTimeout(() => {
        const scrollToSection = () => {
          const element = document.getElementById(targetId);
          if (element) {
            const lenisInstance = window.lenisInstance;
            if (lenisInstance) {
              lenisInstance.scrollTo(`#${targetId}`, { offset: -80 });
            } else {
              const headerHeight = 80;
              const elementPosition = element.getBoundingClientRect().top;
              const offsetPosition =
                elementPosition + window.pageYOffset - headerHeight;
              window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
              });
            }
          } else {
            // Retry if element not found
            setTimeout(scrollToSection, 100);
          }
        };
        scrollToSection();
      }, 500);
    }

    // Close mobile menu if open
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[var(--z-sticky)] transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-md"
          : "bg-white/80 backdrop-blur-sm"
      } ${isVisible ? "translate-y-0" : "-translate-y-full"}`}
    >
      <nav className="container py-4 md:py-6 px-5">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src={logo}
              alt="Hotmate Logo"
              className="h-8 sm:h-10 md:h-12 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) =>
              item.isRoute ? (
                <Link
                  key={item.label}
                  to={item.href}
                  className="text-gray-900 hover:text-[var(--color-secondary)] transition-colors font-medium"
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleSectionClick(e, item)}
                  className="text-gray-900 hover:text-[var(--color-secondary)] transition-colors font-medium cursor-pointer"
                >
                  {item.label}
                </a>
              )
            )}
            <Link to="/pre-order">
              <Button variant="primary" size="md">
                Pre-Order Now
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 h-6 flex flex-col justify-center gap-1.5">
              <span
                className={`block h-0.5 w-full bg-[var(--color-primary)] transition-all ${
                  isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-full bg-[var(--color-primary)] transition-all ${
                  isMobileMenuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-full bg-[var(--color-primary)] transition-all ${
                  isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
            <div className="flex flex-col gap-4 pt-4">
              {navItems.map((item) =>
                item.isRoute ? (
                  <Link
                    key={item.label}
                    to={item.href}
                    className="text-gray-900 hover:text-[var(--color-secondary)] transition-colors font-medium py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleSectionClick(e, item)}
                    className="text-gray-900 hover:text-[var(--color-secondary)] transition-colors font-medium py-2 cursor-pointer"
                  >
                    {item.label}
                  </a>
                )
              )}
              <Link to="/pre-order" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="primary" size="md" className="w-full">
                  Pre-Order Now
                </Button>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
