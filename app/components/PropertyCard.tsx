"use client";

import { useState } from "react";
import Image from "next/image";

type Props = {
  image: string;
  address: string;
  suburb: string;
  price: string;
  beds: number;
  baths: number;
  delay?: number;
};

const EASE = "cubic-bezier(0.22,1,0.36,1)";

export default function PropertyCard({ image, address, suburb, price, beds, baths, delay = 0 }: Props) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        aspectRatio: "3 / 4",
        overflow: "hidden",
        cursor: "pointer",
        border: "1px solid rgba(255,255,255,0.18)",
        borderRadius: 4,
        minHeight: "clamp(380px,55vw,760px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      {/* IMAGE — grayscale when idle */}
      <Image
        src={image}
        alt={address}
        fill
        sizes="(max-width: 960px) 100vw, 33vw"
        style={{
          objectFit: "cover",
          filter: hovered ? "grayscale(0)" : "grayscale(1)",
          transform: hovered ? "scale(1.04)" : "scale(1)",
          transition: `filter 0.7s ${EASE}, transform 0.9s ${EASE}`,
        }}
      />

      {/* PERMANENT DARK GRADIENT */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.18) 50%, transparent 100%)",
        zIndex: 1,
      }} />

      {/* ADDRESS — reveals on hover */}
      <div style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        padding: "clamp(20px,3vw,36px)",
        zIndex: 2,
      }}>
        {/* suburb + price always visible */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          gap: 12,
          transform: hovered ? "translateY(-4px)" : "translateY(0)",
          transition: `transform 0.5s ${EASE}`,
        }}>
          <p style={{
            fontFamily: "var(--font-mono), monospace",
            fontSize: 11,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.6)",
          }}>{suburb}</p>
          <p style={{
            fontFamily: "var(--font-mono), monospace",
            fontSize: 11,
            letterSpacing: "0.08em",
            color: "rgba(255,255,255,0.6)",
          }}>{price}</p>
        </div>

        {/* address — slides up and fades in on hover */}
        <p style={{
          fontFamily: "var(--font-sans), sans-serif",
          fontSize: "clamp(18px,2vw,26px)",
          fontWeight: 700,
          letterSpacing: "-0.03em",
          lineHeight: 1.1,
          color: "#fff",
          marginTop: 8,
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translateY(0)" : "translateY(10px)",
          transition: `opacity 0.45s ${EASE}, transform 0.5s ${EASE}`,
        }}>{address}</p>

        {/* beds/baths — fades in slightly after address */}
        <p style={{
          fontFamily: "var(--font-mono), monospace",
          fontSize: 11,
          letterSpacing: "0.08em",
          color: "rgba(255,255,255,0.55)",
          marginTop: 10,
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translateY(0)" : "translateY(6px)",
          transition: `opacity 0.45s 0.06s ${EASE}, transform 0.5s 0.06s ${EASE}`,
        }}>{beds} bed · {baths} bath</p>
      </div>
    </div>
  );
}
