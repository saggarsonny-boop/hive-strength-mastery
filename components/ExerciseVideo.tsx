"use client";

interface ExerciseVideoProps {
  exerciseName: string;
}

export default function ExerciseVideo({ exerciseName }: ExerciseVideoProps) {
  const query = encodeURIComponent(`${exerciseName} proper form technique`);
  const embedUrl = `https://www.youtube.com/embed?listType=search&list=${query}&index=0`;
  const searchUrl = `https://www.youtube.com/results?search_query=${query}`;

  return (
    <div className="card">
      <h4 style={{ fontSize: "13px", letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: "16px", fontFamily: "Syne, sans-serif" }}>WATCH THE MOVEMENT</h4>
      <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, borderRadius: "8px", overflow: "hidden", background: "var(--bg-elevated)" }}>
        <iframe
          src={`https://www.youtube.com/embed?listType=search&list=${query}`}
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={`${exerciseName} technique video`}
        />
      </div>
      <a href={searchUrl} target="_blank" rel="noopener noreferrer" style={{
        display: "block",
        marginTop: "12px",
        fontSize: "13px",
        color: "var(--text-secondary)",
        textDecoration: "none",
      }}>
        Search more videos on YouTube →
      </a>
    </div>
  );
}
