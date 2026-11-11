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

      {/* PROCESS */}
      <section style={{ background: "#fff", padding: "clamp(80px,12vw,160px) 0" }}>
        <div className="wrap">
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

          {/* numbered track */}
          <div className="process-track">
            {[1,2,3,4,5].map((n) => (
              <div key={n} className="process-track__node">
                <div className="process-track__circle">{n}</div>
              </div>
            ))}
          </div>

          {/* step cards */}
          <div className="process-grid">
            {([
              {
                title: "Prepare",
                desc: "We walk through the home with you, agree the price strategy and get it ready for the camera.",
                icon: (
                  <svg viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 13V7h6"/><path d="M37 13V7h-6"/><path d="M7 31v6h6"/><path d="M37 31v6h-6"/>
                    <path d="M14 30v-9l8-7 8 7v9h-5v-6h-6v6h-5z"/>
                  </svg>
                ),
              },
              {
                title: "Launch",
                desc: "The campaign goes live and our buyer database hears about it first.",
                icon: (
                  <svg viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="16" y="10" width="12" height="22" rx="2"/>
                    <line x1="20" y1="29" x2="24" y2="29"/>
                    <path d="M12 18c-2.5 1.8-2.5 7.2 0 9"/><path d="M9 15c-4.5 3-4.5 12 0 15"/>
                    <path d="M32 18c2.5 1.8 2.5 7.2 0 9"/><path d="M35 15c4.5 3 4.5 12 0 15"/>
                  </svg>
                ),
              },
              {
                title: "Follow up",
                desc: "Every buyer is followed up after every inspection, and you hear what they said.",
                icon: (
                  <svg viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 9h20a2 2 0 012 2v9a2 2 0 01-2 2H14l-5 4v-4H7a2 2 0 01-2-2V11a2 2 0 012-2z"/>
                    <line x1="11" y1="15" x2="23" y2="15"/><line x1="11" y1="19" x2="19" y2="19"/>
                    <path d="M22 24h13a2 2 0 012 2v7a2 2 0 01-2 2h-2v3l-4-3h-7a2 2 0 01-2-2v-7a2 2 0 012-2z"/>
                  </svg>
                ),
              },
              {
                title: "Negotiate",
                desc: "We create competition, read how buyers behave and negotiate with confidence.",
                icon: (
                  <svg viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="7" y="27" width="8" height="11"/><rect x="18" y="21" width="8" height="17"/><rect x="29" y="15" width="8" height="23"/>
                    <path d="M33 11l-4-4-4 4"/><line x1="33" y1="7" x2="33" y2="15"/>
                  </svg>
                ),
              },
              {
                title: "Settle",
                desc: "We stay with you through to settlement, so nothing is missed at the end.",
                icon: (
                  <svg viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="16" cy="26" r="8"/>
                    <line x1="22" y1="26" x2="39" y2="26"/>
                    <line x1="34" y1="26" x2="34" y2="30"/><line x1="30" y1="26" x2="30" y2="30"/>
                    <path d="M28 15l3 3 6-6"/>
                  </svg>
                ),
              },
            ] as { title: string; desc: string; icon: React.ReactNode }[]).map((s, i) => (
              <Reveal key={s.title} delay={i * 70}>
                <div className="process-step">
                  <div className="process-step__icon">{s.icon}</div>
                  <h3 className="process-step__title">{s.title}</h3>
                  <p className="process-step__desc">{s.desc}</p>
                </div>
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
