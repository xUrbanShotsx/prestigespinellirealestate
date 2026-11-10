import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "../components/Reveal";

export const metadata: Metadata = { title: "About" };

const EASE = "cubic-bezier(0.22,1,0.36,1)";

export default function AboutPage() {
  return (
    <>
      {/* HERO */}
      <section className="page-hero dark">
        <div className="wrap">
          <Reveal as="p" className="eyebrow">About Spinelli Prestige</Reveal>
          <Reveal as="h1" className="page-hero__title">
            Prestige property,<br />done properly.
          </Reveal>
        </div>
      </section>

      {/* EDITORIAL BLOCK 1 — large left + text + offset portrait right */}
      <section style={{ background: "#fff", padding: "clamp(60px,8vw,120px) clamp(20px,4vw,56px) 0" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1.15fr 0.65fr",
          gap: "clamp(16px,2.5vw,36px)",
          alignItems: "start",
        }}>
          {/* LEFT — large landscape image */}
          <Reveal>
            <div style={{ position: "relative", aspectRatio: "4 / 5", overflow: "hidden" }}>
              <Image
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=85"
                alt="Prestige property exterior"
                fill
                sizes="(max-width: 960px) 100vw, 60vw"
                style={{ objectFit: "cover" }}
              />
            </div>
          </Reveal>

          {/* RIGHT — link top + offset smaller portrait lower */}
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            <Reveal style={{ display: "flex", justifyContent: "flex-end", paddingBottom: "clamp(40px,7vw,100px)" }}>
              <Link href="/contact" style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                fontFamily: "var(--font-mono), monospace",
                fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase",
                color: "#1a1208",
              }}>
                Our Story <span style={{ fontSize: 16 }}>→</span>
              </Link>
            </Reveal>

            <Reveal delay={120}>
              <div style={{ position: "relative", aspectRatio: "3 / 4", overflow: "hidden" }}>
                <Image
                  src="https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=85"
                  alt="Prestige property interior"
                  fill
                  sizes="(max-width: 960px) 100vw, 35vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* STATEMENT */}
      <section className="section light">
        <div className="wrap statement">
          <Reveal as="p" className="statement__text">
            Spinelli Prestige is the dedicated prestige arm of Spinelli Real Estate — the Illawarra&apos;s most trusted boutique agency. Two decades of local expertise. An active buyer network. An unwavering commitment to exceptional results.
          </Reveal>
        </div>
      </section>

      {/* EDITORIAL BLOCK 2 — full-width image with offset text */}
      <section style={{ background: "#fff", padding: "0 clamp(20px,4vw,56px)" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "0.5fr 1fr",
          gap: "clamp(24px,4vw,64px)",
          alignItems: "center",
        }}>
          {/* LEFT — text column */}
          <div style={{ paddingRight: "clamp(0px,2vw,40px)" }}>
            <Reveal as="p" className="eyebrow" style={{ marginBottom: 32 }}>The Illawarra difference</Reveal>
            <Reveal as="h2" delay={60} style={{
              fontSize: "clamp(36px,5vw,80px)",
              fontWeight: 700,
              letterSpacing: "-0.045em",
              lineHeight: 0.95,
              marginBottom: 32,
              color: "#1a1208",
            }}>
              Local.<br />Trusted.<br />Discreet.
            </Reveal>
            <Reveal delay={120} as="p" style={{ opacity: 0.6, lineHeight: 1.7, maxWidth: 380 }}>
              We work with a carefully selected number of clients — which means every home receives the time, strategy and attention it deserves. No shortcuts. No compromises.
            </Reveal>
          </div>

          {/* RIGHT — tall image */}
          <Reveal delay={80}>
            <div style={{ position: "relative", aspectRatio: "16 / 10", overflow: "hidden" }}>
              <Image
                src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1400&q=85"
                alt="Illawarra prestige home"
                fill
                sizes="(max-width: 960px) 100vw, 65vw"
                style={{ objectFit: "cover" }}
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* EDITORIAL BLOCK 3 — three frames, varied sizes */}
      <section style={{ background: "#fff", padding: "clamp(24px,4vw,64px) clamp(20px,4vw,56px)" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.4fr 0.7fr",
          gridTemplateRows: "auto auto",
          gap: "clamp(10px,1.5vw,20px)",
          alignItems: "end",
        }}>
          {/* TALL narrow left */}
          <Reveal style={{ gridRow: "1 / 3" }}>
            <div style={{ position: "relative", aspectRatio: "2 / 3", overflow: "hidden" }}>
              <Image
                src="https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=600&q=85"
                alt="Architecture detail"
                fill
                sizes="(max-width: 960px) 50vw, 25vw"
                style={{ objectFit: "cover" }}
              />
            </div>
          </Reveal>

          {/* WIDE centre top */}
          <Reveal delay={60}>
            <div style={{ position: "relative", aspectRatio: "16 / 9", overflow: "hidden" }}>
              <Image
                src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1000&q=85"
                alt="Luxury home"
                fill
                sizes="(max-width: 960px) 100vw, 45vw"
                style={{ objectFit: "cover" }}
              />
            </div>
          </Reveal>

          {/* SMALL square right top */}
          <Reveal delay={100}>
            <div style={{ position: "relative", aspectRatio: "1 / 1", overflow: "hidden" }}>
              <Image
                src="https://images.unsplash.com/photo-1600210492493-0946911123ea?w=600&q=85"
                alt="Interior detail"
                fill
                sizes="(max-width: 960px) 50vw, 20vw"
                style={{ objectFit: "cover" }}
              />
            </div>
          </Reveal>

          {/* TEXT centre bottom */}
          <Reveal delay={80} style={{ gridColumn: "2", display: "flex", flexDirection: "column", gap: 12, paddingTop: 24 }}>
            <p style={{ fontFamily: "var(--font-mono), monospace", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.5 }}>Est. 2004</p>
            <p style={{ fontSize: "clamp(16px,1.4vw,20px)", lineHeight: 1.6, opacity: 0.75, maxWidth: 420 }}>
              Twenty years of building relationships, understanding the market, and delivering outcomes that exceed expectations. The Illawarra is our home — and we know it like no one else.
            </p>
          </Reveal>

          {/* PORTRAIT right bottom */}
          <Reveal delay={130}>
            <div style={{ position: "relative", aspectRatio: "3 / 4", overflow: "hidden" }}>
              <Image
                src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=85"
                alt="Prestige listing"
                fill
                sizes="(max-width: 960px) 50vw, 20vw"
                style={{ objectFit: "cover" }}
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* VALUES */}
      <section className="section light">
        <div className="wrap">
          <div className="values">
            {[
              ["Local expertise", "Deep knowledge of the Illawarra and South Coast prestige market — from Thirroul to Kiama and everywhere between."],
              ["Qualified buyers", "A curated database of prestige buyers actively looking in the region — many deals happen before they go to market."],
              ["Discreet service", "We understand the need for privacy. Off-market campaigns and confidential marketing available on request."],
              ["End-to-end", "From styling advice and photography to negotiation and settlement — one team, every step of the way."],
            ].map(([t, d], i) => (
              <Reveal key={t as string} delay={i * 60} className="values__item">
                <h3>{t}</h3>
                <p>{d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section cta dark">
        <div className="wrap">
          <Reveal as="p" className="eyebrow">Ready to start</Reveal>
          <Reveal as="h2" className="cta__title">
            Talk to our<br />prestige team.
          </Reveal>
          <Reveal>
            <Link href="/contact" className="btn btn--light">
              Get in touch <span aria-hidden="true">→</span>
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
