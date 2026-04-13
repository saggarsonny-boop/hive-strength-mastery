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
        <div className="max-w-lg mx-auto px-4 py-8 space-y-6">
          <h2 className="text-2xl font-bold">Your Session</h2>
          <p className="text-gray-500">{result.durationMinutes} min · Focus: {result.techniqueFocus}</p>
          <section>
            <p className="font-semibold mb-2">Warm-up</p>
            <ul className="space-y-1 text-sm">
              {result.warmUp.map((w, i) => <li key={i}>{w}</li>)}
            </ul>
          </section>
          <section>
            <p className="font-semibold mb-2">Exercises</p>
            <div className="space-y-4">
              {result.exercises.map((ex, i) => (
                <div key={i} className="border rounded p-3 space-y-1">
                  <p className="font-medium">{ex.name}</p>
                  <p className="text-sm text-gray-600">{ex.sets} sets · {ex.repsOrDuration}{ex.rpe ? ` · ${ex.rpe}` : ""}</p>
                  <p className="text-sm">{ex.techniqueNote}</p>
                  {ex.alternative && (
                    <p className="text-xs text-gray-400">If this hurts: {ex.alternative}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
          {result.notes && (
            <section>
              <p className="text-sm text-gray-500">{result.notes}</p>
            </section>
          )}
          <button onClick={() => { setResult(null); setStep("goal"); }}
            className="bg-white border border-gray-300 text-black px-4 py-3 rounded font-medium text-sm hover:bg-gray-50 w-full">
            Build another session
          </button>
        </div>
      </LayoutShell>
    );
  }

  return (
    <LayoutShell>
      <div className="max-w-lg mx-auto px-4 py-8 space-y-6">
        <h2 className="text-2xl font-bold">Design my session</h2>
        <div className="flex gap-1">
          {STEPS.map((s, i) => (
            <div key={s} className={`h-1 flex-1 rounded ${i <= stepIndex ? "bg-black" : "bg-gray-200"}`} />
          ))}
        </div>
        {step === "goal" && (
          <div className="space-y-3">
            <p className="font-medium">What is your goal today?</p>
            {[
              { id: "just_get_started", label: "Just get started" },
              { id: "strength", label: "Build strength" },
              { id: "hypertrophy", label: "Build muscle" },
              { id: "longevity", label: "Move well for longer" },
            ].map((o) => (
              <button key={o.id} onClick={() => update("primaryGoal", o.id)}
                className={`w-full text-left px-4 py-3 rounded border text-sm ${form.primaryGoal === o.id ? "border-black font-medium" : "border-gray-200"}`}>
                {o.label}
              </button>
            ))}
          </div>
        )}
        {step === "equipment" && (
          <div className="space-y-3">
            <p className="font-medium">What equipment do you have?</p>
            {[
              { id: "full_gym", label: "Full gym" },
              { id: "home_basic", label: "Home gym (some equipment)" },
              { id: "minimal", label: "Minimal (bands, dumbbells)" },
              { id: "bodyweight_only", label: "Bodyweight only" },
            ].map((o) => (
              <button key={o.id} onClick={() => update("equipment", o.id)}
                className={`w-full text-left px-4 py-3 rounded border text-sm ${form.equipment === o.id ? "border-black font-medium" : "border-gray-200"}`}>
                {o.label}
              </button>
            ))}
          </div>
        )}
        {step === "time" && (
          <div className="space-y-3">
            <p className="font-medium">How long do you have?</p>
            {[20, 30, 45, 60, 90].map((t) => (
              <button key={t} onClick={() => update("timeAvailable", t)}
                className={`w-full text-left px-4 py-3 rounded border text-sm ${form.timeAvailable === t ? "border-black font-medium" : "border-gray-200"}`}>
                {t} minutes
              </button>
            ))}
          </div>
        )}
        {step === "experience" && (
          <div className="space-y-3">
            <p className="font-medium">How experienced are you?</p>
            {[
              { id: "beginner", label: "New to lifting" },
              { id: "returning", label: "Returning after a break" },
              { id: "intermediate", label: "Consistent for 1-3 years" },
              { id: "advanced", label: "4+ years, know my programming" },
            ].map((o) => (
              <button key={o.id} onClick={() => update("experienceLevel", o.id)}
                className={`w-full text-left px-4 py-3 rounded border text-sm ${form.experienceLevel === o.id ? "border-black font-medium" : "border-gray-200"}`}>
                {o.label}
              </button>
            ))}
          </div>
        )}
        {step === "constraints" && (
          <div className="space-y-3">
            <p className="font-medium">Any injuries or constraints?</p>
            <p className="text-sm text-gray-500">For example: avoid deep knee flexion, left shoulder impingement. Leave blank if none.</p>
            <textarea
              value={form.injuriesOrConstraints}
              onChange={(e) => update("injuriesOrConstraints", e.target.value)}
              rows={3}
              className="w-full border rounded px-3 py-2 text-sm"
              placeholder="Type your constraints here, or leave blank"
            />
          </div>
        )}
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div className="flex gap-3">
          {stepIndex > 0 && (
            <button onClick={() => setStep(STEPS[stepIndex - 1])}
              className="bg-white border border-gray-300 text-black px-4 py-3 rounded font-medium text-sm hover:bg-gray-50 flex-1">
              Back
            </button>
          )}
          {!isLast ? (
            <button onClick={() => setStep(STEPS[stepIndex + 1])}
              className="bg-black text-white px-4 py-3 rounded font-medium text-sm hover:opacity-80 flex-1">
              Next
            </button>
          ) : (
            <button onClick={submit} disabled={loading}
              className="bg-black text-white px-4 py-3 rounded font-medium text-sm hover:opacity-80 disabled:opacity-40 flex-1">
              {loading ? "Building your session..." : "Build my session"}
            </button>
          )}
        </div>
      </div>
    </LayoutShell>
  );
}
