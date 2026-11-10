import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "../components/Reveal";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <>
      <section className="page-hero dark">
        <div className="wrap">
          <Reveal as="p" className="eyebrow">About Spinelli Prestige</Reveal>
          <Reveal as="h1" className="page-hero__title">
            Prestige property,<br />done properly.
          </Reveal>
        </div>
      </section>

      <section className="section light">
        <div className="wrap statement">
          <Reveal as="p" className="statement__text">
            Spinelli Prestige is the dedicated prestige arm of Spinelli Real Estate — the Illawarra&apos;s most trusted boutique agency. We bring two decades of local expertise, an active buyer network, and an unwavering commitment to exceptional results.
          </Reveal>
        </div>
      </section>

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
