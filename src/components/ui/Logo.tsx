import React from "react";
import Image from "next/image";
import logoImg from "../../../public/logo.png";

interface LogoProps {
  className?: string;
  light?: boolean;
  showText?: boolean;
  textColor?: "white" | "primary" | "black";
  size?: number;
}

export default function Logo({
  className = "",
  light = false,
  showText = true,
  textColor = "primary",
  size,
}: LogoProps) {
  const isLight = light;

  return (
    <div className={`flex items-center select-none ${className}`}>
      {size ? (
        <Image
          src={logoImg}
          alt="Nivasan Homes Logo"
          priority
          style={{ height: size, width: "auto" }}
          className={`object-contain transition-all duration-300 hover:scale-[1.03] ${
            isLight ? "filter-logo-light" : ""
          }`}
        />
      ) : (
        <div className="relative w-[180px] md:w-[220px] transition-all duration-500">
          <Image
            src={logoImg}
            alt="Nivasan Homes Logo"
            priority
            className={`w-full h-auto object-contain transition-all duration-300 hover:scale-[1.03] ${
              isLight ? "filter-logo-light" : ""
            }`}
          />
        </div>
      )}
    </div>
  );
}
