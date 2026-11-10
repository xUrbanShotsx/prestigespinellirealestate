"use client";
import { useState, type FormEvent } from "react";

const inputStyle: React.CSSProperties = {
  display: "block", width: "100%", height: "52px",
  border: "1px solid rgba(0,0,0,0.16)", borderRadius: "6px",
  background: "#f9f9f9", padding: "0 16px",
  fontSize: "15px", fontFamily: "var(--font-sans)",
  color: "#000", outline: "none", boxSizing: "border-box",
};

const labelStyle: React.CSSProperties = {
  display: "block", fontSize: "11px", fontWeight: 500,
  textTransform: "uppercase", letterSpacing: "0.12em",
  color: "#888", marginBottom: "8px", fontFamily: "var(--font-sans)",
};

export default function ContactForm() {
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          email: form.get("email"),
          phone: form.get("phone"),
          message: form.get("message"),
        }),
      });
      if (!res.ok) throw new Error();
      setDone(true);
    } catch {
      setError("Something went wrong. Please call us on 02 4296 0047.");
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div style={{ textAlign: "center", padding: "40px 0" }}>
        <svg viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth={1.5} style={{ width: "48px", height: "48px", margin: "0 auto 16px" }}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 style={{ fontSize: "1.4rem", fontWeight: 700, letterSpacing: "-0.03em", color: "#000", margin: "0 0 8px" }}>Thank you</h3>
        <p style={{ fontSize: "14px", color: "#666" }}>We&apos;ll be in touch within one business day.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <div>
        <label style={labelStyle}>Full name</label>
        <input name="name" type="text" required style={inputStyle} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        <div>
          <label style={labelStyle}>Email</label>
          <input name="email" type="email" required style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Phone</label>
          <input name="phone" type="tel" style={inputStyle} />
        </div>
      </div>
      <div>
        <label style={labelStyle}>Message</label>
        <textarea name="message" rows={4} required style={{ ...inputStyle, height: "auto", padding: "14px 16px", resize: "none" }} />
      </div>
      {error && <p style={{ fontSize: "13px", color: "#dc2626" }}>{error}</p>}
      <button
        type="submit"
        disabled={loading}
        style={{
          backgroundColor: "#000", color: "#fff", border: "none",
          borderRadius: "8px", padding: "16px", width: "100%",
          fontSize: "12px", fontWeight: 700, letterSpacing: "0.16em",
          textTransform: "uppercase", fontFamily: "var(--font-sans)",
          cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1,
          height: "54px",
        }}
      >
        {loading ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
