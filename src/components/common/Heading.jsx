import React from "react";

const Heading = ({
  children,
  as: Component = "h2",
  size = "default",
  className = "",
  align = "left",
  ...props
}) => {
  const sizeStyles = {
    xs: "text-lg sm:text-xl md:text-2xl",
    sm: "text-xl sm:text-2xl md:text-3xl",
    default: "text-2xl sm:text-3xl md:text-4xl lg:text-5xl",
    lg: "text-3xl sm:text-4xl md:text-5xl lg:text-6xl",
    xl: "text-4xl sm:text-5xl md:text-6xl lg:text-7xl",
  };

  const alignStyles = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  const classes = `${sizeStyles[size]} ${alignStyles[align]} font-bold font-[var(--font-secondary)] text-black ${className}`;

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
};

export default Heading;
