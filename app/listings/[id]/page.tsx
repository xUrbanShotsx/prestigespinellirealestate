import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FAKE_LISTINGS, getListingById } from "../data";
import Reveal from "../../components/Reveal";
import EnquiryForm from "./EnquiryForm";
import PhotoGallery from "./PhotoGallery";

export async function generateStaticParams() {
  return FAKE_LISTINGS.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const p = getListingById(id);
  if (!p) return { title: "Property Not Found" };
  return {
    title: `${p.address}, ${p.suburb} — Spinelli Prestige`,
    description: p.description,
  };
}

const EASE = "cubic-bezier(0.22,1,0.36,1)";

export default async function PropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const p = getListingById(id);
  if (!p) notFound();

  const specs = [
    p.beds  != null ? { label: "Bed",  value: p.beds  } : null,
    p.baths != null ? { label: "Bath", value: p.baths } : null,
    p.cars  != null && p.cars > 0 ? { label: "Car", value: p.cars } : null,
  ].filter(Boolean) as { label: string; value: number }[];

  const paragraphs = p.longDescription?.split("\n\n") ?? [p.description];

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section style={{
        position: "relative",
        height: "100svh",
        minHeight: 600,
        overflow: "hidden",
        background: "#0a0a08",
      }}>
        <Image
          src={p.image}
          alt={p.address}
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", opacity: 0.72 }}
        />

        {/* gradient */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, transparent 40%, rgba(10,10,8,0.92) 100%)",
        }} />

        {/* back link */}
        <Reveal style={{ position: "absolute", top: 32, left: "var(--gutter)" }}>
          <Link href="/listings" style={{
            fontFamily: "var(--font-mono), monospace",
            fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase",
            color: "rgba(255,255,255,0.6)",
            display: "flex", alignItems: "center", gap: 8,
            transition: `color 0.3s ${EASE}`,
          }}>
            ← All listings
          </Link>
        </Reveal>

        {/* address */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          padding: "0 var(--gutter) clamp(40px, 6vw, 80px)",
        }}>
          <p style={{
            fontFamily: "var(--font-mono), monospace",
            fontSize: "clamp(9px, 1vw, 11px)", letterSpacing: "0.18em",
            textTransform: "uppercase", color: "rgba(255,255,255,0.5)",
            marginBottom: 16,
          }}>
            {p.suburb.toUpperCase()}&nbsp;&nbsp;NSW
          </p>
          <h1 style={{
            fontFamily: "var(--font-sans), sans-serif",
            fontSize: "clamp(36px, 7vw, 110px)",
            fontWeight: 700, letterSpacing: "-0.045em", lineHeight: 0.9,
            color: "#fff",
          }}>
            {p.address}
          </h1>
        </div>
      </section>

      {/* ── SPEC BAR ─────────────────────────────────────────────── */}
      <div style={{
        background: "#0a0a08",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}>
        <div className="wrap property-spec-bar" style={{
          display: "flex", alignItems: "stretch",
          gap: 0,
        }}>
          {/* price */}
          <div style={{
            padding: "clamp(24px,3vw,40px) 0",
            paddingRight: "clamp(32px,4vw,60px)",
            borderRight: "1px solid rgba(255,255,255,0.08)",
            marginRight: "clamp(32px,4vw,60px)",
            flexShrink: 0,
          }}>
            <p style={{
              fontFamily: "var(--font-mono), monospace",
              fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase",
              color: "rgba(255,255,255,0.4)", marginBottom: 8,
            }}>Guide</p>
            <p style={{
              fontFamily: "var(--font-sans), sans-serif",
              fontSize: "clamp(22px,3vw,36px)", fontWeight: 600,
              letterSpacing: "-0.03em", color: "#d4bb7b",
            }}>{p.price}</p>
          </div>

          {/* specs */}
          <div style={{ display: "flex", alignItems: "center", gap: "clamp(24px,4vw,56px)", flexWrap: "wrap" }}>
            {specs.map((s) => (
              <div key={s.label}>
                <p style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase",
                  color: "rgba(255,255,255,0.4)", marginBottom: 6,
                }}>{s.label}</p>
                <p style={{
                  fontFamily: "var(--font-sans), sans-serif",
                  fontSize: "clamp(20px,2.5vw,32px)", fontWeight: 600,
                  letterSpacing: "-0.03em", color: "#fff",
                }}>{s.value}</p>
              </div>
            ))}
            {p.landSize && (
              <div>
                <p style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase",
                  color: "rgba(255,255,255,0.4)", marginBottom: 6,
                }}>Land</p>
                <p style={{
                  fontFamily: "var(--font-sans), sans-serif",
                  fontSize: "clamp(20px,2.5vw,32px)", fontWeight: 600,
                  letterSpacing: "-0.03em", color: "#fff",
                }}>{p.landSize}</p>
              </div>
            )}
            {p.openHome && (
              <div style={{ marginLeft: "auto" }}>
                <p style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase",
                  color: "rgba(255,255,255,0.4)", marginBottom: 6,
                }}>Open home</p>
                <p style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: "clamp(11px,1.4vw,14px)", letterSpacing: "0.06em",
                  color: "#d4bb7b",
                }}>{p.openHome}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── DESCRIPTION + SIDE IMAGE ─────────────────────────────── */}
      <section style={{ background: "#fff", padding: "clamp(80px,10vw,160px) 0" }}>
        <div className="wrap property-desc-grid" style={{
          display: "grid",
          gridTemplateColumns: "1fr clamp(260px,32vw,480px)",
          gap: "clamp(48px,6vw,96px)",
          alignItems: "start",
        }}>
          {/* text */}
          <div>
            <Reveal as="p" style={{
              fontFamily: "var(--font-mono), monospace",
              fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase",
              color: "rgba(26,18,8,0.4)", marginBottom: 40,
            }}>
              The property
            </Reveal>

            <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
              {paragraphs.map((para, i) => (
                <Reveal key={i} delay={i * 40}>
                  <p style={{
                    fontSize: "clamp(16px,1.6vw,20px)",
                    lineHeight: 1.72, color: "#1a1208",
                    fontWeight: i === 0 ? 500 : 400,
                  }}>{para}</p>
                </Reveal>
              ))}
            </div>
          </div>

          {/* portrait side image */}
          {p.photos && p.photos[1] && (
            <Reveal delay={80}>
              <div style={{
                position: "sticky", top: 120,
                aspectRatio: "3/4", overflow: "hidden",
                background: "#ece9e2",
              }}>
                <Image
                  src={p.photos[1]}
                  alt={p.address}
                  fill
                  sizes="(max-width: 768px) 100vw, 32vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* ── PHOTO GALLERY ────────────────────────────────────────── */}
      {p.photos && p.photos.length > 0 && (
        <section style={{ background: "#0a0a08", padding: "clamp(60px,8vw,120px) 0" }}>
          <div className="wrap">
            <Reveal>
              <p style={{
                fontFamily: "var(--font-mono), monospace",
                fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase",
                color: "rgba(255,255,255,0.3)", marginBottom: 40,
              }}>Gallery</p>
            </Reveal>
            <PhotoGallery photos={[p.image, ...p.photos]} address={p.address} />
          </div>
        </section>
      )}

      {/* ── FEATURES ─────────────────────────────────────────────── */}
      {p.features && p.features.length > 0 && (
        <section style={{ background: "#f7f4ee", padding: "clamp(80px,10vw,140px) 0" }}>
          <div className="wrap">
            <Reveal>
              <p style={{
                fontFamily: "var(--font-mono), monospace",
                fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase",
                color: "rgba(26,18,8,0.4)", marginBottom: 48,
              }}>Property features</p>
            </Reveal>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "0",
            }}>
              {p.features.map((f, i) => (
                <Reveal key={f} delay={Math.min(i * 30, 150)}>
                  <div style={{
                    padding: "20px 0",
                    borderBottom: "1px solid rgba(26,18,8,0.1)",
                    display: "flex", alignItems: "center", gap: 16,
                  }}>
                    <span style={{
                      width: 4, height: 4, borderRadius: "50%",
                      background: "#d4bb7b", flexShrink: 0,
                    }} />
                    <span style={{
                      fontFamily: "var(--font-mono), monospace",
                      fontSize: 11, letterSpacing: "0.08em",
                      color: "#1a1208",
                    }}>{f}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── ENQUIRY ──────────────────────────────────────────────── */}
      <section style={{ background: "#0a0a08", padding: "clamp(80px,10vw,140px) 0" }}>
        <div className="wrap property-enquiry-grid" style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "clamp(48px,8vw,120px)",
          alignItems: "start",
        }}>
          {/* left */}
          <div>
            <Reveal>
              <p style={{
                fontFamily: "var(--font-mono), monospace",
                fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase",
                color: "rgba(255,255,255,0.3)", marginBottom: 32,
              }}>Enquire</p>
            </Reveal>
            <Reveal delay={40}>
              <h2 style={{
                fontSize: "clamp(36px,6vw,80px)",
                fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 0.92,
                color: "#fff", marginBottom: 32,
              }}>
                Interested<br />in this<br />property?
              </h2>
            </Reveal>
            <Reveal delay={80}>
              <p style={{
                fontSize: "clamp(14px,1.4vw,17px)", lineHeight: 1.7,
                color: "rgba(255,255,255,0.5)", marginBottom: 40, maxWidth: 380,
              }}>
                Send us a message and we&apos;ll be in touch within the hour.
                Or call us directly for immediate assistance.
              </p>
            </Reveal>
            {p.agent && (
              <Reveal delay={100}>
                <div style={{
                  display: "flex", alignItems: "center", gap: 16,
                  padding: "20px 24px",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: "50%",
                    background: "#d4bb7b", flexShrink: 0,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <span style={{
                      fontFamily: "var(--font-sans), sans-serif",
                      fontSize: 16, fontWeight: 700, color: "#0a0a08",
                    }}>{p.agent.charAt(0)}</span>
                  </div>
                  <div>
                    <p style={{
                      fontFamily: "var(--font-mono), monospace",
                      fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase",
                      color: "rgba(255,255,255,0.4)", marginBottom: 4,
                    }}>Your agent</p>
                    <p style={{ color: "#fff", fontWeight: 500, fontSize: 15 }}>{p.agent}</p>
                    {p.agentPhone && (
                      <a href={`tel:${p.agentPhone.replace(/\s/g, "")}`} style={{
                        fontFamily: "var(--font-mono), monospace",
                        fontSize: 11, color: "#d4bb7b", letterSpacing: "0.06em",
                      }}>{p.agentPhone}</a>
                    )}
                  </div>
                </div>
              </Reveal>
            )}
          </div>

          {/* form */}
          <Reveal delay={60}>
            <EnquiryForm address={p.address} suburb={p.suburb} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
