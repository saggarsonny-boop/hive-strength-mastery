import Link from "next/link";
import LayoutShell from "@/components/LayoutShell";

export default function Home() {
  return (
    <LayoutShell>
      {/* Hero */}
      <div style={{
        maxWidth: "680px",
        margin: "0 auto",
        padding: "80px 24px 48px",
      }}>
        <div style={{ marginBottom: "16px" }}>
          <span className="tag tag-accent">AI-Powered · Biomechanics-First</span>
        </div>
        <h1 style={{
          fontSize: "clamp(36px, 6vw, 64px)",
          lineHeight: 1.05,
          marginBottom: "24px",
          letterSpacing: "-0.03em",
        }}>
          Train smarter.<br />
          <span style={{ color: "var(--accent)" }}>Understand</span> your body.
        </h1>
        <p style={{
          fontSize: "18px",
          color: "var(--text-secondary)",
          lineHeight: 1.6,
          marginBottom: "48px",
          maxWidth: "480px",
          fontWeight: 300,
        }}>
          Strength training from first principles. No shame, no fluff — just clear biomechanics, personalized guidance, and AI that actually understands how your body moves.
        </p>

        {/* Primary actions */}
        <div style={{ display: "grid", gap: "12px", marginBottom: "48px" }}>
          <Link href="/exercise" style={{
            background: "var(--accent)",
            color: "white",
            padding: "18px 28px",
            borderRadius: "10px",
            fontFamily: "Syne, sans-serif",
            fontWeight: 700,
            fontSize: "15px",
            letterSpacing: "0.01em",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
            <span>Teach me an exercise</span>
            <span style={{ opacity: 0.7 }}>→</span>
          </Link>
          <Link href="/session" style={{
            background: "var(--bg-card)",
            color: "var(--text-primary)",
            padding: "18px 28px",
            borderRadius: "10px",
            fontFamily: "Syne, sans-serif",
            fontWeight: 700,
            fontSize: "15px",
            letterSpacing: "0.01em",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            border: "1px solid var(--border)",
          }}>
            <span>Design my session</span>
            <span style={{ opacity: 0.4 }}>→</span>
          </Link>
        </div>

        {/* Divider */}
        <hr className="divider" />

        {/* Secondary actions */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          <Link href="/check-in?tab=form" style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            color: "var(--text-secondary)",
            padding: "16px 20px",
            borderRadius: "10px",
            fontFamily: "Syne, sans-serif",
            fontWeight: 600,
            fontSize: "13px",
            textDecoration: "none",
            display: "block",
          }}>
            <div style={{ fontSize: "20px", marginBottom: "8px" }}>⚠️</div>
            Something feels wrong
          </Link>
          <Link href="/check-in?tab=setback" style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            color: "var(--text-secondary)",
            padding: "16px 20px",
            borderRadius: "10px",
            fontFamily: "Syne, sans-serif",
            fontWeight: 600,
            fontSize: "13px",
            textDecoration: "none",
            display: "block",
          }}>
            <div style={{ fontSize: "20px", marginBottom: "8px" }}>🔄</div>
            I fell off
          </Link>
        </div>

        {/* Feature tags */}
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "48px" }}>
          {["Anatomy-based", "Shame-free", "Injury-aware", "Evidence-informed", "No body-shaming"].map((tag) => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
      </div>

      {/* Feature strip */}
      <div style={{
        borderTop: "1px solid var(--border)",
        padding: "48px 24px",
        maxWidth: "680px",
        margin: "0 auto",
      }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
          {[
            { label: "Muscles explained", desc: "See exactly what's working and why", color: "var(--muscle-primary)" },
            { label: "Form coaching", desc: "Fix issues before they become injuries", color: "var(--accent-amber)" },
            { label: "Session design", desc: "Built around your body and your day", color: "var(--muscle-stabilizer)" },
          ].map((f) => (
            <div key={f.label}>
              <div style={{
                width: "32px",
                height: "3px",
                background: f.color,
                borderRadius: "2px",
                marginBottom: "12px",
              }} />
              <p style={{
                fontFamily: "Syne, sans-serif",
                fontWeight: 700,
                fontSize: "13px",
                marginBottom: "6px",
                color: "var(--text-primary)",
              }}>{f.label}</p>
              <p style={{ fontSize: "12px", color: "var(--text-secondary)", lineHeight: 1.5 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </LayoutShell>
  );
}
