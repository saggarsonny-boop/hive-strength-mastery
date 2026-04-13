"use client";

import { useState } from "react";
import LayoutShell from "@/components/LayoutShell";
import { callEngine } from "@/lib/engine/callEngine";
import type { ExerciseExplanation } from "@/lib/engine/strengthMasteryConfig";

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
      <div className="max-w-lg mx-auto px-4 py-8 space-y-6">
        <h2 className="text-2xl font-bold">Teach me this exercise</h2>
        <div className="flex gap-2">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            placeholder="e.g. Romanian deadlift"
            className="flex-1 border rounded px-3 py-2"
          />
          <button onClick={submit} disabled={loading}
            className="bg-black text-white px-4 py-2 rounded font-medium text-sm hover:opacity-80 disabled:opacity-40">
            {loading ? "..." : "Go"}
          </button>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {result && (
          <div className="space-y-4 text-sm">
            <p>{result.plainSummary}</p>
            <section>
              <p className="font-semibold">Primary muscles</p>
              <p className="text-gray-600">{result.primaryMuscles.join(", ")}</p>
            </section>
            <section>
              <p className="font-semibold">Secondary muscles</p>
              <p className="text-gray-600">{result.secondaryMuscles.join(", ")}</p>
            </section>
            <section>
              <p className="font-semibold">Common mistakes</p>
              <ul className="space-y-1 text-gray-700">
                {result.commonMistakes.map((m, i) => (
                  <li key={i}>{m} <span className="text-gray-400">— {result.corrections[i]}</span></li>
                ))}
              </ul>
            </section>
            <section>
              <p className="font-semibold">Cues to remember</p>
              <ul className="space-y-1">
                {result.cuesToRemember.map((c, i) => <li key={i}>{c}</li>)}
              </ul>
            </section>
            {result.riskFlags.length > 0 && (
              <section className="bg-amber-50 rounded p-3">
                <p className="font-semibold text-amber-800">Worth knowing</p>
                <ul className="space-y-1 text-amber-700">
                  {result.riskFlags.map((r, i) => <li key={i}>{r}</li>)}
                </ul>
              </section>
            )}
            <button onClick={() => { setResult(null); setQuery(""); }}
              className="bg-white border border-gray-300 text-black px-4 py-3 rounded font-medium text-sm hover:bg-gray-50 w-full">
              Look up another exercise
            </button>
          </div>
        )}
      </div>
    </LayoutShell>
  );
}
