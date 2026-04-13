"use client";

import { useState } from "react";
import LayoutShell from "@/components/LayoutShell";
import { callEngine } from "@/lib/engine/callEngine";
import type { ExerciseExplanation } from "@/lib/engine/strengthMasteryConfig";

function BodyMap({ primaryMuscles, secondaryMuscles }: { primaryMuscles: string[]; secondaryMuscles: string[] }) {
  const getRegionColor = (region: string) => {
    const p = primaryMuscles.join(" ").toLowerCase();
    const s = secondaryMuscles.join(" ").toLowerCase();
    const r = region.toLowerCase();
    if (p.includes(r)) return "var(--muscle-primary)";
    if (s.includes(r)) return "var(--muscle-secondary)";
    return "var(--bg-elevated)";
  };

  const chest = getRegionColor("chest") !== "var(--bg-elevated)" ? getRegionColor("chest") : 
    primaryMuscles.join(" ").toLowerCase().includes("pec") ? "var(--muscle-primary)" :
    secondaryMuscles.join(" ").toLowerCase().includes("pec") ? "var(--muscle-secondary)" : "var(--bg-elevated)";

  const shoulders = getRegionColor("delt") !== "var(--bg-elevated)" ? getRegionColor("delt") :
    getRegionColor("shoulder");

  const biceps = getRegionColor("bicep");
  const triceps = getRegionColor("tricep");
  const forearms = getRegionColor("forearm");

  const abs = getRegionColor("abs") !== "var(--bg-elevated)" ? getRegionColor("abs") :
    getRegionColor("core") !== "var(--bg-elevated)" ? getRegionColor("core") :
    getRegionColor("abdomin");

  const quads = getRegionColor("quad") !== "var(--bg-elevated)" ? getRegionColor("quad") :
    getRegionColor("thigh");

  const hamstrings = getRegionColor("hamstring");
  const glutes = getRegionColor("glut");
  const calves = getRegionColor("calf") !== "var(--bg-elevated)" ? getRegionColor("calf") : getRegionColor("gastro");

  const lats = getRegionColor("lat") !== "var(--bg-elevated)" ? getRegionColor("lat") : getRegionColor("back");
  const traps = getRegionColor("trap");
  const lowerBack = getRegionColor("lower back") !== "var(--bg-elevated)" ? getRegionColor("lower back") : getRegionColor("erector");

  return (
    <div style={{ display: "flex", gap: "32px", justifyContent: "center", padding: "24px 0" }}>
      {/* Front view */}
      <div style={{ textAlign: "center" }}>
        <p style={{ fontSize: "11px", color: "var(--text-muted)", marginBottom: "8px", letterSpacing: "0.1em" }}>FRONT</p>
        <svg width="100" height="200" viewBox="0 0 100 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Head */}
          <circle cx="50" cy="18" r="14" fill="var(--bg-elevated)" stroke="var(--border)" strokeWidth="1"/>
          {/* Neck */}
          <rect x="44" y="30" width="12" height="10" rx="2" fill="var(--bg-elevated)" stroke="var(--border)" strokeWidth="1"/>
          {/* Shoulders */}
          <ellipse cx="25" cy="45" rx="12" ry="8" fill={shoulders} stroke="var(--border)" strokeWidth="1"/>
          <ellipse cx="75" cy="45" rx="12" ry="8" fill={shoulders} stroke="var(--border)" strokeWidth="1"/>
          {/* Chest */}
          <rect x="32" y="38" width="36" height="28" rx="4" fill={chest} stroke="var(--border)" strokeWidth="1"/>
          {/* Upper arms */}
          <rect x="13" y="50" width="10" height="30" rx="5" fill={biceps} stroke="var(--border)" strokeWidth="1"/>
          <rect x="77" y="50" width="10" height="30" rx="5" fill={biceps} stroke="var(--border)" strokeWidth="1"/>
          {/* Forearms */}
          <rect x="13" y="83" width="10" height="28" rx="5" fill={forearms} stroke="var(--border)" strokeWidth="1"/>
          <rect x="77" y="83" width="10" height="28" rx="5" fill={forearms} stroke="var(--border)" strokeWidth="1"/>
          {/* Abs */}
          <rect x="35" y="68" width="30" height="38" rx="4" fill={abs} stroke="var(--border)" strokeWidth="1"/>
          {/* Quads */}
          <rect x="34" y="108" width="13" height="45" rx="6" fill={quads} stroke="var(--border)" strokeWidth="1"/>
          <rect x="53" y="108" width="13" height="45" rx="6" fill={quads} stroke="var(--border)" strokeWidth="1"/>
          {/* Calves front */}
          <rect x="34" y="156" width="13" height="36" rx="6" fill={calves} stroke="var(--border)" strokeWidth="1"/>
          <rect x="53" y="156" width="13" height="36" rx="6" fill={calves} stroke="var(--border)" strokeWidth="1"/>
        </svg>
      </div>

      {/* Back view */}
      <div style={{ textAlign: "center" }}>
        <p style={{ fontSize: "11px", color: "var(--text-muted)", marginBottom: "8px", letterSpacing: "0.1em" }}>BACK</p>
        <svg width="100" height="200" viewBox="0 0 100 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Head */}
          <circle cx="50" cy="18" r="14" fill="var(--bg-elevated)" stroke="var(--border)" strokeWidth="1"/>
          {/* Neck */}
          <rect x="44" y="30" width="12" height="10" rx="2" fill="var(--bg-elevated)" stroke="var(--border)" strokeWidth="1"/>
          {/* Traps */}
          <ellipse cx="25" cy="45" rx="12" ry="8" fill={traps} stroke="var(--border)" strokeWidth="1"/>
          <ellipse cx="75" cy="45" rx="12" ry="8" fill={traps} stroke="var(--border)" strokeWidth="1"/>
          {/* Lats / Upper back */}
          <rect x="32" y="38" width="36" height="28" rx="4" fill={lats} stroke="var(--border)" strokeWidth="1"/>
          {/* Triceps */}
          <rect x="13" y="50" width="10" height="30" rx="5" fill={triceps} stroke="var(--border)" strokeWidth="1"/>
          <rect x="77" y="50" width="10" height="30" rx="5" fill={triceps} stroke="var(--border)" strokeWidth="1"/>
          {/* Forearms back */}
          <rect x="13" y="83" width="10" height="28" rx="5" fill={forearms} stroke="var(--border)" strokeWidth="1"/>
          <rect x="77" y="83" width="10" height="28" rx="5" fill={forearms} stroke="var(--border)" strokeWidth="1"/>
          {/* Lower back */}
          <rect x="35" y="68" width="30" height="38" rx="4" fill={lowerBack} stroke="var(--border)" strokeWidth="1"/>
          {/* Glutes */}
          <rect x="34" y="105" width="14" height="20" rx="6" fill={glutes} stroke="var(--border)" strokeWidth="1"/>
          <rect x="52" y="105" width="14" height="20" rx="6" fill={glutes} stroke="var(--border)" strokeWidth="1"/>
          {/* Hamstrings */}
          <rect x="34" y="127" width="13" height="30" rx="6" fill={hamstrings} stroke="var(--border)" strokeWidth="1"/>
          <rect x="53" y="127" width="13" height="30" rx="6" fill={hamstrings} stroke="var(--border)" strokeWidth="1"/>
          {/* Calves back */}
          <rect x="34" y="160" width="13" height="32" rx="6" fill={calves} stroke="var(--border)" strokeWidth="1"/>
          <rect x="53" y="160" width="13" height="32" rx="6" fill={calves} stroke="var(--border)" strokeWidth="1"/>
        </svg>
      </div>
    </div>
  );
}

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

            {/* Body map + muscles */}
            <div className="card">
              <h4 style={{ fontSize: "13px", letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: "16px", fontFamily: "Syne, sans-serif" }}>MUSCLE ACTIVATION MAP</h4>
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
