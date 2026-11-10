import Link from "next/link";
import Reveal from "./components/Reveal";
import HeroVideo from "./components/HeroVideo";
import HeroChat from "./components/HeroChat";

export default function HomePage() {
  return (
    <>
      {/* HERO — video + AI chat */}
      <section className="hero dark" style={{ position: "relative", overflow: "hidden" }}>
        <HeroVideo />
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 1 }} />
        <div className="hero__grid" aria-hidden="true" style={{ position: "absolute", inset: 0, zIndex: 2 }} />
        <HeroChat />
      </section>

      {/* STATEMENT */}
      <section className="section light">
        <div className="wrap statement">
          <Reveal as="p" className="eyebrow">Our approach</Reveal>
          <Reveal as="p" className="statement__text">
            The finest homes in the Illawarra and South Coast, represented with the expertise, discretion and market knowledge they deserve.
          </Reveal>
        </div>
      </section>

      {/* FEATURE CARDS */}
      <section style={{ background: "#fff", padding: "0 0 clamp(80px,14vw,200px)" }}>
        <div className="feature-cards" style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 2,
        }}>
          {[
            {
              label: "Off-Market",
              heading: "Exclusive access before it goes public.",
              body: "Our buyer network gets first look at the finest properties in the region — many sales are negotiated quietly, before a sign goes up.",
              bg: "#d4bb7b",
            },
            {
              label: "Prestige Sales",
              heading: "Results that reflect the true value of your home.",
              body: "We combine deep local knowledge with an uncompromising approach to presentation and negotiation — because every detail matters at this level.",
              bg: "#1a1208",
            },
            {
              label: "Market Intelligence",
              heading: "Know your position before you move.",
              body: "Detailed, honest appraisals grounded in live market data. We'll tell you what your property is worth — and how to maximise it.",
              bg: "#d4bb7b",
            },
          ].map((card, i) => (
            <Reveal key={i} delay={i * 80} style={{
              background: card.bg,
              color: card.bg === "#1a1208" ? "#fff" : "#fff",
              aspectRatio: "3 / 4",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              padding: "clamp(28px,4vw,56px)",
              minHeight: "clamp(380px,55vw,760px)",
            }}>
              <p style={{
                fontFamily: "var(--font-mono), monospace",
                fontSize: 11,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                opacity: 0.7,
                marginBottom: 24,
              }}>{card.label}</p>
              <h3 style={{
                fontSize: "clamp(24px,2.8vw,42px)",
                fontWeight: 700,
                letterSpacing: "-0.035em",
                lineHeight: 1.05,
                marginBottom: 20,
              }}>{card.heading}</h3>
              <p style={{
                fontSize: "clamp(14px,1.1vw,17px)",
                lineHeight: 1.6,
                opacity: 0.75,
                maxWidth: 340,
              }}>{card.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* HOW WE WORK */}
      <section className="section light">
        <div className="wrap approach">
          <Reveal as="h2" className="h2 approach__title">How we<br />work</Reveal>
          <div className="approach__list">
            {[
              ["01", "Advise", "An honest appraisal of your property's position in the current market — grounded in data, not flattery."],
              ["02", "Position", "Strategic presentation: styling direction, photography, copywriting and digital assets that command attention."],
              ["03", "Campaign", "A tailored campaign reaching qualified prestige buyers through our network, digital platforms and exclusive off-market channels."],
              ["04", "Negotiate", "Skilled negotiation focused on maximising your outcome — with the patience and experience prestige property demands."],
            ].map(([n, t, d], i) => (
              <Reveal key={n} delay={i * 60} className="approach__item">
                <span className="mono">{n}</span>
                <h3>{t}</h3>
                <p>{d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <section className="marquee dark" aria-hidden="true">
        <div className="marquee__track">
          {["Illawarra", "Prestige", "South Coast", "Off-Market", "Illawarra", "Prestige", "South Coast", "Off-Market"].map((w, i) => (
            <span key={i}>{w}<i>✱</i></span>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section cta light">
        <div className="wrap">
          <Reveal as="p" className="eyebrow">Work with us</Reveal>
          <Reveal as="h2" className="cta__title">
            Thinking of<br />selling?
          </Reveal>
          <Reveal>
            <Link href="/contact" className="btn btn--dark">
              Get in touch <span aria-hidden="true">→</span>
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
