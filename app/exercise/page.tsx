"use client";

import { useState } from "react";
import LayoutShell from "@/components/LayoutShell";
import { callEngine } from "@/lib/engine/callEngine";
import type { ExerciseExplanation } from "@/lib/engine/strengthMasteryConfig";
import BodyMap from "@/components/BodyMap";

export default function ExercisePage() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<ExerciseExplanation | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit() {
    if (!query.trim()) return;
    setLoading(true);
    setError("");
    const response = await callEngine({ intent: "explain_exercise", exerciseName: query });
    if (response.intent === "explain_exercise") {
      setResult(response.content);
    } else if (response.intent === "error") {
      setError(response.content.message);
    }
    setLoading(false);
  }

  return (
    <LayoutShell>
      <div style={{ maxWidth: "680px", margin: "0 auto", padding: "48px 24px" }}>
        <div style={{ marginBottom: "32px" }}>
          <span className="tag tag-accent" style={{ marginBottom: "16px", display: "inline-block" }}>Exercise Explainer</span>
          <h2 style={{ fontSize: "32px", marginBottom: "8px" }}>What are you lifting?</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "15px" }}>Type any exercise and get a full anatomy breakdown.</p>
        </div>

        <div style={{ display: "flex", gap: "12px", marginBottom: "32px" }}>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            placeholder="e.g. Romanian deadlift, bench press, squat..."
          />
          <button onClick={submit} disabled={loading} className="btn-primary" style={{ width: "auto", padding: "12px 24px", whiteSpace: "nowrap" }}>
            {loading ? "Analysing..." : "Analyse →"}
          </button>
        </div>

        {error && <p style={{ color: "var(--accent)", fontSize: "14px", marginBottom: "16px" }}>{error}</p>}

        {loading && (
          <div style={{ textAlign: "center", padding: "48px", color: "var(--text-secondary)" }}>
            <div style={{ fontSize: "32px", marginBottom: "12px" }}>⚡</div>
            <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 600 }}>Reading the biomechanics...</p>
          </div>
        )}

        {result && !loading && (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {/* Header */}
            <div className="card">
              <h3 style={{ fontSize: "22px", marginBottom: "8px", fontFamily: "Syne, sans-serif" }}>{result.exerciseName}</h3>
              <p style={{ color: "var(--text-secondary)", lineHeight: 1.6, fontSize: "15px" }}>{result.plainSummary}</p>
            </div>

            {/* Body map */}
            <div className="card">
              <h4 style={{ fontSize: "13px", letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: "8px", fontFamily: "Syne, sans-serif" }}>MUSCLE ACTIVATION MAP</h4>
              <div style={{ display: "flex", gap: "16px", marginBottom: "16px", flexWrap: "wrap" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "var(--text-secondary)" }}>
                  <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#e8453c", display: "inline-block" }} /> Primary
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "var(--text-secondary)" }}>
                  <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#f5a623", display: "inline-block" }} /> Secondary
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "var(--text-secondary)" }}>
                  <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#1e1e1e", border: "1px solid #2a2a2a", display: "inline-block" }} /> Not targeted
                </span>
              </div>
              <BodyMap primaryMuscles={result.primaryMuscles} secondaryMuscles={result.secondaryMuscles} />
              <hr className="divider" />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
                    <span className="muscle-dot-primary" />
                    <span style={{ fontSize: "11px", color: "var(--text-muted)", letterSpacing: "0.08em" }}>PRIMARY</span>
                  </div>
                  {result.primaryMuscles.map((m, i) => (
                    <p key={i} style={{ fontSize: "13px", color: "var(--text-primary)", marginBottom: "4px" }}>{m}</p>
                  ))}
                </div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
                    <span className="muscle-dot-secondary" />
                    <span style={{ fontSize: "11px", color: "var(--text-muted)", letterSpacing: "0.08em" }}>SECONDARY</span>
                  </div>
                  {result.secondaryMuscles.map((m, i) => (
                    <p key={i} style={{ fontSize: "13px", color: "var(--text-primary)", marginBottom: "4px" }}>{m}</p>
                  ))}
                </div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
                    <span className="muscle-dot-stabilizer" />
                    <span style={{ fontSize: "11px", color: "var(--text-muted)", letterSpacing: "0.08em" }}>JOINTS</span>
                  </div>
                  {result.jointsInvolved.map((j, i) => (
                    <p key={i} style={{ fontSize: "13px", color: "var(--text-primary)", marginBottom: "4px" }}>{j}</p>
                  ))}
                </div>
              </div>
            </div>

            {/* Common mistakes */}
            <div className="card">
              <h4 style={{ fontSize: "13px", letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: "16px", fontFamily: "Syne, sans-serif" }}>COMMON MISTAKES + FIXES</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {result.commonMistakes.map((m, i) => (
                  <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", paddingBottom: "12px", borderBottom: i < result.commonMistakes.length - 1 ? "1px solid var(--border)" : "none" }}>
                    <div>
                      <span style={{ fontSize: "11px", color: "var(--accent)", letterSpacing: "0.08em", display: "block", marginBottom: "4px" }}>MISTAKE</span>
                      <p style={{ fontSize: "13px", color: "var(--text-secondary)" }}>{m}</p>
                    </div>
                    <div>
                      <span style={{ fontSize: "11px", color: "var(--success)", letterSpacing: "0.08em", display: "block", marginBottom: "4px" }}>FIX</span>
                      <p style={{ fontSize: "13px", color: "var(--text-primary)" }}>{result.corrections[i]}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cues */}
            <div className="card">
              <h4 style={{ fontSize: "13px", letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: "16px", fontFamily: "Syne, sans-serif" }}>COACHING CUES</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {result.cuesToRemember.map((c, i) => (
                  <div key={i} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                    <span style={{ color: "var(--accent)", fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "13px", minWidth: "20px" }}>{i + 1}</span>
                    <p style={{ fontSize: "14px", color: "var(--text-primary)", lineHeight: 1.5 }}>{c}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Risk flags */}
            {result.riskFlags.length > 0 && (
              <div className="card" style={{ borderColor: "rgba(232,90,42,0.3)", background: "rgba(232,90,42,0.05)" }}>
                <h4 style={{ fontSize: "13px", letterSpacing: "0.1em", color: "var(--accent)", marginBottom: "16px", fontFamily: "Syne, sans-serif" }}>⚠ WORTH KNOWING</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {result.riskFlags.map((r, i) => (
                    <p key={i} style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.5 }}>{r}</p>
                  ))}
                </div>
              </div>
            )}

            <button onClick={() => { setResult(null); setQuery(""); }} className="btn-secondary">
              Analyse another exercise
            </button>
          </div>
        )}
      </div>
    </LayoutShell>
  );
}
