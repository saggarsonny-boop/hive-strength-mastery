"use client";

interface BodyMapProps {
  primaryMuscles: string[];
  secondaryMuscles: string[];
}

export default function BodyMap({ primaryMuscles, secondaryMuscles }: BodyMapProps) {
  const all = {
    primary: primaryMuscles.join(" ").toLowerCase(),
    secondary: secondaryMuscles.join(" ").toLowerCase(),
  };

  function color(keywords: string[]): string {
    for (const kw of keywords) {
      if (all.primary.includes(kw)) return "#e8453c";
      if (all.secondary.includes(kw)) return "#f5a623";
    }
    return "#1e1e1e";
  }

  function stroke(keywords: string[]): string {
    for (const kw of keywords) {
      if (all.primary.includes(kw)) return "#ff6b5b";
      if (all.secondary.includes(kw)) return "#ffbe4d";
    }
    return "#2a2a2a";
  }

  const c = {
    // Front
    chest: color(["pec", "chest"]),
    frontDelt: color(["front delt", "anterior delt", "shoulder"]),
    sideDelt: color(["lateral delt", "side delt", "medial delt", "shoulder"]),
    bicep: color(["bicep"]),
    forearmFront: color(["forearm", "brachioradial", "wrist flex"]),
    upperAbs: color(["abs", "abdomin", "rectus", "core"]),
    lowerAbs: color(["lower abs", "abdomin", "rectus", "core"]),
    obliques: color(["oblique", "core"]),
    quadsOuter: color(["quad", "vastus lateral", "thigh"]),
    quadsInner: color(["quad", "vastus medial", "thigh"]),
    hipFlex: color(["hip flex", "psoas", "iliacus"]),
    tibialis: color(["tibialis", "shin"]),
    // Back
    upperTraps: color(["trap", "upper trap"]),
    lowerTraps: color(["lower trap", "trap"]),
    lats: color(["lat", "latissimus", "back"]),
    rhomboids: color(["rhomboid", "mid back", "back"]),
    rearDelt: color(["rear delt", "posterior delt", "delt", "shoulder"]),
    tricep: color(["tricep"]),
    forearmBack: color(["forearm", "wrist ext"]),
    lowerBack: color(["lower back", "erector", "spinal"]),
    glutes: color(["glute", "gluteus", "buttock"]),
    hamstrings: color(["hamstring", "bicep fem"]),
    calves: color(["calf", "calves", "gastrocnem", "soleus"]),
  };

  const s = {
    chest: stroke(["pec", "chest"]),
    frontDelt: stroke(["front delt", "anterior delt", "shoulder"]),
    bicep: stroke(["bicep"]),
    upperAbs: stroke(["abs", "abdomin", "rectus", "core"]),
    quadsOuter: stroke(["quad", "vastus lateral", "thigh"]),
    lats: stroke(["lat", "latissimus", "back"]),
    tricep: stroke(["tricep"]),
    glutes: stroke(["glute", "gluteus"]),
    hamstrings: stroke(["hamstring"]),
    calves: stroke(["calf", "calves", "gastrocnem"]),
  };

  return (
    <div style={{ display: "flex", gap: "40px", justifyContent: "center", alignItems: "flex-start", padding: "16px 0" }}>
      {/* FRONT VIEW */}
      <div style={{ textAlign: "center" }}>
        <p style={{ fontSize: "10px", color: "#444", marginBottom: "10px", letterSpacing: "0.12em", fontFamily: "Syne, sans-serif" }}>FRONT</p>
        <svg width="110" height="240" viewBox="0 0 110 240" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Head */}
          <ellipse cx="55" cy="16" rx="13" ry="15" fill="#1e1e1e" stroke="#2a2a2a" strokeWidth="1"/>
          {/* Neck */}
          <rect x="49" y="28" width="12" height="10" rx="2" fill="#1e1e1e" stroke="#2a2a2a" strokeWidth="1"/>
          {/* Left shoulder (front delt) */}
          <ellipse cx="28" cy="46" rx="11" ry="9" fill={c.frontDelt} stroke={s.frontDelt} strokeWidth="1"/>
          {/* Right shoulder */}
          <ellipse cx="82" cy="46" rx="11" ry="9" fill={c.frontDelt} stroke={s.frontDelt} strokeWidth="1"/>
          {/* Left pec */}
          <path d="M38 38 Q48 34 55 40 Q48 56 38 58 Q30 52 30 44 Z" fill={c.chest} stroke={s.chest} strokeWidth="1"/>
          {/* Right pec */}
          <path d="M72 38 Q62 34 55 40 Q62 56 72 58 Q80 52 80 44 Z" fill={c.chest} stroke={s.chest} strokeWidth="1"/>
          {/* Left bicep */}
          <rect x="16" y="52" width="11" height="28" rx="5" fill={c.bicep} stroke={s.bicep} strokeWidth="1"/>
          {/* Right bicep */}
          <rect x="83" y="52" width="11" height="28" rx="5" fill={c.bicep} stroke={s.bicep} strokeWidth="1"/>
          {/* Left forearm */}
          <rect x="16" y="83" width="11" height="26" rx="5" fill={c.forearmFront} stroke="#2a2a2a" strokeWidth="1"/>
          {/* Right forearm */}
          <rect x="83" y="83" width="11" height="26" rx="5" fill={c.forearmFront} stroke="#2a2a2a" strokeWidth="1"/>
          {/* Left oblique */}
          <path d="M36 58 Q32 68 32 82 Q36 86 40 82 Q38 68 40 58 Z" fill={c.obliques} stroke="#2a2a2a" strokeWidth="1"/>
          {/* Right oblique */}
          <path d="M74 58 Q78 68 78 82 Q74 86 70 82 Q72 68 70 58 Z" fill={c.obliques} stroke="#2a2a2a" strokeWidth="1"/>
          {/* Upper abs */}
          <rect x="41" y="58" width="28" height="16" rx="3" fill={c.upperAbs} stroke="#2a2a2a" strokeWidth="1"/>
          {/* Lower abs */}
          <rect x="41" y="76" width="28" height="16" rx="3" fill={c.lowerAbs} stroke="#2a2a2a" strokeWidth="1"/>
          {/* Hip flexors */}
          <path d="M41 92 Q38 100 38 110 Q44 112 48 108 Q46 100 45 92 Z" fill={c.hipFlex} stroke="#2a2a2a" strokeWidth="1"/>
          <path d="M69 92 Q72 100 72 110 Q66 112 62 108 Q64 100 65 92 Z" fill={c.hipFlex} stroke="#2a2a2a" strokeWidth="1"/>
          {/* Left quad outer */}
          <path d="M36 112 Q32 130 33 152 Q38 156 42 152 Q40 130 40 112 Z" fill={c.quadsOuter} stroke={s.quadsOuter} strokeWidth="1"/>
          {/* Left quad inner */}
          <path d="M44 112 Q46 130 46 152 Q50 156 54 152 Q52 130 50 112 Z" fill={c.quadsInner} stroke="#2a2a2a" strokeWidth="1"/>
          {/* Right quad inner */}
          <path d="M56 112 Q58 130 64 152 Q60 156 56 152 Q54 130 60 112 Z" fill={c.quadsInner} stroke="#2a2a2a" strokeWidth="1"/>
          {/* Right quad outer */}
          <path d="M66 112 Q70 130 77 152 Q72 156 68 152 Q66 130 70 112 Z" fill={c.quadsOuter} stroke={s.quadsOuter} strokeWidth="1"/>
          {/* Left tibialis */}
          <rect x="36" y="156" width="11" height="32" rx="5" fill={c.tibialis} stroke="#2a2a2a" strokeWidth="1"/>
          {/* Right tibialis */}
          <rect x="63" y="156" width="11" height="32" rx="5" fill={c.tibialis} stroke="#2a2a2a" strokeWidth="1"/>
        </svg>
      </div>

      {/* BACK VIEW */}
      <div style={{ textAlign: "center" }}>
        <p style={{ fontSize: "10px", color: "#444", marginBottom: "10px", letterSpacing: "0.12em", fontFamily: "Syne, sans-serif" }}>BACK</p>
        <svg width="110" height="240" viewBox="0 0 110 240" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Head */}
          <ellipse cx="55" cy="16" rx="13" ry="15" fill="#1e1e1e" stroke="#2a2a2a" strokeWidth="1"/>
          {/* Neck */}
          <rect x="49" y="28" width="12" height="10" rx="2" fill="#1e1e1e" stroke="#2a2a2a" strokeWidth="1"/>
          {/* Upper traps */}
          <path d="M49 30 Q42 34 28 46 Q34 50 40 46 Q46 38 55 38 Q64 38 70 46 Q76 50 82 46 Q68 34 61 30 Z" fill={c.upperTraps} stroke="#2a2a2a" strokeWidth="1"/>
          {/* Rear delts */}
          <ellipse cx="28" cy="50" rx="11" ry="9" fill={c.rearDelt} stroke="#2a2a2a" strokeWidth="1"/>
          <ellipse cx="82" cy="50" rx="11" ry="9" fill={c.rearDelt} stroke="#2a2a2a" strokeWidth="1"/>
          {/* Left lat */}
          <path d="M36 46 Q28 58 30 76 Q36 80 40 76 Q38 60 40 46 Z" fill={c.lats} stroke="#2a2a2a" strokeWidth="1"/>
          {/* Right lat */}
          <path d="M74 46 Q82 58 80 76 Q74 80 70 76 Q72 60 70 46 Z" fill={c.lats} stroke="#2a2a2a" strokeWidth="1"/>
          {/* Rhomboids / mid back */}
          <rect x="40" y="44" width="30" height="22" rx="3" fill={c.rhomboids} stroke="#2a2a2a" strokeWidth="1"/>
          {/* Lower traps */}
          <path d="M40 66 Q45 72 55 74 Q65 72 70 66 Q65 70 55 70 Q45 70 40 66 Z" fill={c.lowerTraps} stroke="#2a2a2a" strokeWidth="1"/>
          {/* Triceps */}
          <rect x="16" y="54" width="11" height="28" rx="5" fill={c.tricep} stroke={s.tricep} strokeWidth="1"/>
          <rect x="83" y="54" width="11" height="28" rx="5" fill={c.tricep} stroke={s.tricep} strokeWidth="1"/>
          {/* Forearms back */}
          <rect x="16" y="85" width="11" height="26" rx="5" fill={c.forearmBack} stroke="#2a2a2a" strokeWidth="1"/>
          <rect x="83" y="85" width="11" height="26" rx="5" fill={c.forearmBack} stroke="#2a2a2a" strokeWidth="1"/>
          {/* Lower back / erectors */}
          <path d="M44 76 Q42 90 43 102 Q48 106 52 102 Q51 90 50 76 Z" fill={c.lowerBack} stroke="#2a2a2a" strokeWidth="1"/>
          <path d="M66 76 Q68 90 67 102 Q62 106 58 102 Q59 90 60 76 Z" fill={c.lowerBack} stroke="#2a2a2a" strokeWidth="1"/>
          {/* Glutes */}
          <path d="M36 104 Q33 116 35 126 Q42 130 50 126 Q52 116 50 104 Z" fill={c.glutes} stroke={s.glutes} strokeWidth="1"/>
          <path d="M74 104 Q77 116 75 126 Q68 130 60 126 Q58 116 60 104 Z" fill={c.glutes} stroke={s.glutes} strokeWidth="1"/>
          {/* Hamstrings */}
          <path d="M36 128 Q33 144 35 158 Q40 162 46 158 Q44 144 42 128 Z" fill={c.hamstrings} stroke={s.hamstrings} strokeWidth="1"/>
          <path d="M74 128 Q77 144 75 158 Q70 162 64 158 Q66 144 68 128 Z" fill={c.hamstrings} stroke={s.hamstrings} strokeWidth="1"/>
          {/* Inner hamstrings */}
          <path d="M48 128 Q46 144 48 158 Q53 160 57 158 Q55 144 57 128 Z" fill={c.hamstrings} stroke="#2a2a2a" strokeWidth="1"/>
          <path d="M62 128 Q64 144 62 158 Q57 160 53 158 Q55 144 53 128 Z" fill={c.hamstrings} stroke="#2a2a2a" strokeWidth="1"/>
          {/* Calves */}
          <path d="M36 162 Q34 176 37 192 Q42 196 47 192 Q46 176 44 162 Z" fill={c.calves} stroke={s.calves} strokeWidth="1"/>
          <path d="M74 162 Q76 176 73 192 Q68 196 63 192 Q64 176 66 162 Z" fill={c.calves} stroke={s.calves} strokeWidth="1"/>
        </svg>
      </div>

      {/* SIDE VIEW */}
      <div style={{ textAlign: "center" }}>
        <p style={{ fontSize: "10px", color: "#444", marginBottom: "10px", letterSpacing: "0.12em", fontFamily: "Syne, sans-serif" }}>SIDE</p>
        <svg width="70" height="240" viewBox="0 0 70 240" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Head */}
          <ellipse cx="35" cy="16" rx="12" ry="14" fill="#1e1e1e" stroke="#2a2a2a" strokeWidth="1"/>
          {/* Neck */}
          <rect x="30" y="28" width="10" height="10" rx="2" fill="#1e1e1e" stroke="#2a2a2a" strokeWidth="1"/>
          {/* Shoulder side */}
          <ellipse cx="22" cy="46" rx="10" ry="9" fill={c.sideDelt} stroke="#2a2a2a" strokeWidth="1"/>
          {/* Chest side */}
          <path d="M28 40 Q38 38 42 50 Q38 60 30 60 Q26 52 28 40 Z" fill={c.chest} stroke="#2a2a2a" strokeWidth="1"/>
          {/* Upper arm side */}
          <rect x="12" y="52" width="9" height="28" rx="4" fill={c.bicep} stroke="#2a2a2a" strokeWidth="1"/>
          {/* Forearm side */}
          <rect x="12" y="83" width="9" height="26" rx="4" fill={c.forearmFront} stroke="#2a2a2a" strokeWidth="1"/>
          {/* Abs side */}
          <rect x="30" y="60" width="16" height="32" rx="3" fill={c.upperAbs} stroke="#2a2a2a" strokeWidth="1"/>
          {/* Lower back side */}
          <path d="M26 64 Q22 76 22 96 Q26 100 30 96 Q28 76 30 64 Z" fill={c.lowerBack} stroke="#2a2a2a" strokeWidth="1"/>
          {/* Glute side */}
          <path d="M26 98 Q22 112 24 126 Q30 130 36 126 Q34 112 32 98 Z" fill={c.glutes} stroke="#2a2a2a" strokeWidth="1"/>
          {/* Quad side */}
          <path d="M32 110 Q34 130 34 152 Q38 156 42 152 Q40 130 38 110 Z" fill={c.quadsOuter} stroke="#2a2a2a" strokeWidth="1"/>
          {/* Hamstring side */}
          <path d="M24 110 Q22 130 24 152 Q28 156 32 152 Q30 130 30 110 Z" fill={c.hamstrings} stroke="#2a2a2a" strokeWidth="1"/>
          {/* Calf side */}
          <path d="M26 156 Q24 172 26 190 Q30 194 35 190 Q34 172 32 156 Z" fill={c.calves} stroke="#2a2a2a" strokeWidth="1"/>
          {/* Tibialis side */}
          <path d="M34 156 Q36 172 36 190 Q40 192 43 190 Q42 172 40 156 Z" fill={c.tibialis} stroke="#2a2a2a" strokeWidth="1"/>
        </svg>
      </div>
    </div>
  );
}
