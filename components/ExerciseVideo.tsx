"use client";

import { useEffect, useState } from "react";

interface Video {
  id: string;
  title: string;
  channel: string;
  thumbnail: string;
}

interface ExerciseVideoProps {
  exerciseName: string;
}

export default function ExerciseVideo({ exerciseName }: ExerciseVideoProps) {
  const [videos, setVideos] = useState<Video[]>([]);
  const [selected, setSelected] = useState<Video | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchVideos() {
      try {
        const res = await fetch(`/api/youtube?q=${encodeURIComponent(exerciseName)}`);
        const data = await res.json();
        if (data.videos && data.videos.length > 0) {
          setVideos(data.videos);
          setSelected(data.videos[0]);
        } else {
          setError(true);
        }
      } catch {
        setError(true);
      }
      setLoading(false);
    }
    fetchVideos();
  }, [exerciseName]);

  if (loading) {
    return (
      <div className="card" style={{ textAlign: "center", padding: "32px", color: "var(--text-muted)" }}>
        <p style={{ fontSize: "13px" }}>Loading videos...</p>
      </div>
    );
  }

  if (error || videos.length === 0) {
    const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(exerciseName + " proper form")}`;
    return (
      <div className="card">
        <h4 style={{ fontSize: "13px", letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: "12px", fontFamily: "Syne, sans-serif" }}>WATCH THE MOVEMENT</h4>
        <a href={searchUrl} target="_blank" rel="noopener noreferrer" style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "12px 16px", background: "var(--bg-elevated)", border: "1px solid var(--border)",
          borderRadius: "8px", textDecoration: "none", color: "var(--text-primary)", fontSize: "14px",
        }}>
          <span>▶ Search: {exerciseName} form guide</span>
          <span style={{ color: "var(--text-muted)", fontSize: "12px" }}>YouTube →</span>
        </a>
      </div>
    );
  }

  return (
    <div className="card">
      <h4 style={{ fontSize: "13px", letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: "16px", fontFamily: "Syne, sans-serif" }}>WATCH THE MOVEMENT</h4>
      
      {/* Main video embed */}
      {selected && (
        <div style={{ marginBottom: "12px" }}>
          <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, borderRadius: "8px", overflow: "hidden", background: "var(--bg-elevated)" }}>
            <iframe
              src={`https://www.youtube.com/embed/${selected.id}?rel=0&modestbranding=1`}
              style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={selected.title}
            />
          </div>
          <p style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "8px" }}>{selected.channel}</p>
        </div>
      )}

      {/* Video selector */}
      {videos.length > 1 && (
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          {videos.map((v) => (
            <button key={v.id} onClick={() => setSelected(v)} style={{
              display: "flex", gap: "10px", alignItems: "center",
              padding: "8px 10px", borderRadius: "6px", border: `1px solid ${selected?.id === v.id ? "var(--accent)" : "var(--border)"}`,
              background: selected?.id === v.id ? "var(--accent-soft)" : "transparent",
              cursor: "pointer", textAlign: "left",
            }}>
              <img src={v.thumbnail} alt={v.title} style={{ width: "60px", height: "34px", borderRadius: "4px", objectFit: "cover", flexShrink: 0 }} />
              <div>
                <p style={{ fontSize: "12px", color: "var(--text-primary)", lineHeight: 1.3, marginBottom: "2px" }}>{v.title.length > 50 ? v.title.slice(0, 50) + "..." : v.title}</p>
                <p style={{ fontSize: "11px", color: "var(--text-muted)" }}>{v.channel}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
