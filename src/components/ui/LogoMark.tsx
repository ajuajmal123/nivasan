import React from "react";

// The Nivasan "N" mark (square frame + two gold bars + green diagonal) as inline SVG,
// traced from public/N-H-PNG_5.png so it can be used as a light watermark without an image download.
export default function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="620 214 690 690" className={className} aria-hidden="true" focusable="false">
      <rect x="647" y="241" width="633" height="633" fill="none" stroke="var(--color-primary)" strokeWidth="30" />
      <polygon points="893,535 945,462 1027,586 979,653" fill="var(--color-primary)" />
      <polygon points="928,335 976,416 755,730 710,645" fill="var(--color-accent)" />
      <polygon points="1169,385 1218,466 997,780 952,694" fill="var(--color-accent)" />
    </svg>
  );
}
