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
