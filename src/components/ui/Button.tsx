import React from "react";
import Link from "next/link";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "text";
  size?: "sm" | "md";
  href?: string;
  children: React.ReactNode;
  className?: string;
}

// The site's three button styles (defined once as utilities in globals.css)
const variants = {
  primary: "btn btn-primary",
  secondary: "btn btn-secondary",
  text: "btn-text",
};

export default function Button({
  variant = "primary",
  size = "md",
  href,
  children,
  className = "",
  ...props
}: ButtonProps) {
  const sizeClass = variant === "text" ? "" : size === "sm" ? "btn-sm" : "btn-md";
  const combinedClasses = `${variants[variant]} ${sizeClass} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
}
