"use client";

import { useState } from "react";

const EASE = "cubic-bezier(0.22,1,0.36,1)";

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "transparent",
  border: "1px solid rgba(26,18,8,0.15)",
  color: "#1a1208",
  padding: "16px 20px",
  fontFamily: "var(--font-mono), monospace",
  fontSize: 12,
  letterSpacing: "0.06em",
  outline: "none",
  transition: `border-color 0.3s ${EASE}`,
  borderRadius: 0,
};

export default function EnquiryForm({ address, suburb }: { address: string; suburb: string }) {
  const [sent, setSent] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  if (sent) {
    return (
      <div style={{
        padding: "48px 40px",
        border: "1px solid rgba(212,187,123,0.4)",
        display: "flex", flexDirection: "column", gap: 16,
      }}>
        <div style={{
          width: 44, height: 44, borderRadius: "50%",
          background: "#d4bb7b",
          display: "flex", alignItems: "center", justifyContent: "center",
          marginBottom: 8,
        }}>
          <span style={{ color: "#0a0a08", fontSize: 20 }}>✓</span>
        </div>
        <p style={{
          fontFamily: "var(--font-sans), sans-serif",
          fontSize: 22, fontWeight: 600, color: "#1a1208",
          letterSpacing: "-0.02em",
        }}>Message received.</p>
        <p style={{
          fontFamily: "var(--font-mono), monospace",
          fontSize: 11, letterSpacing: "0.08em", lineHeight: 1.7,
          color: "rgba(26,18,8,0.5)",
        }}>
          We&apos;ll be in touch regarding {address}, {suburb} within the next hour.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <input
        required
        type="text"
        placeholder="Full name"
        style={{
          ...inputStyle,
          borderColor: focused === "name" ? "#d4bb7b" : "rgba(26,18,8,0.15)",
        }}
        onFocus={() => setFocused("name")}
        onBlur={() => setFocused(null)}
      />
      <input
        required
        type="email"
        placeholder="Email address"
        style={{
          ...inputStyle,
          borderColor: focused === "email" ? "#d4bb7b" : "rgba(26,18,8,0.15)",
        }}
        onFocus={() => setFocused("email")}
        onBlur={() => setFocused(null)}
      />
      <input
        type="tel"
        placeholder="Phone (optional)"
        style={{
          ...inputStyle,
          borderColor: focused === "phone" ? "#d4bb7b" : "rgba(26,18,8,0.15)",
        }}
        onFocus={() => setFocused("phone")}
        onBlur={() => setFocused(null)}
      />
      <textarea
        rows={4}
        placeholder={`I'm interested in ${address} — please send me more details.`}
        style={{
          ...inputStyle,
          resize: "vertical",
          borderColor: focused === "msg" ? "#d4bb7b" : "rgba(26,18,8,0.15)",
        }}
        onFocus={() => setFocused("msg")}
        onBlur={() => setFocused(null)}
      />

      <button
        type="submit"
        style={{
          marginTop: 8,
          background: "#1a1208", border: "none",
          color: "#fff", padding: "18px 32px",
          fontFamily: "var(--font-mono), monospace",
          fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase",
          cursor: "pointer",
          transition: `opacity 0.3s ${EASE}`,
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.75")}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
      >
        <span>Send enquiry</span>
        <span>→</span>
      </button>

      <p style={{
        marginTop: 12,
        fontFamily: "var(--font-mono), monospace",
        fontSize: 9, letterSpacing: "0.1em", color: "rgba(26,18,8,0.35)",
        lineHeight: 1.6,
      }}>
        Your enquiry is treated with the same discretion we bring to every transaction.
      </p>
    </form>
  );
}
