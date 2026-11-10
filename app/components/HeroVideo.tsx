"use client";

import { useRef } from "react";

const INTRO_END = 4.5;

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  function handleEnded() {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = INTRO_END;
    v.play();
  }

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      playsInline
      onEnded={handleEnded}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        zIndex: 0,
      }}
    >
      <source src="/hero.mp4" type="video/mp4" />
    </video>
  );
}
