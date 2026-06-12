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
  const getTextColorClass = () => {
    if (textColor === "white") return "text-white";
    if (textColor === "black") return "text-black-luxury";
    return "text-primary"; // Brand Green #0D8A45
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      {/* SVG Icon */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform duration-500 hover:scale-105"
      >
        {/* Green Outer Square Box */}
        <rect
          x="15"
          y="15"
          width="70"
          height="70"
          stroke="#0D8A45"
          strokeWidth="6"
          fill="none"
        />
        
        {/* Interior Gold and Green structural elements */}
        {/* Left gold diagonal slat */}
        <path
          d="M36 71L58 33"
          stroke="#B3A235"
          strokeWidth="8"
          strokeLinecap="square"
        />
        {/* Right gold diagonal slat */}
        <path
          d="M50 63L72 25"
          stroke="#B3A235"
          strokeWidth="8"
          strokeLinecap="square"
        />
        {/* Center green connecting horizontal bar */}
        <path
          d="M45 51.5H55"
          stroke="#0D8A45"
          strokeWidth="8"
          strokeLinecap="square"
        />
      </svg>
      
      {/* Brand Text */}
      {showText && (
        <div className="mt-2 text-center select-none">
          <span className={`block font-sans font-bold text-xs tracking-[0.25em] ${getTextColorClass()} uppercase`}>
            NIVASAN
          </span>
          <span className="block font-sans text-[7px] tracking-[0.45em] text-accent uppercase mt-0.5">
            HOMES
          </span>
        </div>
      )}
    </div>
  );
}
