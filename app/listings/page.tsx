import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { fetchAllListings, mapListing } from "@/lib/agentbox";
import type { Property } from "@/lib/types";
import Reveal from "../components/Reveal";

export const metadata: Metadata = { title: "Listings" };
export const revalidate = 3600;

const FAKE_LISTINGS: Property[] = [
  {
    id: "f1", type: "residential-sale",
    title: "14 Cliff Drive", address: "14 Cliff Drive", suburb: "Thirroul",
    price: "$4,200,000", beds: 5, baths: 4, cars: 2, landSize: "892m²",
    description: "", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    tag: "New Listing",
  },
  {
    id: "f2", type: "residential-sale",
    title: "8 Marine Parade", address: "8 Marine Parade", suburb: "Kiama",
    price: "$3,850,000", beds: 4, baths: 3, cars: 2, landSize: "740m²",
    description: "", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
  },
  {
    id: "f3", type: "residential-sale",
    title: "22 Lawrence Hargrave Drive", address: "22 Lawrence Hargrave Drive", suburb: "Scarborough",
    price: "$5,100,000", beds: 6, baths: 5, cars: 3, landSize: "1,240m²",
    description: "", image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
    tag: "Auction",
  },
  {
    id: "f4", type: "residential-sale",
    title: "3 Headland Road", address: "3 Headland Road", suburb: "Austinmer",
    price: "$3,400,000", beds: 4, baths: 3, cars: 2, landSize: "680m²",
    description: "", image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80",
  },
  {
    id: "f5", type: "residential-sale",
    title: "91 Bonaira Street", address: "91 Bonaira Street", suburb: "Kiama",
    price: "$2,950,000", beds: 4, baths: 2, cars: 2, landSize: "620m²",
    description: "", image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80",
    tag: "Under Offer",
  },
  {
    id: "f6", type: "residential-sale",
    title: "55 Panorama Drive", address: "55 Panorama Drive", suburb: "Bulli",
    price: "$4,750,000", beds: 5, baths: 4, cars: 3, landSize: "1,050m²",
    description: "", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
  },
  {
    id: "f7", type: "residential-sale",
    title: "12 Beach Street", address: "12 Beach Street", suburb: "Coledale",
    price: "$3,200,000", beds: 3, baths: 2, cars: 1, landSize: "556m²",
    description: "", image: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80",
    tag: "New Listing",
  },
  {
    id: "f8", type: "residential-sale",
    title: "7 Fern Street", address: "7 Fern Street", suburb: "Gerringong",
    price: "$2,800,000", beds: 4, baths: 3, cars: 2, landSize: "710m²",
    description: "", image: "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80",
  },
  {
    id: "f9", type: "residential-sale",
    title: "19 Bellevue Road", address: "19 Bellevue Road", suburb: "Woonona",
    price: "Contact Agent", beds: 5, baths: 4, cars: 2, landSize: "930m²",
    description: "", image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80",
  },
];

const IMG_H = "clamp(200px, 23vw, 380px)";

