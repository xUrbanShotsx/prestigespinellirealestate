import Link from "next/link";
import Reveal from "./components/Reveal";
import HeroVideo from "./components/HeroVideo";
import HeroChat from "./components/HeroChat";
import ScrollStatement from "./components/ScrollStatement";
import PropertyCard from "./components/PropertyCard";

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
          <ScrollStatement />
        </div>
      </section>

      {/* PROPERTY CARDS */}
      <section style={{ background: "#d4bb7b", padding: "clamp(60px,8vw,120px) 0 clamp(80px,14vw,200px)" }}>
        <div className="feature-cards" style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "clamp(12px,2vw,24px)",
          padding: "0 clamp(20px,4vw,56px) clamp(20px,4vw,56px)",
        }}>
          <PropertyCard
            image="https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80"
            address="14 Cliff Drive, Thirroul"
            suburb="Thirroul"
            price="$4,200,000"
            beds={5}
            baths={4}
            delay={0}
          />
          <PropertyCard
            image="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80"
            address="8 Marine Parade, Kiama"
            suburb="Kiama"
            price="$3,850,000"
            beds={4}
            baths={3}
            delay={80}
          />
          <PropertyCard
            image="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80"
            address="22 Lawrence Hargrave Drive, Scarborough"
            suburb="Scarborough"
            price="$5,100,000"
            beds={6}
            baths={5}
            delay={160}
          />
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
