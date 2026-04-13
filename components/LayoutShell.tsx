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
