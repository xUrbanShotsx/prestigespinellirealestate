import type { Metadata } from "next";
import Reveal from "../components/Reveal";

export const metadata: Metadata = { title: "Listings" };

export default function ListingsPage() {
  return (
    <>
      <section className="page-hero dark">
        <div className="wrap">
          <Reveal as="p" className="eyebrow">Current listings</Reveal>
          <Reveal as="h1" className="page-hero__title">
            Available<br />properties.
          </Reveal>
        </div>
      </section>
      <section className="section light">
        <div className="wrap">
          <Reveal>
            <p style={{ opacity: 0.5, fontSize: 18 }}>
              Our prestige listings are coming soon. In the meantime,{" "}
              <a href="/contact" style={{ borderBottom: "1px solid currentColor" }}>contact us</a>{" "}
              to discuss your requirements or access our off-market portfolio.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
