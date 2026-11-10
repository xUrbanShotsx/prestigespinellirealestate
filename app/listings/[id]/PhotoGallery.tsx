"use client";

import Image from "next/image";
import { useState } from "react";

const EASE = "cubic-bezier(0.22,1,0.36,1)";

export default function PhotoGallery({ photos, address }: { photos: string[]; address: string }) {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const grid = photos.slice(0, 5);

  return (
    <>
      {/* grid: wide left, 2x2 right */}
      <div className="gallery-grid" style={{
        display: "grid",
        gridTemplateColumns: "1.4fr 1fr",
        gridTemplateRows: "auto auto",
        gap: 3,
      }}>
        {/* large left — spans 2 rows */}
        {grid[0] && (
          <div
            onClick={() => setLightbox(0)}
            style={{
              gridRow: "1 / 3",
              position: "relative",
              aspectRatio: "2/3",
              overflow: "hidden",
              cursor: "zoom-in",
              background: "#1a1208",
            }}
          >
            <Image
              src={grid[0]}
              alt={address}
              fill
              sizes="(max-width: 768px) 100vw, 56vw"
              style={{
                objectFit: "cover",
                transition: `transform 0.9s ${EASE}`,
              }}
              className="gallery-img"
            />
          </div>
        )}

        {/* top-right */}
        {grid[1] && (
          <div
            onClick={() => setLightbox(1)}
            style={{
              position: "relative",
              aspectRatio: "16/9",
              overflow: "hidden",
              cursor: "zoom-in",
              background: "#1a1208",
            }}
          >
            <Image src={grid[1]} alt={address} fill sizes="44vw"
              style={{ objectFit: "cover", transition: `transform 0.9s ${EASE}` }}
              className="gallery-img"
            />
          </div>
        )}

        {/* bottom-right */}
        {grid[2] && (
          <div
            onClick={() => setLightbox(2)}
            style={{
              position: "relative",
              aspectRatio: "16/9",
              overflow: "hidden",
              cursor: "zoom-in",
              background: "#1a1208",
            }}
          >
            <Image src={grid[2]} alt={address} fill sizes="44vw"
              style={{ objectFit: "cover", transition: `transform 0.9s ${EASE}` }}
              className="gallery-img"
            />
            {photos.length > 5 && (
              <div style={{
                position: "absolute", inset: 0,
                background: "rgba(10,10,8,0.6)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <span style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: 13, letterSpacing: "0.1em", color: "#fff",
                }}>+{photos.length - 5} more</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* remaining photos strip */}
      {grid.length > 3 && (
        <div style={{
          display: "grid",
          gridTemplateColumns: `repeat(${Math.min(grid.length - 3, 2)}, 1fr)`,
          gap: 3, marginTop: 3,
        }}>
          {grid.slice(3).map((src, i) => (
            <div
              key={src}
              onClick={() => setLightbox(i + 3)}
              style={{
                position: "relative",
                aspectRatio: "16/9",
                overflow: "hidden",
                cursor: "zoom-in",
                background: "#1a1208",
              }}
            >
              <Image src={src} alt={address} fill sizes="50vw"
                style={{ objectFit: "cover", transition: `transform 0.9s ${EASE}` }}
                className="gallery-img"
              />
            </div>
          ))}
        </div>
      )}

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

          {/* prev */}
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

          {/* next */}
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

          {/* counter */}
          <p style={{
            position: "absolute", bottom: 24, left: "50%",
            transform: "translateX(-50%)",
            fontFamily: "var(--font-mono), monospace",
            fontSize: 10, letterSpacing: "0.14em", color: "rgba(255,255,255,0.4)",
          }}>
            {lightbox + 1} / {photos.length}
          </p>

          {/* close */}
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
      `}</style>
    </>
  );
}
