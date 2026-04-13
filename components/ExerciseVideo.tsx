"use client";

interface ExerciseVideoProps {
  exerciseName: string;
}

export default function ExerciseVideo({ exerciseName }: ExerciseVideoProps) {
  const query = encodeURIComponent(`${exerciseName} proper form technique`);
  const searchUrl = `https://www.youtube.com/results?search_query=${query}`;
  const jeffNippardUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(exerciseName + " Jeff Nippard form")}`;
  const athleanUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(exerciseName + " Athlean-X form")}`;

  return (
    <div className="card">
      <h4 style={{ fontSize: "13px", letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: "16px", fontFamily: "Syne, sans-serif" }}>WATCH THE MOVEMENT</h4>
      <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginBottom: "16px", lineHeight: 1.5 }}>
        Watch curated form guides from trusted coaches on YouTube.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <a href={searchUrl} target="_blank" rel="noopener noreferrer" style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 16px",
          background: "var(--bg-elevated)",
          border: "1px solid var(--border)",
          borderRadius: "8px",
          textDecoration: "none",
          color: "var(--text-primary)",
          fontSize: "14px",
          fontWeight: 500,
          transition: "border-color 0.15s",
        }}>
          <span>▶ Search: {exerciseName} form guide</span>
          <span style={{ color: "var(--text-muted)", fontSize: "12px" }}>YouTube →</span>
        </a>
        <a href={jeffNippardUrl} target="_blank" rel="noopener noreferrer" style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 16px",
          background: "var(--bg-elevated)",
          border: "1px solid var(--border)",
          borderRadius: "8px",
          textDecoration: "none",
          color: "var(--text-secondary)",
          fontSize: "13px",
          transition: "border-color 0.15s",
        }}>
          <span>▶ Jeff Nippard — {exerciseName}</span>
          <span style={{ color: "var(--text-muted)", fontSize: "12px" }}>YouTube →</span>
        </a>
        <a href={athleanUrl} target="_blank" rel="noopener noreferrer" style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 16px",
          background: "var(--bg-elevated)",
          border: "1px solid var(--border)",
          borderRadius: "8px",
          textDecoration: "none",
          color: "var(--text-secondary)",
          fontSize: "13px",
          transition: "border-color 0.15s",
        }}>
          <span>▶ Athlean-X — {exerciseName}</span>
          <span style={{ color: "var(--text-muted)", fontSize: "12px" }}>YouTube →</span>
        </a>
      </div>
    </div>
  );
}
