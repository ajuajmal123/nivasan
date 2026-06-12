import React from "react";
import Link from "next/link";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "accent" | "outline" | "text";
  href?: string;
  children: React.ReactNode;
  className?: string;
}

export default function Button({
  variant = "primary",
  href,
  children,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-sans text-xs tracking-[0.2em] uppercase transition-all duration-500 ease-out focus:outline-none disabled:opacity-50 disabled:pointer-events-none";

  const variants = {
    primary:
      "px-8 py-4 bg-primary text-white border border-primary hover:bg-transparent hover:text-primary active:scale-[0.98]",
    accent:
      "px-8 py-4 bg-accent text-white border border-accent hover:bg-transparent hover:text-accent active:scale-[0.98]",
    outline:
      "px-8 py-4 bg-transparent text-primary border border-primary/20 hover:border-primary active:scale-[0.98]",
    text: "relative py-2 bg-transparent text-primary hover:text-accent after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-accent after:origin-right hover:after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-500",
  };

  const combinedClasses = `${baseStyles} ${variants[variant]} ${className}`;

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
