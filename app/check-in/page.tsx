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
      <div className="max-w-lg mx-auto px-4 py-8 space-y-6">
        <div className="flex border-b">
          {(["form", "setback"] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={`flex-1 py-2 text-sm font-medium border-b-2 transition-colors ${tab === t ? "border-black text-black" : "border-transparent text-gray-400"}`}>
              {t === "form" ? "Something feels wrong" : "I fell off"}
            </button>
          ))}
        </div>

        {tab === "form" && !formResult && (
          <div className="space-y-4">
            <input placeholder="Exercise (e.g. bench press)" value={formData.exercise}
              onChange={(e) => setFormData(p => ({ ...p, exercise: e.target.value }))}
              className="w-full border rounded px-3 py-2 text-sm" />
            <input placeholder="What feels wrong" value={formData.issue}
              onChange={(e) => setFormData(p => ({ ...p, issue: e.target.value }))}
              className="w-full border rounded px-3 py-2 text-sm" />
            <input placeholder="Where (optional, e.g. left shoulder)" value={formData.location}
              onChange={(e) => setFormData(p => ({ ...p, location: e.target.value }))}
              className="w-full border rounded px-3 py-2 text-sm" />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button onClick={submitForm} disabled={loading}
              className="bg-black text-white px-4 py-3 rounded font-medium text-sm hover:opacity-80 disabled:opacity-40 w-full">
              {loading ? "Checking..." : "Get help"}
            </button>
          </div>
        )}

        {tab === "form" && formResult && (
          <div className="space-y-4 text-sm">
            <section>
              <p className="font-semibold">Possible causes</p>
              <ul className="space-y-1 text-gray-700">
                {formResult.possibleCauses.map((c, i) => <li key={i}>{c}</li>)}
              </ul>
            </section>
            <section>
              <p className="font-semibold">Try these adjustments</p>
              <ul className="space-y-1">
                {formResult.adjustments.map((a, i) => <li key={i}>{a}</li>)}
              </ul>
            </section>
            <section>
              <p className="font-semibold">Safer variations</p>
              <ul className="space-y-1 text-gray-500">
                {formResult.saferVariations.map((v, i) => <li key={i}>{v}</li>)}
              </ul>
            </section>
            <p className="text-xs text-gray-400 border-t pt-3">{formResult.disclaimer}</p>
            <button onClick={() => setFormResult(null)}
              className="bg-white border border-gray-300 text-black px-4 py-3 rounded font-medium text-sm hover:bg-gray-50 w-full">
              Check another
            </button>
          </div>
        )}

        {tab === "setback" && !setbackResult && (
          <div className="space-y-4">
            <textarea placeholder="What happened? Missed sessions, regression, life got in the way..."
              value={setbackData.description}
              onChange={(e) => setSetbackData({ description: e.target.value })}
              rows={4} className="w-full border rounded px-3 py-2 text-sm" />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button onClick={submitSetback} disabled={loading}
              className="bg-black text-white px-4 py-3 rounded font-medium text-sm hover:opacity-80 disabled:opacity-40 w-full">
              {loading ? "..." : "Help me get back"}
            </button>
          </div>
        )}

        {tab === "setback" && setbackResult && (
          <div className="space-y-4 text-sm">
            <p>{setbackResult.reframe}</p>
            <p className="text-gray-500">{setbackResult.normalization}</p>
            <section>
              <p className="font-semibold">Small steps back</p>
              <ul className="space-y-1">
                {setbackResult.microPlan.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </section>
            <div className="bg-gray-50 rounded p-3">
              <p className="font-semibold text-xs text-gray-400 uppercase tracking-wide mb-1">Start here</p>
              <p>{setbackResult.firstStep}</p>
            </div>
            <button onClick={() => setSetbackResult(null)}
              className="bg-white border border-gray-300 text-black px-4 py-3 rounded font-medium text-sm hover:bg-gray-50 w-full">
              Start over
            </button>
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
