"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import LayoutShell from "@/components/LayoutShell";
import { callEngine } from "@/lib/engine/callEngine";
import type { FormIssueAnalysis, SetbackReframe } from "@/lib/engine/strengthMasteryConfig";

function CheckInContent() {
  const params = useSearchParams();
  const defaultTab = params.get("tab") === "setback" ? "setback" : "form";
  const [tab, setTab] = useState<"form" | "setback">(defaultTab);
  const [formData, setFormData] = useState({ exercise: "", issue: "", location: "" });
  const [setbackData, setSetbackData] = useState({ description: "" });
  const [formResult, setFormResult] = useState<FormIssueAnalysis | null>(null);
  const [setbackResult, setSetbackResult] = useState<SetbackReframe | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submitForm() {
    setLoading(true);
    setError("");
    const response = await callEngine({
      intent: "fix_form_issue",
      exerciseContext: {
        exerciseName: formData.exercise,
        reportedIssue: formData.issue,
        painLocation: formData.location,
      },
    });
    if (response.intent === "fix_form_issue") setFormResult(response.content);
    else if (response.intent === "error") setError(response.content.message);
    setLoading(false);
  }

  async function submitSetback() {
    setLoading(true);
    setError("");
    const response = await callEngine({
      intent: "reframe_setback",
      setbackContext: { description: setbackData.description },
    });
    if (response.intent === "reframe_setback") setSetbackResult(response.content);
    else if (response.intent === "error") setError(response.content.message);
    setLoading(false);
  }

  return (
    <LayoutShell>
      <div style={{ maxWidth: "680px", margin: "0 auto", padding: "48px 24px" }}>
        <div style={{ marginBottom: "32px" }}>
          <span className="tag tag-accent" style={{ marginBottom: "16px", display: "inline-block" }}>Check In</span>
          <h2 style={{ fontSize: "32px" }}>What's going on?</h2>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", borderBottom: "1px solid var(--border)", marginBottom: "32px" }}>
          {(["form", "setback"] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)} style={{
              flex: 1,
              padding: "12px",
              background: "none",
              border: "none",
              borderBottom: tab === t ? "2px solid var(--accent)" : "2px solid transparent",
              color: tab === t ? "var(--text-primary)" : "var(--text-secondary)",
              fontFamily: "Syne, sans-serif",
              fontWeight: 600,
              fontSize: "14px",
              cursor: "pointer",
              transition: "all 0.15s",
              marginBottom: "-1px",
            }}>
              {t === "form" ? "⚠️ Something feels wrong" : "🔄 I fell off"}
            </button>
          ))}
        </div>

        {tab === "form" && !formResult && (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <input placeholder="Exercise (e.g. bench press)" value={formData.exercise}
              onChange={(e) => setFormData(p => ({ ...p, exercise: e.target.value }))} />
            <input placeholder="What feels wrong" value={formData.issue}
              onChange={(e) => setFormData(p => ({ ...p, issue: e.target.value }))} />
            <input placeholder="Where (optional, e.g. left shoulder)" value={formData.location}
              onChange={(e) => setFormData(p => ({ ...p, location: e.target.value }))} />
            {error && <p style={{ color: "var(--accent)", fontSize: "14px" }}>{error}</p>}
            <button onClick={submitForm} disabled={loading} className="btn-primary">
              {loading ? "Analysing..." : "Get help →"}
            </button>
          </div>
        )}

        {tab === "form" && formResult && (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div className="card">
              <h4 style={{ fontSize: "13px", letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: "16px", fontFamily: "Syne, sans-serif" }}>POSSIBLE CAUSES</h4>
              {formResult.possibleCauses.map((c, i) => (
                <p key={i} style={{ fontSize: "14px", color: "var(--text-secondary)", marginBottom: "8px", paddingLeft: "12px", borderLeft: "2px solid var(--accent)" }}>{c}</p>
              ))}
            </div>
            <div className="card">
              <h4 style={{ fontSize: "13px", letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: "16px", fontFamily: "Syne, sans-serif" }}>ADJUSTMENTS</h4>
              {formResult.adjustments.map((a, i) => (
                <p key={i} style={{ fontSize: "14px", color: "var(--text-primary)", marginBottom: "8px" }}>→ {a}</p>
              ))}
            </div>
            <div className="card">
              <h4 style={{ fontSize: "13px", letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: "16px", fontFamily: "Syne, sans-serif" }}>SAFER VARIATIONS</h4>
              {formResult.saferVariations.map((v, i) => (
                <p key={i} style={{ fontSize: "14px", color: "var(--text-secondary)", marginBottom: "8px" }}>{v}</p>
              ))}
            </div>
            <p style={{ fontSize: "12px", color: "var(--text-muted)", borderTop: "1px solid var(--border)", paddingTop: "16px" }}>{formResult.disclaimer}</p>
            <button onClick={() => setFormResult(null)} className="btn-secondary">Check another</button>
          </div>
        )}

        {tab === "setback" && !setbackResult && (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <textarea placeholder="What happened? Missed sessions, regression, life got in the way..."
              value={setbackData.description}
              onChange={(e) => setSetbackData({ description: e.target.value })}
              rows={5} />
            {error && <p style={{ color: "var(--accent)", fontSize: "14px" }}>{error}</p>}
            <button onClick={submitSetback} disabled={loading} className="btn-primary">
              {loading ? "Thinking..." : "Help me get back →"}
            </button>
          </div>
        )}

        {tab === "setback" && setbackResult && (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div className="card">
              <p style={{ fontSize: "16px", lineHeight: 1.7, color: "var(--text-primary)", marginBottom: "12px" }}>{setbackResult.reframe}</p>
              <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.6 }}>{setbackResult.normalization}</p>
            </div>
            <div className="card">
              <h4 style={{ fontSize: "13px", letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: "16px", fontFamily: "Syne, sans-serif" }}>SMALL STEPS BACK</h4>
              {setbackResult.microPlan.map((s, i) => (
                <div key={i} style={{ display: "flex", gap: "12px", marginBottom: "10px", alignItems: "flex-start" }}>
                  <span style={{ color: "var(--accent)", fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "13px", minWidth: "20px" }}>{i + 1}</span>
                  <p style={{ fontSize: "14px", color: "var(--text-primary)", lineHeight: 1.5 }}>{s}</p>
                </div>
              ))}
            </div>
            <div className="card" style={{ borderColor: "rgba(76,175,130,0.3)", background: "rgba(76,175,130,0.05)" }}>
              <h4 style={{ fontSize: "13px", letterSpacing: "0.1em", color: "var(--success)", marginBottom: "12px", fontFamily: "Syne, sans-serif" }}>START HERE</h4>
              <p style={{ fontSize: "16px", color: "var(--text-primary)", lineHeight: 1.6 }}>{setbackResult.firstStep}</p>
            </div>
            <button onClick={() => setSetbackResult(null)} className="btn-secondary">Start over</button>
          </div>
        )}
      </div>
    </LayoutShell>
  );
}

export default function CheckInPage() {
  return (
    <Suspense>
      <CheckInContent />
    </Suspense>
  );
}
