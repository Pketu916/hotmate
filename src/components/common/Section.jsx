import React, { forwardRef } from "react";

const Section = forwardRef(
  (
    {
      children,
      className = "",
      containerClassName = "",
      background = "default",
      padding = "default",
    },
    ref
  ) => {
    const backgroundStyles = {
      default: "bg-[var(--bg-primary)]",
      light: "bg-[var(--bg-light)]",
      secondary: "bg-[var(--bg-secondary)]",
      dark: "bg-[var(--bg-dark)] text-white",
    };

    const paddingStyles = {
      none: "py-0",
      sm: "py-12 md:py-16",
      default: "py-16 md:py-24",
      lg: "py-24 md:py-32",
      tlg: "pt-24 md:pt-32",
      xl: "py-32 md:py-40",
    };

    return (
      <section
        ref={ref}
        className={`${backgroundStyles[background]} ${paddingStyles[padding]} ${className}`}
      >
        <div className={`container px-5 ${containerClassName}`}>{children}</div>
      </section>
    );
  }
);

Section.displayName = "Section";

export default Section;
