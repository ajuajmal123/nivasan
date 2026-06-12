import React from "react";

interface LogoProps {
  className?: string;
  showText?: boolean;
  textColor?: "white" | "primary" | "black";
  size?: number;
}

export default function Logo({
  className = "",
  showText = true,
  textColor = "primary",
  size = 48,
}: LogoProps) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <img
        src="/logo.png"
        alt="Nivasan Homes"
        style={{ height: size }}
        className="w-auto object-contain transition-transform duration-500 hover:scale-105 select-none pointer-events-none"
      />
    </div>
  );
}
