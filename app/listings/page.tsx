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
      {/* IMAGE */}
      <div style={{
        position: "relative",
        aspectRatio: "4 / 3",
        overflow: "hidden",
        background: "#f0ede6",
        marginBottom: 0,
      }}>
        <Image
          src={p.image}
          alt={p.address}
          fill
          sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 33vw"
          style={{
            objectFit: "cover",
            transition: "transform 0.8s cubic-bezier(0.22,1,0.36,1)",
          }}
          className="listing-card__img"
        />
        {p.tag && (
          <span style={{
            position: "absolute", top: 16, left: 16,
            background: p.tag === "Under Offer" ? "#d4bb7b" : "rgba(0,0,0,0.75)",
            color: "#fff",
            fontFamily: "var(--font-mono), monospace",
            fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase",
            padding: "5px 12px", borderRadius: 999,
          }}>{p.tag}</span>
        )}
      </div>

      {/* DETAILS */}
      <div style={{ padding: "20px 0 32px", borderBottom: "1px solid var(--line-light)" }}>
        <p style={{
          fontFamily: "var(--font-mono), monospace",
          fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase",
          color: "var(--grey)", marginBottom: 8,
        }}>{p.suburb}</p>

        <h3 style={{
          fontSize: "clamp(18px,1.8vw,24px)",
          fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.1,
          marginBottom: 10, color: "#1a1208",
        }}>{p.address}</h3>

        <p style={{
          fontSize: "clamp(20px,2vw,28px)",
          fontWeight: 700, letterSpacing: "-0.025em",
          color: "#d4bb7b", marginBottom: 16,
        }}>{p.price}</p>

        {(p.beds || p.baths || p.cars) && (
          <div style={{
            display: "flex", gap: 20,
            fontFamily: "var(--font-mono), monospace",
            fontSize: 11, letterSpacing: "0.08em",
            color: "var(--grey)",
          }}>
            {p.beds != null && <span>{p.beds} bed</span>}
            {p.baths != null && <span>{p.baths} bath</span>}
            {p.cars != null && p.cars > 0 && <span>{p.cars} car</span>}
            {p.landSize && <span>{p.landSize}</span>}
          </div>
        )}

        {p.openHome && (
          <p style={{
            marginTop: 12,
            fontFamily: "var(--font-mono), monospace",
            fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase",
            color: "#d4bb7b",
          }}>Open · {p.openHome}</p>
        )}
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
          {(
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "clamp(40px,5vw,72px) clamp(20px,3vw,40px)",
            }}
              className="listings-grid"
            >
              {forSale.map((p, i) => (
                <Reveal key={p.id} delay={Math.min(i * 50, 200)}>
                  <ListingCard p={p} />
                </Reveal>
              ))}
            </div>
          )}
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
