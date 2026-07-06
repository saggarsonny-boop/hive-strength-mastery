import Link from "next/link";

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--text-primary)" }}>
      <header style={{
        borderBottom: "1px solid var(--border)",
        padding: "16px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        background: "rgba(10,10,10,0.95)",
        backdropFilter: "blur(12px)",
        zIndex: 100,
      }}>
        <Link href="/" style={{
          fontFamily: "Syne, sans-serif",
          fontWeight: 800,
          fontSize: "15px",
          letterSpacing: "-0.01em",
          color: "var(--text-primary)",
          textDecoration: "none",
        }}>
          HIVE <span style={{ color: "var(--accent)" }}>STRENGTH</span>
        </Link>
        <nav style={{ display: "flex", gap: "24px" }}>
          {[
            { href: "/exercise", label: "Exercise" },
            { href: "/session", label: "Session" },
            { href: "/check-in", label: "Check In" },
          ].map((item) => (
            <Link key={item.href} href={item.href} style={{
              fontSize: "13px",
              fontWeight: 500,
              color: "var(--text-secondary)",
              textDecoration: "none",
              letterSpacing: "0.02em",
              transition: "color 0.15s",
            }}>
              {item.label}
            </Link>
          ))}
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
}



<!-- Stripe Checkout Block -->
<div id="stripe-checkout-cta" style="margin: 2rem auto; padding: 2rem; border-radius: 12px; background: rgba(59,130,246,0.05); border: 1px solid rgba(59,130,246,0.2); text-align: center; font-family: sans-serif; max-width: 600px;">
    <h3 style="margin-top: 0; color: #fff;">Activate Premium License</h3>
    <p style="color: #9ca3af; font-size: 0.95rem; margin-bottom: 1.5rem;">Get instant access to all advanced capabilities and integration features.</p>
    <a href="https://buy.stripe.com/6oU00lb2L6F37bIazv0RG0J" target="_blank" style="display: inline-block; padding: 0.8rem 2rem; background: #3b82f6; color: #fff; font-weight: bold; border-radius: 8px; text-decoration: none; transition: background 0.2s;">Unlock Now</a>
</div>
