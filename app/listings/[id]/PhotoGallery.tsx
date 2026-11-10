"use client";

import Image from "next/image";
import { useState } from "react";

const EASE = "cubic-bezier(0.22,1,0.36,1)";

export default function PhotoGallery({ photos, address }: { photos: string[]; address: string }) {
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <>
      {/* Alternating wide/narrow grid — same pattern as listings page */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 12,
      }}>
        {photos.map((src, i) => {
          const group = Math.floor(i / 3);
          const pos   = i % 3;
          const isWide = group % 2 === 0 ? pos === 0 : pos === 2;

          return (
            <div
              key={src}
              onClick={() => setLightbox(i)}
              style={{
                gridColumn: isWide ? "span 2" : "span 1",
                position: "relative",
                aspectRatio: isWide ? "16/9" : "4/5",
                overflow: "hidden",
                cursor: "zoom-in",
                background: "#ece9e2",
              }}
            >
              <Image
                src={src}
                alt={`${address} — photo ${i + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{
                  objectFit: "cover",
                  transition: `transform 0.9s ${EASE}`,
                }}
                className="gallery-img"
              />
              {/* index on hover */}
              <div style={{
                position: "absolute", inset: 0,
                display: "flex", alignItems: "flex-end",
                padding: 14,
                opacity: 0,
                transition: `opacity 0.3s ${EASE}`,
              }} className="gallery-overlay">
                <span style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: 9, letterSpacing: "0.14em",
                  color: "rgba(255,255,255,0.7)",
                }}>
                  {i + 1} / {photos.length}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* lightbox */}
      {lightbox !== null && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: "fixed", inset: 0, zIndex: 200,
            background: "rgba(10,10,8,0.95)",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "zoom-out",
          }}
        >
          <div style={{ position: "relative", width: "90vw", height: "85vh" }}>
            <Image
              src={photos[lightbox]}
              alt={address}
              fill
              sizes="90vw"
              style={{ objectFit: "contain" }}
            />
          </div>

          {lightbox > 0 && (
            <button
              onClick={(e) => { e.stopPropagation(); setLightbox(lightbox - 1); }}
              style={{
                position: "absolute", left: 24, top: "50%",
                transform: "translateY(-50%)",
                background: "rgba(255,255,255,0.08)", border: "none",
                color: "#fff", width: 48, height: 48, borderRadius: "50%",
                cursor: "pointer", fontSize: 20,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >←</button>
          )}

          {lightbox < photos.length - 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); setLightbox(lightbox + 1); }}
              style={{
                position: "absolute", right: 24, top: "50%",
                transform: "translateY(-50%)",
                background: "rgba(255,255,255,0.08)", border: "none",
                color: "#fff", width: 48, height: 48, borderRadius: "50%",
                cursor: "pointer", fontSize: 20,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >→</button>
          )}

          <p style={{
            position: "absolute", bottom: 24, left: "50%",
            transform: "translateX(-50%)",
            fontFamily: "var(--font-mono), monospace",
            fontSize: 10, letterSpacing: "0.14em", color: "rgba(255,255,255,0.4)",
          }}>
            {lightbox + 1} / {photos.length}
          </p>

          <button
            onClick={() => setLightbox(null)}
            style={{
              position: "absolute", top: 24, right: 24,
              background: "none", border: "none",
              color: "rgba(255,255,255,0.5)", cursor: "pointer",
              fontFamily: "var(--font-mono), monospace",
              fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase",
            }}
          >Close ×</button>
        </div>
      )}

      <style>{`
        .gallery-img:hover { transform: scale(1.04) !important; }
        .gallery-overlay:hover, div:hover > .gallery-overlay { opacity: 1 !important; }
      `}</style>
    </>
  );
}
