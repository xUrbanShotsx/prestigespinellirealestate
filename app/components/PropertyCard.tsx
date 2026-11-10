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

      {/* HOVER OVERLAY */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "rgba(0,0,0,0.52)",
        zIndex: 1,
        opacity: hovered ? 1 : 0,
        transition: `opacity 0.5s ${EASE}`,
      }} />

      {/* ADDRESS — centred, swipes in from left on hover */}
      <div style={{
        position: "absolute",
        inset: 0,
        zIndex: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(20px,3vw,36px)",
        gap: 12,
        pointerEvents: "none",
      }}>
        <p style={{
          fontFamily: "var(--font-sans), sans-serif",
          fontSize: "clamp(18px,2vw,28px)",
          fontWeight: 700,
          letterSpacing: "-0.03em",
          lineHeight: 1.1,
          color: "#fff",
          textAlign: "center",
          clipPath: hovered ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)",
          transition: `clip-path 0.55s ${EASE}`,
        }}>{address}</p>

        <p style={{
          fontFamily: "var(--font-mono), monospace",
          fontSize: 11,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.65)",
          textAlign: "center",
          clipPath: hovered ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)",
          transition: `clip-path 0.55s 0.07s ${EASE}`,
        }}>{beds} bed · {baths} bath · {price}</p>
      </div>
    </div>
  );
}
