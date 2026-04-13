"use client";

import { useState } from "react";
import LayoutShell from "@/components/LayoutShell";
import { callEngine } from "@/lib/engine/callEngine";
import type { SessionPlan } from "@/lib/engine/strengthMasteryConfig";

const STEPS = ["goal", "equipment", "time", "experience", "constraints"] as const;
type Step = (typeof STEPS)[number];

export default function SessionPage() {
  const [step, setStep] = useState<Step>("goal");
  const [form, setForm] = useState({
    primaryGoal: "",
    equipment: "",
    timeAvailable: 45,
    experienceLevel: "",
    injuriesOrConstraints: "",
    energyLevel: "medium",
  });
  const [result, setResult] = useState<SessionPlan | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const stepIndex = STEPS.indexOf(step);
  const isLast = stepIndex === STEPS.length - 1;

  function update(key: string, value: string | number) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function submit() {
    setLoading(true);
    setError("");
    const response = await callEngine({
      intent: "design_session",
      userProfile: {
        primaryGoal: form.primaryGoal as any,
        equipment: form.equipment as any,
        minutesPerSession: form.timeAvailable,
        experienceLevel: form.experienceLevel as any,
        injuriesOrConstraints: form.injuriesOrConstraints
          ? form.injuriesOrConstraints.split(",").map((s) => s.trim())
          : [],
      },
      sessionContext: {
        energyLevel: form.energyLevel as any,
        timeAvailable: form.timeAvailable,
        sorenessAreas: [],
      },
    });

    if (response.intent === "design_session") {
      setResult(response.content);
    } else if (response.intent === "error") {
      setError(response.content.message);
    }
    setLoading(false);
  }

  if (result) {
    return (
      <LayoutShell>
        <div style={{ maxWidth: "680px", margin: "0 auto", padding: "48px 24px" }}>
          <div style={{ marginBottom: "24px" }}>
            <span className="tag tag-accent" style={{ marginBottom: "12px", display: "inline-block" }}>Your Session</span>
            <h2 style={{ fontSize: "32px", marginBottom: "8px" }}>{result.goal}</h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "14px" }}>{result.durationMinutes} min · Focus: {result.techniqueFocus}</p>
          </div>

          {/* Pattern coverage */}
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "24px" }}>
            {result.patternsCovered.map((p) => (
              <span key={p} className="tag tag-amber">{p}</span>
            ))}
          </div>

          {/* Warm up */}
          <div className="card" style={{ marginBottom: "16px" }}>
            <h4 style={{ fontSize: "13px", letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: "16px", fontFamily: "Syne, sans-serif" }}>WARM UP</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {result.warmUp.map((w, i) => (
                <div key={i} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                  <span style={{ color: "var(--accent-amber)", fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "13px", minWidth: "20px" }}>{i + 1}</span>
                  <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.5 }}>{w}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Exercises */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "16px" }}>
            {result.exercises.map((ex, i) => (
              <div key={i} className="card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                  <h4 style={{ fontFamily: "Syne, sans-serif", fontSize: "16px", fontWeight: 700 }}>{ex.name}</h4>
                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", justifyContent: "flex-end" }}>
                    <span className="tag">{ex.sets} sets</span>
                    <span className="tag">{ex.repsOrDuration}</span>
                    {ex.rpe && <span className="tag tag-accent">{ex.rpe}</span>}
                  </div>
                </div>
                <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.5, marginBottom: ex.alternative ? "8px" : "0" }}>{ex.techniqueNote}</p>
                {ex.alternative && (
                  <p style={{ fontSize: "12px", color: "var(--text-muted)", paddingTop: "8px", borderTop: "1px solid var(--border)" }}>
                    If this hurts: {ex.alternative}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Notes */}
          {result.notes && (
            <div className="card" style={{ marginBottom: "16px", borderColor: "rgba(74,158,255,0.2)", background: "rgba(74,158,255,0.05)" }}>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>{result.notes}</p>
            </div>
          )}

          <button onClick={() => { setResult(null); setStep("goal"); }} className="btn-secondary">
            Build another session
          </button>
        </div>
      </LayoutShell>
    );
  }

  return (
    <LayoutShell>
      <div style={{ maxWidth: "680px", margin: "0 auto", padding: "48px 24px" }}>
        <div style={{ marginBottom: "32px" }}>
          <span className="tag tag-accent" style={{ marginBottom: "16px", display: "inline-block" }}>Session Builder</span>
          <h2 style={{ fontSize: "32px", marginBottom: "8px" }}>Design my session</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "15px" }}>Answer 5 quick questions. Get a full session built around you.</p>
        </div>

        {/* Progress */}
        <div style={{ display: "flex", gap: "4px", marginBottom: "32px" }}>
          {STEPS.map((s, i) => (
            <div key={s} style={{
              flex: 1,
              height: "3px",
              borderRadius: "2px",
              background: i <= stepIndex ? "var(--accent)" : "var(--border)",
              transition: "background 0.3s",
            }} />
          ))}
        </div>

        {step === "goal" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 600, fontSize: "18px", marginBottom: "8px" }}>What's your goal today?</p>
            {[
              { id: "just_get_started", label: "Just get started", desc: "I want to move and feel good" },
              { id: "strength", label: "Build strength", desc: "Progressive overload, heavier over time" },
              { id: "hypertrophy", label: "Build muscle", desc: "Volume and pump focused" },
              { id: "longevity", label: "Move well for longer", desc: "Joint health and movement quality" },
            ].map((o) => (
              <button key={o.id} onClick={() => update("primaryGoal", o.id)} style={{
                textAlign: "left",
                padding: "16px 20px",
                borderRadius: "10px",
                border: `1px solid ${form.primaryGoal === o.id ? "var(--accent)" : "var(--border)"}`,
                background: form.primaryGoal === o.id ? "var(--accent-soft)" : "var(--bg-card)",
                cursor: "pointer",
                transition: "all 0.15s",
              }}>
                <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 600, fontSize: "14px", color: "var(--text-primary)", marginBottom: "2px" }}>{o.label}</p>
                <p style={{ fontSize: "12px", color: "var(--text-secondary)" }}>{o.desc}</p>
              </button>
            ))}
          </div>
        )}

        {step === "equipment" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 600, fontSize: "18px", marginBottom: "8px" }}>What equipment do you have?</p>
            {[
              { id: "full_gym", label: "Full gym", desc: "Barbells, cables, machines, everything" },
              { id: "home_basic", label: "Home gym", desc: "Dumbbells, bench, maybe a bar" },
              { id: "minimal", label: "Minimal", desc: "Bands, dumbbells, limited kit" },
              { id: "bodyweight_only", label: "Bodyweight only", desc: "No equipment needed" },
            ].map((o) => (
              <button key={o.id} onClick={() => update("equipment", o.id)} style={{
                textAlign: "left",
                padding: "16px 20px",
                borderRadius: "10px",
                border: `1px solid ${form.equipment === o.id ? "var(--accent)" : "var(--border)"}`,
                background: form.equipment === o.id ? "var(--accent-soft)" : "var(--bg-card)",
                cursor: "pointer",
                transition: "all 0.15s",
              }}>
                <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 600, fontSize: "14px", color: "var(--text-primary)", marginBottom: "2px" }}>{o.label}</p>
                <p style={{ fontSize: "12px", color: "var(--text-secondary)" }}>{o.desc}</p>
              </button>
            ))}
          </div>
        )}

        {step === "time" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 600, fontSize: "18px", marginBottom: "8px" }}>How long do you have?</p>
            {[20, 30, 45, 60, 90].map((t) => (
              <button key={t} onClick={() => update("timeAvailable", t)} style={{
                textAlign: "left",
                padding: "16px 20px",
                borderRadius: "10px",
                border: `1px solid ${form.timeAvailable === t ? "var(--accent)" : "var(--border)"}`,
                background: form.timeAvailable === t ? "var(--accent-soft)" : "var(--bg-card)",
                cursor: "pointer",
                transition: "all 0.15s",
              }}>
                <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 600, fontSize: "14px", color: "var(--text-primary)" }}>{t} minutes</p>
              </button>
            ))}
          </div>
        )}

        {step === "experience" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 600, fontSize: "18px", marginBottom: "8px" }}>How experienced are you?</p>
            {[
              { id: "beginner", label: "New to lifting", desc: "Never really trained with weights before" },
              { id: "returning", label: "Returning after a break", desc: "Used to train, now getting back into it" },
              { id: "intermediate", label: "Consistent for 1-3 years", desc: "I know the basics, want to go deeper" },
              { id: "advanced", label: "4+ years", desc: "I know my programming, want biomechanics depth" },
            ].map((o) => (
              <button key={o.id} onClick={() => update("experienceLevel", o.id)} style={{
                textAlign: "left",
                padding: "16px 20px",
                borderRadius: "10px",
                border: `1px solid ${form.experienceLevel === o.id ? "var(--accent)" : "var(--border)"}`,
                background: form.experienceLevel === o.id ? "var(--accent-soft)" : "var(--bg-card)",
                cursor: "pointer",
                transition: "all 0.15s",
              }}>
                <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 600, fontSize: "14px", color: "var(--text-primary)", marginBottom: "2px" }}>{o.label}</p>
                <p style={{ fontSize: "12px", color: "var(--text-secondary)" }}>{o.desc}</p>
              </button>
            ))}
          </div>
        )}

        {step === "constraints" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 600, fontSize: "18px", marginBottom: "4px" }}>Any injuries or constraints?</p>
            <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginBottom: "4px" }}>e.g. "avoid deep knee flexion, left shoulder impingement". Leave blank if none.</p>
            <textarea
              value={form.injuriesOrConstraints}
              onChange={(e) => update("injuriesOrConstraints", e.target.value)}
              rows={4}
              placeholder="Type your constraints here, or leave blank..."
            />
          </div>
        )}

        {error && <p style={{ color: "var(--accent)", fontSize: "14px", marginTop: "12px" }}>{error}</p>}

        <div style={{ display: "flex", gap: "12px", marginTop: "24px" }}>
          {stepIndex > 0 && (
            <button onClick={() => setStep(STEPS[stepIndex - 1])} className="btn-secondary" style={{ flex: 1 }}>
              Back
            </button>
          )}
          {!isLast ? (
            <button onClick={() => setStep(STEPS[stepIndex + 1])} className="btn-primary" style={{ flex: 1 }}>
              Next →
            </button>
          ) : (
            <button onClick={submit} disabled={loading} className="btn-primary" style={{ flex: 1 }}>
              {loading ? "Building your session..." : "Build my session →"}
            </button>
          )}
        </div>
      </div>
    </LayoutShell>
  );
}
