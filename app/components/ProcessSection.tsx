"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import Reveal from "./Reveal";

const EASE = "cubic-bezier(0.22,1,0.36,1)";
const SPRING = "cubic-bezier(0.34,1.56,0.64,1)";

function PrepareIcon() {
  return (
    <svg viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 15V5h10"/>
      <path d="M29 5h10v10"/>
      <path d="M5 29v10h10"/>
      <path d="M29 39h10V29"/>
      <path d="M12 27L22 18l10 9v7H15v-7z"/>
      <path d="M19 34v-5h6v5"/>
    </svg>
  );
}

function LaunchIcon() {
  return (
    <svg viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="17" width="8" height="10" rx="1"/>
      <path d="M13 14L32 8v28L13 30z"/>
      <path d="M35 19.5C37.2 20.9 37.2 23.1 35 24.5"/>
      <path d="M37.5 16.5C41.8 19 41.8 25 37.5 27.5"/>
    </svg>
  );
}

function FollowUpIcon() {
  return (
    <svg viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 7h22a2 2 0 012 2v11a2 2 0 01-2 2H14l-6 6v-6H6a2 2 0 01-2-2V9a2 2 0 012-2z"/>
      <line x1="10" y1="13" x2="24" y2="13"/>
      <line x1="10" y1="17" x2="18" y2="17"/>
      <path d="M22 24h14a2 2 0 012 2v7a2 2 0 01-2 2h-2v3l-4-3h-8a2 2 0 01-2-2v-7a2 2 0 012-2z"/>
    </svg>
  );
}

function NegotiateIcon() {
  return (
    <svg viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="28" width="8" height="11"/>
      <rect x="17" y="21" width="8" height="18"/>
      <rect x="29" y="14" width="8" height="25"/>
      <line x1="33" y1="10" x2="33" y2="14"/>
      <path d="M30 13l3-3 3 3"/>
    </svg>
  );
}

function SettleIcon() {
  return (
    <svg viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="15" cy="27" r="8"/>
      <path d="M21 27h18"/>
      <line x1="35" y1="27" x2="35" y2="31"/>
      <line x1="31" y1="27" x2="31" y2="31"/>
      <circle cx="34" cy="12" r="6"/>
      <path d="M31 12l2.5 2.5L37 9"/>
    </svg>
  );
}

type Step = {
  n: number;
  title: string;
  desc: string;
  icon: ReactNode;
};

const STEPS: Step[] = [
  {
    n: 1,
    title: "Prepare",
    desc: "We walk through the home with you, agree the price strategy and get it ready for the camera.",
    icon: <PrepareIcon />,
  },
  {
    n: 2,
    title: "Launch",
    desc: "The campaign goes live and our buyer database hears about it first.",
    icon: <LaunchIcon />,
  },
  {
    n: 3,
    title: "Follow up",
    desc: "Every buyer is followed up after every inspection, and you hear what they said.",
    icon: <FollowUpIcon />,
  },
  {
    n: 4,
    title: "Negotiate",
    desc: "We create competition, read how buyers behave and negotiate with confidence.",
    icon: <NegotiateIcon />,
  },
  {
    n: 5,
    title: "Settle",
    desc: "We stay with you through to settlement, so nothing is missed at the end.",
    icon: <SettleIcon />,
  },
];

export default function ProcessSection() {
  const [visible, setVisible] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section style={{ background: "#fff", padding: "clamp(80px,12vw,160px) 0" }}>
      <div className="wrap">

        {/* Header */}
        <div className="process-header">
          <Reveal>
            <h2 className="process-headline">Personal attention.<br />Proven results.</h2>
          </Reveal>
          <Reveal delay={60}>
            <p className="process-lede">
              From the moment you decide to sell, your campaign is personally managed. Here&apos;s what that looks like.
            </p>
          </Reveal>
        </div>

        {/* Numbered track — observe this div to trigger animations */}
        <div ref={trackRef} className="process-track" style={{ position: "relative" }}>

          {/* Animated connecting line */}
          <div
            className="process-line"
            style={{
              position: "absolute",
              top: "50%",
              left: "10%",
              right: "10%",
              height: 1,
              background: "rgba(26,18,8,0.18)",
              transform: `scaleX(${visible ? 1 : 0})`,
              transformOrigin: "left center",
              transition: `transform 1.4s ${EASE}`,
              pointerEvents: "none",
              zIndex: 0,
            }}
          />

          {STEPS.map((s, i) => (
            <div key={s.n} className="process-track__node">
              <div
                className="process-track__circle"
                style={{
                  transform: visible ? "scale(1)" : "scale(0)",
                  opacity: visible ? 1 : 0,
                  transition: `transform 0.65s ${SPRING} ${i * 160}ms, opacity 0.4s ease ${i * 160}ms`,
                }}
              >
                {s.n}
              </div>
            </div>
          ))}
        </div>

        {/* Step cards */}
        <div className="process-grid">
          {STEPS.map((s, i) => (
            <div
              key={s.title}
              className="process-step"
              style={{
                transform: visible ? "translateY(0)" : "translateY(28px)",
                opacity: visible ? 1 : 0,
                transition: `transform 0.75s ${EASE} ${180 + i * 100}ms, opacity 0.6s ease ${180 + i * 100}ms`,
              }}
            >
              <div className="process-step__icon">{s.icon}</div>
              <h3 className="process-step__title">{s.title}</h3>
              <p className="process-step__desc">{s.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
