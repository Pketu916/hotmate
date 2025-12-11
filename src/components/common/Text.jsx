import React from "react";

const Text = ({
  children,
  as: Component = "p",
  size = "default",
  color = "default",
  className = "",
  ...props
}) => {
  const sizeStyles = {
    xs: "text-xs sm:text-sm",
    sm: "text-sm sm:text-base",
    default: "text-sm sm:text-base md:text-lg",
    lg: "text-base sm:text-lg md:text-xl",
    xl: "text-lg sm:text-xl md:text-2xl",
    "2xl": "text-xl sm:text-2xl md:text-3xl",
  };

  const colorStyles = {
    default: "text-gray-900",
    primary: "text-black",
    light: "text-gray-500",
    white: "text-white",
    accent: "text-[var(--color-secondary)]",
  };

  const classes = `${sizeStyles[size]} ${colorStyles[color]} ${className}`;

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
};

export default Text;