function ListingCard({ p }: { p: Property }) {
  const href = `https://www.spinellirealestate.com.au/property/${p.id}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="listing-card"
      style={{ display: "block", textDecoration: "none", color: "inherit" }}
    >
      <div style={{ position: "relative", height: IMG_H, overflow: "hidden", background: "#ece9e2" }}>
        <Image
          src={p.image}
          alt={p.address}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{ objectFit: "cover", transition: "transform 0.9s cubic-bezier(0.22,1,0.36,1)" }}
          className="listing-card__img"
        />
        {p.tag && (
          <span style={{
            position: "absolute", top: 14, left: 14,
            background: p.tag === "Under Offer" ? "#d4bb7b" : "rgba(26,18,8,0.78)",
            color: "#fff",
            fontFamily: "var(--font-mono), monospace",
            fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase",
            padding: "4px 10px", borderRadius: 999,
          }}>{p.tag}</span>
        )}
      </div>

      <div style={{ paddingTop: 14 }}>
        <p style={{
          fontFamily: "var(--font-mono), monospace",
          fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase",
          color: "#1a1208", marginBottom: 4,
        }}>{p.address.toUpperCase()}</p>
        <p style={{
          fontFamily: "var(--font-mono), monospace",
          fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase",
          color: "rgba(26,18,8,0.45)",
        }}>{p.suburb.toUpperCase()} NSW</p>
      </div>
    </a>
  );
}

export default async function ListingsPage() {
  let forSale: Property[] = [];

  try {
    const raw = await fetchAllListings({
      "filter[type]": "Sale",
      "filter[status]": "Available",
      "filter[property.type]": "Residential",
      "sort[listedDate]": "desc",
    }, 3600);
    forSale = raw.map(mapListing);
  } catch {
    // fall through to fake listings
  }

  if (forSale.length === 0) forSale = FAKE_LISTINGS;

  return (
    <>
      {/* HERO */}
      <section className="page-hero dark">
        <div className="wrap">
          <Reveal as="p" className="eyebrow">Current listings</Reveal>
          <Reveal as="h1" className="page-hero__title" delay={60}>
            Available<br />properties.
          </Reveal>
          {forSale.length > 0 && (
            <Reveal delay={120}>
              <p style={{
                fontFamily: "var(--font-mono), monospace",
                fontSize: 12, letterSpacing: "0.08em",
                opacity: 0.5, marginTop: 32,
              }}>
                {forSale.length} {forSale.length === 1 ? "property" : "properties"} available
              </p>
            </Reveal>
          )}
        </div>
      </section>

      {/* LISTINGS GRID */}
      <section className="section light">
        <div className="wrap">
          {/* 4-col grid: odd rows wide-left, even rows wide-right */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "clamp(32px,4vw,60px) clamp(12px,1.5vw,24px)",
          }}
            className="listings-grid"
          >
            {forSale.map((p, i) => {
              const group = Math.floor(i / 3);       // which row group (0,1,2…)
              const pos   = i % 3;                   // position within group (0,1,2)
              // Odd groups (0,2,…): first item is wide. Even groups (1,3,…): last item is wide.
              const isWide = group % 2 === 0 ? pos === 0 : pos === 2;
              return (
                <Reveal key={p.id} delay={Math.min((i % 3) * 70, 140)}
                  style={{ gridColumn: isWide ? "span 2" : "span 1" }}>
                  <ListingCard p={p} />
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>


      {/* OFF-MARKET CTA */}
      <section className="section dark" style={{ background: "#d4bb7b" }}>
        <div className="wrap">
          <Reveal as="p" className="eyebrow" style={{ color: "rgba(255,255,255,0.7)" }}>Off-market access</Reveal>
          <Reveal as="h2" delay={60} style={{
            fontSize: "clamp(40px,8vw,120px)",
            fontWeight: 700, letterSpacing: "-0.045em", lineHeight: 0.92,
            color: "#fff", marginBottom: 48,
          }}>
            Not everything<br />goes public.
          </Reveal>
          <Reveal delay={120}>
            <p style={{ maxWidth: 480, opacity: 0.85, color: "#fff", marginBottom: 40, lineHeight: 1.6 }}>
              Our buyer network gets early access to prestige properties before they hit the market.
              Tell us what you&apos;re looking for and we&apos;ll make the right introductions.
            </p>
          </Reveal>
          <Reveal delay={160}>
            <Link href="/contact" style={{
              display: "inline-flex", alignItems: "center", gap: 14,
              padding: "18px 28px", border: "1px solid rgba(255,255,255,0.6)",
              borderRadius: 999, color: "#fff", fontWeight: 500,
              transition: "background 0.35s cubic-bezier(0.22,1,0.36,1), border-color 0.35s",
            }}>
              Register your interest <span>→</span>
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
