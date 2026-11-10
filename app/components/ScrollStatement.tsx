"use client";

import { useEffect, useRef, useState } from "react";

const WORDS = "The finest homes in the Illawarra and South Coast, represented with the expertise, discretion and market knowledge they deserve.".split(" ");

export default function ScrollStatement() {
  const ref = useRef<HTMLParagraphElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    function update() {
      const rect = el!.getBoundingClientRect();
      const vh = window.innerHeight;
      // Highlight starts when section top reaches 70% down viewport,
      // completes when it reaches 15% down — giving a generous scroll window.
      const p = (vh * 0.7 - rect.top) / (vh * 0.55);
      setProgress(Math.min(1, Math.max(0, p)));
    }

    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <p
      ref={ref}
      style={{
        fontSize: "clamp(28px,4.2vw,64px)",
        lineHeight: 1.1,
        letterSpacing: "-0.035em",
        fontWeight: 500,
      }}
    >
      {WORDS.map((word, i) => {
        const threshold = i / (WORDS.length - 1);
        const lit = progress > threshold;
        return (
          <span
            key={i}
            style={{
              color: lit ? "#1a1208" : "rgba(0,0,0,0.15)",
              transition: "color 0.25s cubic-bezier(0.22,1,0.36,1)",
            }}
          >
            {word}
            {i < WORDS.length - 1 ? " " : ""}
          </span>
        );
      })}
    </p>
  );
}
