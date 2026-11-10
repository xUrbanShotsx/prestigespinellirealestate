"use client";

const EASE = "cubic-bezier(0.22,1,0.36,1)";

const ACTIONS = [
  { label: "Floorplan", anchor: "#" },
  { label: "Download Brochure", anchor: "#" },
  { label: "Enquire Now", anchor: "#enquire" },
];

export default function ActionLinks() {
  return (
    <nav style={{ marginBottom: 56 }}>
      {ACTIONS.map((item, i) => (
        <a
          key={item.label}
          href={item.anchor}
          style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "20px 0",
            borderTop: i === 0 ? "1px solid rgba(26,18,8,0.1)" : undefined,
            borderBottom: "1px solid rgba(26,18,8,0.1)",
            fontFamily: "var(--font-mono), monospace",
            fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase",
            color: "#1a1208",
            transition: `color 0.3s ${EASE}, padding-left 0.3s ${EASE}`,
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.paddingLeft = "8px";
            (e.currentTarget as HTMLElement).style.color = "#d4bb7b";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.paddingLeft = "0";
            (e.currentTarget as HTMLElement).style.color = "#1a1208";
          }}
        >
          <span>{item.label}</span>
          <span style={{ fontSize: 16 }}>→</span>
        </a>
      ))}
    </nav>
  );
}
