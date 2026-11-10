"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";

type Phase = "hidden" | "tagline" | "bar" | "chat";
type Message = { role: "user" | "assistant"; content: string };

const EASE = "cubic-bezier(0.22,1,0.36,1)";

export default function HeroChat() {
  const [phase, setPhase] = useState<Phase>("hidden");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [streaming, setStreaming] = useState(false);
  const [innerVisible, setInnerVisible] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("tagline"), 4500);
    const t2 = setTimeout(() => setPhase("bar"), 7500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  useEffect(() => {
    if (phase === "bar") { setInnerVisible(false); inputRef.current?.focus(); }
    if (phase === "chat") { setTimeout(() => setInnerVisible(true), 450); }
  }, [phase]);

  useEffect(() => {
    const el = messagesRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages]);

  async function send() {
    const text = input.trim();
    if (!text || streaming) return;
    const next: Message[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setPhase("chat");
    setStreaming(true);
    setMessages((m) => [...m, { role: "assistant", content: "" }]);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      if (!res.body) throw new Error();
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        setMessages((m) => {
          const c = [...m];
          c[c.length - 1] = { role: "assistant", content: c[c.length - 1].content + chunk };
          return c;
        });
      }
    } catch {
      setMessages((m) => {
        const c = [...m];
        c[c.length - 1] = { role: "assistant", content: "Sorry, something went wrong. Call us on 02 4296 0047." };
        return c;
      });
    } finally {
      setStreaming(false);
    }
  }

  function onKey(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  }

  if (phase === "hidden") return null;

  if (phase === "tagline") {
    return (
      <div style={{ position: "absolute", inset: 0, zIndex: 3, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{
          color: "#fff", fontFamily: "var(--font-sans), sans-serif", fontWeight: 700,
          fontSize: "clamp(28px,4vw,56px)", letterSpacing: "-0.02em",
          textAlign: "center", whiteSpace: "nowrap",
        }}>
          Prestige Property Specialist
        </p>
      </div>
    );
  }

  const isChat = phase === "chat";

  return (
    <div style={{
      position: "absolute", inset: 0, zIndex: 3,
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "0 clamp(16px,4vw,48px)",
      paddingBottom: isChat ? "0" : "6vh",
    }}>
      <div style={{
        width: isChat ? "min(700px, 100%)" : "min(580px, 100%)",
        height: isChat ? "min(520px, 85svh)" : 60,
        borderRadius: isChat ? 20 : 999,
        background: "#fff",
        boxShadow: isChat
          ? "0 32px 96px rgba(0,0,0,0.55), 0 2px 8px rgba(0,0,0,0.12)"
          : "0 8px 48px rgba(0,0,0,0.35)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        transition: [
          `width   0.65s ${EASE}`,
          `height  0.65s ${EASE}`,
          `border-radius 0.5s ${EASE}`,
          `box-shadow 0.65s ${EASE}`,
        ].join(", "),
      }}>

        {/* CHAT HEADER */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: isChat ? "14px 18px 0" : 0,
          height: isChat ? "auto" : 0,
          overflow: "hidden",
          opacity: innerVisible ? 1 : 0,
          transition: `opacity 0.35s ${EASE}`,
          flexShrink: 0,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 32, height: 32, borderRadius: "50%", background: "#000",
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}>
              <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
                <circle cx="9" cy="7" r="3" fill="#fff"/>
                <path d="M3 15c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="#fff" strokeWidth="1.6" strokeLinecap="round"/>
              </svg>
            </div>
            <div>
              <p style={{ fontWeight: 700, fontSize: 14, letterSpacing: "-0.01em", color: "#000", margin: 0 }}>Spinelli AI</p>
              <p style={{ fontSize: 11, color: "rgba(0,0,0,0.4)", fontFamily: "var(--font-mono)", margin: 0 }}>Prestige Property Specialist</p>
            </div>
          </div>
          <button
            onClick={() => { setPhase("bar"); setMessages([]); }}
            style={{ background: "none", border: "none", color: "rgba(0,0,0,0.3)", cursor: "pointer", fontSize: 20, lineHeight: 1, padding: 4, borderRadius: 6 }}
            aria-label="Close"
          >✕</button>
        </div>

        {/* MESSAGES */}
        <div ref={messagesRef} style={{
          flex: isChat ? 1 : "0 0 0px",
          overflowY: "scroll",
          padding: isChat ? "16px 18px" : 0,
          opacity: innerVisible ? 1 : 0,
          transition: `opacity 0.35s ${EASE}`,
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}>
          {messages.map((m, i) => (
            <div key={i} style={{
              display: "flex",
              flexDirection: m.role === "user" ? "row-reverse" : "row",
              alignItems: "flex-end",
              gap: 8,
            }}>
              {m.role === "assistant" && (
                <div style={{ width: 26, height: 26, borderRadius: "50%", background: "#000", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="12" height="12" viewBox="0 0 18 18" fill="none">
                    <circle cx="9" cy="7" r="3" fill="#fff"/>
                    <path d="M3 15c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="#fff" strokeWidth="1.6" strokeLinecap="round"/>
                  </svg>
                </div>
              )}
              <div style={{
                maxWidth: "78%",
                padding: "10px 14px",
                borderRadius: m.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                background: m.role === "user" ? "#000" : "#f4f4f4",
                color: m.role === "user" ? "#fff" : "#111",
                fontFamily: "var(--font-sans), sans-serif",
                fontSize: 14,
                lineHeight: 1.6,
                letterSpacing: "-0.005em",
                whiteSpace: "pre-wrap",
              }}>
                {m.content}
                {m.role === "assistant" && streaming && i === messages.length - 1 && (
                  <span style={{
                    display: "inline-block", width: 2, height: "0.9em",
                    background: "#555", marginLeft: 2, verticalAlign: "middle",
                    animation: "blink 0.9s step-end infinite",
                  }}/>
                )}
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        {/* INPUT */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: isChat ? "10px 10px 10px 18px" : "0 8px 0 24px",
          borderTop: isChat ? "1px solid rgba(0,0,0,0.07)" : "none",
          flex: isChat ? "0 0 auto" : 1,
          transition: `padding 0.5s ${EASE}, border 0.5s ${EASE}`,
        }}>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKey}
            placeholder={isChat ? "Ask a follow-up…" : "Ask Spinelli Prestige anything…"}
            disabled={streaming}
            style={{
              flex: 1,
              border: "none",
              outline: "none",
              background: "transparent",
              fontFamily: "var(--font-sans), sans-serif",
              fontSize: isChat ? 14 : 17,
              letterSpacing: "-0.01em",
              color: "#111",
              transition: `font-size 0.4s ${EASE}`,
            }}
          />
          <button
            onClick={send}
            disabled={streaming}
            aria-label="Send"
            style={{
              width: isChat ? 36 : 44,
              height: isChat ? 36 : 44,
              borderRadius: "50%",
              background: "#000",
              border: "none",
              cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
              transition: `width 0.4s ${EASE}, height 0.4s ${EASE}`,
            }}
          >
            <svg width="15" height="15" viewBox="0 0 18 18" fill="none">
              <path d="M9 15V3M9 3L4 8M9 3L14 8"
                stroke="#fff"
                strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

      </div>
    </div>
  );
}
