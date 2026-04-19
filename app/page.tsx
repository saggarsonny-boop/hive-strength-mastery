import Link from "next/link";
import LayoutShell from "@/components/LayoutShell";
import AutoDemo from "@/components/AutoDemo";
import FirstVisitCard from "@/components/FirstVisitCard";

export default function Home() {
  return (
    <LayoutShell>
      <AutoDemo />
      <FirstVisitCard />
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

        <hr className="divider" />

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

      {/* Support section */}
      <div style={{
        borderTop: "1px solid var(--border)",
        padding: "48px 24px",
        maxWidth: "680px",
        margin: "0 auto",
      }}>
        <p style={{
          fontSize: "12px",
          color: "var(--text-muted)",
          marginBottom: "16px",
          letterSpacing: "0.08em",
          fontFamily: "Syne, sans-serif",
        }}>SUPPORT THE HIVE COMMUNITY</p>
        <p style={{
          fontSize: "13px",
          color: "var(--text-secondary)",
          marginBottom: "20px",
          lineHeight: 1.6,
          maxWidth: "420px",
        }}>
          This engine is free to use. If it helps you train smarter, consider supporting the community that keeps experimental tools like this one alive.
        </p>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <a href="https://buy.stripe.com/14A6oJ6Mv3sReEa0YV0RG00" target="_blank" rel="noopener noreferrer" style={{
            padding: "8px 16px",
            borderRadius: "6px",
            border: "1px solid var(--border)",
            color: "var(--text-muted)",
            fontSize: "12px",
            textDecoration: "none",
            fontFamily: "Syne, sans-serif",
            fontWeight: 600,
            transition: "border-color 0.15s, color 0.15s",
          }}>
            $1.99 / month
          </a>
          <a href="https://buy.stripe.com/7sYcN79YHe7v53AcHD0RG01" target="_blank" rel="noopener noreferrer" style={{
            padding: "8px 16px",
            borderRadius: "6px",
            border: "1px solid var(--border)",
            color: "var(--text-muted)",
            fontSize: "12px",
            textDecoration: "none",
            fontFamily: "Syne, sans-serif",
            fontWeight: 600,
            transition: "border-color 0.15s, color 0.15s",
          }}>
            $19 / year
          </a>
          <a href="https://buy.stripe.com/9B6aEZ7Qzd3rcw2bDz0RG02" target="_blank" rel="noopener noreferrer" style={{
            padding: "8px 16px",
            borderRadius: "6px",
            border: "1px solid var(--border)",
            color: "var(--text-muted)",
            fontSize: "12px",
            textDecoration: "none",
            fontFamily: "Syne, sans-serif",
            fontWeight: 600,
            transition: "border-color 0.15s, color 0.15s",
          }}>
            $5 one-time
          </a>
        </div>
      </div>
    </LayoutShell>
  );
}
