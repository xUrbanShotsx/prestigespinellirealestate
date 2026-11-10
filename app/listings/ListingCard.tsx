"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Property } from "@/lib/types";

const EASE = "cubic-bezier(0.22,1,0.36,1)";
const IMG_H = "clamp(200px, 23vw, 380px)";

export default function ListingCard({ p }: { p: Property }) {
  const [hovered, setHovered] = useState(false);
  const href = `/listings/${p.id}`;

  const specs = [
    p.beds   != null           ? `${p.beds} Bed`   : null,
    p.baths  != null           ? `${p.baths} Bath`  : null,
    p.cars   != null && p.cars > 0 ? `${p.cars} Car`  : null,
  ].filter(Boolean) as string[];

  return (
    <Link
      href={href}
      className="listing-card"
      style={{ display: "block", textDecoration: "none", color: "inherit" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ position: "relative", height: IMG_H, overflow: "hidden", background: "#ece9e2" }}>
        {/* IMAGE — greyscale on hover */}
        <Image
          src={p.image}
          alt={p.address}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{
            objectFit: "cover",
            filter: hovered ? "grayscale(1)" : "grayscale(0)",
            transform: hovered ? "scale(1.03)" : "scale(1)",
            transition: `filter 0.6s ${EASE}, transform 0.9s ${EASE}`,
          }}
        />

        {/* SPECS — stacked bottom-left, fade in on hover */}
        {specs.length > 0 && (
          <div style={{
            position: "absolute", bottom: 18, left: 18,
            display: "flex", flexDirection: "column", gap: 2,
            pointerEvents: "none",
          }}>
            {specs.map((s, i) => (
              <span key={s} style={{
                fontFamily: "var(--font-mono), monospace",
                fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase",
                color: "#fff", lineHeight: 1.4,
                opacity: hovered ? 1 : 0,
                transform: hovered ? "translateY(0)" : "translateY(6px)",
                transition: `opacity 0.4s ${i * 0.05}s ${EASE}, transform 0.4s ${i * 0.05}s ${EASE}`,
              }}>{s}</span>
            ))}
          </div>
        )}
      </div>

      {/* TEXT BELOW */}
      <div style={{ paddingTop: 14 }}>
        <p style={{
          fontFamily: "var(--font-mono), monospace",
          fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase",
          color: "#1a1208", marginBottom: 4,
        }}>{p.address.toUpperCase()}</p>
        <p style={{
          fontFamily: "var(--font-mono), monospace",
          fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase",
          color: "rgba(26,18,8,0.45)",
        }}>{p.suburb.toUpperCase()} NSW</p>
      </div>
    </Link>
  );
}
